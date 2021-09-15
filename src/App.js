import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import Dialogs from "./components/Dialogs/Dialogs";
import {Route} from "react-router-dom";

const App = (props) => {
  return (

      <div className='app-wrapper'>
        <Header/>
        <Navbar {...props.sidebar}/>
        <div className='app-wrapper-content'>

          <Route path='/dialogs' render={() => <Dialogs
            {...props.dialogsPage} dispatch = {props.dispatch} />}/>
          <Route path='/profile' render={() => <Profile
            {...props.profilePage} dispatch = {props.dispatch}/>}/>
        </div>
      </div>
    )
}

export default App;
