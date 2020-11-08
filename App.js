import React from 'react'
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import LoadingScreen from './Screens/LoadingScreen';
<<<<<<< HEAD
import AstronautSpaceEnthusiastPage from './Screens/AstronautSpaceEnthusiastPage'
=======
>>>>>>> 262bd03bbf28744a8f1e0f042fa0f72db6b7942b
import {createBottomTabNavigator} from 'react-navigation-tabs'
import {Ionicons} from '@expo/vector-icons'
import ViewProfileScreen from './Screens/ViewProfile'
import RegisterScreen from './Screens/RegisterScreen';
import HomeScreen from './Screens/HomeScreen';
import LoginScreen from './Screens/LoginScreen';
<<<<<<< HEAD
import FindChat from './Screens/FindChat'
import ChatScreen from './Screens/ChatScreen';
import AllChatScreens from './Screens/AllChatScreens'
import ProjectMoreInfoScreen from './Screens/ProjectMoreInfo'
import CreatePostScreen from './Screens/CreatePostScreen'
import ProfilePage from './Screens/ProfilePage'


=======
import ChatScreen from './Screens/ChatScreen';
import AllChatScreens from './Screens/AllChatScreens'
import ProjectMoreInfoScreen from './Screens/ProjectMoreInfo'
import LoginScreen2 from './Screens/LoginScreen2'
import * as firebase from 'firebase'
import Professionals from './Screens/Professionals'
import { createDrawerNavigator} from 'react-navigation-drawer'
import CreatePostScreen from './Screens/CreatePostScreen'
import AboutScreen from './Screens/About'
import ProjectsScreen from './Screens/Projects'
import GroupsScreen from './Screens/Groups'
import ProfilePage from './Screens/ProfilePage'
import firebaseKeys from './Config'
import AddLinkScreen from './Screens/AddLink'
>>>>>>> 262bd03bbf28744a8f1e0f042fa0f72db6b7942b
import ReportScreen from './Screens/Report'
import ReportUserScreen from './Screens/ReportUser'
import JoinProjectScreen from './Screens/JoinProject'
import UploadDesignScreen from './Screens/UploadDesign'
import OneProjectScreen from './Screens/OneProjectScreen'
import  CommunicationScreen from './Screens/CommunicationScreen'
import CreateNewProjectScreen from './Screens/CreateNewProjectScreen'
import ForgotPasswordScreen from './Screens/ForgotPassword'
<<<<<<< HEAD

=======
var firebaseConfig = firebaseKeys;
>>>>>>> 262bd03bbf28744a8f1e0f042fa0f72db6b7942b
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
<<<<<<< HEAD
      screen: AstronautSpaceEnthusiastPage,
=======
      screen: ProjectsScreen,
>>>>>>> 262bd03bbf28744a8f1e0f042fa0f72db6b7942b
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
<<<<<<< HEAD
 
=======
    Prof: {
      screen: Professionals,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => <Ionicons
        style = {{alignContent: 'center'}}
        name = "ios-rocket" 
        size = {24} 
        color = {tintColor}/> 
      }
    },
>>>>>>> 262bd03bbf28744a8f1e0f042fa0f72db6b7942b
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
<<<<<<< HEAD
        inactiveTintColor: "#222",
        activeTintColor: "white",
        showLabel: false,
        lazy: false,
        style: {
          backgroundColor: '#3772ff',

=======
        inactiveTintColor: "#F8e9a1",
        activeTintColor: "#F76C6C",
        showLabel: false,
        lazy: false,
        style: {
          backgroundColor: '#24305E',
          height: 48
>>>>>>> 262bd03bbf28744a8f1e0f042fa0f72db6b7942b
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
<<<<<<< HEAD
  FindChat: {
    screen: FindChat,
    navigationOptions: {
      header: () => false
    }
  },
=======
>>>>>>> 262bd03bbf28744a8f1e0f042fa0f72db6b7942b
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
<<<<<<< HEAD
 
  Communicate: {
    screen: CommunicationScreen,
=======
  AddLink: {
    screen: AddLinkScreen,
>>>>>>> 262bd03bbf28744a8f1e0f042fa0f72db6b7942b
    navigationOptions: {
      header: () => false
    }
  },
<<<<<<< HEAD
  MyProfile: {
    screen: ProfilePage,
=======
  Communicate: {
    screen: CommunicationScreen,
>>>>>>> 262bd03bbf28744a8f1e0f042fa0f72db6b7942b
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