import { TestBed } from '@angular/core/testing';
import { Book } from './book';

import { BookRatingService } from './book-rating.service';

describe('BookRatingService', () => {
  let service: BookRatingService;
  let book: Book;

  beforeEach(() => {
    //Arrange vorbereitet
    TestBed.configureTestingModule({});
    // Alternative: service = new BookRatingService();
    service = TestBed.inject(BookRatingService);
    book = {
      isbn:'',
      title: '',
      description:'',
      rating: 3,
      price: 1
    };

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should rate up a book by one', () => {
    // Arrange
    book.rating = 3;
    // falls rating readonly: book= { ...book, rating:3 };
    
    // Act
    const ratedBook = service.rateUp(book);

    // Assert
    expect(ratedBook.rating).toBe(4);  // keine gute Idee: .toBe(book.rating +1);
  });
  it('should down up a book by one', () => {
    const ratedBook = service.rateDown(book);
    expect(ratedBook.rating).toBe(2);  // keine gute Idee: .toBe(book.rating +1);
  });

  it('should not rate higher than 5', () => {
    book.rating = 5;
    const ratedBook = service.rateUp(book);
    expect(ratedBook.rating).toBe(5);
  });

  it('should not rate lower than 1', () => {
    book.rating = 1;
    const ratedBook = service.rateDown(book);
    expect(ratedBook.rating).toBe(1);
  });
});
