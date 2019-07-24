import React, { Component } from 'react';
import Modal from './components/Modal';


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
    completed: false,
  }
];


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      modal: false,
      viewCompleted: true,
      activeItem: {
        title: "",
        description: "",
        completed: false,
      },
      todoList: TodoItems,
    };
  }

  toggle = () => {
        this.setState({ modal: !this.state.modal });
      };

  handleSubmit = item => {
    this.toggle();
    alert("save" + JSON.stringify(item));
  };
  handleDelete = item => {
    alert("delete" + JSON.stringify(item));
  };
  createItem = () => {
    const item = { title: "", description: "", completed: false };
    this.setState({ activeItem: item, modal: !this.state.modal });
  };
  editItem = item => {
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

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
        <span onCLick={() => this.displayCompleted(true)} className={this.state.viewCompleted ? "active":""}> Complete </span>
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
          <button onClick={() => this.editItem(item)} className="btn btn-secondary mr-2" > Edit </button>
          <button onClick={() => this.handleDelete(item)} className="btn btn-danger"> Delete </button>
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
                    <button onClick={this.createItem} className="btn btn-primary">Add task</button>
                  </div>

                  {/* adding render table list here */}
                  {this.renderTabList() }

                  <ul className="list-group list-group-flush">
                    {/* list of TODO */}
                    {this.renderItems() }
                  </ul>
              </div>
          </div>
        </div>
        {this.state.modal ? (
              <Modal
                activeItem={this.state.activeItem}
                toggle={this.toggle}
                onSave={this.handleSubmit}
              />
            ) : null}
      </section>

    );
  };
}
export default App;
