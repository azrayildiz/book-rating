import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../shared/book';
import { BookStoreService } from '../shared/book-store.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {

  book?: Book;

  constructor(private route: ActivatedRoute, private bs: BookStoreService) {
    // Synchroner Weg / PULL
    // const isbn = this.route.snapshot.paramMap.get('isbn');  // books/:isbn
    // console.log(isbn);

    // Asychroner Weg / PUSH
    this.route.paramMap.subscribe(params => {
      const isbn = params.get('isbn');
      console.log(isbn);

      if(isbn){
        this.bs.getSingle(isbn).subscribe(book => {
          this.book = book;
        });
      }
    })

    // Aufgabe: Bücher abrufen
    // HTTP (BookStoreService)
    // Buch anzeigen (ganz simple!)

  }

  ngOnInit(): void {
  }

}
