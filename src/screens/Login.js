import React, { Component, useContext, createContext } from 'react'
import {Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Dimensions, StyleSheet, ToastAndroid, Image, ImageBackground } from 'react-native'
import axios from 'axios';
import Toast from 'react-native-simple-toast';
import { MyContext } from '../../index'
import HomeScreen from './HomeScreen';
import { UserConsumer } from '../../GlogalContext';
import moment from 'moment';
// import {addFood} from '../actions/food'

const MAX_LEN = 15,
  MIN_LEN = 6,
  PASS_LABELS = ["Too Short", "Weak", "Normal", "Strong", "Secure"];
const { height, width } = Dimensions.get('window');

export default class Login extends Component {
  
  constructor(){
      super();
      this.state = {
      dataku: [],
      id:''
      };
    }

  getIn(){//id, password check
      // Toast.show(moment().format("YYYY-MM-DD / HH:mm"));
      var url = 'http://192.249.19.242:6480/login';
      var th = this;
      var id2 = this.state.id;
      var u_age, u_gender;
      axios.post(url, {
        id: this.state.id,
        password: this.state.password
      })
      .then(function (response) {
        
        if(response.data === 'no'){
          ToastAndroid.show('Wrong ID', ToastAndroid.LONG)
        }
        else if(response.data === 'no1'){
          ToastAndroid.show('Wrong PWD', ToastAndroid.LONG)
        }
        else{
          console.log(JSON.stringify(response.data));
          u_age = JSON.parse(JSON.stringify(response.data)).age;
          u_gender = JSON.parse(JSON.stringify(response.data)).gender;
          console.log(u_age + "     " + u_gender);
          th.props.navigation.navigate('HomePage', {user: id2, age: u_age, gender: u_gender});
          // ToastAndroid.show('어서오십시오. 기다리고 있었습니다.', ToastAndroid.LONG)
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    };

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={require("../assets/login.jpg")} style={styles.image}>
        <View style={{justifyContent:'center', alignItems:'center'}}>
        <Image source={require("../assets/bear.png")} style={styles.bear}></Image>
        <View style={{justifyContent:'center', alignItems:'center', flexDirection:'row'}}>
          <Text style={{fontSize: 40, fontWeight:'bold', color:'#fb5b5a'}}>G</Text>
          <Text style={{fontSize: 40, fontWeight:'bold', color:'white'}}>O</Text>
          <Text style={{fontSize: 40, fontWeight:'bold', color:'#fb5b5a'}}>M</Text>
          <Text style={{fontSize: 40, fontWeight:'bold', color:'white'}}>D</Text>
          <Text style={{fontSize: 40, fontWeight:'bold', color:'#fb5b5a'}}>O</Text>
          <Text style={{fontSize: 40, fontWeight:'bold', color:'white'}}>R</Text>
          <Text style={{fontSize: 40, fontWeight:'bold', color:'#fb5b5a'}}>I</Text>
        </View>
        </View>

          <View style={{flex: 1,alignItems: 'center',justifyContent: 'center'}}>
            <View style={styles.between}>
              <TextInput
                placeholder = "Enter your ID"
                style={styles.input}
                maxLength={15}
                onChangeText={(id) => this.setState({id})}
                value={this.state.id}
              />
            </View>


            <View style={styles.between}>
              <TextInput
                placeholder = "Enter your Password"
                style={styles.input}
                maxLength={15}
                secureTextEntry
                onChangeText={(password) => this.setState({password})}
                value={this.state.password}
              />
            </View>
          </View>
          <View style={{flex: 1,alignItems: 'center',justifyContent: 'center'}}>

            <TouchableOpacity 
            style={styles.btn1}
            onPress={ () => this.getIn(this)}>
            <Image source={require("../assets/bear.png")} style={styles.bear}></Image>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Register')}
              >
              <Text style={{color:"black",fontSize:11,fontWeight:'bold'}}>REGISTER</Text>
            </TouchableOpacity>

          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: { flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    },
    input: {
      height:50,
      color:"white"
    },
    bear:{
    width: '45%', 
    height: '45%',
    resizeMode: 'contain',
  },
  image:{
    width, 
    height
  },
    title: {
      flex:2,
      justifyContent: 'center',
      marginLeft:10,
      width:"100%",
      borderBottomWidth:1.5,
      borderColor:'#444'
    },
    between:{
      width:"80%",
    backgroundColor:"#465881",
    borderRadius:25,
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:20
    },
    btn1:{
      width:"40%",
      backgroundColor:"#fb5b5a",
      borderRadius:25,
      height:30,
      alignItems:"center",
      justifyContent:"center",
      marginTop:50,
      marginBottom:10
    },
    btn2:{
      width:"40%",
      backgroundColor:"#fb5b5a",
      borderRadius:25,
      height:30,
      alignItems:"center",
      justifyContent:"center",
      marginTop:0,
      marginBottom:10
    },
});