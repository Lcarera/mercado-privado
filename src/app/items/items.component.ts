import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
})
export class ItemsComponent implements OnInit {
  @Input() id!: number;
  @Input() title!: string;
  @Input() location!: string;
  @Input() description!: string;
  @Input() price!: string;
  @Input() thumbnail!: string;
  public searchText: string = '';
  
  constructor(private router: Router, private itemService:ItemService) {}
  
  ngOnInit(): void {
    this.price = this.itemService.formatPrice(this.price);
  }

  seeItemDetail() :void {
    this.router.navigate(
      ['/items/', this.id], 
    );
  }
}