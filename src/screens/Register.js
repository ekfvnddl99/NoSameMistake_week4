import React, { Component, useContext, createContext } from 'react'
import {Text, View, TextInput, TouchableOpacity, StyleSheet, ToastAndroid, ImageBackground, Dimensions, Image } from 'react-native'
import axios from 'axios';
import Toast from 'react-native-simple-toast';
import { Ionicons } from '@expo/vector-icons'; 
import { MyContext } from '../../index'
import HomeScreen from './HomeScreen';
import { UserConsumer } from '../../GlogalContext';
import DropdownMenu from 'react-native-dropdown-menu';
// import {connect} from 'react-redux';
// import {addFood} from '../actions/food'

//id, password, 성별, 나이대

const MAX_LEN = 15,
  MIN_LEN = 6,
  PASS_LABELS = ["Too Short", "Weak", "Normal", "Strong", "Secure"];
  const { height, width } = Dimensions.get('window');

export default class Register extends Component {
  
  constructor(){
      super();
      this.state = {
      dataku: [],
      id:'',
      password:'',
      age:'',
      text: '',
      gender : [{gender: "남"}, {gender: "여"}],
      check : -1
      };
    }

  //dropdown part

  addText = ({selection, row}) =>{
      if(selection==0) {
        this.setState({text: this.state.field[selection][row]})
      }
  };

  getReg(){//only id check
    Toast.show("%%%%%%%%%%%");
    this.props.navigation.navigate('Login');
    Toast.show("$$$$$$$$$$$$");
    var url = 'http://192.249.19.242:6480/register';
    axios.post(url, {
      id: this.state.id,
      password: this.state.password,
      gender: this.state.text,
      age: this.state.age
    })
    .then(function (response) {
      if(response.data === 'id'){
        ToastAndroid.show('다시 입력해주세용답역', ToastAndroid.LONG);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  };
  handleCheck = (checkedId) => {
    this.setState({checkedId})
  }
    
 
  render() {
     //const [password, setPassword] = useState("");
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

            <View style={styles.between}>
              <TextInput
                placeholder = "Enter your age"
                style={styles.input}
                maxLength={15}
                onChangeText={(age) => this.setState({age})}
                value={this.state.age}
              />
            </View>

            {/* <View style={{flexDirection:'row'}}>
            <Ionicons name="ios-woman" size={24} color="white" style={{marginLeft: 20}}/>
            <Ionicons name="ios-man" size={24} color="black" style={{marginLeft: 20}}/>
            </View>
           */}

            {/* <View style={styles.between3}>
              <DropdownMenu
                bgColor={'#465881'}
                tintColor={'white'}
                activityTintColor={'black'}
                handler={(selection, row) => this.setState({text: this.state.field[selection][row]})}
                data={this.state.field}
                >
              </DropdownMenu>
            </View> */}
            <View style={{flexDirection:'row'}}>
            <View style={styles.between4}>
            <TouchableOpacity
             placeholder = "man"
              style={styles.input}
              testID="SaveAllButton"
              onPress={()=>this.setState({text: '남'})}>
                   <Text style={{color:'white',fontWeight:'bold', marginTop:15}}>Man</Text>
            </TouchableOpacity>
            </View>

            <View style={styles.between4}>
            <TouchableOpacity
            placeholder = "woman"
              style={styles.input}
              testID="SaveAllButton"
              onPress={()=>this.setState({text: '여'})}>
              <Text style={{color:'white',fontWeight:'bold', marginTop:15}}>Woman</Text>
            </TouchableOpacity>

        </View>
        </View>

          </View>


          <View style={{flex: 1,alignItems: 'center',justifyContent: 'center'}}>

            <TouchableOpacity 
            style={styles.btn1}
            onPress={ () => this.getReg(this)}>
            <Image source={require("../assets/bear.png")} style={styles.bear}></Image>
            </TouchableOpacity>

            <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Login')}
          >
          <Text style={{color:"black",fontSize:11,fontWeight:'bold'}}>Go Back</Text>
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
  height:30,
  marginBottom:5,
  justifyContent:"center",
  padding:20
  },
  between4:{
    width:"40%",
  backgroundColor:"#465881",
  borderRadius:25,
  height:30,
  marginBottom:5,
  justifyContent:"center",
  padding:20,  
  alignItems:'center', 
  flexDirection: 'row'
  },
  between2:{
    width:"80%",
  backgroundColor:"#465881",
  borderRadius:25,
  height:30,
  marginTop:60,
  justifyContent:"center",
  padding:20
  },
  between3:{
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