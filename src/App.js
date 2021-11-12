import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'


import './App.css';

import HomePage from "./pages/homepage/homepage.component"
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from "./components/header/header.component"
import { auth, createUserProfileDocument } from "./firebase/firebase.utils"
import { setCurrentUser } from './redux/user/user.actions'


class App extends React.Component {

  unsubscribeFromAuth = null

  componentDidMount() {
    const {setCurrentUser} = this.props
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth)

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
              id: snapShot.id,
              ...snapShot.data()
            })
        })
      } else {
        setCurrentUser(userAuth)
      }
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth()
  }


  
  render() {
    const About = () => (<div><h1>About Page</h1></div>)
    return (
      <div >
        <Header />
        <Routes>
          <Route exact path="/" element={<HomePage />}/>
          <Route path="/about" element={<About />}/>
          <Route path="/shop" element={<ShopPage />}/>
          <Route exact path="/signin" 
            element={this.props.currentUser === null ? (<SignInAndSignUpPage />) : (<Navigate to="/" />)}/>
        </Routes>
      </div>
    );

  }
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
