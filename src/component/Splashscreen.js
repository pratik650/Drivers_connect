import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, Image, Text } from 'react-native';
const drivemelogo = require('../../Images/frontlogo.png');

const Splashscreen = ({navigation}) => {
  console.log("yesss"); // Correct placement for console.log

  useEffect(()=>{
    setTimeout(() => {
      navigation.navigate('Register');
    }, 4000);
  })

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Image source={drivemelogo} style={styles.image} resizeMode="contain"/>
        <Text style={styles.text}>
          Drive safe with us!
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9D00FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {  
    width: 250, // Set a specific width for the logo
    height: 250, // Set a specific height for the logo
    marginBottom: 30, // Maintain the space between the image and the text
    resizeMode: 'contain', // This ensures the logo scales within the given width and height without distortion
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    bottom:'400',
    fontSize: 26, 
    marginBottom: 200,
  }
});


export default Splashscreen;