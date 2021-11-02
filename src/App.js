import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import {Route, withRouter} from "react-router-dom";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import LoginContainer from "./components/Login/LoginContainer";
import {connect} from "react-redux";
import {initialazedAll} from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import {compose} from "redux";
import {Example} from "./components/Example/Example";

class AppClass extends React.Component {

  componentDidMount() {
    this.props.initialazedAll()
  }


  render() {
    if (!this.props.initialazed) return <Preloader/>

    return (
      <div className='app-wrapper'>
        <HeaderContainer/>
        <Navbar/>
        <div className='app-wrapper-content'>

          <Route path='/dialogs' render={() => <DialogsContainer/>}/>
          <Route path='/profile/:userId?'
                 render={() => <ProfileContainer/>}/>
          <Route path='/users' render={() => <UsersContainer/>}/>
          <Route path='/login' render={() => <LoginContainer/>}/>
          <Route path='/example' render={() => <Example/>}/>

        </div>
      </div>
    )
  }
}

let mapStateToProps = (state) => {
  return {
    initialazed: state.app.initialazed
  }
}

let App = compose(
  withRouter,
  connect(mapStateToProps, {initialazedAll})
)(AppClass)


export default App;
