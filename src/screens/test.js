import { StatusBar } from 'expo-status-bar';
import React, {Component, createContext, useContext, useState} from 'react';
import { StyleSheet, Text, View, Button} from 'react-native';

const MyContext= React.createContext(
   {
       title: 'molemole'
   }
)


export default function App() {
  return (
    <View style={styles.container}>
      <MyContext.Provider value={{title: 'this is title'}}>
          <A/>
      </MyContext.Provider>
    </View> 
  );
}


class A extends Component{
  render(){
    return (
      <View>
        <B/>
      </View>
    )
  }
}

class B extends Component{
    static contextType= MyContext;
    render(){
        return(
            <View>
                <Button title={this.context.title}/>
            </View>
        )
    }
}

// using hooks
// const B= (props)=>{
//     const {state1, useState} = useContext(MyContext)

//     // console.log(state)
//     return(
//         <View>
//             <Button
//                 title={state1.title}
//             />
//         </View>
//   )
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
