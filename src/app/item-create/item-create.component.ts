import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ItemService } from '../item/item.service';
import {
  Item,
  ItemCreatePayload,
  ItemFormCreatePayload,
} from '../item/item.interface';
import { Router } from '@angular/router';
import { ItemFormComponent } from '../item-form/item-form.component';
import { setAsyncControlMessage, setControlMessage } from 'ngx-control-message';
import {
  ApiErrorResponse,
  ApiResponse,
  HttpClientErrorResponse,
  ToFormGroup,
} from '../app.type';
import { itemTitleExistsValidator } from '../validators/item-title-exists.validator';
import { extractApiErrorMessage } from '../utils/error.util';
import { environment } from '../../environments/environment';
import { constructAssetUrl } from '../utils/app.util';
import { FileService } from '../file/file.service';
import { MessageService } from 'primeng/api';
import { File as ApiFile } from '../file/file.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-item-create',
  imports: [ReactiveFormsModule, ItemFormComponent],
  providers: [MessageService],
  templateUrl: './item-create.component.html',
  styleUrl: './item-create.component.css',
})
export class ItemCreateComponent {
  constructor(
    private readonly itemService: ItemService,
    private readonly fileService: FileService,
    private readonly messageService: MessageService,
    private readonly router: Router
  ) {}

  form = new FormGroup<ToFormGroup<ItemFormCreatePayload>>({
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
    image: new FormControl(undefined, { nonNullable: true }),
  });

  handleFormSubmit() {
    this.handleUploadImage().subscribe((image) => {
      const payload = { ...this.form.getRawValue(), image: image };
      this.itemService.create(payload).subscribe({
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
          next: ({ data }) => {
            this.handleUploadImageSuccess(data);
            subscriber.next(data.id);
          },
          error: this.handleUploadImageError,
        });
      } else {
        subscriber.next(undefined);
      }
    });
  }

  handleUploadImageSuccess(image: ApiFile) {
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
    this.form.patchValue({
      ...data,
      image: constructAssetUrl(data.image),
    });
    this.messageService.add({
      severity: 'success',
      summary: 'Création effectuée',
      life: 3000,
    });
    this.router.navigateByUrl('/items');
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
