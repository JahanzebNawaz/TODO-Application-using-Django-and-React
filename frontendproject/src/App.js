import React, { Component } from 'react';


// add const variable to add demo data
const TodoItems = [
  {
    id: 1,
    title: "Demo Title One",
    description: "Welcome to Django React First Demo Description",
    completed: true,
  },
  {
    id: 2,
    title: "Demo Title Two",
    description: "Welcome to Django React Two Demo Description",
    completed: true,
  }
];


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      viewCompleted: false,
      todoList: TodoItems,
    };
    
  }
  render(){
    return(
      <h1>Welcome To Django React </h1>
    );
  }
}

export default App;
