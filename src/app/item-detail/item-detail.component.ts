import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ItemService } from '../item.service';

interface ItemData {
  id: string;
  title: string;
  price: string;
  picture: string;
  condition: string;
  soldQuantity: string;
  description: string;
  categoryId: string;
  parsedCategories: string;
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
    picture: '',
    condition: '',
    soldQuantity: '',
    description: '',
    categoryId: '',
    parsedCategories: '',
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
        this.itemData.price = data.price;
        this.itemData.picture = data.pictures[0].url;
        this.itemData.condition = data.condition;
        this.itemData.soldQuantity = data.sold_quantity;
        this.itemData.categoryId = data.category_id;

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
