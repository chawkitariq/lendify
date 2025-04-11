import { Component, signal } from '@angular/core';
import { Item } from '../item/item.interface';
import { ItemService } from '../item/item.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-item',
  imports: [RouterLink],
  templateUrl: './item-index.component.html',
  styleUrl: './item-index.component.css',
})
export class ItemIndexComponent {
  items = signal<Item[]>([]);

  constructor(
    private readonly itemService: ItemService,
    private readonly router: Router
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
}
