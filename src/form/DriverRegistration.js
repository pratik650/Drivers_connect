import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, SafeAreaView, TouchableOpacity, Text , ScrollView } from 'react-native';
import Footer from '../component/Footer';


const RadioOption = ({ label, selected, onSelect }) => {
    return (
      <TouchableOpacity style={styles.radioContainer} onPress={onSelect}>
        <View style={selected ? styles.radioSelected : styles.radio} />
        <Text style={styles.radioText}>{label}</Text>
      </TouchableOpacity>
    );
  };


const DriverRegistration = () => {
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [eligible, setEligible] = useState(false);
  const [available, setAvailable] = useState(false);

  const handleSignUp = () => {
    
    console.log('Sign Up', { fullName, address, email, password });
  };

  return (
    
    <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Create your profile</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={fullName}
          placeholderTextColor='black'
          onChangeText={setFullName}
        />
        <TextInput
          style={styles.input}
          placeholder="Address"
          placeholderTextColor='black'
          value={address}
          
          onChangeText={setAddress}
        />
        <TextInput
          style={styles.input}
          placeholder="Email Address"
          placeholderTextColor='black'
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          placeholderTextColor='black'
          onChangeText={setPassword}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Adhaar Id"
          value={password}
          placeholderTextColor='black'
          onChangeText={setPassword}
          secureTextEntry
        />
        <View style={styles.radioGroup}>
          <Text style={{color:'black'}}>Are you legally eligible to drive in your country?</Text>
          <RadioOption label="Yes" selected={eligible} onSelect={() => setEligible(true)} />
          <RadioOption label="No" selected={!eligible} onSelect={() => setEligible(false)} />
        </View>

        {/* Custom Radio Buttons for Availability */}
        <View style={styles.radioGroup}>
          <Text  style={{color:'black'}}>Are you able to provide driving services on 2 days a week?</Text>
          <RadioOption label="Yes" selected={available} onSelect={() => setAvailable(true)} />
          <RadioOption label="No" selected={!available} onSelect={() => setAvailable(false)} />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
    <Footer/>
    </SafeAreaView>
  
   
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1, // Allows the content to expand to fill the space
    paddingBottom: 90, // Keeps a padding at the bottom
  },
  container: {
    flex:1
  },
  header: {
    alignItems: 'center',
    padding: 20,
    backgroundColor:'#893BFF',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black'
  },
  inputContainer: {
    paddingHorizontal: 20,
    marginTop:60,
  },
  input: {
    height: 50,
    marginVertical: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    borderColor: 'grey',
    backgroundColor: 'white',
  },
  button: {
    height: 40,
    backgroundColor: '#6C63FF', // Use your color
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    width: '50%',
    alignSelf: 'center', // This centers the button horizontally
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  radio: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#6C63FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  radioSelected: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#6C63FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    backgroundColor: '#6C63FF',
  }, radioText: {
    color: 'black',
  },
  radioGroup: {
    marginVertical: 10,
  },
  // Add a style for the file upload button if needed, otherwise reuse 'button'
  fileUploadButton: {
    // ... You can customize this style as needed
    height: 40,
    backgroundColor: '#6C63FF',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    width: '50%',
    alignSelf: 'center',
  },
});

export default DriverRegistration;
