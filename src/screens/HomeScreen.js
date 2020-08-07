import React, { useRef, Component, useState } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet, Button, Dimensions, ScrollView, Animated, TextInput, RefreshControl, Image } from 'react-native';
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
import { FloatingAction } from 'react-native-floating-action';


///////////global var
var user_id, user_age, user_gender, mistake, _category, _category2;
var data = [];
var miss = [];
var miss2 = [];
const { height, width } = Dimensions.get('window');

const actions = [
  {
  text: 'add mistake',
  name: 'bt_mistake',
  position: 2,
  color:'#3C1278'
}, 
{
  text: 'add schedule',
  name: 'bt_add',
  position: 1,
  color:'#3C1278'
},
];

const wait = (timeout) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}



//front view///////////////////////////////////////////////////

function FrontView(props) {

  const modalRef = React.createRef();
  const th=this;
  const [cate, setCate] = useState(0)
  const [refreshing, setRefreshing] = React.useState(false);

  var date = +new Date().getFullYear()+"."+(new Date().getMonth()+1)+"."+new Date().getDate();

  const getMiss = () => {//only id check
    _category = cate;
    // var id = th.props.navigation.dangerouslyGetParent().getParam('user', 'undefined');
    var url = 'http://192.249.19.242:6480/mistake';
    axios.post(url, {
      id: user_id,
      category: cate,
    })
    .then(function (response) {
      miss=response.data
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  const renderHeader = () => (
    <View style={styles.modal__header}>
      <Text style={styles.modal__headerText}>MY MISTAKE</Text>
    </View>
  );
  const onOpen = (e) => {
    setCate(e);
    _category = e;
    const modal = modalRef.current;
    var url = 'http://192.249.19.242:6480/mistake';
    axios.post(url, {
      id: user_id,
      category: _category,
    })
    .then(function (response) {
      miss = null;
      miss=response.data;
      console.log(_category + "@@@@@@@@@@@@@@@@@@@@");
      if (modal) {
        modal.open();
      }

    })
    .catch(function (error) {
      console.log(error);
    });

    }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    wait(2000).then(() => setRefreshing(false));
  }, []);


  return (
    <>
    <View>
    <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> }>

        <ImageBackground source={require("../assets/day.jpg")} style={styles.image}>

        <View style={styles.container}>
        <View>
          <Text style={{fontSize: 40, marginTop: 50, marginLeft: 9,fontWeight: 'bold',color:'white'}}>{date}</Text>
          <TouchableOpacity onPress={props.flip}>
            <Image source={require("../assets/moon.png")} style={styles.moon}></Image>
          </TouchableOpacity> 
        </View>

        <View style={{flex:7}}>
              <View>
                  {data.map((item, index)=>{
                    return(
                    <View>
                      <Card style={styles.card}>
                        <TouchableOpacity onPress={() => {onOpen(item.category)}}>
                        <Text style={styles.cardtext}>{item.schedule}</Text>
                        </TouchableOpacity>
                      </Card>
                    </View>
                    );
                  })}
              </View>  
          </View>
          </View>
        </ImageBackground>
        </ScrollView>
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
          <View style={{alignItems:'center'}}>
          <Card style={styles.card}>
          <Text style={styles.cardtext}>{item.label}</Text>
          </Card>
          </View>);
          })}
      </View>
    )
  }
}


