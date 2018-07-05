import React from 'react'
import { Route } from 'react-router-dom'
import SearchBooks from './SearchBooks'
import ListBooks from './ListBooks'
// import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <ListBooks
            onDeleteContact={this.removeContact}
            contacts={this.state.contacts}
          />
          )}/>
          <Route path='/search' render={({ history }) => (
            <SearchBooks
              onCreateContact={(contact) => {
                this.searchBooks(contact)
                history.push('/')
              }}
            />
          )}/>
      </div>
    )
  }
}

export default BooksApp
