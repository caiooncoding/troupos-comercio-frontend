import React, { useState } from 'react';
import axios from 'axios';
import swal from "sweetalert";
import { useNavigate } from 'react-router-dom';

function Navbar() {
  
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const logout = (e) => {
    e.preventDefault()
    setIsLoading(true)
    axios.post('/api/logout').then(res => {
      if(res.data.status === 200)
      {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_name')
        setIsLoading(false)
        swal("Success", res.data.message, "success")
        navigate('/')
      }
    })
  }

  let AuthButtons = '';
  if(!localStorage.getItem('auth_token'))
  {
    AuthButtons = (
      <li><i className="ti-power-off"></i><a href="/login">Login</a></li>
    )
  }else{
    AuthButtons = (
      <li><button type="button" onClick={logout} className="nav-link btn btn-danger btn-sm text-white">Logout</button></li>
    )
  }
  

  return (
    <header className="header shop">

          <div className="topbar">
            <div className="container">
              <div className="row">
                <div className="col-lg-4 col-md-12 col-12">

                  <div className="top-left">
                    <ul className="list-main">
                      <li><i className="ti-headphone-alt"></i>(47)3056-7718</li>
                      <li><i className="ti-email"></i>trouposcomercio@gmail.com</li>
                    </ul>
                  </div>

                </div>
                <div className="col-lg-8 col-md-12 col-12">

                  <div className="right-content">
                    <ul className="list-main">
                      <li><i className="ti-location-pin"></i>Localização da Loja</li>
                      {AuthButtons}
                    </ul>
                  </div>

                </div>
              </div>
            </div>
          </div>

          <div className="middle-inner">
            <div className="container">
              <div className="row">
                <div className="col-lg-2 col-md-2 col-12">

                  <div className="container-fluid">
                    <h5 href="#">Troupos Comércio de Ferramentas</h5>
                  </div>

                  <div className="search-top">
                    <div className="top-search"><a href="#0"><i className="ti-search"></i></a></div>

                    <div className="search-top">
                      <form className="search-form">
                        <input type="text" placeholder="Search here..." name="search" />
                        <button value="search" type="button"><i className="ti-search"></i></button>
                      </form>
                    </div>

                  </div>

                  <div className="mobile-nav"></div>
                </div>
                <div className="col-lg-8 col-md-7 col-12">
                </div>
                <div className="col-lg-2 col-md-3 col-12">
                  <div className="right-bar">

                    <div className="sinlge-bar">
                      <a href="#" className="single-icon"><i className="fa fa-heart-o" aria-hidden="true"></i></a>
                    </div>
                    <div className="sinlge-bar">
                      <a href="#" className="single-icon"><i className="fa fa-user-circle-o" aria-hidden="true"></i></a>
                    </div>
                    <div className="sinlge-bar shopping">
                      <a href="#" className="single-icon"><i className="ti-bag"></i></a>

                      <div className="shopping-item">
                        <div className="dropdown-cart-header">
                          <span>Items</span>
                          <a href="#">View Cart</a>
                        </div>
                        <div className="bottom">
                          <div className="total">
                            <span>Total</span>
                            <span className="total-amount">R$0.00</span>
                          </div>
                          <a href="#" className="btn animate">Checkout</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
  )
}

export default Navbar;