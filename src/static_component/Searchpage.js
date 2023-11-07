import React, { useState } from 'react';
import { SafeAreaView, View, TextInput, FlatList, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Footer from '../component/Footer';

const cabperson1 = require('../../Images/cabperson.jpg'); // Ensure these images are available in your project
const cabperson2 = require('../../Images/cabperson1.jpg');
const cabperson3 = require('../../Images/cabperson2.jpg');



const DATA = [
  {
    id: '1',
    name: 'Wade Wagner',
    location: 'Rhode Island',
    image: cabperson1, // replace with actual path
  },
  {
    id: '2',
    name: 'John Wade',
    location: 'Massachusetts',
    image: cabperson2, // replace with actual path
  },
  {
    id: '3',
    name: 'Oldman Wade',
    location: 'Tennessee',
    image: cabperson3, // replace with actual path
  },
];

const Item = ({ name, location, image }) => (
  <View style={styles.item}>
    <Image style={styles.image} source={image} />
    <View style={styles.infoContainer}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.location}>{location}</Text>
    </View>
  </View>
);

const Searchdriver = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(DATA);

  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text) {
      const newData = DATA.filter((item) => {
        const itemData = item.name.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
    } else {
      setFilteredData(DATA);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TextInput
          style={styles.searchBar}
          value={searchQuery}
          onChangeText={handleSearch}
          placeholder="Search Drivers"
          placeholderTextColor='#808080' // white placeholder text for better contrast
          clearButtonMode="always"
        />
        
      </View>
      <FlatList
        data={filteredData}
        renderItem={({ item }) => <Item name={item.name} location={item.location} image={item.image} />}
        keyExtractor={item => item.id}
        ListEmptyComponent={<Text style={styles.noResgult}>No drivers found.</Text>}
      />
      <Footer/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
      },
      header: {
        backgroundColor: '#893BFF', // Header background color
        padding: 30,// Padding at the bottom of the header
      },
      searchBar: {
        padding: 10,
        margin: 10,
        borderRadius: 40,
        borderWidth: 1,
        backgroundColor: 'white', 
        marginTop:100,
        marginBottom:30,
      },
    item: {
      flexDirection: 'row',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
      backgroundColor: 'white', // Item background
      borderWidth: 1,
      borderColor: 'black', // Border color for each item
      borderRadius: 10, // Rounded corners for the item cards
      alignItems: 'center',
    },
    image: {
      width: 50,
      height: 50,
      borderRadius: 25,
      borderWidth: 1,
      borderColor: 'black', // Border color for images
    },
    infoContainer: {
      marginLeft: 10,
    },
    name: {
      fontSize: 18,
      color: 'black', // Name text color
    },
    location: {
      fontSize: 14,
      color: 'grey', // Location text color
    },
    noResult: {
      alignSelf: 'center',
      marginTop: 20,
      fontSize: 18,
      color: 'black', // No results text color
    },
  });
  

export default Searchdriver;
