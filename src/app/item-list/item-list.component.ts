import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ItemService } from '../item.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {

  public searchText: string = '';
  public items: any[] = [];
  public categories: string[] = [];
  private subscription: Subscription = new Subscription();
  public parsedCategories: string = '';
  constructor(private route: ActivatedRoute, private itemService: ItemService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      this.searchText = params['search'];
      this.fetchItems();
    });
  }

  fetchItems(): void {
    if(this.searchText === '' || this.searchText === null || this.searchText === undefined) return;
    this.parsedCategories = '';
    this.categories = [];
    this.subscription = this.itemService.getItems(this.searchText).subscribe({
      next: (response: any) => {
        this.items = response.results;
        this.getCategories();
      },
      error: (error: Error) => {
        console.log(error);
      }
    });
  }

  getCategories(): void {
    let sameCategory: boolean = true;
    
    let categoryId: string = '';
    this.items.forEach((item: any) => {
      if(categoryId === '') {
        categoryId = item.category_id;
      }
      
      if(item.category_id !== categoryId) {
        this.categories = []
        sameCategory = false;
      }
    });

    if(!sameCategory) return;
    this.subscription = this.itemService.getCategories(categoryId).subscribe({
      next: (response: any) => {
        this.categories = response.path_from_root.map((category: any) => category.name);
        this.parsedCategories = this.categories.join(' > ');
      },
      error: (error: Error) => {
        console.log(error);
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}