import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ItemService } from '../item/item.service';
import { ItemCreatePayload, ToFormGroup } from '../item/item.type';
import { Router } from '@angular/router';
import { ItemFormComponent } from '../item-form/item-form.component';

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
      validators: [Validators.required],
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
