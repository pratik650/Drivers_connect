import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Make sure to install the react-native-vector-icons package
import Footer from './Footer';
const homeIcon = require('../../assets/icons/back.png');
import { useNavigation } from '@react-navigation/native';
const cabperson2 = require('../../Images/cabperson1.jpg');

const Profile = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <View style={styles.headcont}>
                <TouchableOpacity style={styles.iconWrap} onPress={() => navigation.navigate('Home')}>
                    <Image source={homeIcon} style={styles.icon} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Profile</Text>
            </View>
            <View style={styles.header}>
            </View>
            <View style={styles.profileContainer}>
                <Image
                    source={cabperson2} // Replace with your image path
                    style={styles.profileImage}
                />
                <View style={styles.infoContainer}>
                   
                    <TextInput
                        placeholder="Full name"
                        style={styles.input}
                        placeholderTextColor= '#808080'
                    />
                </View>
                <View style={styles.infoContainer}>
                    
                    <TextInput
                        placeholder="Birthday"
                        style={styles.input}
                        placeholderTextColor= '#808080'
                    />
                </View>
                <View style={styles.infoContainer}>
                    
                    <TextInput
                        placeholder="Contact No"
                        style={styles.input}
                        placeholderTextColor= '#808080'
                    />
                </View>
                <View style={styles.infoContainer}>
                   
                    <TextInput
                        placeholder="Gmail Account"
                        style={styles.input}
                        placeholderTextColor= '#808080'
                    />
                </View>
                <View style={styles.infoContainer}>
                   
                    <TextInput
                        placeholder="Log Put"
                        style={styles.input}
                        placeholderTextColor= '#808080'
                    />
                </View>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Edit profile</Text>
                </TouchableOpacity>
            </View>
            <Footer />
        </View>
    );
};

const styles = StyleSheet.create({
    headcont:{
        backgroundColor: '#893BFF', // This sets the background color for the header containing the icon and title
        flexDirection: 'row', // Ensures the items are in a row
        alignItems: 'center', // Centers items vertically
        justifyContent: 'flex-start', // Aligns items to the start of the row
        paddingHorizontal: 10, // Add horizontal padding if needed
        paddingTop: 30, // Adjust the top padding to fit your design
    },
    headerTitle: {
        position: 'relative',
        color: '#FFF',
        fontSize: 24,
        marginLeft: 30,
        marginTop: 0,
        fontWeight: 'bold'
      },
    input: {
        marginLeft: 10,
        flex: 1, // Take up all available space
        padding: 0, // Depending on your design you might want to adjust this
        fontSize: 16, // Set the font size as needed
        color:'black'
    },
    icon: {
        width: 24,
        height: 24
    },
  
    container: {
        flex: 1,
    },
    header: {
        backgroundColor: '#893BFF',
        paddingTop: 180, // Adjust this value as needed to position the header content from the top of the screen
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center', // This will vertically align the icon and the title
      },
    profileContainer: {
        alignItems: 'center',
        marginTop: -50, // Adjust as needed to position the profile image over the header
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderColor: '#FFF',
        borderWidth: 2,
        backgroundColor: '#C4C4C4', // Placeholder color
    },
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        padding: 10,
        marginTop: 10,
        width: '90%', // Adjust as needed
    },
    infoText: {
        color: 'black',
        marginLeft: 10,
    },
    button: {
        backgroundColor: '#6C63FF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 25,
        marginTop: 20,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
    },
});

export default Profile;
