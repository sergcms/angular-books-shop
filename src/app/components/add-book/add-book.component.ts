import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { BooksService } from "../../services/books.service";
import { IdService } from '../../services/id.service';
import { Book } from "../../models/Book";
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  book: Book = {    
    name: '',
    author: '',
    price: null,
    description: '',
    links: [
      {
        type: 'epab',
        link: ''
      },
      {
        type: 'pdf',
        link: ''
      }
    ]
  };

  constructor(
    public booksService: BooksService,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public idService : IdService,
    public flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    this.book.id = this.idService.generate();
    this.book.date = Date.now();
  }

  addBook() {
    // Add book
    this.booksService.addBook(this.book).subscribe((book: Book) => {
      if (book) {
        // Show message  
        this.flashMessage.show('Added successfully!', {
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
