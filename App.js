import React, { useState, Component } from 'react';
import { Button, StyleSheet, Text, View, ActivityIndicator, Image } from 'react-native';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cover: {
    width: 50,
    height: 50,
  }
})


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      error: false,
      books: ['placeholder'],
    }

    this.getBook = this.getBook.bind(this)
  }
  
    

   getBook() {
    return fetch('https://www.googleapis.com/books/v1/volumes?q=isbn:9780060930219')
    .then((response) => response.json())
    .then((json) => {
      const books = this.state.books.concat(json);
      this.setState({books: books, loaded: true})
    })
    .catch((error) => {
      console.log(error);
    })
  }

  render() {
    const book = this.state.books[1]
    const {loaded} = this.state
      if (!loaded) {
        return (
          <View style={styles.main}>
          <Text>
            {this.state.books[0]}
          </Text>
          <Button 
          onPress={this.getBook}
          title="Grab a book!"
          />
        </View>
        )
      } else {
        const cover = JSON.stringify(book.items[0].volumeInfo.imageLinks.thumbnail)
        return (
        <View style={styles.main}>
          <Image
            style = {styles.cover}
            source={{uri:cover}}
          />
          <Button 
          onPress={this.getBook}
          title="Grab a book!"
          />
        </View>
        )
      }
  }


}




  /*  {
    "kind": "books#volume",
    "id": "rPBGPANuXbMC",
    "etag": "CRvPzXHWDsQ",
    "selfLink": "https://www.googleapis.com/books/v1/volumes/rPBGPANuXbMC",
    "volumeInfo": {
     "title": "V.",
     "authors": [
      "Thomas Pynchon"
     ],
     "publisher": "Harper Collins",
     "publishedDate": "1999-03-24",
     "description": "The wild, macabre tale of the twentieth century and of two men -- one looking for something he has lost, the other with nothing much to lose -- and \"V.,\" the unknown woman of the title.",
     "industryIdentifiers": [
      {
       "type": "ISBN_13",
       "identifier": "9780060930219"
      },
      {
       "type": "ISBN_10",
       "identifier": "0060930217"
      }
     ],
     "readingModes": {
      "text": false,
      "image": false
     },
     "pageCount": 560,
     "printType": "BOOK",
     "categories": [
      "Fiction"
     ],
     "averageRating": 4.0,
     "ratingsCount": 10,
     "maturityRating": "NOT_MATURE",
     "allowAnonLogging": false,
     "contentVersion": "preview-1.0.0",
     "imageLinks": {
      "smallThumbnail": "http://books.google.com/books/content?id=rPBGPANuXbMC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
      "thumbnail": "http://books.google.com/books/content?id=rPBGPANuXbMC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
     },
     "language": "en",
     "previewLink": "http://books.google.com/books?id=rPBGPANuXbMC&printsec=frontcover&dq=isbn:9780060930219&hl=&cd=1&source=gbs_api",
     "infoLink": "http://books.google.com/books?id=rPBGPANuXbMC&dq=isbn:9780060930219&hl=&source=gbs_api",
     "canonicalVolumeLink": "https://books.google.com/books/about/V.html?hl=&id=rPBGPANuXbMC"
    },
    "saleInfo": {
     "country": "US",
     "saleability": "NOT_FOR_SALE",
     "isEbook": false
    },
    "accessInfo": {
     "country": "US",
     "viewability": "PARTIAL",
     "embeddable": true,
     "publicDomain": false,
     "textToSpeechPermission": "ALLOWED_FOR_ACCESSIBILITY",
     "epub": {
      "isAvailable": false
     },
     "pdf": {
      "isAvailable": false
     },
     "webReaderLink": "http://play.google.com/books/reader?id=rPBGPANuXbMC&hl=&printsec=frontcover&source=gbs_api",
     "accessViewStatus": "SAMPLE",
     "quoteSharingAllowed": false
    },
    "searchInfo": {
     "textSnippet": "The wild, macabre tale of the twentieth century and of two men -- one looking for something he has lost, the other with nothing much to lose -- and &quot;V.,&quot; the unknown woman of the title."
    }
   } */
