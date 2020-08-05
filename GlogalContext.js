import React from 'react';

const UserContext = React.createContext({value: 'basic id', changev: () => {}});

export class UserProvider extends React.Component {
  state = {
    value: 'BASIC CONCEPT',
    changev: this.changev
  }

//   actions = {
//       setValue: (value) => {
//           this.setState({value});
//       }
//   }

  changev = (data) => {
      console.log(data);
      this.setState({value: data});
  }

  render () {
    return (
      <UserContext.Provider value = {this.state}>
          {this.props.children}
      </UserContext.Provider>
    )
  }
};

export const UserConsumer = UserContext.Consumer;