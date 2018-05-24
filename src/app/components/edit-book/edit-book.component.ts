import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { BooksService } from "../../services/books.service";
import { Book } from "../../models/Book";
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {
  bookId: string;
  book: Book = {
    name: '',
    author: '',
    price: null,
    description: '',
    date: null
  };
  
  constructor(
    public booksService: BooksService,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    this.bookId = this.activatedRoute.snapshot.params['id'];      
    this.booksService.getBookById(this.bookId).valueChanges().subscribe((book: Book) => this.book = book);
  }

  editBook() {    
    const updateBook = Object.assign({}, this.book, {id: this.bookId, date: Date.now()});
    this.booksService.editBook(updateBook).subscribe((book: Book) => {
      if (book) {   
        // Show message  
        this.flashMessage.show('Edited successfully!', {
          cssClass: 'alert-success',
          showCloseBtn: true,
          closeOnClick: true,
          timeout: 10000
        });

        this.router.navigate(['/panel']);
      }
    }, error => {
      this.flashMessage.show(error.message, {
        cssClass: 'alert-danger',
        showCloseBtn: true,
        closeOnClick: true,
        timeout: 10000
      });
    });
  }
}
