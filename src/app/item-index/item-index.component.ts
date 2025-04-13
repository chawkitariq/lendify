import { Component, signal } from '@angular/core';
import { Item } from '../item/item.type';
import { ItemService } from '../item/item.service';
import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-item',
  imports: [CardModule, ButtonModule, ConfirmDialogModule, ToastModule],
  providers: [ConfirmationService, MessageService],
  templateUrl: './item-index.component.html',
  styleUrl: './item-index.component.css',
})
export class ItemIndexComponent {
  items = signal<Item[]>([]);

  constructor(
    private readonly itemService: ItemService,
    private readonly router: Router,
    private readonly confirmationService: ConfirmationService,
    private readonly messageService: MessageService
  ) {}

  ngOnInit() {
    this.itemService.findAll().subscribe(({ data }) => {
      this.items.set(data);
    });
  }

  handleCreateItem() {
    this.router.navigateByUrl('/items/create');
  }

  handleUpdateItem(itemId: number) {
    this.router.navigate(['items', itemId, 'update']);
  }

  handleDeleteItem(itemId: number) {
    this.itemService.delete(itemId).subscribe({
      next: () => {
        this.items.update((s) => s.filter(({ id }) => id !== itemId));
        this.messageService.add({
          severity: 'success',
          summary: 'Suppression effectuée',
          life: 3000,
        });
      },
      error: () =>
        this.messageService.add({
          severity: 'error',
          summary: 'Suppression échouer',
          life: 3000,
        }),
    });
  }

  handleConfirmDelete(itemId: number) {
    this.confirmationService.confirm({
      message: 'Êtes-vous sûr de vouloir supprimer cet élément ?',
      header: 'Supprimer un élément',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonProps: {
        label: 'Supprimer',
        severity: 'danger',
      },
      rejectButtonProps: {
        label: 'Annuler',
        severity: 'secondary',
      },
      accept: () => {
        this.handleDeleteItem(itemId);
      },
    });
  }
}
