import {
  Platform,
  Alert,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Button,
  Image
} from 'react-native';
import React, { Component } from "react";
import { MenuButton, Logo } from "../components/header/header";
import {Agenda} from 'react-native-calendars';
import _ from 'lodash';
import { FloatingAction } from 'react-native-floating-action';
import axios from 'axios'
import moment from 'moment'
import Modal from 'react-native-modal';
import { Dropdown } from 'react-native-material-dropdown';
import TextField from 'react-native-md-textinput';
import Toast from 'react-native-simple-toast';


const testIDs = require('../testIDs');

const today = new Date().toISOString().split('T')[0];
const fastDate = getPastDate(3);
const futureDates = getFutureDates(9);
const dates = [fastDate, today].concat(futureDates);
const themeColor = '#00AAAF';
const lightThemeColor = '#EBF9F9';
var mistake;
var thiscal_schedule_time = "";
var thiscal_name = "";
var thiscal_category = "";
  

//floating button을 누르면 글을 쓸 수 있게 하기
const actions = [
  {
  text: 'add mistake',
  name: 'bt_mistake',
  position: 2,
  color:'#3C1278'
}, 
{
  text: 'add schedule',
  name: 'bt_add',
  position: 1,
  color:'#3C1278'
},
];

var id, u_age, u_gender;
function getFutureDates(days) {
  const array = [];
  for (let index = 1; index <= days; index++) {
    const date = new Date(Date.now() + (864e5 * index)); // 864e5 == 86400000 == 24*60*60*1000
    const dateString = date.toISOString().split('T')[0];
    array.push(dateString);
  }
  return array;
}

function getPastDate(days) {
  return new Date(Date.now() - (864e5 * days)).toISOString().split('T')[0];
}

