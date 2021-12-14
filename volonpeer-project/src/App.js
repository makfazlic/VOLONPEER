import './css/App.css';
import Header from './components/Header';
import Jumbotron from './components/Jumbotron';
import Features from './components/Features';
import Footer from './components/Footer';
import Stats from './components/Stats'
import Parallax from './components/Parallax';
import CallToAction from './components/CallToAction';


import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {

  return (
    <Router>
      <Switch>

        <Route path="/login">
          <Header />
        </Route>

        <Route path="/">
          <div>
            <Header />
            <Jumbotron />
            <Features />
            <Stats />
            {/*
            - Contact form
            - Another call to action
            */}
            <Parallax />
            <CallToAction />
            <Footer />
          </div>
        </Route>
      </Switch>
    </Router>

  );
}


export default App;
