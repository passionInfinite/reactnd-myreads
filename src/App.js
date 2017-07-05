import React from 'react'
import BookSelf from './BookSelf'
import * as API from './BooksAPI'
import ListBooks from './ListBooks'
import './App.css'

class BooksApp extends React.Component {
    state = {
        books : [],
        showSearchPage: true
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

    addToShelf = (book, event) =>{
        console.log(book);
        let newShelf = event.target.value;
        API.update(book, newShelf).then(() => {
            this.setState((prevState) => {
                prevState.books.concat(book);
            });
        })
    }

    render() {
        return (
            <div className="app">
                {this.state.showSearchPage ? (
                    <ListBooks onAddShelf={this.addToShelf} />
                ) : (
                    <BookSelf read={this.state.books.filter((book) => book.shelf === 'read')} wantToRead={this.state.books.filter((book) => book.shelf === 'wantToRead')} currentlyReading={this.state.books.filter((book) => book.shelf === 'currentlyReading')} onUpdateShelf={this.updateShelf}/>
                )}
            </div>
        )
    }
}

export default BooksApp
