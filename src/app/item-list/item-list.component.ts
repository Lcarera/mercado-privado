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
  private subscription: Subscription = new Subscription();
  constructor(private route: ActivatedRoute, private itemService: ItemService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      this.searchText = params['search'];
      this.fetchItems();
    });
  }

  fetchItems() {
    this.subscription = this.itemService.getItems(this.searchText).subscribe({
      next: (response: any) => {
        this.items = response.results;
        console.log(this.items);
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