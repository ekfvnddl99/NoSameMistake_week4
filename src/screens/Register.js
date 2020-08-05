import { View, Text, StyleSheet, Button } from "react-native";
import React, { Component, useContext } from "react";
import { MenuButton, Logo } from "../components/header/header";
import {connect} from 'react-redux';
import {deleteFood} from '../actions/food'
import {MyContext} from '../../index'
import { UserConsumer } from '../../GlogalContext';

export default class RegisterScreen extends React.Component {
  // static contextType = MyContext;
  // static contextType = Context;
  
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: () => <MenuButton onPress={() => navigation.openDrawer()} />,
      headerTitle: () => <Logo />,
      headerBackTitle: "Home",
      headerLayoutPreset: "center"
    };
  };


  render() {
    return (
      // <UserConsumer>
      //   {
      //     ({value}) =>
      //       <View>
      //           <Text>oneline: { value }</Text>
      //       </View>
      //   }
        
      // </UserConsumer>

      <View>
        <Text> { this.props.navigation.getParam('user', 'undefined') } </Text>
      </View>

    );
  }
}

// const mapStateToProps = (state) => {
//   console.log(state);
//   return {
//     foods: state.foodReducer.foodList
//   }
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     delete: (key) => dispatch(deleteFood(key))
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});