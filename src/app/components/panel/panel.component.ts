import { Component, OnInit } from '@angular/core';
import { BooksService } from "../../services/books.service";
import { Book } from "../../models/Book";
import { CurrencyService } from '../../services/currency.service';
import { Currency } from '../../models/Currency';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {
  books: Book[];
  searchText: string;
  searchingResult: Book[] = [];
  currentCurrency: Currency;

  constructor(
    public bookService: BooksService,
    public currencyService: CurrencyService,
    public flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    // Get all books
    this.bookService.getBooks().subscribe((books: Book[]) => this.books = books);
    // Subscribe on currency update
    this.currencyService.selectedCurrency.subscribe(data => {
      this.currentCurrency = Object.create(data.find(obj => obj.isActive));
    });
  }

  searchBook() {
    this.searchingResult = this.books.filter(book => book.name.toLowerCase().indexOf(this.searchText) !== -1);
  }

  deleteBook(id: string) {
    if(confirm('Do you want to delete this book?')) this.bookService.deleteBook(id); 
  }

}
