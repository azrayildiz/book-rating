import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { switchMap, distinctUntilChanged, Observable, filter, debounceTime } from 'rxjs';
import { BookStoreService } from '../shared/book-store.service';
import { Book } from '../shared/book';

@Component({
  selector: 'app-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent implements OnInit {

  results$: Observable<Book[]>

  searchControl = new FormControl('', {nonNullable: true});


  constructor( private bs: BookStoreService) {
    this.results$ = this.searchControl.valueChanges.pipe(
      debounceTime(100),   //nicht zu viele Suchbegriffe hintereinander
      filter(value=> value.length >=3),  //min 3 Zeichen
      distinctUntilChanged(),    // nur unter
      switchMap(value => this.bs.search(value)) //http request
    )
   }

  ngOnInit(): void {
  }

}
