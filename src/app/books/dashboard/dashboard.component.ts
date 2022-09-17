import { Component, OnInit, TrackByFunction } from '@angular/core';
import { Book } from '../shared/book';
import { BookRatingService } from '../shared/book-rating.service';
import { BookStoreService } from '../shared/book-store.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  books: Book[] = []; // properties deklarieren

  trackBook: TrackByFunction<Book> = (index, item) => {
    return item.isbn;
  }

  constructor(private rs: BookRatingService, private bs:BookStoreService) {
    this.bs.getAll().subscribe(books => {
      this.books = books;
    });
  }

  doRateUp(book: Book) {
      const ratedBook = this.rs.rateUp(book);
      this.updateList(ratedBook);
  }
  doRateDown(book: Book) {
    const ratedBook = this.rs.rateDown(book);
    this.updateList(ratedBook);
  }
  private updateList(ratedBook: Book){

    this.books = this.books.map(b => {
      if (b.isbn === ratedBook.isbn) {
        return ratedBook;
      } else {
        return b;
      }
    })
  }

  ngOnInit(): void {
  }

}
