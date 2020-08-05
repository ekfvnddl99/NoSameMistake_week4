import React, {useState} from 'react';
import {View, Button, Platform, Text, TextInput, StyleSheet, TouchableOpacity,
StatusBar, SafeAreaView, ScrollView, useColorScheme, Switch, Alert, TouchableWithoutFeedback, Image,   ActivityIndicator,} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Toast from 'react-native-simple-toast';
import axios from 'axios';
import moment from 'moment';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import CategoryScreen from "./CategoryScreen";
import SectionedMultiSelect from 'react-native-sectioned-multi-select'
import DropdownMenu from 'react-native-dropdown-menu';



const ThemedText = (props) => {
    const isDarkMode = useColorScheme() === 'dark';
  
    const textColorByMode = {color: isDarkMode ? Colors.white : Colors.black};
  
    const TextElement = React.createElement(Text, props);
    return React.cloneElement(TextElement, {
      style: [props.style, textColorByMode],
    });
  };

  //단 분류
const Separator = () => (
<View style={styles.separator} />
);


//recordscreen main 화면
const RecordScreen = ({ navigation }) => {

    //sending information to server (id, schedule time, schedule name, schedule date, schedule category)
    const getReg = () => {//only id check
        var User_Id = navigation.getParam('user', 'undefined');
        var cate = comp.first;
        var record = regret.id;
        var Date = moment.utc(date).format('MM-DD');
        var time = moment.utc(date).format('HH:mm');
        var url = 'http://192.249.19.242:6480/calendar';
        axios.post(url, {
            id: User_Id,
            date: Date,
            schedule: record,
            time: time,
            category: cate
        })
        .then(function (response) {
            Toast.show(date +" " + cate + " " + record + " "  + time);
        })
        .catch(function (error) {
            console.log(error);
        });
    };
    
    //dropdown part
    const [comp, setText] =  useState({first: ''});
    const [regret, setRegret] =  useState({id: ''});

    var field = [["relationship", "workplace", "ToMySelf"]];

    const addText = ({selection, row}) =>{
        if(selection==0) setText({first: field[selection][row]})
    };


    //time spinner part
    const [date, setDate] = useState(new Date(1598051730000));
    const [time, setTime] = useState(undefined);
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [display, setDisplay] = useState('default');
    const [interval, setMinInterval] = useState(undefined);
    const [minuteInterval, setMinuteInterval] = useState(1);

    const handleResetPress = () => {
        setDate(undefined);
      };


    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const showMode = currentMode => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepickerSpinner = () => {
        showMode('date');
        setDisplay('spinner');
    };

    const showTimepicker = () => {
        showMode('time');
    };

    const isDarkMode = useColorScheme() === 'dark';

    const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.dark : Colors.lighter,
    };

    const id = navigation.getParam('user', 'undefined');


    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <View>
                <View>
                    <Text> { id } is the user id dddddddddddd </Text>

                    <View style={styles.header}>
                        <ThemedText style={styles.text}>
                            Write your schedule
                        </ThemedText>
                    </View>

                    <View style={styles.header}>
                        <TextInput style={styles.input}
                                placeholder = "write your schedule"
                                maxLength={30}
                                onChangeText={(id) => setRegret({id})}
                                value={regret.id}
                        />
                    </View>

                    <View>
                        <Button
                            testID="datePickerButtonSpinner"
                            onPress={showDatepickerSpinner}
                            title="Pick Date"
                        />
                    </View>

                    <Separator />

                    <View>
                        <Button
                            testID="timePickerButton"
                            onPress={showTimepicker}
                            title="Pick Time"
                        />
                    </View>

                    <Separator />

                    <View>
                        <ThemedText testID="dateText" style={styles.dateTimeText}>
                            {moment.utc(date).format('MM/DD/YYYY')}
                        </ThemedText>
                        <ThemedText testID="timeText" style={styles.dateTimeText}>
                            {moment.utc(date).format('HH:mm')}
                        </ThemedText>
                    </View>

                    {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        timeZoneOffsetInMinutes={0}
                        minuteInterval={interval}
                        value={date}
                        mode={mode}
                        is24Hour
                        display={display}
                        onChange={onChange}
                        style={styles.iOsPicker}
                    />
                    )}

                </View>

                <Separator />

                    {/* Dropdown menu */}
                    <View style={{height: 64}}>
                        <DropdownMenu
                            bgColor={'white'}
                            tintColor={'#666666'}
                            activityTintColor={'green'}
                            handler={(selection, row) => addText({selection,row})}
                            data={field}
                            >
                        </DropdownMenu>
                    </View>

                    {/* <View>
                        <Button
                            testID="CategorysButton"
                            onPress={()=>navigation.navigate('Category')}
                            title="Pick Category"
                        />
                    </View> */}

                    {/* <View>
                        <CategoryScreen />
                    </View> */}

                    <View style={{marginTop: 120}}>
                        <Button 
                            testID="SaveAllButton"
                            onPress={()=>getReg()}
                            title="save"
                        />
                    </View>

                    <Separator />

                    <View>
                        <Text>{comp.first} is category</Text>
                        <Text>{regret.id} is schedule</Text>
                    </View>

            </View>
        </SafeAreaView>
    );
};


export default RecordScreen;
    

const styles = StyleSheet.create({
    // container: { flex: 1, justifyContent: "center" },
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
    },
////////////////////////////////////
    scrollView: {
        backgroundColor: Colors.lighter,
      },
      engine: {
        position: 'absolute',
        right: 0,
      },
      body: {
        backgroundColor: Colors.white,
      },
      container: {
        marginTop: 32,
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#F5FCFF',
        paddingTop: 40,
        paddingHorizontal: 20,
      },
      header: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        padding: 4
      },
      button: {
        alignItems: 'center',
        marginBottom: 10,
        backgroundColor: 'blue'
      },
      resetButton: {
        width: 150,
      },
      text: {
        fontSize: 20,
        fontWeight: 'bold',
      },
      dateTimeText: {
        fontSize: 16,
        fontWeight: 'normal',
      },

      //////////////////
      fixToText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      separator: {
        marginVertical: 8,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
      },
});