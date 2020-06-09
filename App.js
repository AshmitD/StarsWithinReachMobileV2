import React from 'react'
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import LoadingScreen from './Screens/LoadingScreen';
import {createBottomTabNavigator} from 'react-navigation-tabs'
import {Ionicons} from '@expo/vector-icons'
import RegisterScreen from './Screens/RegisterScreen';
import HomeScreen from './Screens/HomeScreen';
import LoginScreen from './Screens/LoginScreen';
import * as firebase from 'firebase'
import CreatePostScreen from './Screens/CreatePostScreen'
import AboutScreen from './Screens/About'
import ProjectsScreen from './Screens/Projects'
import GroupsScreen from './Screens/Groups'
import ProfilePage from './Screens/ProfilePage'
import firebaseKeys from './Config'
import UploadDesignScreen from './Screens/UploadDesign'
import OneProjectScreen from './Screens/OneProjectScreen'
import CreateNewProjectScreen from './Screens/CreateNewProjectScreen'
var firebaseConfig = firebaseKeys;
// Initialize Firebase
// firebase.initializeApp(firebaseConfig);

const AppTabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => <Ionicons
        style = {{alignContent: 'center'}}
        name = "ios-home" 
        size = {24} 
        color = {tintColor}/> 
      }
    },
    Projects: {
      screen: ProjectsScreen,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => <Ionicons 
        style = {{
          alignContent: 'center',
          shadowColor: "#E9446A",
          shadowOffset: {width: 0, height: 0, shadowRadius: 10, shadowOpacity: 0.3}
        }}
        name = "ios-document" 
        size = {24} 
        color = {tintColor}/> 
      }
    },
    Group: {
      screen: GroupsScreen,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => <Ionicons 
        style = {{
          alignContent: 'center',
          shadowColor: "#E9446A",
          shadowOffset: {width: 0, height: 0, shadowRadius: 10, shadowOpacity: 0.3}
        }}
        name = "ios-people" 
        size = {24} 
        color = {tintColor}/> 
      }
    },
    Profile: {
      screen: ProfilePage,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => <Ionicons 
        style = {{
          alignContent: 'center',
          shadowColor: "#E9446A",
          shadowOffset: {width: 0, height: 0, shadowRadius: 10, shadowOpacity: 0.3}
        }}
        name = "ios-person" 
        size = {24} 
        color = {tintColor}/> 
      } 
    }},
    {
      tabBarOptions: {
        activeTintColor: "#F76C6C",
        inactiveTintColor: "#B8BBC4",
        showLabel: false,
        lazy: false,
      } 
    } 
  );
const AuthStack = createStackNavigator({
  Login: {
    screen: LoginScreen,
  },
  Register: {
    screen: RegisterScreen,
    navigationOptions: {
      header: () => false
    }
  },

})
const OtherStack = createSwitchNavigator({
  CreatePost: {
    screen: CreatePostScreen,
    navigationOptions: {
      header: () => false
    }
  },
  CreateProject: {
    screen: CreateNewProjectScreen,
    navigationOptions: {
      header: () => false
    }
  },
  OneProject: {
    screen: OneProjectScreen,
    navigationOptions: {
      header: () => false
    }
  },
  UploadDesign: {
    screen: UploadDesignScreen,
    navigationOptions: {
      header: () => false
    }
  }
})
export default createAppContainer(
  createSwitchNavigator(
   { Loading: LoadingScreen,
    App: AppTabNavigator,
    Auth: AuthStack,
    Other: OtherStack
   },
   {
     initialRouteName: "Loading"
   }  
  )
)