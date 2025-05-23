import { Component, signal } from '@angular/core';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToFormGroup } from '../app.type';
import { AuthenticationLoginPayload } from '../authentication/authentication.type';
import { getControlMessage, setControlMessage } from 'ngx-control-message';
import { MessageModule } from 'primeng/message';
import { isInvalidControl } from '../utils/app.util';
import { AuthenticationService } from '../authentication/authentication.service';
import { AuthenticationStoreService } from '../authentication-store/authentication-store.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    DividerModule,
    ButtonModule,
    InputTextModule,
    MessageModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly authenticationStoreService: AuthenticationStoreService,
    private readonly router: Router
  ) {}

  getControlMessage = getControlMessage;
  isInvalidControl = isInvalidControl;

  isLoading = signal(false);

  form = new FormGroup<ToFormGroup<AuthenticationLoginPayload>>({
    email: new FormControl('', {
      validators: [
        setControlMessage(Validators.required, 'Obligatoire!'),
        setControlMessage(Validators.email, 'Email invalide!'),
      ],
      nonNullable: true,
    }),
    password: new FormControl('', {
      validators: [setControlMessage(Validators.required, 'Obligatoire!')],
      nonNullable: true,
    }),
  });

  handleSubmit() {
    this.isLoading.set(true);
    this.authenticationService.login(this.form.getRawValue()).subscribe({
      next: ({ data }) => {
        this.isLoading.set(false);
        this.authenticationStoreService.login(data);
        this.router.navigateByUrl('/items');
      },
      error: ({ error }) => {
        this.isLoading.set(false);
        this.form.setErrors({
          server: error.errors.map((e: any) => e.message).join(', '),
        });
      },
    });
  }
}
