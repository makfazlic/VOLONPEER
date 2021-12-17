import './css/App.css';

import { useAuth } from './firebase'


import Header from './components/Header';
import Jumbotron from './components/Jumbotron';
import Features from './components/Features';
import Footer from './components/Footer';
import Stats from './components/Stats'
import Parallax from './components/Parallax';
import CallToAction from './components/CallToAction';
import Contanct from './components/Contact';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import NewPosts from './components/NewPosts';
import Posts from './components/Posts';



import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


{/*

  Home - Visible by: Everyone
  Posts - Visible by: Everyone -> to interact login
  Dashboard - Visible by: User -> User type specific
  Messages - Visible by: User -> Not user type specific
  Leaderboard - Visible by: Everyone

  Log in
  Sign up


*/}


function App() {

  

  const currentUser = useAuth()

  return (
    <Router>
      <Switch>

        <Route exact path="/">
          <div>
            <Header location="home" user={currentUser}/>
            <Jumbotron />
            <Features />
            <Stats />
            <Parallax />
            <CallToAction />
            <Contanct />
            <Footer />
          </div>
        </Route>

        <Route path="/privacy-policy">
          <Header location="privacy-policy" user={currentUser}/>
          privacy policy
        </Route>

        <Route path="/leaderboard">
          <Header location="leaderboard" user={currentUser}/>
          leaderboard
        </Route>

        <Route path="/posts">
          <Header location="posts" user={currentUser}/>
          
            <Posts />
                
          
        </Route>

        <Route path="/dashboard">
          <Header location="dashboard" user={currentUser}/>
          Dashboard of user: {currentUser && currentUser.email}
        </Route>

        <Route path="/newpost">
          <Header location="newpost" user={currentUser}/>
          <NewPosts />
          <Footer />
        </Route>

        <Route path="/profile">
          <Header user={currentUser}/>
          <Profile />
          <Footer />
        </Route>

        <Route path="/register">
          <div className="flex flex-col h-screen justify-evenly">
            <Header location="register" user={currentUser}/>
            <Register />
            <Footer />
          </div>
        </Route>

        <Route path="/login">
          <div className="flex flex-col h-screen justify-evenly">
            <Header location="login" user={currentUser}/>
            <Login />
            <Footer />
          </div>
        </Route>

      </Switch>
    </Router>

  );
}


export default App;


