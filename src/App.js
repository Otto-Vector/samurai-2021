import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import {Route} from "react-router-dom";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";

const App = (props) => {
  return (
      <div className='app-wrapper'>
        <HeaderContainer/>
        <Navbar />
        <div className='app-wrapper-content'>

          <Route path='/dialogs' render={() => <DialogsContainer />}/>
          <Route path='/profile/:userId?'
                 render={() => <ProfileContainer />}/>
          <Route path='/users'   render={() => <UsersContainer/>}/>
          <Route path='/login'   render={() => <Login/>}/>
          {/*<Route path='/dialogs' render={() => <Dialogs {...state.dialogsPage} dispatch = {props.state.dispatch} />}/>*/}
          {/*<Route path='/profile' render={() => <Profile {...state.profilePage} dispatch = {props.state.dispatch}/>}/>*/}
        </div>
      </div>
    )
}

export default App;
