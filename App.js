import React from 'react'
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import LoadingScreen from './Screens/LoadingScreen';
import {createBottomTabNavigator} from 'react-navigation-tabs'
import {Ionicons} from '@expo/vector-icons'
import ViewProfileScreen from './Screens/ViewProfile'
import RegisterScreen from './Screens/RegisterScreen';
import HomeScreen from './Screens/HomeScreen';
import LoginScreen from './Screens/LoginScreen';
import ChatScreen from './Screens/ChatScreen';
import AllChatScreens from './Screens/AllChatScreens'
import ProjectMoreInfoScreen from './Screens/ProjectMoreInfo'
import LoginScreen2 from './Screens/LoginScreen2'
import * as firebase from 'firebase'

import { createDrawerNavigator} from 'react-navigation-drawer'
import CreatePostScreen from './Screens/CreatePostScreen'
import AboutScreen from './Screens/About'
import ProjectsScreen from './Screens/Projects'
import GroupsScreen from './Screens/Groups'
import ProfilePage from './Screens/ProfilePage'
import firebaseKeys from './Config'
import AddLinkScreen from './Screens/AddLink'
import ReportScreen from './Screens/Report'
import ReportUserScreen from './Screens/ReportUser'
import JoinProjectScreen from './Screens/JoinProject'
import UploadDesignScreen from './Screens/UploadDesign'
import OneProjectScreen from './Screens/OneProjectScreen'
import  CommunicationScreen from './Screens/CommunicationScreen'
import CreateNewProjectScreen from './Screens/CreateNewProjectScreen'
import ForgotPasswordScreen from './Screens/ForgotPassword'
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
        header: () => false,
        tabBarIcon: ({tintColor}) => <Ionicons 
        style = {{
          alignContent: 'center',
          shadowColor: "#E9446A",
          shadowOffset: {width: 0, height: 0, shadowRadius: 10, shadowOpacity: 0.3}
        }}
        name = "ios-document" 
        size = {24} 
        color = {tintColor}/>,
  
      }
    },
    Chat: {
      screen: AllChatScreens,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => <Ionicons
        style = {{alignContent: 'center'}}
        name = "ios-chatboxes" 
        size = {24} 
        color = {tintColor}/> 
      }
    },
    // Group: {
    //   screen: GroupsScreen,
    //   navigationOptions: {
    //     tabBarIcon: ({tintColor}) => <Ionicons 
    //     style = {{
    //       alignContent: 'center',
    //       shadowColor: "#E9446A",
    //       shadowOffset: {width: 0, height: 0, shadowRadius: 10, shadowOpacity: 0.3}
    //     }}
    //     name = "ios-people" 
    //     size = {24} 
    //     color = {tintColor}/> 
    //   }
    // },
    // Profile: {
    //   screen: ProfilePage,
    //   navigationOptions: {
        
    //     tabBarIcon: ({tintColor}) => <Ionicons 
    //     style = {{
    //       alignContent: 'center',
    //       shadowColor: "#E9446A",
    //       shadowOffset: {width: 0, height: 0, shadowRadius: 10, shadowOpacity: 0.3}
    //     }}
    //     name = "ios-person" 
    //     size = {24} 
    //     color = {tintColor}/> 
    //   } 
    },
    {
      tabBarOptions: {
        inactiveTintColor: "#F8e9a1",
        activeTintColor: "#F76C6C",
        showLabel: false,
        lazy: false,
        style: {
          backgroundColor: '#24305E',
          height: 48
        }
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
  Forgot: {
    screen: ForgotPasswordScreen,
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
  ProjectMoreInfo: {
    screen: ProjectMoreInfoScreen,
    navigationOptions: {
      header: () => false
    }
  },
  ViewProfile: {
    screen: ViewProfileScreen,
    navigationOptions: {
      header: () => false
    }
  },
  ChatScreen: {
    screen: ChatScreen,
    navigationOptions: {
      header: () => false
    }
  },
  Report: {
    screen: ReportScreen,
    navigationOptions: {
      header: () => false
    }
  },
  ReportUser: {
    screen: ReportUserScreen,
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
  
  JoinProject: {
    screen: JoinProjectScreen,
    navigationOptions: {
      header: () => false
    }
  },
  UploadDesign: {
    screen: UploadDesignScreen,
    navigationOptions: {
      header: () => false
    }
  },
  AddLink: {
    screen: AddLinkScreen,
    navigationOptions: {
      header: () => false
    }
  },
  Communicate: {
    screen: CommunicationScreen,
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
    Other: OtherStack,

   },
   {
     initialRouteName: "Loading"
   }  
  )
)