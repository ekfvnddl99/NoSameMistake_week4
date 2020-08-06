import React, {useState, Component} from 'react';
import {View, Text, Button, StatusBar, Dimensions, Image, RefreshControl, TouchableOpacity} from 'react-native';
import axios from 'axios';
import VegaScrollList from 'react-native-vega-scroll-list';
import DropdownMenu from 'react-native-dropdown-menu';

var data;

function App() {
  let {width} = Dimensions.get('window');
  var field = [["전체", "10대", "20대", "30대", "40대", "50대", "60대", "70대"], ["전체", "남", "여"], ["전체", "대인관계 실수", "일 실수", "스스로 실수"]];
  const [comp, setText] = useState({first: field[0][0], second:field[1][0], third:field[2][0]});

  const addText = ({selection, row}) =>{
    onRefresh();
      if(selection==0) setText({first: field[selection][row], second: comp.second, third: comp.third})
    else if(selection==1) setText({first: comp.first, second: field[selection][row], third: comp.third})
    else if(selection==2) setText({first: comp.first, second: comp.second, third: field[selection][row]})
    console.log(comp.first + "   " + comp.second + "   " + comp.third);
  };

  const showdata = () => {
    console.log(comp.first +"  "+ comp.second);
      var url = 'http://192.249.19.242:6480/show';
        axios.post(url, {
          age: field[selection][row],
          gender: comp.second,
          category: comp.third,
        })
        .then(function (response) {
          console.log( comp.first +"  "+ comp.second);
          data=response.data
          // console.log(data)
        })
        .catch(function (error) {
          console.log(error);
        });
    onRefresh();
  }


  const th = this;

  const wait = (timeout) => {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  }

  const [refreshing, setFresh] = useState(false);
  const onRefresh = React.useCallback(() => {
    setFresh(true);

    wait(2000).then(() => setFresh(false));
  }, []);
  
  return (
    <>
      <View
        style={{
          flex:3,
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
        <Text
          style={{
            fontSize: 32,
            marginLeft: 16,
            marginTop: 50,
            fontWeight: '200',
          }}>
          COMMUNITY
        </Text>
{/* <View>
        <Button
          onPress={() => showdata()}
          title="Learn More"
          color="#841584"
        />

</View> */}


        <DropdownMenu
          bgColor={'white'}
          tintColor={'#666666'}
          activityTintColor={'green'}
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
          //   refreshControl={
          // <RefreshControl
          //   refreshing={refreshing}
          //   onRefresh={addText()}/>}
          />
        </View>
        </DropdownMenu>
      </View>
    </>
  );
};

function Card({item}){
  let categoryColor = '#00ff00';//green
  console.log('nnnnnnnnnnn')
  console.log(item)
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
            fontWeight: '200',
            // fontFamily: 'sans-serif',
            marginBottom: 4,
            color: '#808080',
          }}>
          {item.content}
        </Text>
        <Text style={{alignItems: 'flex-end', color: categoryColor}}>
          {item.category}
        </Text>
      </View>
    </View>
  );
};

export default App;