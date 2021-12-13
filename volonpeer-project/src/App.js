import './css/App.css';
import Header from './components/Header';

function App() {
  return (
    <div>
      <Header />
      <Jumbotron />
    </div>


  );
}

function Jumbotron() {
  return (
    <div className="container mx-auto text-center h-screen py-48">

      <h1 className="text-7xl font-black">WE ARE
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellowish to-blueish1"> VOLONPEER
        </span>

      </h1>
      <p className="text-4xl my-10">Only online platoform that lets you ask for help when you need it.  </p>
      <div className="flex"></div>

      <div className="w-2/5 mx-auto">
        <div class="aspect-w-16 aspect-h-9">
          <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
      </div>


    </div>

  );

}

export default App;
