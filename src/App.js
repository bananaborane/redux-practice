import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import store, { ADD_TODO, TOGGLE_COMPLETED, REMOVE_COMPLETED } from './store';
    // named exports with code above



class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      store: store.getState(),
      text: ''
    }
  }

  componentDidMount(){
    store.subscribe(()=>{ this.setState({ store: store.getState() }) });
  }
  // this component App.js is now 'subscribed' to store.js, meaning it will listen whenever STORE.js is changing 

  toggleCompleted = (index)=>{
    store.dispatch({
      type: TOGGLE_COMPLETED,
      payload: index
    })
  }

  addTodo = ()=>{
    console.log('add todo fired')
    store.dispatch({ 
      type: ADD_TODO,
      payload: this.state.text
     })
     // .dispatch sends an action back to store.js
     this.setState({ text: '' })
  }

  removeCompleted = ()=>{
    store.dispatch({
      type: REMOVE_COMPLETED
    })
  }
  
  render() {
    console.log(store.getState());
    // code above has an obj called 'store' with method getState
    const todos = this.state.store.todos.map((todoObj, i)=>{return ( <p 
      style={ todoObj.completed ? { textDecoration:'line-through', color:'slategray' } : null }
      onClick={()=>{this.toggleCompleted(i)}}
      key={i}>{todoObj.todo}</p> )})
    return (
      <div className="App">
        <h1>todo app (with redux)</h1>
        <input 
          type='text' 
          onChange={e=>this.setState({ text: e.target.value })}
          placeholder='enter new task'
          value={this.state.text} />
        <button onClick={() => this.addTodo()} >add</button>
        {todos}



          <button
            onClick={()=>{this.removeCompleted()}}>remove completed tasks</button>

      </div>
    );
  }
}

export default App;



