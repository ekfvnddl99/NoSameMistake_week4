import React, { Component } from 'react';
import axios from 'axios';
import Zoom from 'react-reveal/Zoom';
import Flip from 'react-reveal/Flip'

class App extends Component {
  constructor() {
    super();
    this.state = {
      dataku: [],
    };
}

klikPost(e){
  e.preventDefault();
  var url = 'http://localhost:80/data';
  axios.post(url, {
    name: this.inputname.value,
    password: this.inputpassword.value
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
  this.inputname.value = '';
  this.inputpassword.value = '';
};

klikGet(e){
  e.preventDefault();
  var url = 'http://localhost:80/data';
  axios.get(url)
  .then((ambilData) => {
    console.log(ambilData.data);
    this.setState({
      dataku: ambilData.data,
    }) 
  })
};

render() {
  const dataMongo = this.state.dataku.map((item, index)=>{
    var arrayku = ['Name: ',item.name,', Password: ', item.password, ' th.'].join(' ');
    return <p key={index}>{arrayku}</p>;
  })
  return (
   <div className="container">
   <Zoom>
     <center style={{margin:'25px'}}>
        <Flip><h3>React ♥ Express ♥ MongoDB</h3></Flip>
     
     <form>

  <div className="form-group" style={{margin:'15px'}}>
    <input className="form-control" type="text" id="name" 
    ref={ inname => this.inputname = inname }
    placeholder="Input name!"/>
  </div>

  <div className="form-group" style={{margin:'15px'}}>
    <input className="form-control" type="number" id="password" 
    ref={ inpassword => this.inputpassword = inpassword }
    placeholder="Input password!"/>
  </div>
  
  <button className="btn btn-primary" style={{width:'100px'}}
  onClick={this.klikPost.bind(this)}>POST</button>
  
  <button className="btn btn-success" style={{margin:'15px',width:'100px'}}
  onClick={this.klikGet.bind(this)}>GET</button>

</form>

     <div>
       { dataMongo }
     </div>
     </center>
     </Zoom>
   </div>
  );
 }
 }
 
export default App;