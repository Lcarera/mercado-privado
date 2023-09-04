import { formatNumber } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
  
  constructor(private router: Router) {}
  
  ngOnInit(): void {
    this.formatPrice();
  }

  formatPrice():void {
    this.price = formatNumber(Number(this.price), 'en-US', '1.0-0').replace(',', '.');
  }

  seeItemDetail() :void {
    this.router.navigate(
      ['/items/', this.id], 
    );
  }
}