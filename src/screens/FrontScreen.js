import React, { useRef, Component, useState, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button, Dimensions, ScrollView, Animated, TextInput, RefreshControl } from 'react-native';
import PropTypes from 'prop-types';
import { Modalize } from 'react-native-modalize';
import {Card} from 'react-native-shadow-cards';
import FlipComponent from 'react-native-flip-component';
import SelectMultiple from 'react-native-select-multiple'
import Toast from 'react-native-simple-toast';
import TextField from 'react-native-md-textinput';
import Modal from 'react-native-modal';
import { Dropdown } from 'react-native-material-dropdown';
import { CheckBox } from 'react-native-elements'

var data = [{
    value: 'Banana',
  }, {
    value: 'Mango',
  }, {
    value: 'Pear',
  }];

  var miss = [{
    value: 'Banana',
  }, {
    value: 'Mango',
  }, {
    value: 'Pear',
  }];

function FrontView(props) {
    const modalRef = React.createRef();
  
    const renderHeader = () => (
      <View style={styles.modal__header}>
        <Text style={styles.modal__headerText}>앗 나의 실수 데헷-☆</Text>
      </View>
    );
  
    const getMiss = ({category}) => {//only id check
      var url = 'http://192.249.19.242:6480/mistake';
      axios.post(url, {
        id: th.state.id,
        category: category,
      })
      .then(function (response) {
        miss=reponse.data
      })
      .catch(function (error) {
        console.log(error);
      });
    };
  
    const onOpen = () => {
      const modal = modalRef.current;
  
      if (modal) {
        modal.open();
      }
    };
  
    const th=this;
  
    var date = "오늘은 "+new Date().getFullYear()+"년 "+(new Date().getMonth()+1)+"월 "+new Date().getDate()+"일이라귯-☆";
  
    return (
      <>
        <View style={styles.container}>
          <View>
            <Text style={{fontSize: 25, marginTop: 50, marginLeft: 16,fontWeight: '200',}}>{date}</Text>
          </View>
          <View style={{flex:7}}>
          <ScrollView style={{marginVertical:20}} vertical>
          <View>
              {data.map((item, index)=>{
                return(
                <View>
                <Card style={{padding: 10, margin: 10, height: 50}} >
                <TouchableOpacity onPress={() => {onOpen()}}>
                <Text>{item.value}</Text>
                </TouchableOpacity>
                </Card>
                </View>);
                })}
            </View>  
          </ScrollView>
          </View>
            <TouchableOpacity
            onPress={props.flip}
            style={styles.button}>
            <Text style={styles.text}>반성하기</Text>
        </TouchableOpacity>
        </View>
  
        <Modalize ref={modalRef} HeaderComponent={() => renderHeader()} snapPoint={430}>
          <ScrollView>
          <View>
              {miss.map((item, index)=>{
                return(
                <View>
                <Card style={{padding: 10, margin: 10, height: 50}} >
                  <TouchableOpacity>
                  <Text>{item.content}</Text>
                  </TouchableOpacity>
                </Card>
                </View>);
                })}
            </View>  
        </ScrollView>
        </Modalize>
      </>
    );
  }

  export default FrontView;

  const styles = StyleSheet.create({
    container: {
      // flex: 1,
      // backgroundColor: '#8993a2',
      alignItems: 'center',
      justifyContent: 'center',
      flex:1,
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
    frontStyles: {
      backgroundColor: '#59687d',
      justifyContent: 'center',
    //   height,
    //   width,
    },
    backStyles: {
      backgroundColor: '#8993a2',
      justifyContent: 'center',
    //   height,
    //   width,
    },
    button: {
      backgroundColor: '#152c43',
      alignItems: 'center',
      justifyContent: 'center',
      width: 78,
      height: 50,
      alignSelf: 'center',
      marginBottom: 20
    },
    text: {
      color: '#bddac8',
    },
    modal__header: {
      paddingVertical: 15,
      marginHorizontal: 15,
  
      borderBottomColor: '#eee',
      borderBottomWidth: 1,
    },
  
    modal__headerText: {
      fontSize: 15,
      fontWeight: '200',
    },
  
    content: {
      paddingHorizontal: 15,
    },
  
    content__row: {
      flexDirection: 'row',
      alignItems: 'center',
  
      paddingVertical: 15,
  
      borderBottomColor: '#f9f9f9',
      borderBottomWidth: 1,
    },
  
    content__avatar: {
      width: 38,
      height: 38,
  
      marginRight: 15,
  
      overflow: 'hidden',
  
      backgroundColor: '#eee',
      borderRadius: 19,
    },
  
    content__name: {
      fontSize: 16,
    },
  
    content__button: {
      alignItems: 'center',
      justifyContent: 'center',
  
      marginVertical: 20,
    },
    content__scrollview: {
      marginVertical: 20,
    },
    labelStyle: {
      marginLeft: 4,
      fontSize: 16,
      fontWeight: 'bold',
      color: '#2f4f4f'
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
  });