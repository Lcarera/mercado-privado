import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemsComponent } from './items/items.component';
import { ItemListComponent } from './item-list/item-list.component';

const routes: Routes = [
  { path: 'items', component: ItemListComponent , pathMatch: 'full'},
  { path: 'items/:search', component: ItemListComponent , pathMatch: 'full'},
  { path: 'items/:id', component: ItemsComponent , pathMatch: 'full'},
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '**', redirectTo: '/', pathMatch: 'full'}
  // Other routes...
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}