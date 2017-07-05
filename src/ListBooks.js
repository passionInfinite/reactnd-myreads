import React from 'react'
import * as API from './BooksAPI'

class ListBooks extends React.Component{
    state = {
        query: '',
        searchBooks: []
    }

    updateQuery = (event) => {
        let query = event.target.value;
        if (query) {
            API.search(query, 20).then(books => {
                if (books && !books.error) {
                    this.setState({
                        query: query,
                        searchBooks: books
                    })
                }
                if (books.error) {
                    this.setState({
                        query: query,
                        searchBooks: []
                    })
                }
            })
        } else {
            this.setState({
                query: '',
                searchBooks: []
            });
        }
    }

    render(){
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <a className="close-search">Close</a>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" onChange={(event) => {this.updateQuery(event)}}/>
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.state.searchBooks.map((book, index)=> (
                            <li key={index}>
                                <div className="book">
                                    <div className="book-top">
                                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                                        <div className="book-shelf-changer">
                                            <select value={book.shelf} id={book.id} onChange={this.props.onAddShelf.bind(this,book)}>
                                                <option value="none" disabled>Move to...</option>
                                                <option value="currentlyReading">Currently Reading</option>
                                                <option value="wantToRead">Want to Read</option>
                                                <option value="read">Read</option>
                                                <option value="none">None</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="book-title">{book.title}</div>
                                    <div className="book-authors">{book.authors && book.authors.map(name => name+" ")}</div>
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