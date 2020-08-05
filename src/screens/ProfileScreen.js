import {
  Platform,
  Alert,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Button
} from 'react-native';
import React, { Component } from "react";
import { MenuButton, Logo } from "../components/header/header";
import {Agenda} from 'react-native-calendars';
import _ from 'lodash';
import { FloatingAction } from 'react-native-floating-action';
import axios from 'axios'
import moment from 'moment'


const testIDs = require('../testIDs');

const today = new Date().toISOString().split('T')[0];
const fastDate = getPastDate(3);
const futureDates = getFutureDates(9);
const dates = [fastDate, today].concat(futureDates);
const themeColor = '#00AAAF';
const lightThemeColor = '#EBF9F9';
  

//floating button을 누르면 글을 쓸 수 있게 하기
const actions = [
//   {
//   text: 'Accessibility',
//   name: 'bt_accessibility',
//   position: 2
// }, 
{
  text: 'Add',
  name: 'bt_add',
  position: 1
},
// {
//   text: 'category',
//   name: 'bt_category',
//   position: 0
// }
// {
//   text: 'Video',
//   name: 'bt_videocam',
//   position: 4
// }
];

var id;
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
      headerLeft: () => <MenuButton onPress={() => navigation.openDrawer()} />,
      headerTitle: () => <Logo />,
      headerBackTitle: "Profile",
      headerLayoutPreset: "center"
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      items: {},
    };
  }


  render() {
    id = this.props.navigation.dangerouslyGetParent().dangerouslyGetParent().getParam('user', 'undefined')
    return (
      <View style={styles.floatingbutton}>
        <Text> { id } </Text>
      <Agenda
        testID={testIDs.agenda.CONTAINER}
        items={this.state.items}
        loadItemsForMonth={this.loadItems.bind(this)}
        selected={moment().format("YYYY-MM-DD")}
        renderItem={this.renderItem.bind(this)}
        renderEmptyDate={this.renderEmptyDate.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)}
      />
      {/* //floatingactionbutton part */}
      <FloatingAction
        ref={(ref) => { this.floatingAction = ref; }}
        actions={actions}
        onPressItem={
          (name) => {
            // if(name == 'bt_category'){this.props.navigation.navigate('Category');}
            if(name=='bt_add'){this.props.navigation.navigate('Record', { user: id });}
        }}
      />

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
          console.log(data.length);
          if (!th.state.items[strTime]) {
            th.state.items[strTime] = [];
            const numItems = data.length;
            for (let j = 0; j < numItems; j++) {
              var data1 = JSON.parse(JSON.stringify(data[j]));
              category = data1.category;
              if(category == 0){
                category = 'Relationship';
              }else if(category == 1){
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
        }
        else{
          th.state.items[strTime]=[{name:"empty schedule", category:"", schedule_time:""}];
        }
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
  return (
      <TouchableOpacity
        testID={testIDs.agenda.ITEM}
        style={[styles.item, {height: item.height}]} 
        //각 날짜 아이템 누를 때 뜨는 버튼
        onPress={() => Alert.alert(item.schedule_time+" "+item.name + " " + item.category)}
      >
        <Text>{item.name}</Text>
      </TouchableOpacity>
  );
}

renderEmptyDate() {
  return (
    <View style={styles.emptyDate}>
      <Text>This is empty date!</Text>
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
    justifyContent: "center"
  },

  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex:1,
    paddingTop: 30
  },

  floatingbutton:{
    flex: 1,
    backgroundColor: "#fff"
  }
});