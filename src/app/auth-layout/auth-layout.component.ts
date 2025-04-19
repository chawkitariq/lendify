import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Toolbar } from 'primeng/toolbar';
import { AuthenticationStoreService } from '../authentication-store/authentication-store.service';

@Component({
  selector: 'app-auth-layout',
  imports: [RouterOutlet, Toolbar, ButtonModule, InputTextModule, ButtonModule],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.css',
})
export class AuthLayoutComponent {
  constructor(
    private readonly authenticationStoreService: AuthenticationStoreService,
    private readonly router: Router
  ) {}

  logout() {
    this.authenticationStoreService.logout();
    this.router.navigateByUrl('/connection');
  }
}
