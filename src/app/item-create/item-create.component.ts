import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ItemService } from '../item/item.service';
import { ItemCreatePayload, ToFormControl } from '../item/item.type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item-create',
  imports: [ReactiveFormsModule],
  templateUrl: './item-create.component.html',
  styleUrl: './item-create.component.css',
})
export class ItemCreateComponent implements OnInit, OnDestroy {
  constructor(
    private readonly itemService: ItemService,
    private readonly router: Router
  ) {}

  form = new FormGroup<ToFormControl<ItemCreatePayload>>({
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

  ngOnInit(): void {}

  ngOnDestroy(): void {}
}
