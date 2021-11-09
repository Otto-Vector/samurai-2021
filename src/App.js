import React, {Suspense} from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import {Route, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {initialazedAll} from "./redux/app-reducer";
import {compose} from "redux";
import {Example} from "./components/Example/Example";

import Preloader from "./components/common/Preloader/Preloader";
import HeaderContainer from "./components/Header/HeaderContainer";

const DialogsContainer = React.lazy(()=>import('./components/Dialogs/DialogsContainer'))
const UsersContainer = React.lazy(()=>import('./components/Users/UsersContainer'))
const ProfileContainer = React.lazy(()=>import('./components/Profile/ProfileContainer'))
const LoginContainer = React.lazy(()=>import('./components/Login/LoginContainer'))

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
          <Suspense fallback={<Preloader/>}>
            <Route path='/dialogs' render={() => <DialogsContainer/>}/>
            <Route path='/profile/:userId?'
                   render={() => <ProfileContainer/>}/>
            <Route path='/users' render={() => <UsersContainer/>}/>
            <Route path='/login' render={() => <LoginContainer/>}/>
            <Route path='/example' render={() => <Example/>}/>
          </Suspense>
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
