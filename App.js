import React, { useState, Component } from 'react';
import { Button, StyleSheet, Text, View, ActivityIndicator, Image } from 'react-native';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updated: false,
      error: false,
      books: [],
    }

    this.getBook = this.getBook.bind(this)
  }
   

   getBook() {
    return fetch('https://openlibrary.org/api/books?bibkeys=ISBN:9780060930219&jscmd=data&format=json')
    .then((response) => response.json())
    .then((book) => {
      let fullISBN = '';
      for (const key in book) {
        fullISBN = key
      }
      let partISBN = fullISBN.split(':');
      let ISBN = partISBN[1]
      let temp = [ISBN, book]
      // let updatedBooks = this.state.books.concat(temp)
      // this.setState({books: updatedBooks, updated: true})
      this.setState({
        books:[...this.state.books, temp],
        updated: true,
      })
      console.log(this.state.books)
      // this.setState({books: books, loaded: true})
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
          <Text>
            No Books!
          </Text>
          <Button 
          onPress={this.getBook}
          title="Grab a book!"
          />
        </View>
        )
      } else {
        // const book = this.state.books[1]
        // const ISBN = 'ISBN:9780060930219'
        // const cover = JSON.stringify(book[ISBN].cover.large)
        return (
        <View style={styles.main}>
          <Text>
            Books Present!
          </Text>
          <Button 
          onPress={this.getBook}
          title="Grab a book!"
          />
        </View>
        )
      }
  }


}


const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cover: {
    width: 50,
    height: 50,
  },
  second: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
  }
})