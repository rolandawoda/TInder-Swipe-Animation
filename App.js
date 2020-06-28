import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Image,
  Button,
  SafeAreaView
} from 'react-native';
import Deck from './src/Deck';

const DATA = [
  { id: 1, text: 'Card #1', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg' },
  { id: 2, text: 'Card #2', uri: 'http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg' },
  { id: 3, text: 'Card #3', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg' },
  { id: 4, text: 'Card #4', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-01.jpg' },
  { id: 5, text: 'Card #5', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg' },
  { id: 6, text: 'Card #6', uri: 'http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg' },
  { id: 7, text: 'Card #7', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg' },
  { id: 8, text: 'Card #8', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-01.jpg' },
];

export default function App() {
  const renderCards = (item) => {
    return (
        <View style={styles.card}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={{
                uri: item.uri
              }}
              resizeMode="cover"
            />
          </View>
          <Text>{item.text}</Text>
          <Button title="Check out Profile" color="blue"/>
        </View>
    )
  }

  const renderNoMoreCards = (item) => {
    return (
        <View 
          style={[
            styles.card,
            {
              justifyContent: 'center',
              alignItems: 'center',
              height: 200
            }
          ]}
          >
            <Text>No More Cards To Swipe</Text>
          
        </View>
    )
  }
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <Deck 
            data={DATA}
            renderCard={renderCards}
            renderNoMoreCards={renderNoMoreCards}
          />
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  card: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 1,
      height: 1
    },
    shadowRadius: 2,
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: '#fff'
  },
  image: {
    height: '100%'
  },
  imageContainer: {
    height: 200,
    overflow: "hidden",
    borderRadius: 10,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    marginBottom: 20
  }
});
