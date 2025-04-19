import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ItemService } from '../item/item.service';
import { ItemCreatePayload } from '../item/item.type';
import { Router } from '@angular/router';
import { ItemFormComponent } from '../item-form/item-form.component';
import { setAsyncControlMessage, setControlMessage } from 'ngx-control-message';
import { ToFormGroup } from '../app.type';
import { itemTitleExistsValidator } from '../validators/item-title-exists.validator';

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
      asyncValidators: [
        setAsyncControlMessage(
          itemTitleExistsValidator(),
          'Le titre existe déjà !'
        ),
      ],
      updateOn: 'blur',
      nonNullable: true,
    }),
    description: new FormControl('', { nonNullable: true }),
    returnAt: new FormControl(undefined, { nonNullable: true }),
    file: new FormControl(undefined, { nonNullable: true }),
  });

  handleFormSubmit() {
    this.itemService.create(this.form.getRawValue()).subscribe(() => {
      this.router.navigate(['/items']);
      this.form.reset();
    });
  }
}
