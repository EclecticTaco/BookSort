import React, {Component } from 'react';
import { Button, StyleSheet,Text, View, } from 'react-native';
import BookEntry from './src/components/BookEntry'
import GetBook from './src/components/GetBook'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updated: false,
      books: [],
    }

    this.getBook = this.getBook.bind(this)
  }
   // 978006093019 isbn 13
   // 0060930217 isbn 10

   getBook(params) {
     console.log('fetched')
    return fetch(`https://openlibrary.org/api/books?bibkeys=ISBN:${params}&jscmd=data&format=json`)
    .then((response) => response.json())
    .then((book) => {
      let ISBN = '';
      for (const key in book) {
        ISBN = key
      }
      let temp = [ISBN, book]
      this.setState({
        books:[...this.state.books, temp],
        updated: true,
      })
      // console.log(this.state.books)
    })
    .catch((error) => {
      console.log(error);
    })
  }

  render() {
    const {updated} = this.state
      if (!updated) {
        return (
          <View style={styles.main}>
            <View style={styles.input}>
              <GetBook getBook={this.getBook} />
            </View>
            <View>
              <Text>
                No Books!
              </Text>
            </View>
          </View>
        )
      } else {
        // const book = this.state.books[1]
        // const ISBN = 'ISBN:9780060930219'
        // const cover = JSON.stringify(book[ISBN].cover.large)
        return (
          <View style={styles.main}>
            <GetBook getBook={this.getBook} />
            <View style={styles.main}>
              {this.state.books.map((book) => {
                const ISBN = book[0];
                const bookInfo = book[1];
                const details = bookInfo[ISBN]
                const author = details.authors[0].name;
                const title = details.title
                // const description = bookInfo[ISBN].details.description
                return <BookEntry key={ISBN} author={author} title={title} />
              })}
            </View>
          </View>
        )
      }
  }


}


const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
  },
  input: {
    top: '15%',
  }
})

//bookInfo[ISBN]:

/*  {
  "authors": [
     {
      "name": "Thomas Pynchon",
      "url": "https://openlibrary.org/authors/OL4423376A/Thomas_Pynchon",
    },
  ],
  "cover":  {
    "large": "https://covers.openlibrary.org/b/id/40630-L.jpg",
    "medium": "https://covers.openlibrary.org/b/id/40630-M.jpg",
    "small": "https://covers.openlibrary.org/b/id/40630-S.jpg",
  },
  "ebooks": [
     {
      "availability": "borrow",
      "borrow_url": "https://openlibrary.org/books/OL7284980M/V._(Perennial_Classics)/borrow",
      "checkedout": false,
      "formats":  {},
      "preview_url": "https://archive.org/details/vperennialclassi00thom",
    },
  ],
  "excerpts": [
     {
      "comment": "",
      "first_sentence": true,
      "text": "Christmas Eve, 1955, Benny Profane, wearing black levis, suede jacket, sneakers and big cowboy hat, happened to pass through Norfolk, Virginia.",
    },
     {
      "comment": "",
      "text": "Christmas Eve, 1955, Benny Profane, wearing black levis, suede jacket, sneakers and big cowboy hat, happened to pass through Norfolk, Virginia.",
    },
  ],
  "identifiers":  {
    "goodreads": [
      "410",
    ],
    "isbn_10": [
      "0060930217",
    ],
    "isbn_13": [
      "9780060930219",
    ],
    "librarything": [
      "8883",
    ],
    "openlibrary": [
      "OL7284980M",
    ],
  },
  "key": "/books/OL7284980M",
  "number_of_pages": 533,
  "publish_date": "April 1, 1999",
  "publishers": [
     {
      "name": "Harper Perennial Modern Classics",
    },
  ],
  "title": "V. (Perennial Classics)",
  "url": "https://openlibrary.org/books/OL7284980M/V._(Perennial_Classics)",
} */
