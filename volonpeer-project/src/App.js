import './css/App.css';
import Header from './components/Header';
import Jumbotron from './components/Jumbotron';
import Features from './components/Features';
import Footer from './components/Footer';
import Stats from './components/Stats'
import Parallax from './components/Parallax';
import CallToAction from './components/CallToAction';
import Contanct from './components/Contact';


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

  return (
    <Router>
      <Switch>

      <Route path="/privacy-policy">
          <Header location="privacy-policy"/>
        </Route>

      <Route path="/leaderboard">
          <Header location="leaderboard"/>
        </Route>

      <Route path="/posts">
          <Header location="posts"/>
        </Route>

      <Route path="/signup">
          <Header location="signup"/>
        </Route>

        <Route path="/login">
          <Header location="login"/>
        </Route>

        <Route path="/">
          <div>
            <Header location="home"/>
            <Jumbotron />
            <Features />
            <Stats />
            <Parallax />
            <CallToAction />
            <Contanct />
            <Footer />
          </div>
        </Route>
      </Switch>
    </Router>

  );
}


export default App;


