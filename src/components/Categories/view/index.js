import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import swal from 'sweetalert';
import { useNavigate, useParams } from 'react-router-dom';
import ReactPaginate from 'react-paginate';


function ViewCategory() {
  const category_props = useParams();

  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState({});
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([])
  const [isLoading, setLoading] = useState(false);
  const [cart, setCart] = useState(() => {
    const localCart = localStorage.getItem('cart')
    return localCart === null ? [] : JSON.parse(localCart);
  })

  const [page, setPage] = useState(0)
  const productsPerPage = 12;
  const pagesVisited = page * productsPerPage;

  const displayProducts = products
    .slice(pagesVisited, pagesVisited + productsPerPage)
    .map((product, index) => {
      return (
        <div className="col-3" key={index}>
          <div className="single-product">
            <div className="product-img">
              <a className='product-img-cover' style={{ backgroundImage: `url('${process.env.REACT_APP_API}/${product.image}')` }}>
              </a>
              <div className="button-head">
                <div className="product-action">
                  <a onClick={(e) => sendSingleProductMessage(e, product)}>Pedir Agora</a>
                </div>
                <div className="product-action-2">
                  <a onClick={(e) => {
                    addToCart(product, e)
                  }} >Adicionar ao Carrinho</a>
                </div>
              </div>
            </div>
            <div className="product-content">
              <h6>{product.name}</h6>
            </div>
          </div>
        </div>
      )
    });

  const displayFilterProducts = products.filter((product) => {
    if (product.name.toLowerCase().includes(search.toLowerCase()))
      return product
  }).map((product, index) => {
    return (
      <div className="col-3" key={index}>
        <div className="single-product">
          <div className="product-img">
            <a className='product-img-cover' style={{ backgroundImage: `url('${process.env.REACT_APP_API}/${product.image}')` }}>
            </a>
            <div className="button-head">
              <div className="product-action">
                <a onClick={(e) => sendSingleProductMessage(e, product)}>Pedir Agora</a>
              </div>
              <div className="product-action-2">
                <a onClick={(e) => {
                  addToCart(product, e)
                }} >Adicionar ao Carrinho</a>
              </div>
            </div>
          </div>
          <div className="product-content">
            <h6>{product.name}</h6>
          </div>
        </div>
      </div>
    )
  })

  const pageCount = Math.ceil(products.length / productsPerPage)

  const changePage = ({ selected }) => {
    setPage(selected)
    window.scrollTo(0, 0);
  }


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

  const addToCart = (item, e) => {
    e.preventDefault()
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));
    const localCart = localStorage.getItem('cart')
    setCart(JSON.parse(localCart))
    swal('Sucesso', 'Item Adicionado com Sucesso', 'success')
  }

  const removeFromCart = (item, e) => {
    e.preventDefault()
    cart.pop(item);
    localStorage.setItem('cart', JSON.stringify(cart));
    const localCart = localStorage.getItem('cart')
    setCart(JSON.parse(localCart))
    swal('Sucesso', 'Item Removido com Sucesso', 'success')
  }

  const showInfoMessage = (e) => {
    e.preventDefault();
    swal("Como Funcionamos?", "Aqui no site você tem duas opções. Em 'Pedir Agora' você será redirecionado para o WhatsApp solicitando o orçamento do Produto direto com a loja, para saber sua disponibilidade, preço e se tem a opção de entrega, ou você também pode fazer um carrinho e solicitar vários items de uma vez só.")
  }

  const sendSingleProductMessage = (e, item) => {
    e.preventDefault();
    window.location.replace(`https://api.whatsapp.com/send?phone=554730567718&text=Ol%C3%A1,%20tenho%20interesse%20no%20produto:%0a*${item.name}*%0a`)
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

  const sendRequestToWhatsApp = (e) => {
    e.preventDefault()
    let whatsapp = `https://api.whatsapp.com/send?phone=554730567718&text=Ol%C3%A1,%20tenho%20interesse%20nos%20produtos:%0a`
    let productsToSend = []
    cart.forEach((item) => {
      productsToSend.push(encodeURI(item.name))
    })

    productsToSend.forEach((item) => {
      let productMessage = '*' + item + '*' + '%0a';
      whatsapp += productMessage
    })

    window.location.replace(whatsapp)

    localStorage.clear('cart')
  }

  const handleClick = (e) => {
    e.preventDefault();
    if(localStorage.getItem('auth_token')){
      navigate('/myAccount')
    } else {
      navigate('/login')
    }
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
                    <li><i className='ti-help-alt'></i> <a onClick={(e) => showInfoMessage(e)}>Como Funcionamos?</a></li>
                    <li><i className="ti-location-pin" ></i>Localização da Loja</li>
                    <li><i className="ti-user"></i> <a onClick={(e) => handleClick(e)}>Minha Conta</a></li>
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
              </div>
              <div className="col-lg-8 col-md-7 col-12">
                <div className="search-bar-top">
                  <div className="search-bar">
                    <form>
                      <input name="search" placeholder="Pesquise por produtos aqui" type="search" onChange={(e) => setSearch(e.target.value)} />
                      <div className="btnn"><i className="ti-search"></i></div>
                    </form>
                  </div>
                </div>
              </div>
              {cart.length > 0 ?
                <div className="col-lg-2 col-md-3 col-12">
                  <div className="right-bar">
                    <div className="sinlge-bar shopping">
                      <a className="single-icon"><i className="ti-bag"></i> <span className="total-count">{cart.length}</span></a>
                      <div className="shopping-item">
                        <div className="dropdown-cart-header">
                          <span>Items</span>
                        </div>
                        {cart.map(item => {
                          return (
                            <ul className="shopping-list">
                              <li>
                                <a onClick={(e) => removeFromCart(item, e)} className="remove" title="Remover item"><i className="fa fa-remove"></i></a>
                                <a className="cart-img" ><img src={`${process.env.REACT_APP_API}/${item.image}`} alt="#" /></a>
                                <h4><a>{item.name}</a></h4>
                              </li>
                            </ul>
                          )
                        })}
                        <div className="bottom">
                          <a onClick={(e) => sendRequestToWhatsApp(e)} className="btn animate">Fazer Pedido</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                :
                <div className="col-lg-2 col-md-3 col-12">
                  <div className="right-bar">
                    <div className="sinlge-bar shopping">
                      <a className="single-icon"><i className="ti-bag"></i> <span className="total-count">0</span></a>
                      <div className="shopping-item">
                        <div className="dropdown-cart-header">
                          <span>Items</span>
                        </div>
                        <div className="bottom">
                          <div className="total">
                          </div>
                          <a className="btn animate">Adicione Items ao Carrinho</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>

        <div className="header-inner">
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
              <a className="navbar-brand" href="/">Home</a>
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
                          <li key={item.id}><a className="dropdown-item" href={`/categoria/${item.slug}/${item.id}`}>{item.name}</a></li>
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
                  {search != "" ?
                    <div className="row">
                      {displayFilterProducts.length == 0
                        ?
                        <div className='d-flex vw-50 vh-50'>
                          <div className='text-center align-self-center vw-100'>
                            <h1>Nenhum Produto Encontrado Nesta Categoria</h1>
                          </div>
                        </div>
                        :
                        displayFilterProducts
                      }
                    </div>
                    :
                    <div className='row'>
                      {displayProducts}
                      <ReactPaginate
                        previousLabel={'Anterior'}
                        nextLabel={'Próximo'}
                        pageCount={pageCount}
                        onPageChange={changePage}
                        containerClassName={"paginationBttns"}
                        previousLinkClassName={"previousBttn"}
                        nextLinkClassName={"nextBttn"}
                        disabledClassName={"paginationDisabled"}
                        activeClassName={"paginationActive"}
                      />
                    </div>
                  }
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
                  <p className="text">A nossa loja tem uma grande variedade de produtos nacionais e importados, ferramentas, utensílios domésticos, eletrônicos e muito mais.</p>
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