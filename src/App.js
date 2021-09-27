import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import {Route} from "react-router-dom";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";

const App = (props) => {
    // let state = props.state.getState()
  return (
      <div className='app-wrapper'>
        <Header/>
        <Navbar />
        <div className='app-wrapper-content'>

          <Route path='/dialogs' render={() => <DialogsContainer />}/>
          <Route path='/profile' render={() => <Profile />}/>
          <Route path='/users'   render={() => <UsersContainer/>}/>
          {/*<Route path='/dialogs' render={() => <Dialogs {...state.dialogsPage} dispatch = {props.state.dispatch} />}/>*/}
          {/*<Route path='/profile' render={() => <Profile {...state.profilePage} dispatch = {props.state.dispatch}/>}/>*/}
        </div>
      </div>
    )
}

export default App;
