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
      viewCompleted: true,
      todoList: TodoItems,
    };
  }

    // changing state of viewCompleted 
  displayCompleted = status => {
    if(status){
      return this.setState({ viewCompleted: true});
    }
    else{
      return this.setState({ viewCompleted: false });
    }
  };

  renderTabList = () => {
    return (
      <div className="my-5 tab-list">
        <span onCLick={() => this.displayCompleted(true)} className={this.state.viewCompleted ? "active": ""}> Complete </span>
        <span onClick={() => this.displayCompleted(false)} className={this.state.viewCompleted ? "":"active"}> Incomplete </span>
      </div>
    );
  };


  renderItems = () => {
    const { viewCompleted } = this.state;
    const newItems = this.state.todoList.filter(
      item => item.completed = viewCompleted,
    );

    return newItems.map(item => (     
      <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
        <span className={'todo-title mr-2 ${this.state.viewCompleted ? "completed-todo" : ""} '} title={item.description}> {item.title} </span>
        <span>
          <button className="btn btn-secondary mr-2" > Edit </button>
          <button className="btn btn-danger"> Delete </button>
        </span>
      </li>
    ));
  };

  render () {
    return (
      <section className="content">
        <h1 className="text-white text-uppercase text-center my-4">ToDo App</h1>
        <div className="row">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
              <div className="card p-3">
                  <div className="">
                    <button className="btn btn-primary">Add task</button>
                  </div>

                  {/* adding render table list here */}
                  {this.renderTabList() }

                  <ul className="list-group list-group-flush">
                    {this.renderItems() }
                  </ul>
              </div>
          </div>
        </div>
      </section>

    );
  };
}
export default App;
