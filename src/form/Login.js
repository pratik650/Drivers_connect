import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Image, Alert } from 'react-native';
import backgroundImage from '../../Images/keyimage.jpg';
import drivemelogo from '../../Images/Registerlogo.png';

const Login = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigateToLogin = async () => {
    if (username.trim() === '' || password.trim() === '') {
      Alert.alert('Missing Information', 'Please enter both mobile number and password.');
      return;
    }

    const loginData = {
      phoneNumber: username.trim(), // Assuming that 'username' is actually the phone number
      password: password.trim(),
    };

    try {
      const response = await fetch('http://192.168.29.129:5000/api/drivers/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const json = await response.json();
        console.log('Login successful:', json);
        const userName = json.userName || 'User'; // Default to 'User' if fullName is not available

        Alert.alert("Welcome", userName);
        
        navigation.navigate('Home');
      } else {
        // If response is not ok, you might still want to parse it as json if the server sent a json error response
        const json = await response.json();
        console.log('Login failed response:', json);
        Alert.alert('Login Failed', json.message || 'An error occurred. Please try again.');
      }
    } catch (error) {
      // Handle network errors
      Alert.alert('Network Error', 'Unable to connect to the server. Please check your internet connection and try again.');
      console.error('Login request error:', error);
    }
  };



  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.centeredContainer}>
        <Image source={drivemelogo} style={styles.drivemelogo} />
        <View style={styles.container}>
          <Text style={styles.heading}>Mobile</Text>
          <TextInput
            placeholder="Enter your mobile number"
            placeholderTextColor='#A9A9A9'
            value={username}
            onChangeText={setUsername}
            style={styles.input}
          />
          <Text style={styles.heading}>Password</Text>
          <TextInput
            placeholder="Enter your password"
            value={password}
            placeholderTextColor='#A9A9A9'
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
          />
          <Text style={styles.forgotPassword}>Forget Password?</Text>
          <TouchableOpacity style={styles.button} onPress={navigateToLogin}>
            <Text style={styles.buttonText}>Login</Text>
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
  centeredContainer: {
    marginTop: 30, // Adjusted from '10rem' to a numeric value
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  drivemelogo: {
    marginBottom: 100,
    flex: 1,
    width: '100%',
    resizeMode: 'contain', // Ensure the logo fits well
  },
  container: {
    width: '100%',
    padding: 20,
    borderRadius: 10,
    marginBottom: 50
  },
  input: {
    width: '100%',
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    color: 'black',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    fontSize: 16, // Adjusted from '12px' to a numeric value
  },
  heading: {
    color: 'white',
    marginBottom: 5,
  },
  forgotPassword: {
    textAlign: 'right',
    color: 'white',
    fontSize: 16, // Adjusted from '10px' to a numeric value
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#6A0DAD',
    borderRadius: 20,
    alignItems: 'center',
    padding: 8,
  },
  buttonText: {
    color: 'white',
  },
});

export default Login;
