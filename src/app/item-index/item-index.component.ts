import { Component, signal } from '@angular/core';
import { Item } from '../item.type';
import { ItemService } from '../item.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-item',
  imports: [RouterLink],
  templateUrl: './item-index.component.html',
  styleUrl: './item-index.component.css'
})
export class ItemIndexComponent {
  items = signal<Item[]>([]);

  constructor(private readonly itemService: ItemService) {
    console.log("/items")
  }

  ngOnInit() {
    this.itemService.findAll().subscribe(({ data }) => {
      this.items.set(data);
    });
  }
}
