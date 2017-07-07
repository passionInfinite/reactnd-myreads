import React from 'react'

class Book extends React.Component {
    
    render(){
        let book = this.props.book
        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                    <div className="book-shelf-changer">
                        <select value={book.shelf} id={book.id} onChange={(event) => {this.props.onUpdateShelf(book, event)}}>
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
                { this.props.showThumbnails && this.props.checkBookState(book) && (<button style={{color:"white", backgroundColor: "#5d9add", border: "1px"}}>{this.props.checkBookState(book)}</button>)}
            </div>
        )
    }
}

export default Book