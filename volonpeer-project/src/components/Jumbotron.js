import bg1 from '../images/bg1.jpg';

export default function Jumbotron() {
    return (
        <div className="mx-auto text-center pt-20 pb-10 bg-auto bg-cover bg-center text-white" style={{
            backgroundImage: `url(${bg1})`
          }}>
      
      
      
      
            <h1 className="text-5xl xl:text-6xl font-black">WE ARE
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blueish5 to-greenish5"> VOLONPEER
              </span>
      
            </h1>
            <p className="text-xl mx-3 xl:text-4xl my-10">Only online platoform that lets you ask for help when you need it.  </p>
            <div className="flex justify-center items-center mb-10 xl:mb-20">
      
      
              <button class="bg-greenish5 hover:bg-greenish7 py-4 px-5 rounded xl:rounded-xl text-lg xl:text-2xl font-bold text-white mr-2 xl:mr-5">Ask for help!</button>
              <button class="bg-blueish5 hover:bg-blueish7 py-4 px-8  rounded xl:rounded-xl text-lg xl:text-2xl font-bold text-white ml-2 xl:ml-5">Browse</button>
            </div>
      
            <div className="md:w-1/2 xl:w-2/5 px-3 mx-auto">
              <div class="aspect-w-16 aspect-h-9">
                <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
              </div>
            </div>
            <p className="text-xl mx-3 xl:text-3xl mt-10 xl:mt-20">Only online platoform that lets you ask for help when you need it.  </p>
            <p className="text-xl xl:text-2xl mt-10 xl:mt-20">Scroll down      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
            </p>
      
          </div>
      
        );
}
