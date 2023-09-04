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
        this.itemData.id = data.id;
        this.itemData.title = data.title;
        this.itemData.price = this.itemService.formatPrice(data.price);
        this.itemData.picture = data.pictures[0];
        this.itemData.picture.witdh = this.itemData.picture.size.split('x')[0]
        this.itemData.picture.height = this.itemData.picture.size.split('x')[1]
        this.itemData.condition = data.condition;
        this.itemData.soldQuantity = data.sold_quantity;
        this.itemData.categoryId = data.category_id;
        this.itemData.linkMl = data.permalink;
        if(this.itemData.price.includes(',')){
          this.itemData.cents = this.itemData.price.split(',')[1];
        }

        this.itemService.getCategories(this.itemData.categoryId).subscribe({
          next: (data: any) => {
            const categories = data.path_from_root.map(
              (category: any) => category.name
            );
            this.itemData.parsedCategories = categories.join(' > ');
          },
          error: (error: Error) => {
            console.error(error);
            // Handle error here
          },
        });
      },
      error: (error: Error) => {
        console.error(error);
        // Handle error here
      },
    });
    this.itemService.getItemDescription(this.itemId).subscribe({
      next: (data: any) => {
        this.itemData.description = data.plain_text;
      },
      error: (error: Error) => {
        console.error(error);
        // Handle error here
      },
    });
  }
}
