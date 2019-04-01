import { createStore } from 'redux';


const initialState = {
    todos: [{todo: 'learn redux', completed: false}]
}

function reducer(state = initialState, action){
    console.log(action)
    switch (action.type){
        case ADD_TODO: 
            const newTodo = { todo: action.payload, completed: false }
            return { todos: [...state.todos, newTodo] };
        case TOGGLE_COMPLETED:
            const updatedTodos = state.todos.map((todoObj, i)=>{
                if(i === action.payload){
                    todoObj.completed = !todoObj.completed
                    return todoObj;
                } else {
                    return todoObj;
                }
            })
            return {todos: updatedTodos} // .map returns a NEW array
        case REMOVE_COMPLETED:
            const filteredTodos = state.todos.filter((todoObj, i)=>{ return todoObj.completed === false });
            return { todos: filteredTodos }
        default:
            return state;
    }
}

/// reducer should return NEW object everytime, even with DEFAULT

// our store will be the state that is being returned


export const REMOVE_COMPLETED = 'REMOVE_COMPLETED'
export const TOGGLE_COMPLETED = 'TOGGLE_COMPLETED'
export const ADD_TODO = 'ADD_TODO'
export default createStore(reducer,  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