export default class ProfileScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerVisible: false,
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      items: {},
      category: "",
      isModalVisible: false,
      field: [{value:"Relationship"}, {value:"Workplace"}, {value:"ToMySelf"}],
      modal2: false
    };
    this.missAdd = this.missAdd.bind(this);
    this.addMiss = this.addMiss.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.toggleModal2 = this.toggleModal2.bind(this);
  }

  missAdd = () => {//db
    this.toggleModal();
    this.addMiss();
    Toast.show('추가되었습니다.')
  };

  toggleModal = () => {
  var bool = this.state.isModalVisible;
  this.setState({isModalVisible: !bool});
  };

  toggleModal2 = () => {
    var bool = this.state.modal2;
    this.setState({modal2: !bool});
    };

  addMiss = () => {//only id check
    axios.post('http://192.249.19.242:6480/addMiss', {
        id: id,
        age: u_age,
        gender: u_gender,
        category: this.category,
        label: mistake
    })
    .then(function (response) {
        
    })
    .catch(function (error) {
        console.log(error);
    });
  };

  Separator = () => (
    <View style={styles.separator} />
    );



  render() {
    id = this.props.navigation.dangerouslyGetParent().dangerouslyGetParent().getParam('user', 'undefined');
    u_age = this.props.navigation.dangerouslyGetParent().dangerouslyGetParent().getParam('age', 'undefined');
    u_gender = this.props.navigation.dangerouslyGetParent().dangerouslyGetParent().getParam('gender', 'undefined');

    return (
      <View style={styles.floatingbutton}>
        <Image
      source={require("../assets/back.png")}
      style={{position:'absolute',
      left:0, 
      right:0, 
      top:0,
      bottom:0}} />
      <Agenda
        style={{marginTop: 10}}
        testID={testIDs.agenda.CONTAINER}
        items={this.state.items}
        loadItemsForMonth={this.loadItems.bind(this)}
        selected={moment().format("YYYY-MM-DD")}
        renderItem={this.renderItem.bind(this)}
        // renderEmptyDate={() => {return (
        // <View style={styles.emptyDate}>
        //   <Text>emptydate</Text>
        // </View>);}}
        // renderEmptyData = {() => {return (
        //   <View style={{
        //     backgroundColor: 'white',
        //     flex: 1,
        //     borderRadius: 5,
        //     padding: 10,
        //     marginRight: 10,
        //     marginTop: 17,
        //     height: 15}}>
        //     <Text>emptydate</Text>
        //   </View>);}}
        renderEmptyData = {this.renderEmptyDate.bind(this)}
        // renderEmptyDate={this.renderEmptyDate.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)}
        theme={{
          agendaTodayColor:  '#3C1278',
          agendaKnobColor: "#eceff1",
          selectedDayBackgroundColor: '#DAD9FF',
          dotColor: '#3C1278',
          todayTextColor: '#3C1278',
          backgroundColor: '#00000000'
        }}
      />
      {/* //floatingactionbutton part */}
      <FloatingAction
        ref={(ref) => { this.floatingAction = ref; }}
        color='#3C1278'
        actions={actions}
        onPressItem={
          (name) => {
            // if(name == 'bt_category'){this.props.navigation.navigate('Category');}
            if(name=='bt_add'){this.props.navigation.navigate('Record', { user: id });}
            else if(name=='bt_mistake'){
              this.toggleModal();
          }
          }}
      />

      {/* modal 부분 */}

      <View>

        <Modal isVisible={this.state.isModalVisible}> 
          <View style={styles.modalCon}>
              <Dropdown
                label='어떤 실수를 했나요?'
                baseColor={'#3C1278'}
                data={this.state.field}
                onChangeText={(category)=>this.setState({category: category})}
              />
              <TextField
                  label={'어떻게 실수를 했나요?'}
                  highlightColor={'#3C1278'}
                  labelColor={'#3C1278'}
                  onChangeText={(t)=>{mistake=t}}
                />

              <View style={{flexDirection:'row', justifyContent:'center'}}>
                <TouchableOpacity
                  onPress={()=> this.missAdd()}
                  style={styles.button}
                  >
                  <Text style={styles.text}>추☆가</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={()=>  this.toggleModal()}
                  style={styles.button}>
                  <Text style={styles.text}>뒤☆로</Text>
                </TouchableOpacity>
              </View>

            </View>
        </Modal>
        
      </View>

{/* 달력 아이템 누르면 나오는 모달 */}
      <View >

        <Modal isVisible={this.state.modal2} style={{alignItems:'center'}}> 
        <View style={styles.card}>
          <View style={styles.header}>
            <Image style={styles.profileImg} source={require("../assets/bear.png")} />
            <Text style={{fontWeight:"bold",fontSize:18}}> {thiscal_name}</Text>
          </View>
          <View style={{marginTop:10}}>
            <Text style={{color:"gray"}}>Time: {thiscal_schedule_time}</Text>
            <Text style={{color:"gray"}}>Mistake: {thiscal_category}</Text>
          </View>
          <View style={{flexDirection:'row', justifyContent:'center'}}>
                <TouchableOpacity
                  onPress={()=>  this.toggleModal2()}
                  style={styles.button2}>
                  <Text style={styles.text}>Back</Text>
                </TouchableOpacity>
              </View>
        </View>
        </Modal>

      </View>


      </View>
    );
      
};




//안에 써줄 함수들
//각각 날짜에 들어가는 것 기입하는 함수
loadItems(day) {
  var th = this;
  setTimeout(() => {
    var url = 'http://192.249.19.242:6480/schedule_show';
    var category, schedule, schedule_time;

    //앞뒤 일주일 간격의 시간을 보여준다
    for (let i = -4; i < 10; i++) {
      const time = day.timestamp + i * 24 * 60 * 60 * 1000;
      const strTime = this.timeToString(time);

      axios.post(url, {
        id: id,
        date: moment(strTime).format("MM-DD")
      })
      .then(function (response) {
        var data = JSON.stringify(response.data);
        if(data != "[]"){
          data = JSON.parse(data);
            th.state.items[strTime] = [];
            const numItems = data.length;
            for (let j = 0; j < numItems; j++) {
              var data1 = JSON.parse(JSON.stringify(data[j]));
              category = data1.category;
              if(category == 1){
                category = 'Relationship';
              }else if(category == 2){
                category = 'Workplace'
              }else{
                category = 'ToMySelf'
              }
              schedule = data1.schedule;
              console.log(schedule);
              schedule_time = data1.time;
              th.state.items[strTime].push({
                name: schedule,
                category : category,
                schedule_time: schedule_time
              });
            }
        }
        // else{
        //   th.state.items[strTime]=[{name:"empty schedule", category:"", schedule_time:""}];
        // }
        const newItems = {};
        Object.keys(th.state.items).forEach(key => {newItems[key] = th.state.items[key];});
        th.setState({
          items: newItems
        });
      })
      .catch(function (error) {
          console.log(error);
      });
      // if (!this.state.items[strTime]) {
      //   this.state.items[strTime] = [];
      //   const numItems = Math.floor(Math.random() * 3 + 1);
      //   for (let j = 0; j < numItems; j++) {
      //     this.state.items[strTime].push({
      //       name: 'Item for ' + strTime + ' #' + j,
      //       height: Math.max(50, Math.floor(Math.random() * 150))
      //     });
      //   }
      // }
    }
    
  }, 1000);
}

