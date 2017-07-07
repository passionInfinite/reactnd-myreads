import React from 'react'
import BookSelf from './BookSelf'
import * as API from './BooksAPI'
import ListBooks from './ListBooks'
import './App.css'
import { Route } from 'react-router-dom'

class BooksApp extends React.Component {
    state = {
        books : []
    }

    componentDidMount(){
        API.getAll().then(books => {
            this.setState({
                books: books
            });
        })
    }
    
    updateShelf = (currentBook, event) => {
        let newShelf = event.target.value;
        API.update(currentBook, newShelf).then(() => {
            this.setState((prevState) => {
                prevState.books.filter(book => book.id === currentBook.id).map(book => book.shelf = newShelf);
            });
        })
    };

    addToShelf = (event, book) => {
        let newShelf = event.target.value;
        API.update(book, newShelf).then(() => {
            book.shelf = newShelf;
            this.setState((prevState) => ({
                books: prevState.books.concat(book)
            }));
        })
    }

    isBookOnShelf = (book) => {
        let currentShelf = this.state.books.filter((currentBook) => currentBook.id === book.id).map(book => {return book.shelf});
        if(currentShelf.length !== 0){
            return currentShelf[0];
        }
    }

    render() {
        return (
            <div className="app">
                <Route exact path="/" render={() => (
                    <BookSelf read={this.state.books.filter((book) => book.shelf === 'read')}
                     wantToRead={this.state.books.filter((book) => book.shelf === 'wantToRead')}
                     currentlyReading={this.state.books.filter((book) => book.shelf === 'currentlyReading')} onUpdateShelf={this.updateShelf}/>
                )}/>
                <Route path="/search" render={() => (
                    <ListBooks onAddShelf={this.addToShelf} checkBookState={this.isBookOnShelf} onUpdateShelf={this.updateShelf}/>
                )}/>
            </div>
        )
    }
}

export default BooksApp
