import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from "axios";
import CarbonTable from "./components/CarbonTable";


class App extends Component {
  constructor(){
    super();
    this.state = {
      contacts : []
    };
    this.updateMyContacts = this.updateMyContacts.bind(this);
  }

updateMyContacts(data){
  let oldState = this.state.contacts;
  let changedState = oldState.slice();
  let newTuple =   {
    id: data.id,
    username: data.username,
    first_name: data.first_name,
    last_name: data.last_name,
    is_superuser: data.is_superuser,
    is_staff: data.is_staff,
    is_active: data.is_active,
  }
  changedState.push(newTuple);
  // let newState = Object.assign({}, oldState, newTuple);
  this.setState({
    contacts: changedState
  });
}
 componentDidMount() {
   axios
     .get('http://127.0.0.1:8000/users/')
     // .get("https://jsonplaceholder.typicode.com/users/")
     .then(response => {
       // create an array of contacts only with relevant data
       const newContacts = response.data.map(c => {
         return {
           id: c.id,
           username: c.username,
           first_name: c.first_name,
           last_name: c.last_name,
           is_superuser: c.is_superuser,
           is_staff: c.is_staff,
           is_active: c.is_active,
         };
       });


       // create a new "State" object without mutating
       // the original State object.
       const newState = Object.assign({}, this.state, {
         contacts: newContacts
       });

       // store the new state object in the component's state
       this.setState(newState);
     })
     .catch(error => console.log(error));
 }

  render() {
    return (
      <div className="App">
        <CarbonTable updateMyContacts={this.updateMyContacts} contacts={this.state.contacts}/>
      </div>
    );
  }
}

export default App;
