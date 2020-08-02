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
import moment from 'moment';
import _ from 'lodash';
import Modal from "react-native-simple-modal";
import { FloatingAction } from 'react-native-floating-action';

const testIDs = require('../testIDs');

const today = new Date().toISOString().split('T')[0];
const fastDate = getPastDate(3);
const futureDates = getFutureDates(9);
const dates = [fastDate, today].concat(futureDates);
const themeColor = '#00AAAF';
const lightThemeColor = '#EBF9F9';
//floating button을 누르면 글을 쓸 수 있게 하기
const actions = [
  {
  text: 'Accessibility',
  name: 'bt_accessibility',
  position: 2
}, {
  text: 'Language',
  name: 'bt_language',
  position: 1
}, {
  text: 'Location',
  name: 'bt_room',
  position: 3
}, {
  text: 'Video',
  name: 'bt_videocam',
  position: 4
}
];

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
      items: {}
    };
  }
//일정 추가하는 modal 부분 -> renderItem 으로 가기
  state = { open: false };
  openModal = () => this.setState({ open: true });
  closeModal = () => this.setState({ open: false });
  modalDidOpen = () => console.log("Modal did open.");

  modalDidClose = () => {
    this.setState({ open: false });
    console.log("Modal did close.");
  };

  moveUp = () => this.setState({ offset: -100 });

  resetPosition = () => this.setState({ offset: 0 });



  render() {
    return (
      <View style={styles.floatingbutton}>
      <Agenda
        testID={testIDs.agenda.CONTAINER}
        items={this.state.items}
        loadItemsForMonth={this.loadItems.bind(this)}
        selected={'2020-08-02'}
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
            console.log(`selected button: ${name}`);
          }
        }
      />

      </View>
    );
      
};

loadItems(day) {
  setTimeout(() => {
    for (let i = -15; i < 85; i++) {
      const time = day.timestamp + i * 24 * 60 * 60 * 1000;
      const strTime = this.timeToString(time);
      if (!this.state.items[strTime]) {
        this.state.items[strTime] = [];
        // const numItems = Math.floor(Math.random() * 3 + 1);
        const numItems = 3;
        for (let j = 0; j < numItems; j++) {
          this.state.items[strTime].push({
            //일정 안에 써주는 부분
            //얘를 디비에서 불러내서 보여주면 될 것 같음
            // name: 'Item for ' + strTime + ' #' + j,
            name: 'write what you regret'
            // height: Math.max(50, Math.floor(Math.random() * 150))
          });
        }
      }
    }
    const newItems = {};
    Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
    this.setState({
      items: newItems
    });
  }, 1000);
}

renderItem(item) {
  return (
      <TouchableOpacity
        testID={testIDs.agenda.ITEM}
        style={[styles.item, {height: item.height}]} 
        //각 날짜 아이템 누를 때 뜨는 버튼
        onPress={() => Alert.alert(item.name)}
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