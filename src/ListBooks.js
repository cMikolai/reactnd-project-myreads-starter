import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import BookShelves from './BookShelves'
import * as BooksAPI from './BooksAPI'

class ListBooks extends Component {
  changeShelf = (bookId: string, e: any) => {
    let currentShelf = this.props.bookShelf;
    const book = currentShelf.filter(t => t.id === bookId)[0];
    book.shelf = e.target.value;
    BooksAPI.update (book, e.target.value).then(response => {
      this.setState ({
        books: currentShelf
      });
    });
  };

  render() {
    let bookShelf

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <BookShelves
            key="currently"
            books={this.props.bookShelf.filter(book => book.shelf === "currentlyReading")}
            onChangeShelf={this.changeShelf}
            shelf="Currently Reading"
          />
          <BookShelves
            key="wantToRead"
            books={this.props.bookShelf.filter(book => book.shelf === "wantToRead")}
            onChangeShelf={this.changeShelf}
            shelf="Want to Read"
          />
          <BookShelves
            key="read"
            books={this.props.bookShelf.filter(book => book.shelf === "read")}
            onChangeShelf={this.changeShelf}
            shelf="Read"
          />
        </div>
        <div className="open-search">
          <Link
            to='/search'
            onClick={() => this.setState({ showSearchPage: true })}>
            Add a book</Link>
        </div>
      </div>
    );
  }
}

export default ListBooks
