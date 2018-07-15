import React, { Component } from 'react'
import PropTypes from 'prop-types'
//import * as BooksAPI from './BooksAPI'

class SearchBook extends Component {

  static PropTypes = {
    books: PropTypes.array.isRequired,
    moveShelf: PropTypes.func.isRequired
  }

  render() {
     const {book, moveShelf} = this.props

    return (

      <div>
              <li key={this.props.id} className="book" shelf="None">
                <div className="book-top">
                  <div
                    className="book-cover"
                    style={ book && book.imageLinks && book.imageLinks.thumbnail && { backgroundImage: `url(${book.imageLinks.thumbnail})`,
                    width: 128, height: 193, }}
                  />

                    <div className="book-shelf-changer">
                      <select
                        value={this.props.shelf}
                        onChange={(event) => moveShelf(event, book)}
                        >
                        <option value="move" disabled>
                          Move to...
                        </option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>
                  <div className='book-details'>
                    <div className='book-title'><p>{this.props.title}</p></div>
                    <div className='book-authors'><p>{this.props.authors}</p></div>
                  </div>
              </li>
          </div>
    )
  }
}

SearchBook.PropTypes = {
  books: PropTypes.array.isRequired
}

export default SearchBook
