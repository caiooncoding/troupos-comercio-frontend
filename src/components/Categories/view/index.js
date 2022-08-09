import axios from 'axios';
import React, { useEffect, useState } from 'react';
import swal from 'sweetalert';
import { useNavigate, useParams } from 'react-router-dom';


function ViewCategory() {
  const category_props = useParams();

  const navigate = useNavigate();

  const [category, setCategory] = useState({});
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([])
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState([])

  const getCategories = () => {
    axios.get('/api/category/show').then(res => {
      setCategories(res.data)
    })
  }

  const getCategory = () => {
    axios.get(`/api/category/${category_props.id}`).then(response => {
      if (response.data.status === 200) {
        setCategory({
          ...response.data.category
        });
        setLoading(false)
      } else if (response.data.status === 404) {
        swal('Erro', response.data.message, 'error')
        navigate('/')
      }
    })
  }

  const getProductsByCategory = (id) => {
    axios.get(`/api/view-product/byCategory/${id}`).then(response => {
      setProducts(response.data)
    })
  }

  useEffect(() => {
    getCategories()
    getCategory()
    getProductsByCategory(category_props.id)

  }, [])

  const logout = (e) => {
    e.preventDefault()
    setLoading(true)
    axios.post('/api/logout').then(res => {
      if (res.data.status === 200) {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_name')
        setLoading(false)
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

  return (

    <div id='home'>
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
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
              <a className="navbar-brand" href="#"></a>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDarkDropdown" aria-controls="navbarNavDarkDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNavDarkDropdown">
                <ul className="navbar-nav">
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      Categorias
                    </a>
                    <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
                      {categories.map((item) => {
                        return (
                          <li key={item.id}><a className="dropdown-item" href={`/${item.slug}/${item.id}`}>{item.name}</a></li>
                        )
                      })}
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>

      </header>

      <div className="product-area section">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section-title">
                <h2>{category.name}</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="product-info">
                <div className="row">
                  {products.map(item => {
                    return (
                      <div className="col-3">
                        <div className="single-product">
                          <div className="product-img">
                            <a href="/" className='product-img-cover' style={{ backgroundImage: `url('${process.env.REACT_APP_API}/${item.image}')` }}>
                            </a>
                            <div className="button-head">
                              <div className="product-action">
                                <a title="Order Now" href="/">Pedir Agora</a>
                              </div>
                              <div className="product-action-2">
                                <a title="Add to cart" href="/">Adicionar ao Carrinho</a>
                              </div>
                            </div>
                          </div>
                          <div className="product-content">
                            <h3><a href="/">{item.name}</a></h3>
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
                  <div>
                    <h1>Troupos Comércio de Ferramentas</h1>
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

export default ViewCategory;