import React, { Component } from 'react'
import PropTypes from 'prop-types'
//import * as BooksAPI from './BooksAPI'

class SearchBook extends Component {


  render() {
    return (
      <div>
        {this.props.books.map((book) => (
              <li key={book.id} className="book" shelf="None">
                <div className="book-top">
                  <div
                    className="book-cover"
                    style={{
                      width: 128,
                      height: 193,
                      //backgroundImage: `url(${book.imageLinks.thumbnail})`
                    }}
                  />

                    <div className="book-shelf-changer">
                      <select
                        value={book.shelf}
                        onChange={this.changeShelf}
                        //onChange={e => this.props.onChangeShelf(book.id, e)}
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
                    <div className='book-title'><p>{book.title}</p></div>
                    <div className='book-authors'><p>{book.authors}</p></div>
                  </div>
              </li>
            ))}
          </div>
    )
  }
}

SearchBook.PropTypes = {
  books: PropTypes.array.isRequired
}

export default SearchBook
