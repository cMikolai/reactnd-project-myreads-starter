import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import ListBooks from './ListBooks'
import * as BooksAPI from './BooksAPI'

class BookShelves extends Component {
  static PropTypes = {
    books: PropTypes.array.isRequired
  }

  render() {
    const { books } = this.props

    let imageLinks = BooksAPI.search('B').then(r => r.forEach(book => book.imageLinks /*&& console.log(book.imageLinks.thumbnail) */))

    return (
          <div className="bookshelf">
          <h2 className="bookshelf-title">{this.props.shelf}</h2>
          <div className="bookshelf-books">
          <ol className='books-grid'>

              {this.props.books.map(book =>
              <li key={book.id} className="book">
                <div className="book-top">
                  <div
                    className="book-cover"
                    style={{
                      width: 128,
                      height: 193,
                      backgroundImage: `url(${book.imageLinks.thumbnail})`
                    }}
                  />

                    <div className="book-shelf-changer">
                      <select value={book.shelf} onChange={e => this.props.onChangeShelf(book.id, e)}>
                        <option value="move" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>
                  <div className='book-details'>
                    <div className='book-title'><p>{book.title}</p></div>
                    <div className='book-authors'><p>{book.authors}</p></div>
                  </div>
                </li>
              )}
            </ol>
          </div>
          </div>
    )
  }
}

BookShelves.PropTypes = {
  books: PropTypes.array.isRequired
}

export default BookShelves
