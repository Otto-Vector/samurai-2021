import React, {Suspense, useEffect} from 'react';
import './App.css';
import store, {AppStateType} from "./redux/redux-store";
import {
  BrowserRouter,
  Redirect,
  Switch,
  Route,
  withRouter,
} from "react-router-dom";
import {
  connect,
  Provider
} from "react-redux";
import {initializedAll} from "./redux/app-reducer";
import {compose} from "redux";
import Navbar from './components/Navbar/Navbar';

import Preloader from "./components/common/Preloader/Preloader";
import HeaderContainer from "./components/Header/HeaderContainer";

// const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'))
// const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'))
// const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'))
// const LoginContainer = React.lazy(() => import('./components/Login/LoginContainer'))

type MapStatePropsType = {
  initialazed: boolean
}

type MapDispatchType = {
  initialazedAll: Function
}

type OwnProps = {}

type PropsType = MapStatePropsType & MapDispatchType & OwnProps

const AppFunc: React.FC<PropsType> = ({initialazedAll, initialazed}) => {

  useEffect(()=>{
    initialazedAll()
  },[])

    if (!initialazed){
      return (<Preloader/>)
    }
    }
  //
  //   return (
  //     <div className='app-wrapper'>
  //       <HeaderContainer/>
  //       <Navbar/>
  //       <div className='app-wrapper-content'>
  //         <Suspense fallback={<Preloader/>}>
  //         <Switch>
  //           <Route exact path='/' render={() => <Redirect to={'/profile'}/>}/>
  //           <Route path='/dialogs' render={() => <DialogsContainer/>}/>
  //           <Route path='/profile/:userId?' render={() => <ProfileContainer/>}/>
  //           <Route path='/users' render={() => <UsersContainer/>}/>
  //           <Route path='/login' render={() => <LoginContainer/>}/>
  //           <Route render={() => <h1>This site NOT FOUND. Try another address</h1>}/>
  //         </Switch>
  //         </Suspense>
  //       </div>
  //     </div>
  //
  // }
// }

// let mapStateToProps = (state: AppStateType): MapStatePropsType => {
//   return {
//     initialazed: state.app.initialazed
//   }
// }
//
// let App = compose(
//   withRouter,
//   connect(mapStateToProps, {initialazedAll: initializedAll})
// )(AppFunc)
//
//
// export const AppContainer: React.FC = (props) => {
//   return <BrowserRouter>
//     <Provider store={store}>
//       <App/>
//     </Provider>
//   </BrowserRouter>
// }
//
//
// export default App;
