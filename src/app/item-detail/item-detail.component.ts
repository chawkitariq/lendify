import {
  Component,
  Input,
  numberAttribute,
  OnInit,
  signal,
} from '@angular/core';
import { ItemService } from '../item/item.service';
import { Item } from '../item/item.type';

@Component({
  selector: 'app-item-detail-page',
  imports: [],
  templateUrl: './item-detail.component.html',
  styleUrl: './item-detail.component.css',
})
export class ItemDetailComponent implements OnInit {
  item = signal<Item | undefined>(undefined);

  @Input({ transform: numberAttribute }) id!: number;

  constructor(private readonly itemService: ItemService) {}

  ngOnInit(): void {
    this.itemService
      .findOne(this.id)
      .subscribe(({ data }) => this.item.set(data));
  }
}