//backview/////////////////////////////////////////////
function BackView(props) {
  const modalRef2 = React.createRef();
  const th=this;
  const [cate, setCate] = useState(0);
  const [category, setCategory] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [refresh, setRefresh] = React.useState(false);
  var date = +new Date().getFullYear()+"."+(new Date().getMonth()+1)+"."+new Date().getDate();
  var field=[{value:"Relationship"}, {value:"Workplace"}, {value:"ToMySelf"}];


  const missSave = () => {//db
    if (modalRef2.current) {
      onClose();
      Toast.show('저장되었습니다.')
    }
  };
  const onRefresh = React.useCallback(() => {
    setRefresh(true);

    wait(2000).then(() => setRefresh(false));
  }, []);



  const renderHeader = () => (
    <View style={styles.modal__header}>
      <Text style={styles.modal__headerText}>오늘 하루 반성하자귱-☆</Text>
    </View>
  );
  const onOpen = (e) => {
    setCate(e)
    _category2 = e;
    const modal = modalRef2.current;
    var url = 'http://192.249.19.242:6480/mistake';
    axios.post(url, {
      id: user_id,
      category: e,
    })
    .then(function (response) {
      miss = null;
      miss=response.data;
      miss = JSON.parse(JSON.stringify(miss));
      miss2=[];
      for(let j=0;j<miss.length;j++){
        if(miss[j].label != null){
          miss2.push(miss[j].label);
        }
      }
      console.log(e + "kkkkkkkkkkkk");
      if (modal) {
        modal.open();
      }

    })
    .catch(function (error) {
      console.log(error);
    });
  };

  const onClose = () => {
    const modal = modalRef2.current;

    if (modal) {
      modal.close();
    }
  };

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

  // const addMiss = () => {//only id check
  //   var url = 'http://192.249.19.242:6480/addMiss';
  //   axios.post(url, {
  //     id: user_id,
  //     age: '20',
  //     gender: '여',
  //     category: category,
  //     label: this.state.mistake
  //   })
  //   .then(function (response) {
      
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });
  // };

  return (
    <>
      <View>

       <ScrollView
          contentContainerStyle={{
            flex: 1,
            backgroundColor: 'pink',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          refreshControl={
            <RefreshControl refreshing={refresh} onRefresh={onRefresh} /> }
        >



      <ImageBackground source={require("../assets/night.jpg")} style={styles.image}>

      <View style={styles.container}>
        <View>
          <Text style={{fontSize: 40, marginTop: 50, marginLeft: 9,fontWeight: 'bold',color:'white'}}>{date}</Text>
          <TouchableOpacity onPress={props.flip}>
            <Image source={require("../assets/sun.png")} style={styles.moon}></Image>
          </TouchableOpacity> 
        </View>

        <View style={{flex:7}}>
          <View>
            {data.map((item, index)=>{
              return(
              <View>
              <Card style={styles.card}>
              <TouchableOpacity onPress={() => {setCate(item.category), getMiss(),onOpen(item.category)}}>
              <Text style={styles.cardtext}>{item.schedule}</Text>
              </TouchableOpacity>
              </Card>
              </View>);
              })}
          </View>  

        </View>
        </View>
        </ImageBackground>

      </ScrollView>
      </View>

      <Modalize ref={modalRef2} HeaderComponent={() => renderHeader()} snapPoint={430}>
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
              <Text style={styles.btntext}>저장하기</Text>
            </TouchableOpacity>
          </View>
      </View>
    )
  }
}



