import React, { Component, useContext, createContext } from 'react'
import {Text, View, TextInput, TouchableOpacity, StyleSheet, ToastAndroid } from 'react-native'
import axios from 'axios';
import Toast from 'react-native-simple-toast';
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

  //const [password, setPassword] = useState("");



export default class Register extends Component {
  
  constructor(){
      super();
      this.state = {
      dataku: [],
      id:'',
      text: '',
      field : [["남", "여"]]
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
    
 
  render() {
     //const [password, setPassword] = useState("");
    return (
      <View style={styles.container}>

        <View style={styles.title}><Text style={{fontSize:20}}>Register</Text></View>
        
        <View style={styles.cont}>

          <View style={styles.between}>
            <Text style={{fontSize:20}}>ID</Text>
            <TextInput
              placeholder = "Enter your ID"
              style={styles.input}
              maxLength={15}
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
              onChangeText={password => this.setState({password})}
              value={this.state.password}
            />
          </View>

            <View style={styles.between}>
            <Text style={{fontSize:20}}>gender</Text>

            <View style={{height: 64}}>
            <DropdownMenu
                bgColor={'white'}
                tintColor={'#666666'}
                activityTintColor={'green'}
                handler={(selection, row) => this.setState({text: this.state.field[selection][row]})}
                data={this.state.field}
                >
            </DropdownMenu>
            </View>

            </View>

            <View style={{marginTop: 100}}>
            <Text style={{fontSize:20}}>age</Text>
            <TextInput
              placeholder = "Enter your age"
              style={styles.input}
              maxLength={15}
              onChangeText={(age) => this.setState({age})}
              value={this.state.age}
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
          onPress={() => this.props.navigation.navigate('Login')}
          >
          <Text style={{fontSize:20,color:'white',fontWeight:'bold'}}>
          Go Back
          </Text>
          </TouchableOpacity>
{/* 
          <UserConsumer>
            {
              ({value}) => (
                <View>
                  <Text>{value} is vlaue</Text>
                </View>
              )
            }
          </UserConsumer> */}


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

// const mapStateToProps = (state) => {
//   console.log(state);
//   return {
//     foods: state.foodReducer.foodList
//   }
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     delete: (key) => dispatch(addFood(key))
//   }
// }


// export default connect(mapStateToProps, mapDispatchToProps)(Login);


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
      flex:1,
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
      paddingTop: 20
    },
    between:{
      marginBottom: 20
    }
});