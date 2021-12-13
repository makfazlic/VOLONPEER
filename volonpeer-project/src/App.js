import './css/App.css';
import Header from './components/Header';
import Jumbotron from './components/Jumbotron';
import Features from './components/Features';
import Footer from './components/Footer';

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
            <Header/>
            <Jumbotron />
            <Features />
            <Footer />
          </div>
        </Route>
      </Switch>
    </Router>

  );
}


export default App;
