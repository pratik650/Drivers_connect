import React, { useState, useEffect } from 'react';
import {
  ScrollView, View, Text, TextInput, TouchableOpacity, Image, StyleSheet, KeyboardAvoidingView, Keyboard,
  Platform,
} from 'react-native';
import Footer from './Footer';
import PaymentSection from '../static_component/Payments';
const dropdownIcon = require('../../assets/icons/dopdown.png');



const statesOfIndia = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar",
  "Chhattisgarh", "Goa", "Gujarat", "Haryana",
  //... add other states
];

const cabperson1 = require('../../Images/cabperson.jpg'); // Ensure these images are available in your project
const cabperson2 = require('../../Images/cabperson1.jpg');
const cabperson3 = require('../../Images/cabperson2.jpg');

const Home = ({ navigation }) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const navigate_details_of_driver = (driverDetails) => {
    navigation.navigate('Driverdetails', { driverDetails });
  };

  //for avoiding screen to grow with keyboard

  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardWillShowListener = Keyboard.addListener(
      'keyboardWillShow',
      () => setKeyboardVisible(true)
    );
    const keyboardWillHideListener = Keyboard.addListener(
      'keyboardWillHide',
      () => setKeyboardVisible(false)
    );

    return () => {
      keyboardWillShowListener.remove();
      keyboardWillHideListener.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <View style={styles.mainContainer}>
        {/* Header Section */}
        <View style={styles.header}>

          <Text style={{ marginTop: 40, position: 'absolute', fontWeight: 'bold', fontSize: 24, color: '#ffff' }}>
            Book a driver now
          </Text>

          {/* Input */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Enter pickup location"
              placeholderTextColor="#787878"
            />
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => setIsDropdownVisible(!isDropdownVisible)}
            >
              <TouchableOpacity style={styles.iconWrap}>
                <Image source={dropdownIcon} style={styles.icon} />
              </TouchableOpacity>
            </TouchableOpacity>
          </View>

          {/* Dropdown for States of India */}
          {isDropdownVisible && (
            <View style={styles.dropdown}>
              {statesOfIndia.map((state, index) => (
                <Text key={index}>{state}</Text>
              ))}
            </View>
          )}
        </View>

        {/* Drivers List */}
        <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
          <Text style={{ fontSize: 24, fontWeight: "bold", color: '#000000', marginBottom: 15 }}>
            Drivers near you
          </Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.driversListContainer}
          contentContainerStyle={styles.driversListContent}
        >
          {/* Driver 1 */}
          <View style={styles.driverContainer}>
            <TouchableOpacity onPress={() => navigate_details_of_driver({ name: "Ramesh Pawar", time: "5 minutes away", image: cabperson1 })}>
              <Image
                source={cabperson1}
                style={styles.driverImage}
              />
            </TouchableOpacity>
            <Text style={styles.text}>Ramesh Pawar</Text>
            <Text style={styles.text}>5 minutes away</Text>
          </View>

          {/* Driver 2 */}
          <View style={styles.driverContainer}>
            <TouchableOpacity onPress={() => navigate_details_of_driver({ name: "Prakash Sisodiya", time: "10 minutes away", image: cabperson2 })}>
              <Image
                source={cabperson2}
                style={styles.driverImage}
              />
            </TouchableOpacity>
            <Text style={styles.text}>Prakash Sisodiya</Text>
            <Text style={styles.text}>10 minutes away</Text>
          </View>

          {/* Driver 3 */}
          <View style={styles.driverContainer}>
            <TouchableOpacity onPress={() => navigate_details_of_driver({ name: "Naveen Kumar", time: "2 minutes away", image: cabperson3 })}>
              <Image
                source={cabperson3}
                style={styles.driverImage}
              />
            </TouchableOpacity>
            <Text style={styles.text}>Naveen Kumar</Text>
            <Text style={styles.text}>2 minutes away</Text>
          </View>
          {/* Add more drivers here as needed */}
        </ScrollView>

        {!keyboardVisible && <PaymentSection />}
        {!keyboardVisible && <Footer navigation={navigation} />}
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 20,
    height: 20,
    padding: 10
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#ffff'
  },
  header: {
    padding: 50,
    alignItems: "center",
    color: '#000000',
    backgroundColor: '#893BFF',

  },
  inputContainer: {
    flexDirection: 'row',
    marginTop: 90,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 25,
    backgroundColor: '#FFF',
    width: '100%',
    height: 50
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 15,
    height: 50,
    color: 'black'
  },
  iconButton: {
    width: 40,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdown: {
    width: '100%',
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    marginTop: 10,
    paddingHorizontal: 15,
    maxHeight: 150, // Specify the max height for the dropdown
  },
  driversListContainer: {
    height: 20,
  },
  driversListContent: {
    paddingHorizontal: 20,
  },
  driverContainer: {
    alignItems: "center",
    marginRight: 15, // Add spacing between the items
  },
  driverImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 5, // Add spacing between the image and text
  },
  text: {
    color: '#000000',
    textAlign: 'center', // Ensure text is centered under the image
  },
});

export default Home;
