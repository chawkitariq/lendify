import { Component, signal } from '@angular/core';
import { Item } from '../item/item.interface';
import { ItemService } from '../item/item.service';
import { Router, RouterLink } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-item',
  imports: [CardModule, ButtonModule, ConfirmDialogModule],
  providers: [ConfirmationService],
  templateUrl: './item-index.component.html',
  styleUrl: './item-index.component.css',
})
export class ItemIndexComponent {
  items = signal<Item[]>([]);

  constructor(
    private readonly itemService: ItemService,
    private readonly router: Router,
    private readonly confirmationService: ConfirmationService
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
    this.itemService.delete(itemId).subscribe(() => {
      this.items.update((s) => s.filter(({ id }) => id !== itemId));
    });
  }

  handleConfirmDelete(itemId: number) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this item?',
      header: 'Delete Item',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonProps: {
        label: 'Delete',
        severity: 'danger',
      },
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
      },
      accept: () => {
        this.handleDeleteItem(itemId);
      },
    });
  }
}
