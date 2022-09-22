import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { Book } from '../shared/book';
import { BookStoreService } from '../shared/book-store.service';


@Component({
  selector: 'app-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.scss']
})
export class BookCreateComponent implements OnInit {

  bookForm = new FormGroup({
    isbn: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(10),
        Validators.minLength(13),
        Validators.pattern(/\d/),
        // Validators.pattern('^[0-9]*$')
      ]
    }),
    title: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.maxLength(100)]
    }),
    description: new FormControl('', {nonNullable: true}),
    price: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.min(0)]
    }),
    rating: new FormControl(1, {
      nonNullable: true,
      validators: [
              Validators.min(1),
              Validators.max(5),
            ]
    }),
  });

  constructor(private router: Router, private bs: BookStoreService) { }

  isInvalid(controlName: string): boolean {
    const control = this.bookForm.get(controlName);
    return !!control && control.invalid && control.touched;
    // return control?.invalid && control?.touched;
  }
  hasError(controlName: string, errorCode: string): boolean {
    const control = this.bookForm.get(controlName);
    return !!control && control.touched && control.hasError(errorCode);
    // return !!control && control.touched && control.errors?.[errorCode];
    // return !!control && control.touched && control.getError(errorCode);
  }

  ngOnInit(): void {
  }

  submitForm(){
    const newBook: Book = {
      ...this.bookForm.getRawValue(),
      // Falls Eigenschaften fehlen:
      //firstThumnailURL,
    };
    this.bs.create(newBook).subscribe({
      next: receivedBook => {
      this.router.navigate(['/books', receivedBook.isbn]);
  },
  error: err => {
        console.log('FEHLER', err);
      }
    })
  }
}

/*
TODO:
- Input-Validierung
- Feedback
- Formular abschicken
  - Button
  - Buch Erzeugen
  - HTTP
  - bei Erfolg: Varianten
    - Navigation zum Dashboard
    - Notification Success
    - Zurücksetzen
*/

