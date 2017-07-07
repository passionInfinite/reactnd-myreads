import React from 'react'
import * as API from './BooksAPI'
import { Link } from 'react-router-dom'

class ListBooks extends React.Component{
    state = {
        query: '',
        searchBooks: [],
        message: 'Search books using title or author in the search bar.'
    }

    updateQuery = (event) => {
        let query = event.target.value;
        if (query) {
            API.search(query, 20).then(books => {
                if (books && !books.error) {
                    this.setState({
                        query: query,
                        searchBooks: books,
                        message: ''
                    })
                }
                if (books.error) {
                    this.setState({
                        query: query,
                        searchBooks: [],
                        message: 'No books found! Try with different keywords'
                    })
                }
            })
        } else {
            this.setState({
                query: '',
                searchBooks: [],
                message: 'Search books using title or author in the search bar.'
            });
        }
    }

    render(){
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" onChange={(event) => {this.updateQuery(event)}}/>
                    </div>
                </div>
                <div className="search-books-results">
                    {this.state.message && ( <h4 style={{textAlign: 'center' }}>{this.state.message}</h4>)}
                    <ol className="books-grid">
                        {this.state.searchBooks.map((book, index)=> (
                            <li key={index}>
                                <div className="book">
                                    <div className="book-top">
                                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                                        <div className="book-shelf-changer">
                                            <select value={book.shelf} id={book.id} onChange={(event) => {this.props.onAddShelf(event,book); this.props.onUpdateShelf(book, event)}}>
                                                <option value="none" disabled>Move to...</option>
                                                <option value="currentlyReading">Currently Reading</option>
                                                <option value="wantToRead">Want to Read</option>
                                                <option value="read">Read</option>
                                                <option value="none">None</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="book-title">{book.title}</div>
                                    <div className="book-authors">{book.authors && book.authors.join(", ")}</div>
                                    {this.props.checkBookState(book) && (<button style={{color:"white", backgroundColor: "#5d9add", border: "1px"}}>{this.props.checkBookState(book)}</button>)}
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        )
    }
}

export default ListBooks