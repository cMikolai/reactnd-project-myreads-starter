import React from 'react'
import { Route } from 'react-router-dom'
import SearchBooks from './SearchBooks'
import ListBooks from './ListBooks'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: []
  }
  componentDidMount() {
    BooksAPI.getAll().then(data => {
      this.setState({
        books: data
      });
    });
  }

  changeShelf = (book, shelf ) => {
    BooksAPI.update(book, shelf).then(response => {
      this.getBooksOnShelf();
    });
  };

  getBooksOnShelf() {
    BooksAPI.getAll().then(data => {
      this.setState({
        books: data
      });
    });
  }

  searchBooks(book) {
    BooksAPI.search(book).then(book => {
      this.setState(state => ({
        books: state.books.concat([ book ])
      }))
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <ListBooks
            books={this.state.books}
            bookShelf={this.state.books}
          />
          )}/>
          <Route path='/search' render={({ history }) => (
            <SearchBooks
              books={this.state.books}
              bookShelf={this.state.books}
              onSearchBooks={(book) => {
                this.searchBooks(book)
                history.push('/')
              }}
            />
          )}/>
      </div>
    )
  }
}

export default BooksApp
