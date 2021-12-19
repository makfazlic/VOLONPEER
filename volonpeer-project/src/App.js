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
import Dashboard from './components/Dashboard';
import SinglePost from './components/SinglePost'

import logo1 from './images/logo1.png';
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
            <Header location="home" user={currentUser} />
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
          <Header location="privacy-policy" user={currentUser} />
          privacy policy
        </Route>

        <Route path="/leaderboard">
          <Header location="leaderboard" user={currentUser} />
          leaderboard
        </Route>
        <Route exact path="/posts/:id/:pid" component={SinglePost}>
          <Header location="postsid" user={currentUser} />
          <SinglePost />
          <Footer />
        </Route>

        <Route path="/posts">
          <Header location="posts" user={currentUser} />
          {currentUser ? <Posts />
            : <>
              <div class="flex items-center justify-center h-screen flex flex-col w-1/3 mx-auto text-center">
                <img src={logo1} class="w-20 mb-10" />
                <p className='text-2xl font-bold '>
                  Not authorised to access
                </p>
                <div className='flex justify-center py-10'>
                  <a href='/login' class="bg-blue-500 mr-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Login</a>
                  <a href='/register' class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Register</a>
                </div>
                <p className='text-xl font-bold '>
                  Please log on to our platform to have all features                </p>
              </div>
            </>}
          <Footer />
        </Route>



        <Route path="/dashboard">
          <Header location="dashboard" user={currentUser} />
          {currentUser ? <Dashboard userName={currentUser && currentUser.email} />

            : <>
              <div class="flex items-center justify-center h-screen flex flex-col w-1/3 mx-auto text-center">
                <img src={logo1} class="w-20 mb-10" />
                <p className='text-2xl font-bold '>
                  Not authorised to access
                </p>
                <div className='flex justify-center py-10'>
                  <a href='/login' class="bg-blue-500 mr-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Login</a>
                  <a href='/register' class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Register</a>
                </div>
                <p className='text-xl font-bold '>
                  Please log on to our platform to have all features                </p>
              </div>
            </>}
          <Footer />
        </Route>

        <Route path="/newpost">
          <Header location="newpost" user={currentUser} />
          {currentUser ? <NewPosts />

            : <>
              <div class="flex items-center justify-center h-screen flex flex-col w-1/3 mx-auto text-center">
                <img src={logo1} class="w-20 mb-10" />
                <p className='text-2xl font-bold '>
                  Not authorised to access
                </p>
                <div className='flex justify-center py-10'>
                  <a href='/login' class="bg-blue-500 mr-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Login</a>
                  <a href='/register' class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Register</a>
                </div>
                <p className='text-xl font-bold '>
                  Please log on to our platform to have all features                </p>
              </div>
            </>}

          <Footer />
        </Route>

        <Route path="/profile">
          <Header user={currentUser} />
          {currentUser ? <Profile />

            : <>
              <div class="flex items-center justify-center h-screen flex flex-col w-1/3 mx-auto text-center">
                <img src={logo1} class="w-20 mb-10" />
                <p className='text-2xl font-bold '>
                  Not authorised to access
                </p>
                <div className='flex justify-center py-10'>
                  <a href='/login' class="bg-blue-500 mr-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Login</a>
                  <a href='/register' class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Register</a>
                </div>
                <p className='text-xl font-bold '>
                  Please log on to our platform to have all features                </p>
              </div>
            </>}

          <Footer />
        </Route>

        <Route path="/register">
          <div className="flex flex-col h-screen justify-evenly">
            <Header location="register" user={currentUser} />
            <Register />
            <Footer />
          </div>
        </Route>

        <Route path="/login">
          <div className="flex flex-col h-screen justify-evenly">
            <Header location="login" user={currentUser} />
            <Login />
            <Footer />
          </div>
        </Route>

      </Switch>
    </Router>

  );
}


export default App;


