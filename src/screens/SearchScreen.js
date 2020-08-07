import React from 'react';
import {
  ScrollView,
  RefreshControl,
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  Image
} from 'react-native';
import Constants from 'expo-constants';
import PureChart from 'react-native-pure-chart';
import moment from 'moment'
import Toast from 'react-native-simple-toast'
import axios from 'axios';
import DropdownMenu from 'react-native-dropdown-menu';
import { Octicons } from '@expo/vector-icons'; 

const wait = (timeout) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

// var data = [];

let data = [
  {
    seriesName: 'series1',
    data: [
      {x: moment().subtract(4, 'w').format('MM-DD'), y: 1},
      {x: moment().subtract(3, 'd').format('MM-DD'), y: 3},
      {x: moment().subtract(2, 'd').format('MM-DD'), y: 1},
      {x: moment().subtract(1, 'd').format('MM-DD'), y: 2},
      {x: moment().format('MM-DD'), y: 0}
    ],
    color: '#FF8383'
  },
  {
    seriesName: 'series2',
    data: [
      {x: moment().subtract(4, 'd').format('MM-DD'), y: 2},
      {x: moment().subtract(3, 'd').format('MM-DD'), y: 7},
      {x: moment().subtract(2, 'd').format('MM-DD'), y: 1},
      {x: moment().subtract(1, 'd').format('MM-DD'), y: 5},
      {x: moment().format('MM-DD'), y: 4}
    ],
    color: '#9DCFFF'
  },
  {
    seriesName: 'series2',
    data: [
      {x: moment().subtract(4, 'd').format('MM-DD'), y: 5},
      {x: moment().subtract(3, 'd').format('MM-DD'), y: 4},
      {x: moment().subtract(2, 'd').format('MM-DD'), y: 3},
      {x: moment().subtract(1, 'd').format('MM-DD'), y: 2},
      {x: moment().format('MM-DD'), y: 1}
    ],
    color: '#FAED7D'
  }
]


