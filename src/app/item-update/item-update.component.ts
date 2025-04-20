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
import { Item, ItemFormUpdatePayload } from '../item/item.interface';
import { ItemFormComponent } from '../item-form/item-form.component';
import { setControlMessage } from 'ngx-control-message';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import {
  ApiErrorResponse,
  ApiResponse,
  HttpClientErrorResponse,
  ToFormGroup,
} from '../app.type';
import { environment } from '../../environments/environment';
import { extractApiErrorMessage } from '../utils/error.util';
import { FileService } from '../file/file.service';
import { File as ApiFile } from '../file/file.interface';
import { constructAssetUrl } from '../utils/app.util';
import { Observable } from 'rxjs';

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
    private readonly fileService: FileService,
    private readonly messageService: MessageService
  ) {}

  form = new FormGroup<ToFormGroup<ItemFormUpdatePayload>>({
    title: new FormControl('', {
      validators: [setControlMessage(Validators.required, 'Obligatoire!')],
      nonNullable: true,
    }),
    description: new FormControl('', { nonNullable: true }),
    returnAt: new FormControl(undefined, { nonNullable: true }),
    image: new FormControl(undefined, { nonNullable: true }),
  });

  ngOnInit(): void {
    this.itemService.findOne(this.id).subscribe(({ data }) => {
      this.item.set(data);
      this.form.patchValue({
        ...data,
        image: constructAssetUrl(data.image),
      });
    });
  }

  handleFormSubmit() {
    this.handleUploadImage().subscribe((image) => {
      const payload = { ...this.form.value, image: image };
      this.itemService.update(this.id, payload).subscribe({
        next: this.handleUpdateItemSuccess,
        error: this.handleUpdateItemError,
      });
    });
  }

  handleUploadImage() {
    const image = this.form.controls.image.value;

    return new Observable<string | undefined>((subscriber) => {
      if (image instanceof File) {
        this.fileService.upload({ file: image }).subscribe({
          next: (response) => {
            this.handleUploadImageSuccess(response);
            subscriber.next(response.data.id);
          },
          error: this.handleUploadImageError,
        });
      } else {
        subscriber.next(undefined);
      }
    });
  }

  handleUploadImageSuccess({ data: image }: ApiResponse<ApiFile>) {
    this.form.patchValue({
      image: constructAssetUrl(image.id),
    });
  }

  handleUploadImageError({ error }: HttpClientErrorResponse<ApiErrorResponse>) {
    this.messageService.add({
      severity: 'error',
      summary: "Échec de l'upload",
      detail: extractApiErrorMessage(error),
      life: 3000,
    });
  }

  handleUpdateItemSuccess({ data }: ApiResponse<Item>) {
    this.item.set(data);
    this.form.patchValue({
      ...data,
      image: constructAssetUrl(data.image),
    });
    this.messageService.add({
      severity: 'success',
      summary: 'Mise à jour effectuée',
      life: 3000,
    });
  }

  handleUpdateItemError({ error }: HttpClientErrorResponse<ApiErrorResponse>) {
    this.messageService.add({
      severity: 'error',
      summary: 'Mise à jour échouer',
      detail: extractApiErrorMessage(error),
      life: 3000,
    });
  }
}
