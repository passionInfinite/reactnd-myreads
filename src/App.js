import React from 'react'
import BookSelf from './BookSelf'
import * as API from './BooksAPI'
import './App.css'

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

    render() {
        return (
            <div className="app">
                {this.state.showSearchPage ? (
                    <div className="search-books">
                        <div className="search-books-bar">
                            <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
                            <div className="search-books-input-wrapper">
                                <input type="text" placeholder="Search by title or author"/>
                            </div>
                        </div>
                        <div className="search-books-results">
                            <ol className="books-grid"></ol>
                        </div>
                    </div>
                ) : (
                    <BookSelf read={this.state.books.filter((book) => book.shelf === 'read')} wantToRead={this.state.books.filter((book) => book.shelf === 'wantToRead')} currentlyReading={this.state.books.filter((book) => book.shelf === 'currentlyReading')} onUpdateShelf={this.updateShelf}/>
                )}
            </div>
        )
    }
}

export default BooksApp
