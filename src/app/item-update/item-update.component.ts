import {
  Component,
  Input,
  numberAttribute,
  OnChanges,
  OnInit,
  signal,
  SimpleChanges,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ItemService } from '../item/item.service';
import { Item, ItemUpdatePayload, ToFormGroup } from '../item/item.interface';
import { ItemFormComponent } from '../item-form/item-form.component';

@Component({
  selector: 'app-item-update',
  imports: [ReactiveFormsModule, ItemFormComponent],
  templateUrl: './item-update.component.html',
  styleUrl: './item-update.component.css',
})
export class ItemUpdateComponent implements OnInit {
  item = signal<Item | undefined>(undefined);

  @Input({ transform: numberAttribute }) id!: number;

  constructor(private readonly itemService: ItemService) {}

  form = new FormGroup<ToFormGroup<ItemUpdatePayload>>({
    title: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    description: new FormControl('', { nonNullable: true }),
    returnAt: new FormControl(undefined, { nonNullable: true }),
  });

  ngOnInit(): void {
    this.itemService.findOne(this.id).subscribe(({ data }) => {
      this.item.set(data);
      this.form.patchValue({
        ...data,
        returnAt: data.returnAt ? new Date(data.returnAt) : undefined,
      });
    });
  }

  handleFormSubmit() {
    this.itemService.update(this.id, this.form.value).subscribe(({ data }) => {
      this.item.set(data);
      this.form.patchValue({
        ...data,
        returnAt: data.returnAt ? new Date(data.returnAt) : undefined,
      });
    });
  }
}
