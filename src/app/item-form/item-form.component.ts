import { Component, input, model, OnInit } from '@angular/core';
import { ItemCreatePayload, ToFormGroup } from '../item/item.interface';
import {
  ControlContainer,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DatePickerModule } from 'primeng/datepicker';
import { TextareaModule } from 'primeng/textarea';

@Component({
  selector: 'app-item-form',
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    DatePickerModule,
    TextareaModule,
  ],
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
