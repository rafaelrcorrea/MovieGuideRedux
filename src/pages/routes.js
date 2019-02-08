import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  createAppContainer,
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation';
import Discover from './Discover';
import Search from './Search';
import MovieDetail from './MovieDetail';

import colors from '../utils/colors';
import metrics from '../utils/metrics';

const styles = StyleSheet.create({
  
  imageIconHeader: {
    height: 40,
    width: 40,
    alignItems: 'center',
    borderRadius: metrics.baseRadiusSuperHeavy,
    alignSelf: "center", 
    marginLeft: "auto", 
    marginRight: "auto",
  },
});

const DiscoverStack = createStackNavigator({
  Discover: {
    screen: Discover,
    navigationOptions: {
      title: 'Discover',
      headerTintColor: colors.black,
      headerStyle: {
        backgroundColor: colors.white,
      }
    }
  },
  MovieDetail: {
    screen: MovieDetail,
    navigationOptions: {
      header: null,
    }
  }
});

const SearchStack = createStackNavigator({
  Search: {
    screen: Search,
    navigationOptions: {
      title: 'Search',
      headerTintColor: colors.black,
      headerStyle: {
        backgroundColor: colors.white,
      }
    }
  },
  MovieDetail: {
    screen: MovieDetail,
    navigationOptions: {
      header: null,
    }
  }
});

const TabNavigator = createBottomTabNavigator({
  Discover: { 
    screen: Discover,  
    navigationOptions: ({ navigation }) => ({
      title: 'Search',
      tabBarVisible: true,
      tabBarIcon: () => <Icon name="globe" size={24} />
    })
  },
  Search: { 
    screen: Search,  
    navigationOptions: ({ navigation }) => ({
      title: 'Search',
      tabBarVisible: true,
      tabBarIcon: () => <Icon name="search" size={24} />
    })
  },
}, {
  initialRouteName: 'Discover',
  tabBarPosition: 'bottom',
  tabBarOptions: {
    showIcon: true,
    showLabel: false,
    labelStyle: {
      margin: 0,
      padding: 2
    },
    activeTintColor: colors.black,
    inactiveTintColor: colors.gray,
    style: {
      backgroundColor: colors.white,
      borderTopColor: 'transparent',
    },
  },
  navigationOptions: {
    headerStyle: {
      backgroundColor: colors.white,
      color: colors.black,
    },
    headerTintColor: colors.black,
  },
});

const MainStack = createStackNavigator({
  Main: {
    screen: TabNavigator,
    navigationOptions: {
      headerTitle: <Image source={require('../assets/icon.png')} style={styles.imageIconHeader} />,
    }
  },
  MovieDetail: {
    screen: MovieDetail,
    navigationOptions: {
      header: null,
    }
  }
});

const Routes = createAppContainer(MainStack);

export default Routes;
