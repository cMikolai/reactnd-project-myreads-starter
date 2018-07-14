import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
//import escapeRegExp from 'escape-string-regexp'
//import Book from './Book'
import * as BooksAPI from './BooksAPI'

class SearchBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
  }

  state = {
    query: '',
    searchBooks: [],
    shelf: [],
    books: []
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() })
  }

  clearQuery = () => {
    this.setState({ query: '' })
  }

  changeShelf = (bookId, e) => {

    let searchResults = this.props.bookShelf;
    const book = searchResults.filter(t => t.id === bookId)[0];
    book.shelf = e.target.value;

    BooksAPI.update (book, e.target.value).then(response => {
      this.setState ({
        books: searchResults
      });
    });
  };

  render() {
    //const { books } = this.props
    const { query } = this.state

    //let searchBooks
    if (query) {
      BooksAPI.search(query, 20).then((books) => {
       books.length > 0 ?  this.setState({ searchBooks: books }) : this.setState({ searchBooks: [] })
     })
    } else {
      // this.setState({ searchBooks: books})
    }

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            to='/'
            className="close-search" onClick={() => this.setState({ showSearchPage: false })}>
            Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input
              value={this.state.query}
              onChange={(event) => this.updateQuery(event.target.value)}
              type="text"
              placeholder="Search by title or author"
            />

          </div>
        </div>

        <div className="search-books-results">
          <ol className="books-grid">

            {this.state.searchBooks.map(book =>
              <li key={book.id} className="book">
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
            )}

          </ol>
        </div>
      </div>
      )
  }
}

SearchBooks.PropTypes = {
  books: PropTypes.array.isRequired,
  changeShelf: PropTypes.func.isRequired
}

export default SearchBooks
