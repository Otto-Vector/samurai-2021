import React, { Suspense, useEffect } from 'react'
import './App.css'
import store, { AppStateType } from './redux/redux-store'
import {
    BrowserRouter,
    Redirect,
    Switch,
    Route,
} from 'react-router-dom'
import {
    connect,
    Provider, useDispatch, useSelector,
} from 'react-redux'
import { initializedAll } from './redux/app-reducer'
import { compose } from 'redux'

import Preloader from './components/common/Preloader/Preloader'
import HeaderContainer from './components/Header/HeaderContainer'
import SidebarContainer from './components/Sidebar/SidebarContainer'

const DialogsContainer = React.lazy( () => import('./components/Dialogs/DialogsContainer') )
const UsersContainer = React.lazy( () => import('./components/Users/UsersContainer') )
const ProfileContainer = React.lazy( () => import('./components/Profile/ProfileContainer') )
const LoginContainer = React.lazy( () => import('./components/Login/LoginContainer') )


const AppFunc: React.FC = () => {

    const initialazed = useSelector( ( state: AppStateType ) => state.app.initialazed )
    const dispatch = useDispatch()

    useEffect( () => {
        if (!initialazed) dispatch( initializedAll() )
    }, [ initialazed, initializedAll ] )

    if (!initialazed) return <Preloader/>

    return (
        <div className='app-wrapper'>
            <HeaderContainer/>
            <SidebarContainer/>
            <div className='app-wrapper-content'>
                <Suspense fallback={ <Preloader/> }>
                    <Switch>
                        <Route exact path='/' render={ () => <Redirect to={ '/profile' }/> }/>
                        <Route path='/dialogs' render={ () => <DialogsContainer/> }/>
                        <Route path='/profile/:userId?' render={ () => <ProfileContainer/> }/>
                        <Route path='/users' render={ () => <UsersContainer/> }/>
                        <Route path='/login' render={ () => <LoginContainer/> }/>
                        <Route render={ () => <h1>This site NOT FOUND. Try another address</h1> }/>
                    </Switch>
                </Suspense>
            </div>
        </div>

    )
}


const AppContainer: React.FC = () => {
    return <BrowserRouter>
        <Provider store={ store }>
            <AppFunc/>
        </Provider>
    </BrowserRouter>
}


export default AppContainer
