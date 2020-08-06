import React, { useRef, Component, useState } from 'react';
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
import axios from 'axios';
import { set } from 'react-native-reanimated';

var mistake;
var user_id;
var miss = [];
var miss2 = [];

// const [mistake, setMistake] = useState("AAA");
function BackView(props) {
  const modalRef = React.createRef();
  const [category, setCategory] = useState("");

  const renderHeader = () => (
    <View style={styles.modal__header}>
      <Text style={styles.modal__headerText}>오늘 하루 반성하자귱-☆</Text>
    </View>
  );

  const onOpen = () => {
    const modal = modalRef.current;

    if (modal) {
      modal.open();
    }
  };
  
  const onClose = () => {
    const modal = modalRef.current;

    if (modal) {
      modal.close();
    }
  };

  const th=this;
  const [cate, setCate] = useState(0)

  const getMiss = () => {//only id check
    // var id = th.props.navigation.dangerouslyGetParent().getParam('user', 'undefined');
    var url = 'http://192.249.19.242:6480/mistake';
    axios.post(url, {
      id: user_id,
      category: cate,
    })
    .then(function (response) {
      miss=response.data
      miss = JSON.parse(JSON.stringify(miss));
      miss2=[];
      for(let j=0;j<miss.length;j++){
        if(miss[j].label != null){
          miss2.push(miss[j].label);
        }
      }
      console.log(miss2);
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  const addMiss = () => {//only id check
    var url = 'http://192.249.19.242:6480/addMiss';
    axios.post(url, {
      id: user_id,
      age: '20',
      gender: '여',
      category: category,
      label: mistake
    })
    .then(function (response) {
      
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const missSave = () => {//db
    if (modalRef.current) {
      onClose();
      Toast.show('저장되었습니다.')
    }
  };

  const missAdd = () => {//db
    toggleModal();
    addMiss();
    Toast.show('추가되었습니다.')
  };

  var date = "오늘은 "+new Date().getFullYear()+"년 "+(new Date().getMonth()+1)+"월 "+new Date().getDate()+"일이라귱-☆"+"오늘 한 나의 실수체크박스/실수추가";
  var field=[{value:"대인관계 실수"}, {value:"일 실수"}, {value:"스스로 실수"}]
  //refresh
  const [refreshing, setFresh] = useState(false);
  const _onRefresh = () => {
    setFresh(true);
    // fetchData().then(() => {
    //   setFresh(false);
    // });
    setFresh(false);
  }

  return (
    <>
      <View style={styles.container}>
        <View>
          <Text style={{fontSize: 25, marginTop: 50, marginLeft: 16,fontWeight: '200',}}>{date}</Text>
        </View>
        <View style={{flex:7}}>
        <ScrollView style={{marginVertical:20}} vertical refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={()=>_onRefresh()}
          />
        }>
          <View>
            {data.map((item, index)=>{
              return(
              <View>
              <Card style={styles.card}>
              <TouchableOpacity onPress={() => {setCate(item.category), getMiss(),onOpen()}}>
              <Text>{item.schedule}</Text>
              </TouchableOpacity>
              </Card>
              </View>);
              })}
          </View>  
          <Card style={styles.card}>
          <TouchableOpacity onPress={() => toggleModal()}>
            <Text style={{alignItems: 'center'}}>PLUS</Text>
          </TouchableOpacity>
          </Card>
          <View>
            <Modal isVisible={isModalVisible}> 
            <View style={styles.modalCon}>
                <Dropdown
                  label='어떤 실수를 했나요?'
                  baseColor={"#00BCD4"}
                  data={field}
                  onChangeText={(category)=>setCategory(category)}
                />
                <TextField
                    label={'어떻게 실수를 했나요?'}
                    highlightColor={'#00BCD4'}
                    labelColor={'#00BCD4'}
                    onChangeText={(t)=>{mistake=t}}
                  />
                <TouchableOpacity
                  onPress={()=> missAdd()}
                  style={styles.button}>
                  <Text style={styles.text}>추☆가</Text>
                </TouchableOpacity>
              </View>
          </Modal>
          </View>
        </ScrollView>
        </View>
        <TouchableOpacity
          onPress={props.flip}
          style={styles.button}>
          <Text style={styles.text}>일정보기</Text>
        </TouchableOpacity>
        <View style={styles.container}>
        </View>
      </View>

      <Modalize ref={modalRef} HeaderComponent={() => renderHeader()} snapPoint={430}>
        <ScrollView>
        <CheckList/>
        {missSave()}
        </ScrollView>
      </Modalize>
    </>
  );
}