//각 아이템 누를 때마다 실행하는 것 
renderItem(item) {
  thiscal_schedule_time = item.schedule_time;
  thiscal_name = item.name;
  thiscal_category = item.category;
  return (
      <TouchableOpacity
        testID={testIDs.agenda.ITEM}
        style={[styles.item, {height: item.height}]} 
        //각 날짜 아이템 누를 때 뜨는 버튼
        // onPress={() => Alert.alert(item.schedule_time+" "+item.name + " " + item.category)}
        onPress={ () => {this.toggleModal2()} }
      >
        <Text>{item.name}</Text>
      </TouchableOpacity>
  );
}

renderEmptyDate() {
  return (
    <View style={styles.emptyDate}>
      <Text>{this.Separator.bind(this)}</Text>
    </View>
  );
}

rowHasChanged(r1, r2) {
  return r1.name !== r2.name;
}

timeToString(time) {
  const date = new Date(time);
  return date.toISOString().split('T')[0];
}

}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    
    width: '100%',
    height: 100,
    //shadow
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 3,
    shadowOpacity: 0.5,
  },

  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
    height: 15
  },
  emptyDate: {
    height: 15,
    flex:1,
    paddingTop: 30,
  },

  floatingbutton:{
    flex: 1,
    backgroundColor: '#DAD9FF'
  },
  button2: {
    backgroundColor: '#DAD9FF',
    alignItems: 'center',
    justifyContent: 'center',
    width: 78,
    height: 30,
    alignSelf: 'center',
    marginBottom: 10,
    marginTop: 10,
    flexDirection:'row'
  },
  text: {
    color: '#bddac8',
  },
  modalCon: {
    backgroundColor:"#fff",
    padding:40,
    marginRight:30,
    marginLeft:30,
    marginTop:10,
    paddingTop:20,
    paddingBottom:20,
    borderRadius:20,
    borderWidth: 1,
  },
  input: {
    margin: 5,
    padding: 6,
    borderRadius: 8,
    marginBottom: 8,
    paddingHorizontal: 10,
    backgroundColor: "#eceff1"
  },
  button: {
    backgroundColor: '#DAD9FF',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:30,
    width: 78,
    height: 50,
    alignSelf: 'center',
    marginBottom: 20,
    //////////////////////
    flexDirection:'row'
  },
  btntext: {
    color: '#3C1278',
    fontWeight:'bold',
    fontSize: 17
  },
  text: {
    color: 'white',
  },
  modal: {
    flex: 1,
    backgroundColor: (255, 255, 255, 0),
    justifyContent:"center",
    alignContent:"center",
    alignItems:"center",
  },
  modalCon: {
    backgroundColor:"#fff",
    padding:40,
    marginRight:30,
    marginLeft:30,
    marginTop:10,
    paddingTop:20,
    paddingBottom:20,
    borderRadius:20,
    borderWidth: 1,
  },
  card:{
    height:150,
    width:"60%",
    backgroundColor:"white",
    borderRadius:15,
    padding:10,
    elevation:10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5, 
  },
  profileImg:{
    width:30,
    height:30,
    borderRadius:50,
    marginRight:10,
  },
  header: {
    flexDirection:"row",
  }
}); 
