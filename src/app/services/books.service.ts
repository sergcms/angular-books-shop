import { Injectable } from '@angular/core';
import { of } from "rxjs/observable/of";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from "angularfire2/firestore";
import { Book } from "../models/Book";
import { Observable } from "rxjs/Observable";

@Injectable()
export class BooksService {
  booksCollection: AngularFirestoreCollection<Book>;
  bookDoc: AngularFirestoreDocument<Book>;
  books: Observable<Book[]>;
  book: Observable<Book>;

  constructor(
    private afs: AngularFirestore
  ) { 
    this.booksCollection = this.afs.collection('books');
  }

  getBooks() {
    this.books = this.booksCollection.snapshotChanges().map(collection => {
      return collection.map(document => {
        const data = document.payload.doc.data() as Book;
        data.id = document.payload.doc.id;

        return data;
      });
    });

    return this.books;
  }

  getBookById(id: string) {
    this.bookDoc = this.afs.doc(`books/${id}`);

    return this.bookDoc;
  }

  addBook(book: Book) {
    this.booksCollection.add(book);

    return of(book);
  }

  editBook(book: Book) {
    this.bookDoc = this.afs.doc(`books/${book.id}`);
    this.bookDoc.update(book);

    return of(book);
  }
  
  deleteBook(id: string) {
    this.bookDoc = this.afs.doc(`books/${id}`);
    this.bookDoc.delete();   
  }
}