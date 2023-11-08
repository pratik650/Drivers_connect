import React from 'react';
import { View, Text, Image, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import backgroundImage from '../../Images/caronroad.jpg';
const drivemelogo = require('../../Images/Registerlogo.png');

const Register = ({ navigation }) => {
  const navigateToLogin = () => {
    navigation.navigate('Login'); // Use the exact name you defined in your stack navigator
  };
  const navigateTosignup = () => {
    navigation.navigate('DriverRegistration'); // Use the exact name you defined in your stack navigator
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.centeredContainer}>
        <Image source={drivemelogo} style={styles.drivemelogo} resizeMode="contain" />
        <View style={styles.container}>
          <Text style={styles.heading1}>Welcome to {'\n'} DriveMe & let's get</Text>
          <Text style={styles.heading2}>
            Drive me is the best app for your  transportation
            needs. Start now and experience a hassle-free ride.
          </Text>
        </View>
        <View style={styles.groupBtn}>
            <TouchableOpacity style={[styles.buttonMargin] } onPress={navigateToLogin}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.joinButton]} onPress={navigateTosignup}>
              <Text style={styles.buttonText}>Join Now</Text>
            </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
  },
  groupBtn: {
    flexDirection: 'row',
    marginBottom: 40
  },
  centeredContainer: {
    marginTop: 0, // Converted '7rem' to a numeric value
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  drivemelogo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    height: 250,
  },
  container: {
    width: '100%',
    padding: 20,
    borderRadius: 10,
    bottom:10
  },
  heading1: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 60,
  },
  heading2: {
    color: 'white',
    fontSize: 14,
    marginBottom: 150,
    textAlign: 'center',

  },
  buttonMargin: {
    marginLeft: 15,
    backgroundColor: '#9D00FF',
    borderRadius: 30,
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 16,
    height: 35,
   
  },
  joinButton: {
    marginLeft: 80,
    backgroundColor: '#9D00FF',
    borderRadius: 30,
    alignItems: 'center',
    paddingVertical:5,
    paddingHorizontal: 20,
    height: 35,
  
  },
  buttonText: {
    color: 'white',
    fontSize: 17,
  },
});


export default Register;
