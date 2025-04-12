import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ItemService } from '../item/item.service';
import { ItemCreatePayload, ToFormGroup } from '../item/item.interface';
import { Router } from '@angular/router';
import { ItemFormComponent } from '../item-form/item-form.component';
import { setControlMessage } from 'ngx-control-message';

@Component({
  selector: 'app-item-create',
  imports: [ReactiveFormsModule, ItemFormComponent],
  templateUrl: './item-create.component.html',
  styleUrl: './item-create.component.css',
})
export class ItemCreateComponent {
  constructor(
    private readonly itemService: ItemService,
    private readonly router: Router
  ) {}

  form = new FormGroup<ToFormGroup<ItemCreatePayload>>({
    title: new FormControl('', {
      validators: [setControlMessage(Validators.required, 'Obligatoire!')],
      nonNullable: true,
    }),
    description: new FormControl('', { nonNullable: true }),
    returnAt: new FormControl(undefined, { nonNullable: true }),
  });

  handleFormSubmit() {
    this.itemService.create(this.form.getRawValue()).subscribe(() => {
      this.router.navigate(['/items']);
      this.form.reset();
    });
  }
}