const App = ({ navigation }) => {
  var User_id = navigation.dangerouslyGetParent().getParam('user', 'undefined');

  var X = new Array();
  var Y = new Array();
  var Z = new Array();
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    wait(2000).then(() => setRefreshing(false));
  }, []);
  function getweek(){
    data = new Array();
    X = new Array();
    Y = new Array();
    Z = new Array();
    getweek1.bind(this)(-4, 'w');
  };
  function getmonth(){
    data = new Array();
    X = new Array();
    Y = new Array();
    Z = new Array();
    getweek1.bind(this)(-4, 'M');
  };
  function getweek1(i, j){
    console.log(j);
    var url = 'http://192.249.19.242:6480/chart';
    axios.post(url, {id: User_id ,category: 1, date1:moment().add(i-1, j).format("MM-DD"), date2:moment().add(i, j).format("MM-DD")})
      .then(function (response) {
        X.push(new Object({x:response.data.x, y:response.data.y}));
        if (i!=0){
          getweek1.bind(this)(i+1, j);
        }
        else{
         data.push({data: X, color:'#FF8383'});
         getweek2.bind(this)(-4, j);
          //data = [{data : [{x: moment().subtract(4, 'd').format('MM-DD'),y: 100},{x: moment().subtract(4, 'd').format('MM-DD'), y: 200}], color : '#297AB1'}];
        }
      })
      .catch(function (error) {console.log(error);});
  }
  function getweek2(i, j){
    var url = 'http://192.249.19.242:6480/chart';
    axios.post(url, {id: User_id,category: 2, date1:moment().add(i-1, j).format("MM-DD"), date2:moment().add(i, j).format("MM-DD")})
      .then(function (response) {
        Y.push(new Object({x:response.data.x, y:response.data.y}));
        if (i!=0){
          getweek2.bind(this)(i+1, j);
        }
        else{
          data.push({data: Y, color:'#9DCFFF'});
          getweek3.bind(this)(-4, j);
        }
      })
      .catch(function (error) {console.log(error);});
  }
  function getweek3(i, j){
    var url = 'http://192.249.19.242:6480/chart';
    axios.post(url, {id: User_id,category: 3, date1:moment().add(i-1, j).format("MM-DD"), date2:moment().add(i, j).format("MM-DD")})
      .then(function (response) {
        Z.push(new Object({x:response.data.x, y:response.data.y}));
        if (i!=0){
          getweek3.bind(this)(i+1, j);
        }
        else{
          data.push({data: Z, color:'#FAED7D'});
          onRefresh();
          refreshing();
        }
      })
      .catch(function (error) {console.log(error);});
  }

  var field = [["weekly", "monthly"]]


  const addText = ({selection, row}) =>{
    if(row===0){
      console.log("***************"+ row);
      getweek();
    }
    else if(row===1){
      console.log("***************"+ row);
      getmonth();
    }
  };

  

  return (
    <SafeAreaView style={styles.container}>
    <Image
      source={require("../assets/back.png")}
      style={{position:'absolute',
      left:0, 
      right:0, 
      top:0,
      bottom:0}} />
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Text style={{fontSize:30, fontWeight:'bold', margin: 20, color: '#3C1278', marginTop: 50,}}>MY RECORD</Text>
        <View style={{flexDirection:'row', justifyContent:'center', marginBottom: 64}}>

          {/* <TouchableOpacity
            style={{
                backgroundColor:'#5853EB', borderRadius:20,
                flex:1, width:100, height:50, margin:20,
                flexDirection:'row', justifyContent:'center',
                alignItems:'center'
                }}
            onPress={getweek.bind(this)}
            >
            <Text style={{fontSize:20,color:'white',fontWeight:'bold'}}>
              주간차트
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
                backgroundColor:'white', borderRadius:20,
                flex:1, width:100, height:50, margin:20,
                flexDirection:'row', justifyContent:'center',
                alignItems:'center', borderColor:'#7C77FF', borderWidth:3
                }}
            onPress={getmonth.bind(this)}
            >
            <Text style={{fontSize:20,color:'#7C77FF',fontWeight:'bold'}}>
              월간차트
            </Text>
          </TouchableOpacity> */}

          <DropdownMenu
            bgColor={'white'}
            tintColor={'#666666'}
            activityTintColor={'#7C77FF'}
            handler={(selection, row) => addText({selection,row})}
            data={field}
          ></DropdownMenu>

        </View>
        <View style ={{justifyContent: "center"}} >
          <PureChart type={'bar'}
          data={data}
          width={500}
          height={200}
          // backgroundColor={'#DAD9FF'}
          backgroundColor={'#00000000'}
          customValueRenderer={(index, point) => {
            //if (index % 2 === 0) return null
            return (
              <Text style={{textAlign: 'center'}}>{point.y}</Text>
            )
          }}/>
          
        </View>

        <View style ={{justifyContent: 'space-between', width:'100%', marginLeft: 100}}>

        <View sytle={{justifyContent: 'space-between', marginhorizontal: 5, flexDirection: "column"}}>
            <Octicons name="primitive-dot" size={24} color='#FF8383' />
            <Text >Relationship</Text>
        </View>

          <View sytle={{flexDirection: 'column', marginhorizontal: 5}}>
            <Octicons name="primitive-dot" size={24} color='#9DCFFF' />
            <Text>Workplace</Text>
          </View>
          <View sytle={{flexDirection: 'column', marginhorizontal: 5}}>
            <Octicons name="primitive-dot" size={24} color='#FAED7D' />
            <Text>ToMySelf</Text>
          </View>
        </View>
      </ScrollView> 
   
    </SafeAreaView>
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: Constants.statusBarHeight,
  },
  scrollView: {
    flex: 1,
    // backgroundColor: '#DAD9FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pink: {
    width: 100,
    height: 100,
    borderRadius: 100/2,
    backgroundColor: '#FF8383',
    flexDirection: 'row',
},
blue: {
  width: 100,
  height: 100,
  borderRadius: 100/2,
  backgroundColor: '#9DCFFF'
},
yellow: {
  width: 100,
  height: 100,
  borderRadius: 100/2,
  backgroundColor: '#FAED7D'
},
});

export default App;