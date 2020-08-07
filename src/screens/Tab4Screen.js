import React, {useState, Component} from 'react';
import {ScrollView,SafeAreaView, StyleSheet, View, Text, Button, StatusBar, Dimensions, Image, RefreshControl, TouchableOpacity, ImageBackground} from 'react-native';
import axios from 'axios';
import VegaScrollList from 'react-native-vega-scroll-list';
import DropdownMenu from 'react-native-dropdown-menu';
import Constants from 'expo-constants';
import { compose } from 'redux';

var data;
const wait = (timeout) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

function App() {
  let {width} = Dimensions.get('window');
  var field = [["전체", "10대", "20대", "30대", "40대", "50대", "60대", "70대"], ["전체", "남", "여"], ["전체", "대인관계 실수", "일 실수", "스스로 실수"]];
  const [comp, setText] = useState({first: field[0][0], second:field[1][0], third:field[2][0]});

  const addText = ({selection, row}) =>{
    if(selection==0){
      setText({first: field[selection][row], second: comp.second, third: comp.third})
      showdata(field[selection][row], comp.second, comp.third);
    }
    else if(selection==1){
      setText({first: comp.first, second: field[selection][row], third: comp.third})
     showdata(comp.first, field[selection][row], comp.third);
    }
    else if(selection==2){
      setText({first: comp.first, second: comp.second, third: field[selection][row]})
      showdata(comp.first, comp.second, field[selection][row]);
    }
  };

  const showdata = (age, gender, category) => {
      console.log("showdata in. axios start!!")
      console.log(age+" "+gender+" "+category);
      var url = 'http://192.249.19.242:6480/show';
        axios.post(url, {
          age: age,
          gender: gender,
          category: category,
        })
        .then(function (response) {
          console.log("axios end!!");
          console.log(age+" "+gender+" "+category);
          data=response.data
          onRefresh();
          // console.log(data)
        })
        .catch(function (error) {
          console.log(error);
        });
  }


  const th = this;

  const [refreshing, setFresh] = useState(false);
  const onRefresh = React.useCallback(() => {
    setFresh(true);

    wait(2000).then(() => setFresh(false));
  }, []);
  return (
    <>
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          flex:1,
          width: '100%',
          height: 100,
          backgroundColor: '#D3D3D3',
          //shadow
          shadowColor: '#000000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowRadius: 3,
          shadowOpacity: 0.5,
        }}>
          <ImageBackground source={require("../assets/back.png")} style={styles.image}>

          
        
          <Text
            style={{
              fontSize: 30,
              // marginLeft: 16,
              alignSelf: 'center',
              marginTop: 50,
              fontWeight: 'bold',
              margin:20,
              color: '#3C1278'
            }}>
            COMMUNITY
          </Text>
          <DropdownMenu
            bgColor={'white'}
            tintColor={'#666666'}
            activityTintColor={'#7C77FF'}
            handler={(selection, row) => addText({selection,row})}
            data={field}
          >
            <View style={{flex:15}}>
              <VegaScrollList
              style={{marginTop: 8}}
              distanceBetweenItem={12}
              data={data}
              keyExtractor={item => item.index}
              renderItem={data => {
                return (
                  <View
                    elevation={5}
                    style={{
                      shadowColor: '#000000',
                      shadowOffset: {
                        width: 0,
                        height: 2,
                      },
                      shadowRadius: 3,
                      shadowOpacity: 0.5,
                      height: 70,
                      width: width - 30,
                      alignItems: 'center',
                      backgroundColor: '#ffffff',
                      borderRadius: 6,
                    }}>
                    <Card item={data.item} />
                  </View>
                );
              }}
            />
            </View>
          </DropdownMenu>
          </ImageBackground>
        </View>
        </SafeAreaView>
    </>
  );
};

function Card({item}){
  let categoryColor = '#7C77FF';
  if (item.category==1) item.category = "Relationship"
  else if (item.category==2) item.category = "Workplace"
  else if (item.category==3) item.category = "ToMyself"
  
  console.log("category : "+item.category+", content : "+item.label);
  return (
    <View style={{flex: 1, flexDirection: 'row'}}>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          height: 50,
          width: '90%',
          marginHorizontal: 10,
          marginVertical: 8,
        }}>
        <Text
          style={{
            // flex: 1,
            fontSize: 22,
            fontWeight: '150',
            // fontFamily: 'sans-serif',
            marginBottom: 4,
            //color: '#808080',
            color: 'black',
          }}>
          {item.label}
        </Text>
        <Text style={{alignItems: 'flex-end', color: '#7C77FF'}}>
          {"#"+item.category+" #"+item.age+"대 #"+item.gender}
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default App;