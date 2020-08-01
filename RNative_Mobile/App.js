import React, { Component, useState } from 'react'
import {Text, View, TextInput, TouchableOpacity,StyleSheet } from 'react-native'
import axios from 'axios';
import Toast from 'react-native-simple-toast';
import PassMeter from "react-native-passmeter";

const MAX_LEN = 15,
  MIN_LEN = 6,
  PASS_LABELS = ["Too Short", "Weak", "Normal", "Strong", "Secure"];

export default class App extends Component {
  constructor(){
      super();
      this.state = {
      dataku: [],
      };
    }

  getReg(){//only id check
    var url = 'http://192.168.0.14:80/register';
    axios.post(url, {
      id: this.state.id,
      password: this.state.password
    })
    .then(function (response) {
      if(response === 'id'){
        Toast.show('다시 입력해주세용답역')
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  };
    
  getIn(){//id, password check
      var url = 'http://192.168.0.14:80/login';
      axios.post(url, {
        id: this.state.id,
        password: this.state.password
      })
      .then(function (response) {
        if(response.data === 'yes'){
          Toast.show('어서오십시오. 기다리고 있었습니다.')
        }
        else if(response.data === 'id'){
          Toast.show('아이디ㅋ 틀림ㅋ')
        }
        else if(response.data === 'password'){
          Toast.show('비번ㅋ 틀림ㅋ')
        }
      })
      .catch(function (error) {
        console.log(error);
      });
      
      //this.state.id = '';
      //this.state.password = '';
    };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.title}><Text style={{fontSize:50}}>LOG-IN</Text></View>
        <View style={styles.cont}>
          <View style={styles.between}>
            <Text style={{fontSize:20}}>ID</Text>
            <TextInput
              placeholder = "Enter your ID"
              style={styles.input}
              maxLength={15}
              secureTextEntry
              onChangeText={(id) => this.setState({id})}
              value={this.state.id}
            />
          </View>
          <View style={styles.between}>
            <Text style={{fontSize:20}}>Password</Text>
            <TextInput
              placeholder = "Enter your Password"
              style={styles.input}
              maxLength={15}
              secureTextEntry
              onChangeText={(password) => this.setState({password})}
              value={this.state.password}
            />
            <PassMeter
            showLabels
            password={password}
            maxLength={MAX_LEN}
            minLength={MIN_LEN}
            labels={PASS_LABELS}
          />
          </View>
        </View>
        <View style={{flexDirection:'row', justifyContent:'center'}}>
          <TouchableOpacity
          style={{
              backgroundColor:'blue', borderRadius:10,
              flex:1, width:100, height:50, margin:20,
              flexDirection:'row', justifyContent:'center',
              alignItems:'center'
              }}
          onPress={this.getIn.bind(this)}
          >
          <Text style={{fontSize:20,color:'white',fontWeight:'bold'}}>
          LOG-IN
          </Text>
          </TouchableOpacity>
      </View>
      <View style={{flexDirection:'row', justifyContent:'center'}}>
          <TouchableOpacity
          style={{
              backgroundColor:'blue', borderRadius:10,
              flex:1, width:100, height:50, margin:20,
              flexDirection:'row', justifyContent:'center',
              alignItems:'center'
              }}
          onPress={this.getReg.bind(this)}
          >
          <Text style={{fontSize:20,color:'white',fontWeight:'bold'}}>
          REGISTER
          </Text>
          </TouchableOpacity>
      </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center" },
    input: {
      margin: 5,
      padding: 6,
      borderRadius: 8,
      marginBottom: 8,
      paddingHorizontal: 10,
      backgroundColor: "#eceff1"
    },
    title: {
      flex:2,
      justifyContent: 'center',
      marginLeft:10,
      width:"100%",
      borderBottomWidth:1.5,
      borderColor:'#444'
    },
    cont:{
      flex:8,
      justifyContent:'flex-start',
      marginLeft:10,
      marginRight:10,
      paddingTop: 50
    },
    between:{
      marginBottom: 40
    }
});