///main page////////////////////////
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      isFlipped: false, 
      num:true,
      refreshing: false,
      category: "",
      isModalVisible: false,
      field: [{value:"Relationship"}, {value:"Workplace"}, {value:"ToMySelf"}],
    };
    this.flip = this.flip.bind(this);

    this.missAdd = this.missAdd.bind(this);
    this.addMiss = this.addMiss.bind(this);
    this.toggleModal = this.toggleModal.bind(this);

  }

  getDaily(){//only id check
    console.log('aaaaaaaaa')
  };

  flip=()=> {
    this.setState({
      isFlipped: !this.state.isFlipped,
    });
  }

  missAdd = () => {   //db
    console.log("missADD in!!");
      this.toggleModal();
      this.addMiss();
      Toast.show('추가되었습니다.')
    };
  
  toggleModal = () => {
    console.log("toggle in");
    var bool = this.state.isModalVisible;
    this.setState({isModalVisible: !bool});
    };

  addMiss = () => {//only id check
    var cat;
    if(this.state.category === 'Relationship'){
      cat = 1
    }else if(this.state.category === 'Relationship'){
      cat = 2
    }else{
      cat = 3
    }
      axios.post('http://192.249.19.242:6480/addMiss', {
          id: user_id,
          age: user_age,
          gender: user_gender,
          category: cat,
          label: mistake
      })
      .then(function (response) {
          
      })
      .catch(function (error) {
          console.log(error);
      });
    };



  render() {
    user_id = this.props.navigation.dangerouslyGetParent().getParam('user', 'undefined');
    user_age = this.props.navigation.dangerouslyGetParent().getParam('age', 'undefined');
    user_gender = this.props.navigation.dangerouslyGetParent().getParam('gender', 'undefined');
    var url = 'http://192.249.19.242:6480/daily';
    axios.post(url, {
      id: user_id,
    })
    .then(function (response) {
      console.log("render start "+user_id+" "+user_age+" "+user_gender);
      data=response.data
    })
    .catch(function (error) {
      console.log(error);
    });
    
    return (

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

        <FloatingAction
        ref={(ref) => { this.floatingAction = ref; }}
        color='#3C1278'
        actions={actions}
        onPressItem={
          (name) => {
            // if(name == 'bt_category'){this.props.navigation.navigate('Category');}
            if(name=='bt_add'){this.props.navigation.navigate('Record', { user: user_id })}
            else if(name=='bt_mistake'){
              console.log('aaaaaaaaa')
              this.toggleModal();
            }
          }
        }
      />

        <View>

        <Modal isVisible={this.state.isModalVisible}> 
          <View style={styles.modalCon}>
              <Dropdown
                label='어떤 실수를 했나요?'
                baseColor={'#3C1278'}
                data={this.state.field}
                onChangeText={(category)=>this.setState({category: category})}
              />
              {/* <TextInput
                placeholder = "Enter your ID"
                style={styles.input}
                maxLength={15}
                onChangeText={(id) => this.setState({id})}
                value={this.state.id}
              /> */}
                <TextField
                label={'어떻게 실수를 했나요?'}
                highlightColor={'#3C1278'}
                labelColor={'#3C1278'}
                onChangeText={(t)=>{mistake=t}}
              />

              <View style={{flexDirection:'row', justifyContent:'center'}}>
                <TouchableOpacity
                  onPress={()=> this.missAdd()}
                  style={styles.button}
                  >
                  <Text style={styles.btntext}>추☆가</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={()=>  this.toggleModal()}
                  style={styles.button}>
                  <Text style={styles.btntext}>뒤☆로</Text>
                </TouchableOpacity>
              </View>

            </View>
        </Modal>

      </View>




      </View>
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
  input: {
    margin: 5,
    padding: 6,
    borderRadius: 8,
    marginBottom: 8,
    paddingHorizontal: 10,
    backgroundColor: "#eceff1"
  },
  image:{
    width,
    height,
    resizeMode: 'contain',
  },
  moon:{
    width: 45, 
    height: 45,
    marginLeft:60,
    resizeMode: 'contain'
  },
  frontStyles: {
    backgroundColor: '#FAED7D',
    justifyContent: 'center',
    height,
    width
  },
  backStyles: {
    backgroundColor: '#8993a2',
    justifyContent: 'center',
    height,
    width
  },
  daybutton: {
    backgroundColor: '#00000000',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:20,
    borderWidth:4,
    borderColor: '#3C1278',
    width: 100,
    height: 50,
    alignSelf: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#DAD9FF',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:30,
    width: 78,
    height: 50,
    alignSelf: 'center',
    marginBottom: 20,
    //////////////////////
    flexDirection:'row'
  },
  btntext: {
    color: 'white',
    fontWeight:'bold',
    fontSize: 17
  },
  text: {
    color: 'white',
  },
  card:{
    height: 50,
    marginTop: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    opacity: 0.75,
  },
  cardtext:{
    color:'black',
    fontSize: 20,
    fontWeight: '200',
    justifyContent: 'center'
  },
//modalize
  modal__header: {
    paddingVertical: 15,
    marginHorizontal: 15,

    borderBottomColor: '#5112AB',
    borderBottomWidth: 3,
  },
  modal__headerText: {
    fontSize: 18,
    fontWeight: 'bold',
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
  }
});