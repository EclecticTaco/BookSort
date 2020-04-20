import React, { useState, Component } from 'react';
import { Button, StyleSheet, Text, View, ActivityIndicator, Image } from 'react-native';

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
    return fetch('https://openlibrary.org/api/books?bibkeys=ISBN:9780060930219&jscmd=data&format=json')
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
        const book = this.state.books[1]
        const ISBN = 'ISBN:9780060930219'
        const cover = JSON.stringify(book[ISBN].cover.large)
        console.log(cover)
        return (
        <View style={styles.main}>
          <Image
            style= {styles.cover} 
            source= {{uri: cover}}  
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