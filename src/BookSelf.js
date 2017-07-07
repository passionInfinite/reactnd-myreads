import React from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'

class BookSelf extends React.Component {
    renderShelf(shelfBooks){
        return (
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {shelfBooks.map((book, index) => (
                        <li key={index}>
                            <Book book={book} onUpdateShelf={this.props.onUpdateShelf} showThumbnails={false}/>
                        </li>
                    ))}
                </ol>
            </div>
        )
    }
    render(){
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Currently Reading</h2>
                            {this.renderShelf(this.props.currentlyReading)}
                        </div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Want to Read</h2>
                            {this.renderShelf(this.props.wantToRead)}
                        </div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Read</h2>
                            {this.renderShelf(this.props.read)}
                        </div>
                    </div>
                </div>
                <div className="open-search">
                    <Link to="/search">Add a book</Link>
                </div>
            </div>
        )
    }
}

export default BookSelf