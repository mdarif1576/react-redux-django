import { Route, Switch, BrowserRouter } from 'react-router-dom'
import SignIn from "./components/SignIn";
import Header from "./components/Header";
import AddTodo from "./components/AddTodo";
import { createStore } from "redux"
import { Provider } from 'react-redux'
import reducer from './Reducers/reducer'
import './App.css';
import Footer from './components/Footer';

const initValue = {
  data: []
}

const store = createStore(reducer, initValue)

function App(props) {


  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={SignIn} />
            <Route exact path='/addtodo/:name' render={(routeParams) =>  <Provider store={store}><AddTodo {...routeParams} /></Provider>} />
        </Switch>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;


/*
TodoApp ---> <Header />, <AddTodo />, <TodoList />, <VisibilityFilters />

AddTodo-----> input text, add button (add todo)

TodoList-----> render list of todo's ------> onclicking a particular todo ----> <Todo /> (new page)

VisibilityFilters---> renders a simple set of filters: all, completed, and incomplete.

Note: Provide a login and password form and after accepting the user info (no authentication)
display the user info on the right hand side of nav bar in todo list page.


*/
