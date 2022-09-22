import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookDetailsComponent } from './book-details/book-details.component';
import { BookCreateComponent } from './book-create/book-create.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BookSearchComponent } from './book-search/book-search.component';

const routes: Routes = [ //create routes
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: DashboardComponent },
  { path: 'create', component: BookCreateComponent},
  { path: 'search', component: BookSearchComponent},
  { path: ':isbn', component: BookDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BooksRoutingModule { }
