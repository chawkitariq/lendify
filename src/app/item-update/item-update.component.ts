import {
  Component,
  Input,
  numberAttribute,
  OnInit,
  signal,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ItemService } from '../item/item.service';
import { Item, ItemUpdatePayload } from '../item/item.type';
import { ItemFormComponent } from '../item-form/item-form.component';
import { setControlMessage } from 'ngx-control-message';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import {
  ApiErrorResponse,
  HttpClientErrorResponse,
  ToFormGroup,
} from '../app.type';
import { environment } from '../../environments/environment';
import { extractApiErrorMessage } from '../utils/error.util';

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
    file: new FormControl(undefined, { nonNullable: true }),
  });

  ngOnInit(): void {
    this.itemService.findOne(this.id).subscribe(({ data }) => {
      this.item.set(data);
      this.form.patchValue({
        ...data,
        file: `${environment.apiUrl}/assets/${data.image}`,
      });
    });
  }

  handleFormSubmit() {
    this.itemService.update(this.id, this.form.value).subscribe({
      next: ({ data }) => {
        this.item.set(data);
        this.form.patchValue(data);
        this.messageService.add({
          severity: 'success',
          summary: 'Mise à jour effectuée',
          life: 3000,
        });
      },
      error: ({ error }: HttpClientErrorResponse<ApiErrorResponse>) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Mise à jour échouer',
          detail: extractApiErrorMessage(error),
          life: 3000,
        });
      },
    });
  }
}
