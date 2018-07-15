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
    this.getBooksOnShelf()
  }

/*  changeShelf = (book, shelf ) => {
    BooksAPI.update(book, shelf).then(response => {
      this.getBooksOnShelf();
    });
  }; */

  getBooksOnShelf = () => {
    BooksAPI.getAll().then(data => {
      this.setState({
        books: data
      });
    });
  }

  moveShelf  = (event, book) => {
      const shelf = event.target.value

      if (this.state.books) {
        BooksAPI.update(book,shelf).then(() => {
          book.shelf = shelf;
          this.setState(state => ({
            books: state.books.filter(b => b.id !== book.id).concat([ book ])
          }))
        })
      }
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <ListBooks
            books={this.state.books}
            bookShelf={this.state.books}
            moveShelf={this.moveShelf}
          />
          )}/>
          <Route path='/search' render={({ history }) => (
            <SearchBooks
              books={this.state.books}
              bookShelf={this.state.books}
              moveShelf={this.moveShelf}
              onSearchBooks={(book) => {
                this.addBook(book)
                history.push('/')
              }}
            />
          )}/>
      </div>
    )
  }
}

export default BooksApp
