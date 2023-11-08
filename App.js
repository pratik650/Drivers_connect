import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splashscreen from './src/component/Splashscreen.js';
import Register from './src/form/Register.js';
import Login from './src/form/Login.js';
import Home from './src/component/Home.js';
import Driverdetails from './src/component/Driverdetails.js';
import BookingPage from './src/component/Finalbooking.js';
import Profile from './src/component/Profile.js';
import Searchdriver from './src/static_component/Searchpage.js';
import NotificationsPage from './src/component/Notification.js';
import { NotificationProvider } from './src/static_component/NotificationContext.js';
import DriverRegistration from './src/form/DriverRegistration.js';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NotificationProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="DriverRegistration" screenOptions={{
          headerShown: false,
        }}>
          <Stack.Screen name="Splashscreen" component={Splashscreen} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Driverdetails" component={Driverdetails} />
          <Stack.Screen name="Bookingpage" component={BookingPage} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Searchdriver" component={Searchdriver} />
          <Stack.Screen name="NotificationsPage" component={NotificationsPage} />
          <Stack.Screen name="DriverRegistration" component={DriverRegistration} />
        </Stack.Navigator>
      </NavigationContainer>
    </NotificationProvider>
  );
};

export default App;
