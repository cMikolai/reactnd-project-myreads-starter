import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import PropTypes from 'prop-types'
//import * as BooksAPI from './BooksAPI'

class ListBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    moveShelf: PropTypes.func.isRequired
  }

  render() {
    const { moveShelf } = this.props

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>

        <div className="list-books-content">
            <Book
            key="currently"
            books={this.props.bookShelf.filter(book => book.shelf === "currentlyReading")}
            moveShelf={moveShelf}
            shelf="Currently Reading"
            />
            <Book
              key="wantToRead"
              books={this.props.bookShelf.filter(book => book.shelf === "wantToRead")}
              moveShelf={moveShelf}
              shelf="Want to Read"
            />
            <Book
              key="read"
              books={this.props.bookShelf.filter(book => book.shelf === "read")}
              moveShelf={moveShelf}
              shelf="Read"
            />
          </div>

        <div className="open-search">
          <Link
            to='/search'
            onClick={this.props.onNavigate}>
            Add a book</Link>
        </div>
      </div>
    );
  }
}

export default ListBooks
