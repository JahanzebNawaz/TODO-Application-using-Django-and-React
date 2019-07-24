import React, { Component } from 'react';
import Modal from './components/Modal';
import axios from "axios";


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
      todoList: [],
    };
  }

  componentDidMount(){
    this.refreshList();
  }
  // to refresh list everytime request is send to server to get data into ItemList
  refreshList = () => {
    axios
        .get("/todos/")
        .then(res => this.setState({ todoList: res.data}))
        .catch(err => console.log(err))
  }

  // after getiing data from server displayed into renderTablist and renderItems method
  // changing state of viewCompleted 
  displayCompleted = status => {
    if(status){
      return this.setState({ viewCompleted: true});
    }
    else{
      return this.setState({ viewCompleted: false });
    }
  };


  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  // handling the submit function
  // function takes care of both the create and update operations
  handleSubmit = item => {
    this.toggle();
    if(item.id){
      axios
        .put(`/todos/${item.id}/`, item)
        .then(res => this.refreshList());
      return;
    }
    else {
      axios
      .post("/todos/", item)
      .then(res => this.refreshList());
    }
  };

  // handling delete function
  handleDelete = (item) => {
    axios
        .delete(`/todos/${item.id}`)
        .then(res => this.refreshList());
  };

  // create Item
  createItem = () => {
    const item = { title: "", description: "", completed: false };
    this.setState({ activeItem: item, modal: !this.state.modal });
  };
  editItem = item => {
    this.setState({ activeItem: item, modal: !this.state.modal });
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
        <span className={`todo-title mr-2  `} title={item.description}> {item.title} </span>
        <span>
          <button onClick={() => this.editItem(item)} className="btn btn-secondary mr-2" > {" "}Edit{" "}</button>
          <button  onClick={() => this.handleDelete(item)} className="btn btn-danger"> Delete{" "} </button>
        </span>
      </li>
    ));
  };

  // getting data from server finished


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
