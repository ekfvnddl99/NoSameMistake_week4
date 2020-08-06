import React from 'react';
import {
  ScrollView,
  RefreshControl,
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TouchableOpacity
} from 'react-native';
import Constants from 'expo-constants';
import PureChart from 'react-native-pure-chart';
import moment from 'moment'
import Toast from 'react-native-simple-toast'
import axios from 'axios';

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
      {x: moment().subtract(4, 'd').format('MM-DD'), y: 30},
      {x: moment().subtract(3, 'd').format('MM-DD'), y: 200},
      {x: moment().subtract(2, 'd').format('MM-DD'), y: 170},
      {x: moment().subtract(1, 'd').format('MM-DD'), y: 250},
      {x: moment().format('MM-DD'), y: 10}
    ],
    color: '#297AB1'
  },
  {
    seriesName: 'series2',
    data: [
      {x: moment().subtract(4, 'd').format('MM-DD'), y: 20},
      {x: moment().subtract(3, 'd').format('MM-DD'), y: 100},
      {x: moment().subtract(2, 'd').format('MM-DD'), y: 140},
      {x: moment().subtract(1, 'd').format('MM-DD'), y: 550},
      {x: moment().format('MM-DD'), y: 401}
    ],
    color: 'yellow'
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
    getweek2.bind(this)(-4, 'w');
    getweek3.bind(this)(-4, 'w');
  };
  function getmonth(){
    data = new Array();
    X = new Array();
    Y = new Array();
    Z = new Array();
    getweek1.bind(this)(-4, 'M');
    getweek2.bind(this)(-4, 'M');
    getweek3.bind(this)(-4, 'M');
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
         data.push({data: X, color:'#297AB1'});
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
          data.push({data: Y, color:'yellow'});
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
          data.push({data: Z, color:'black'});
          onRefresh();
          refreshing();
        }
      })
      .catch(function (error) {console.log(error);});
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text>{User_id}</Text>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style ={{justifyContent: "center"}} >
          <PureChart type={'bar'}
          data={data}
          width={400}
          height={200}
          customValueRenderer={(index, point) => {
            //if (index % 2 === 0) return null
            return (
              <Text style={{textAlign: 'center'}}>{point.y}</Text>
            )
          }}/>
          <PureChart type={'line'}
          data={data}
          width={400}
          height={200}
          customValueRenderer={(index, point) => {
            //if (index % 2 === 0) return null
            return (
              <Text style={{textAlign: 'center'}}>{point.y}</Text>
            )
          }}/>
        </View>
          <View style={{flexDirection:'row', justifyContent:'center'}}>
            <TouchableOpacity
              style={{
                  backgroundColor:'blue', borderRadius:10,
                  flex:1, width:100, height:50, margin:20,
                  flexDirection:'row', justifyContent:'center',
                  alignItems:'center'
                  }}
              onPress={getweek.bind(this)}
              >
              <Text style={{fontSize:20,color:'white',fontWeight:'bold'}}>
                Week
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                  backgroundColor:'blue', borderRadius:10,
                  flex:1, width:100, height:50, margin:20,
                  flexDirection:'row', justifyContent:'center',
                  alignItems:'center'
                  }}
              onPress={getmonth.bind(this)}
              >
              <Text style={{fontSize:20,color:'white',fontWeight:'bold'}}>
                Month
              </Text>
            </TouchableOpacity>
          </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;