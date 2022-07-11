import React, { useState, useEffect } from 'react';
import axios from 'axios';
import swal from "sweetalert";
import { useNavigate } from 'react-router-dom';
import './css/home.css';



function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])


  const getCategories = () => {
    axios.get('/api/category/show').then(res => {
      setCategories(res.data)
    })
  }

  const getProducts = () => {
    axios.get('/api/view-product').then(response => {
      if (response.data.status === 200) {
        setProducts(response.data.products)
      }
    })
  }

  const navigate = useNavigate();


  const logout = (e) => {
    e.preventDefault()
    setIsLoading(true)
    axios.post('/api/logout').then(res => {
      if (res.data.status === 200) {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_name')
        setIsLoading(false)
        swal("Success", res.data.message, "success")
        navigate('/')
      }
    })
  }

  let AuthButtons = '';

  if (!localStorage.getItem('auth_token')) {
    AuthButtons = (
      <li><i className="ti-power-off"></i><a href="/login">Login</a></li>
    )
  } else {
    AuthButtons = (
      <li><button type="button" onClick={logout} className="nav-link btn btn-danger btn-sm text-white">Logout</button></li>
    )
  }

  useEffect(() => {
    getCategories()
    getProducts()
  }, [])

  return (
    <div id="home">
      {isLoading &&
        <div className="preloader">
          <div className="preloader-inner">
            <div className="preloader-icon">
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      }
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
                    <li><i className="ti-location-pin" ></i>Localização da Loja</li>
                    <li><i className="ti-user"></i> <a href="/">Minha Conta</a></li>
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
                  <h5 href="/">Troupos Comércio de Ferramentas</h5>
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
                <div className="search-bar-top">
                  <div className="search-bar">
                    <form>
                      <input name="search" placeholder="Pesquise por produtos aqui" type="search" />
                      <button className="btnn"><i className="ti-search"></i></button>
                    </form>
                  </div>
                </div>
              </div>
              <div className="col-lg-2 col-md-3 col-12">
                <div className="right-bar">
                  <div className="sinlge-bar">
                    <a href="/" className="single-icon"><i className="fa fa-user-circle-o" aria-hidden="true"></i></a>
                  </div>
                  <div className="sinlge-bar shopping">
                    <a href="/" className="single-icon"><i className="ti-bag"></i> <span className="total-count">3</span></a>

                    <div className="shopping-item">
                      <div className="dropdown-cart-header">
                        <span> Items</span>
                        <a href="/">View Cart</a>
                      </div>
                      <ul className="shopping-list">
                        <li>
                          <a href="/" className="remove" title="Remove this item"><i className="fa fa-remove"></i></a>
                          <a className="cart-img" href="/"><img src="https://via.placeholder.com/70x70" alt="#" /></a>
                          <h4><a href="/">Woman Ring</a></h4>
                          <p className="quantity">1x - <span className="amount">$99.00</span></p>
                        </li>
                        <li>
                          <a href="/" className="remove" title="Remove this item"><i className="fa fa-remove"></i></a>
                          <a className="cart-img" href="/"><img src="https://via.placeholder.com/70x70" alt="#" /></a>
                          <h4><a href="/">Woman Necklace</a></h4>
                          <p className="quantity">1x - <span className="amount">$35.00</span></p>
                        </li>
                      </ul>
                      <div className="bottom">
                        <div className="total">
                          <span>Total</span>
                          <span className="total-amount">$134.00</span>
                        </div>
                        <a href="/" className="btn animate">Checkout</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="header-inner">
          <div className="container">
            <div className="cat-nav-head">
              <div className="row">
                <div className="col-lg-3">
                  <div className="all-category">
                    <h3 className="cat-heading"><i className="fa fa-bars" aria-hidden="true"></i>CATEGORIAS</h3>
                    <ul className="main-category">
                      {categories.map((item) => {
                        return (
                          <li><a href="/">{item.name}</a></li>
                        )
                      })
                      }
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </header>

      <section className="hero-slider">

        <div className="single-slider">
          <div className="container">
            <div className="row no-gutters">
              <div className="col-lg-9 offset-lg-3 col-12">
                <div className="text-inner">
                  <div className="row">
                    <div className="col-lg-7 col-12">
                      <div className="hero-text">
                        <h1><span>UP TO 50% OFF </span>Shirt For Man</h1>
                        <p>Maboriosam in a nesciung eget magnae <br /> dapibus disting tloctio in the find it pereri <br /> odiy maboriosm.</p>
                        <div className="button">
                          <a href="/" className="btn">Shop Now!</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>

      <section className="small-banner section">
        <div className="container-fluid">
          <div className="row">
            {
              products.map((item) => {
                return (
                  <div className="col-lg-4 col-md-6 col-12">
                    <div className="single-banner">
                      <img src={`${process.env.REACT_APP_API}/${item.image}`} alt="imagem" width="370px" height="370px" />
                      <div className="content">
                        <p>Man's Collectons</p>
                        <h3>Summer travel <br /> collection</h3>
                        <a href="/">Discover Now</a>
                      </div>
                    </div>
                  </div>
                )
              })
            }

          </div>
        </div>
      </section>

      <div className="product-area section">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section-title">
                <h2>Produtos</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="product-info">
                <div className="nav-main">
                  
                  <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item"><a className="nav-link active" data-toggle="tab" href="#man" role="tab">Categoria 1</a></li>
                    <li className="nav-item"><a className="nav-link" data-toggle="tab" href="#women" role="tab">Categoria 2</a></li>
                    <li className="nav-item"><a className="nav-link" data-toggle="tab" href="#kids" role="tab">Categoria 3</a></li>
                    <li className="nav-item"><a className="nav-link" data-toggle="tab" href="#accessories" role="tab">Categoria 4</a></li>
                    <li className="nav-item"><a className="nav-link" data-toggle="tab" href="#essential" role="tab">Categoria 5</a></li>
                    <li className="nav-item"><a className="nav-link" data-toggle="tab" href="#prices" role="tab">Categoria 6</a></li>
                  </ul>


                  {/* {categories.map(category => {
                    return (
                      <ul className="nav nav-tabs" id="myTab" role="tablist">
                        <li className="nav-item"><a className="nav-link" data-toggle="tab" href="#man" role="tab">{category.name}</a></li>
                      </ul>
                    )
                  })} */}
                </div>
                <div className="tab-content" id="myTabContent">
                  {products.map(item => {
                    return (
                      <div className="tab-pane fade show active" id="man" role="tabpanel">
                        <div className="tab-single">
                          <div className="row">
                            <div className="col-xl-3 col-lg-4 col-md-4">
                              <div className="single-product">
                                <div className="product-img">
                                  <a href="/" className='product-img-cover' style={{ backgroundImage: `url('${process.env.REACT_APP_API}/${item.image}')` }}>
                                  </a>
                                  <div className="button-head">
                                    <div className="product-action">
                                      <a data-toggle="modal" data-target="#exampleModal" title="Quick View" href="/"><i className=" ti-eye"></i><span>Quick Shop</span></a>
                                      <a title="Wishlist" href="/"><i className=" ti-heart "></i><span>Add to Wishlist</span></a>
                                      <a title="Compare" href="/"><i className="ti-bar-chart-alt"></i><span>Add to Compare</span></a>
                                    </div>
                                    <div className="product-action-2">
                                      <a title="Add to cart" href="/">Add to cart</a>
                                    </div>
                                  </div>
                                </div>
                                <div className="product-content">
                                  <h3><a href="/">Women Hot Collection</a></h3>
                                  <div className="product-price">
                                    <span>$29.00</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="footer">

        <div className="footer-top section">
          <div className="container">
            <div className="row">
              <div className="col-lg-5 col-md-6 col-12">

                <div className="single-footer about">
                  <div className="logo">
                    <a href="/">Troupos Comércio de Ferramentas</a>
                  </div>
                  <p className="text">Praesent dapibus, neque id cursus ucibus, tortor neque egestas augue,  magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus.</p>
                  <p className="call">Tem alguma dúvida? Nos contate!<span><a href="tel:4730567718">(47)3056-7718</a></span></p>
                </div>

              </div>

              <div className="col-lg-3 col-md-6 col-12">

                <div className="single-footer social">
                  <h4>Entre em Contato</h4>

                  <div className="contact">
                    <ul>
                      <li>Balneário Camboriú.</li>
                      <li>Santa Catarina, Brasil.</li>
                      <li>trouposcomercio@gmail.com</li>
                      <li>(47)3056-7718</li>
                    </ul>
                  </div>

                  <ul>
                    <li><a href="/"><i className="ti-facebook"></i></a></li>
                    <li><a href="/"><i className="ti-instagram"></i></a></li>
                  </ul>
                </div>

              </div>
            </div>
          </div>
        </div>

        <div className="copyright">
          <div className="container">
            <div className="inner">
              <div className="row">
                <div className="col-lg-6 col-12">
                  <div className="left">
                    <p>Copyright © 2022 <a href="/" target="_blank">Troupos Comércio de Ferramentas</a> - Todos os Direitos Reservados.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

    </div>
  )
}

export default Home;