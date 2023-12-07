import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import Footer from './Footer';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../static_component/usercontext';
import ImagePicker from 'react-native-image-picker';
import { launchImageLibrary } from 'react-native-image-picker';


const homeIcon = require('../../assets/icons/back.png');
const iconselect = require('../../assets/icons/imageupdate.png');
const cabperson2 = require('../../Images/cabperson1.jpg');

const Profile = () => {
    const { user } = useUser();
    const navigation = useNavigation();
    const [profilePic, setProfilePic] = useState(null);
    const [image, setImage] = useState(null);

    const [userData, setUserData] = useState({
        id: '',
        fullName: '',
        address: '',
        phoneNumber: '',
        email: '',
        profileImage: '',
    });


    const selectProfilePicture = () => {
        const options = {
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.assets && response.assets.length > 0) {
                // Accessing the first image's URI from the assets array
                const source = { uri: response.assets[0].uri };
                setProfilePic(source);
            }
        });
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                if (!user.phoneNumber) {
                    console.log('No phone number available');
                    return;
                }
                const response = await fetch(`http://192.168.1.14:5000/api/drivers/profile/${user.phoneNumber}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Profile data fetch failed');
                }

                const data = await response.json();
                console.log(data);
                if (data && data.profile) {
                    setUserData({
                        id: data.profile.id,
                        fullName: data.profile.fullName,
                        address: data.profile.address,
                        phoneNumber: data.profile.phoneNumber,
                        email: data.profile.email,
                        profileImage: data.profile.profilepic
                    });
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [user.phoneNumber]);

    const updateProfileImage = async () => {
        if (!profilePic) {
            alert("Please select an image first.");
            return;
        }
        const formData = new FormData();
        formData.append('image', {
            uri: profilePic.uri,
            type: profilePic.type || 'image/jpeg', // The MIME type of the image, with a fallback default
            name: profilePic.fileName || `profilepic-${Date.now()}.jpg`,
        });
        formData.append('userID', userData.id);
        try {
            const response = await fetch('http://192.168.1.14:5000/api/drivers/updateprofile', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                console.log("Image updated successfully");
            } else {
                console.log("Failed to update image");
                // Handle error response
            }
        } catch (error) {
            console.error("Error while updating image: ", error);
        }
    };
   

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
                <TouchableOpacity onPress={selectProfilePicture}>
                    <Image
                        source={profilePic ? profilePic : (userData.profileImage ? { uri: userData.profileImage } : cabperson2)}
                        style={styles.profileImage}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnimgset} onPress={updateProfileImage}>
                    <Text value={userData.id} style={{ color: 'black', textAlign: 'center', margin: 10 }}>Update Profile</Text>
                </TouchableOpacity>

                <View style={styles.infoContainer}>
                    <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16 }}>Username :</Text>
                    <TextInput
                        placeholder="Full name"
                        value={userData.fullName}
                        style={styles.input}
                        placeholderTextColor='#808080'
                    />
                </View>
                <View style={styles.infoContainer}>
                    <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16 }}>Address :</Text>
                    <TextInput
                        placeholder="Address"
                        value={userData.address}
                        style={styles.input}
                        placeholderTextColor='#808080'
                    />
                </View>
                <View style={styles.infoContainer} key={userData.phoneNumber}>
                    <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16 }}>Phone-Number :</Text>
                    <TextInput
                        placeholder="PhoneNumber"
                        value={userData.phoneNumber}
                        onChangeText={(text) => setUserData({ ...userData, phoneNumber: text })}
                        style={styles.input}
                        placeholderTextColor='#808080'
                    />
                </View>
                <View style={styles.infoContainer}>
                    <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16 }}>Email :</Text>
                    <TextInput
                        placeholder="Gmail Account"
                        value={userData.email}
                        style={styles.input}
                        placeholderTextColor='#808080'
                    />
                </View>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Edit profile</Text>
                </TouchableOpacity>
            </View>
            <Footer style={styles.footer} />
        </View>
    );
};

const styles = StyleSheet.create({
    btnimgset: {
        backgroundColor: 'green',
        borderRadius: 20,
        margin: 10
    },
    headcont: {
        backgroundColor: '#357EC7', // This sets the background color for the header containing the icon and title
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
        color: 'black'
    },
    icon: {
        width: 24,
        height: 24
    },

    container: {
        flex: 1,
    },
    header: {
        backgroundColor: '#357EC7',
        paddingTop: 160, // Adjust this value as needed to position the header content from the top of the screen
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center', // This will vertically align the icon and the title
    },
    profileContainer: {
        alignItems: 'center',
        marginTop: -50, // Adjust as needed to position the profile image over the header
    },
    profileImage: {
        width: 130,
        height: 130,
        borderRadius: 70,
        borderColor: '#FFF',
        borderWidth: 2,
        backgroundColor:'white'
       
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
        marginTop: 60,
        marginBottom: 60
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
    },
});

export default Profile;
