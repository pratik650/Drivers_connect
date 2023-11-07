import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Import images
const homeIcon = require('../../assets/icons/home.png');
const searchIcon = require('../../assets/icons/search.png');
const bellicon = require('../../assets/icons/bell.png');
const profileIcon = require('../../assets/icons/profile.png');


const Footer = () => {
    const navigation = useNavigation();
    const FOOTER_HEIGHT = 50;
 return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.iconWrap} onPress={() => navigation.navigate('Home')}>
          <Image source={homeIcon} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconWrap} onPress={() => navigation.navigate('Searchdriver')}>
          <Image source={searchIcon} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconWrap} onPress={() => navigation.navigate('NotificationsPage')}>
          <Image source={bellicon} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconWrap} onPress={() => navigation.navigate('Profile')}>
          <Image source={profileIcon} style={styles.icon} />
        </TouchableOpacity>
      </View>  
    </SafeAreaView>
 );
};

const styles = StyleSheet.create({
 safeArea: {
    flex: 1,
 },
 footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#E7E7E7',
    paddingVertical: 10,
    paddingHorizontal: 20,
    height: 60,
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
 },
 iconWrap: {
    alignItems: 'center',
    justifyContent: 'center',
 },
 icon: {
    width: 24,
    height: 24
 }
});

export default Footer;