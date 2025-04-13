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
import { Item, ItemUpdatePayload } from '../item/item.interface';
import { ItemFormComponent } from '../item-form/item-form.component';
import { setControlMessage } from 'ngx-control-message';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ToFormGroup } from '../app.interface';

@Component({
  selector: 'app-item-update',
  imports: [ReactiveFormsModule, ItemFormComponent, ToastModule],
  providers: [MessageService],
  templateUrl: './item-update.component.html',
  styleUrl: './item-update.component.css',
})
export class ItemUpdateComponent implements OnInit {
  item = signal<Item | undefined>(undefined);

  @Input({ transform: numberAttribute }) id!: number;

  constructor(
    private readonly itemService: ItemService,
    private readonly messageService: MessageService
  ) {}

  form = new FormGroup<ToFormGroup<ItemUpdatePayload>>({
    title: new FormControl('', {
      validators: [setControlMessage(Validators.required, 'Obligatoire!')],
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
    this.itemService.update(this.id, this.form.value).subscribe({
      next: ({ data }) => {
        this.item.set(data);
        this.form.patchValue({
          ...data,
          returnAt: data.returnAt ? new Date(data.returnAt) : undefined,
        });
        this.messageService.add({
          severity: 'success',
          summary: 'Mise à jour effectuée',
          life: 3000,
        });
      },
      error: () =>
        this.messageService.add({
          severity: 'error',
          summary: 'Mise à jour échouer',
          life: 3000,
        }),
    });
  }
}
