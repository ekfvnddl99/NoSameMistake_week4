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
import Constants from 'expo-constants';

var user_id
var data = [];
var miss = [];
var miss2 = [];



const { height, width } = Dimensions.get('window');

//front view///////////////////////////////////////////////////

function FrontView(props) {

  const modalRef = React.createRef();

  const renderHeader = () => (
    <View style={styles.modal__header}>
      <Text style={styles.modal__headerText}>앗 나의 실수 데헷-☆</Text>
    </View>
  );

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
      console.log('qqqqqqqqqqqqqqqqqqqqq')
      miss=response.data
      console.log('qqqqqqqqqqqqqqqqqqqqq')
      console.log(miss)
      console.log('qqqqqqqqqqqqqqqqqqqqq')
      // console.log(JSON.parse(JSON.stringify(miss)));
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

  var date = "오늘은 "+new Date().getFullYear()+"년 "+(new Date().getMonth()+1)+"월 "+new Date().getDate()+"일이라귯-☆" + "오늘 나의 일정/일정 클릭해서 실수 확인";

  return (
    <>
      <View style={styles.container}>

        <View>
          <Text style={{fontSize: 25, marginTop: 50, marginLeft: 16,fontWeight: '200',}}>{date}</Text>
        </View>

        <View style={{flex:7}}>

          <ScrollView  style={{marginVertical:20}} vertical>

            <View>
                {data.map((item, index)=>{
                  return(
                  <View>

                    <Card style={styles.card}>
                      <TouchableOpacity onPress={() => {setCate(item.category), getMiss(), onOpen(), console.log('kkkkk'+miss.length)}}>
                      <Text>{item.schedule}</Text>
                      </TouchableOpacity>
                    </Card>

                  </View>
                  );
                  
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
          <Front/>
        </ScrollView>

      </Modalize>
    </>
  );
}

class Front extends Component{
  render(){
    return(
      <View>
            {miss.map((item, index)=>{
              return(
              <View>
              <Card style={styles.card}>
              <Text>{item.label}</Text>
              </Card>
              </View>);
              })}
          </View>  
    )
  }
}


//backview/////////////////////////////////////////////

var mistake;
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



const renderLabel = (label, style) => {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <Card style={{padding: 10, margin: 10, height: 50}}>
       <View>
         <Text style={style}>{label}</Text>
       </View>
     </Card>
    </View>
  )
}

/////////////checkbox

class CheckList extends Component {
  state = { selectedFruits: [] }

  onSelectionsChange = (selectedFruits) => {
    // selectedFruits is array of { label, value }
    console.log(selectedFruits)
    this.setState({ selectedFruits })
  }

  selectMiss = () => {//only id check
    var url = 'http://192.249.19.242:6480/selectMiss';
    for(var i=0; i<this.state.selectedFruits.length; i++){
      axios.post(url, {
        id: user_id,
        label: this.state.selectedFruits[i].label
      })
      .then(function (response) {
        
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  };

  render () {
    return (
      <View>
        <SelectMultiple
          items={miss2}
          renderLabel={renderLabel}
          selectedItems={this.state.selectedFruits}
          onSelectionsChange={this.onSelectionsChange} />
          <View style={styles.content__button}>
            <TouchableOpacity
              onPress={this.selectMiss.bind(this)}
              style={styles.button}>
              <Text style={styles.text}>저장하기</Text>
            </TouchableOpacity>
          </View>
      </View>
    )
  }
}

var refreshing = false;



///main page////////////////////////
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      isFlipped: false, 
      num:true,
      refreshing: false
    };
    this.flip = this.flip.bind(this);
  }

  getDaily(){//only id check
    console.log('aaaaaaaaa')
    
  };

  flip=()=> {
    // this.getDaily.bind(this);
    this.setState({
      isFlipped: !this.state.isFlipped,
    });
  }

  _onRefresh = () => {
    this.setState({refreshing: true});
    wait(2000).then(() => setRefreshing(false));
  }


  render() {
    // onfrefrsh();
    user_id = this.props.navigation.dangerouslyGetParent().getParam('user', 'undefined');
    // getDaily()
    // this.getDaily.bind(this);
    var url = 'http://192.249.19.242:6480/daily';
    axios.post(url, {
      id: user_id,
    })
    .then(function (response) {
      //data = [];
      console.log("start");
      data=response.data
      _onRefresh();
    })
    .catch(function (error) {
      console.log(error);
    });
    
    return (
      // <MyContext.Provider value={data}>
      <View style={styles.container}>
        <FlipComponent
          isFlipped={this.state.isFlipped}
          frontView={
            <FrontView flip={this.flip} />
          }
          backView={
            <BackView flip={this.flip} />
          }
          frontStyles={styles.frontStyles}
          backStyles={styles.backStyles}
          rotateDuration={1000}
        />
      </View>
      // </MyContext.Provider>
    );
  }
}

////////////////////////////////////////////////////////////
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
    height: 600,
    width: 350
  },
  backStyles: {
    backgroundColor: '#8993a2',
    justifyContent: 'center',
    height,
    width
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
  card:{
    elevation:5,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 3,
    shadowOpacity: 0.5,
    height: 70,
    width: width - 30,
    marginTop: 12,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 6
  }
});

