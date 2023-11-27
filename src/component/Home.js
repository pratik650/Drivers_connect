import React, { useState, useEffect } from 'react';
import {
  ScrollView, View, Text, TextInput,FlatList,  TouchableOpacity, Image, StyleSheet, KeyboardAvoidingView, Keyboard,
  Platform,
} from 'react-native';
import Footer from './Footer';
const dropdownIcon = require('../../assets/icons/dopdown.png');
const cabperson1 = require('../../Images/cabperson.jpg'); // Ensure these images are available in your project
const cabperson2 = require('../../Images/cabperson1.jpg');
const cabperson3 = require('../../Images/cabperson2.jpg');
const tickmark = require('../../Images/cabperson2.jpg');

const statesOfIndia = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar",
  "Chhattisgarh", "Goa", "Gujarat", "Haryana",
];

const DATA = [
  {
    id: '1',
    name: 'Wade Wagner',
    location: 'Rhode Island',
    image: cabperson1,
  },
  {
    id: '2',
    name: 'John Wade',
    location: 'Massachusetts',
    image: cabperson2,
  },
  {
    id: '3',
    name: 'Oldman Wade',
    location: 'Tennessee',
    image: cabperson3,
  },
  {
    id: '4',
    name: 'John Wade',
    location: 'Massachusetts',
    image: cabperson2,
  },
  {
    id: '5',
    name: 'Oldman Wade',
    location: 'Tennessee',
    image: cabperson3,
  },
  {
    id: '6',
    name: 'Oldman Wade',
    location: 'Tennessee',
    image: cabperson3,
  },
  {
    id: '7',
    name: 'Oldman Wade',
    location: 'Tennessee',
    image: cabperson3,
  },
  {
    id: '8',
    name: 'Oldman Wade',
    location: 'Tennessee',
    image: cabperson3,
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

const Home = ({ navigation }) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Drop users on their destination with us!</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Choose your current location"
            placeholderTextColor="#787878"
          />
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => setIsDropdownVisible(!isDropdownVisible)}
          >
            <Image source={dropdownIcon} style={styles.icon} />
          </TouchableOpacity>
        </View>
        {isDropdownVisible && (
          <View style={styles.dropdown}>
            {statesOfIndia.map((state, index) => (
              <Text key={index} style={styles.dropdownText}>{state}</Text>
            ))}
          </View>
        )}
      </View>
      
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.contentContainer}
      >
        <View style={styles.listContainer}>
          <Text style={styles.listTitle}>
            Users requested for drive
          </Text>
          <View style={styles.driversList}>
          <FlatList
            data={DATA}
            renderItem={({ item }) => <Item name={item.name} location={item.location} image={item.image} />}
            keyExtractor={item => item.id}
            ListEmptyComponent={<Text style={styles.noResult}>No drivers found.</Text>}
          />
          </View>
        </View>
      </KeyboardAvoidingView>

      <Footer navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 40,
    backgroundColor: '#357EC7',
    // Removed the height percentage to avoid shrinking
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 21,
    color: '#fff',
    textAlign: 'center',
    marginTop: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    marginTop: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 25,
    backgroundColor: '#FFF',
    paddingHorizontal: 15,
    height: 50,
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    color: '#000',
  },
  iconButton: {
    padding: 10,
  },
  icon: {
    width: 24,
    height: 24,
  },
  dropdown: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    marginTop: 10,
    maxHeight: 150,
  },
  dropdownText: {
    padding: 10,
    textAlign: 'center',
  },
  contentContainer: {
    flex: 1, // This ensures that the content uses the available space
  },
  listContainer: {
    paddingHorizontal: 20,
    flex: 1, 
  },
  driversList: {
    width: '100%',
    alignSelf: 'center',
    flexGrow: 1,
  },
  listTitle: {
    fontSize: 21,
    fontWeight: "bold",
    color: '#000',
    marginTop: 35,
    marginBottom: 45,
  },
  item: {
    flexDirection: 'row',
    padding: 10, // Adjust padding if necessary
    marginVertical: 5, // Adjust margin if necessary
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 10,
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  infoContainer: {
    marginLeft: 10,
  },
  name: {
    fontSize: 18,
    color: '#000',
  },
  location: {
    fontSize: 14,
    color: '#888',
  },
  noResult: {
    alignSelf: 'center',
    marginTop: 20,
    fontSize: 18,
    color: '#000',
  },
});

export default Home;
