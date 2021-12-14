import logo1 from '../images/logo1.png'

export default function Footer() {
    return (
        <footer className = "p-10 footer bg-blueish10 text-white footer-center" >
  <div>
      <img src={logo1} alt="" className="h-12"/>
    <p className="font-bold">VOLONPEER Services Ltd. 
      <br/>Web Technologies and Services
    </p> 
    <p>Copyright © 2021 - All right reserved</p>
  </div> 

</footer >
    );
}

