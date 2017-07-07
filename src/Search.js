import React from 'react'
import * as API from './BooksAPI'
import { Link } from 'react-router-dom'
import Book from './Book'

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
                                <Book book={book}  onAddShelf={this.props.onAddShelf} checkBookState={this.props.checkBookState} onUpdateShelf={this.props.onUpdateShelf} showThumbnails={true}/>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        )
    }
}

export default ListBooks