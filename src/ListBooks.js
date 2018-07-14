import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
//import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'

class ListBooks extends Component {

  changeShelf = (bookId, e) => {
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
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>

        <div className="list-books-content">
            <Book
            key="currently"
            books={this.props.bookShelf.filter(book => book.shelf === "currentlyReading")}
            onChangeShelf={this.changeShelf}
            shelf="Currently Reading"
            />
            <Book
              key="wantToRead"
              books={this.props.bookShelf.filter(book => book.shelf === "wantToRead")}
              onChangeShelf={this.changeShelf}
              shelf="Want to Read"
            />
            <Book
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
