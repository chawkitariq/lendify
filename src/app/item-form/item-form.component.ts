import { Component, input, model, OnInit } from '@angular/core';
import { ItemCreatePayload, ToFormGroup } from '../item/item.type';
import {
  ControlContainer,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-item-form',
  imports: [ReactiveFormsModule],
  templateUrl: './item-form.component.html',
  styleUrl: './item-form.component.css',
})
export class ItemFormComponent implements OnInit {
  form!: FormGroup<ToFormGroup<ItemCreatePayload>>;

  constructor(private readonly controlContainer: ControlContainer) {}

  ngOnInit(): void {
    this.form = this.controlContainer.control as FormGroup<
      ToFormGroup<ItemCreatePayload>
    >;
  }
}
