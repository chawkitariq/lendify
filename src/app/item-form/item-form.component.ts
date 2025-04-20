import { Component, OnInit } from '@angular/core';
import {
  ItemFormCreatePayload,
  ItemFormUpdatePayload,
} from '../item/item.interface';
import {
  ControlContainer,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DatePickerModule } from 'primeng/datepicker';
import { TextareaModule } from 'primeng/textarea';
import { MessageModule } from 'primeng/message';
import { PopoverModule } from 'primeng/popover';
import { ImageModule } from 'primeng/image';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { getControlMessage } from 'ngx-control-message';
import { ToFormGroup } from '../app.type';
import { isInvalidControl } from '../utils/app.util';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrl: './item-form.component.css',
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    DatePickerModule,
    TextareaModule,
    MessageModule,
    PopoverModule,
    ImageModule,
    InputGroupModule,
    InputGroupAddonModule,
  ],
})
export class ItemFormComponent implements OnInit {
  form!: FormGroup<ToFormGroup<ItemFormCreatePayload | ItemFormUpdatePayload>>;

  constructor(private readonly controlContainer: ControlContainer) {}

  getControlMessage = getControlMessage;
  isInvalidControl = isInvalidControl;

  ngOnInit(): void {
    this.form = this.controlContainer.control as FormGroup<
      ToFormGroup<ItemFormCreatePayload | ItemFormUpdatePayload>
    >;
  }

  handleFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const image = input.files[0];
      this.form.controls.image.setValue(image);
    }
  }

  getImageUrl(): string | undefined {
    const image = this.form.controls.image.value;
    return image instanceof File ? URL.createObjectURL(image) : image;
  }
}
