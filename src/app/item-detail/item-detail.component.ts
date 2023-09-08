import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ItemService } from '../item.service';

interface ItemData {
  id: string;
  title: string;
  price: string;
  picture: any;
  condition: string;
  soldQuantity: string;
  description: string;
  categoryId: string;
  parsedCategories: string;
  linkMl: string;
  cents?: string;
}

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss'],
})
export class ItemDetailComponent implements OnInit {
  private itemId!: string;
  public itemData: ItemData = {
    id: '',
    title: '',
    price: '',
    picture: {},
    condition: '',
    soldQuantity: '',
    description: '',
    categoryId: '',
    parsedCategories: '',
    linkMl: '',
    cents : '00'
  };

  constructor(
    private route: ActivatedRoute,
    private itemService: ItemService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.itemId = params['id'];
      this.fetchItemData();
    });
  }

  fetchItemData(): void {
    this.itemService.getItem(this.itemId).subscribe({
      next: (data: any) => {
        const item = data.item;
        this.itemData.id = item.id;
        this.itemData.title = item.title;
        this.itemData.price = this.itemService.formatPrice(item.price.amount);
        this.itemData.picture = item.picture;
        this.itemData.picture.witdh = this.itemData.picture.size.split('x')[0]
        this.itemData.picture.height = this.itemData.picture.size.split('x')[1]
        this.itemData.condition = item.condition;
        this.itemData.soldQuantity = item.sold_quantity;
        this.itemData.categoryId = item.category_id;
        this.itemData.linkMl = item.permalink;
        this.itemData.description = item.description;
        this.itemData.parsedCategories = data.categories.breadcrumb.join(' > ');

      },
      error: (error: Error) => {
        console.error(error);
        // Handle error here
      },
    });
  }
}
