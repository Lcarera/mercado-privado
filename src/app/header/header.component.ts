import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(private router:Router) { }
  
  public searchText: string = '';
  ngOnInit(): void {
  }

  onSubmit() {
    this.router.navigate(['/items'], { queryParams: { search: this.searchText } });
  }

}
