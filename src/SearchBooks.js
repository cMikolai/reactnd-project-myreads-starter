import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import SearchBook from './searchBook'
import escapeRegExp from 'escape-string-regexp'
import * as BooksAPI from './BooksAPI'

class SearchBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    moveShelf: PropTypes.func.isRequired
  }

  state = {
    query: '',
    books: []
  }

  updateQuery = (query) => {
        this.setState({ query: query.trim() })
    }

    clearQuery = () => {
        this.setState({ query: '', books: []})
    }

  searchBooks = (query) => {
        if(!query) {
            this.clearQuery(query)
        } else {
            this.updateQuery(query)

            BooksAPI.search(query, 20).then(books => {
                if(!books.error) {
                    books.map(book => (this.props.books.filter((b) => b.id === book.id).map(b => book.shelf = b.shelf)))
                    this.setState({ books })
                } else {
                    console.log(books.error)
                }
            })
        }
    }

  render() {
    const { moveShelf } = this.props
    const { query, books } = this.state

    let searchBooks

    if (query) {
            const match = new RegExp(escapeRegExp(query), 'i')
            searchBooks = books.filter(book => match.test(book.title))
        } else {
            searchBooks = books
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
              value={query}
              onChange={(event) => this.searchBooks(event.target.value)}
              type="text"
              placeholder="Search by title or author"
            />

          </div>
        </div>

        <div className="search-books-results">

                    <ol className="books-grid">
                        { searchBooks.map((book) => {
                            return (
                              <SearchBook
                                key={book.id}
                                book={book}
                                moveShelf={moveShelf}
                                title={book.title}
                                shelf={book.shelf}
                                authors={book.authors}/>
                            )
                        })
                        }
                    </ol>
                </div>
      </div>
      )
  }
}

SearchBooks.PropTypes = {
  books: PropTypes.array.isRequired,
  moveShelf: PropTypes.func.isRequired
}

export default SearchBooks
