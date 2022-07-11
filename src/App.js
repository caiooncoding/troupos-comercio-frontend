import './App.css';
import Login from './components/Login/index'
import Register from './components/Login/Register/index'
import Home from './components/Home/index';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Main from './layouts/admin/Main';
import Categories from './components/Categories';
import Products from './components/Products';
import Users from './components/Users';
import ViewProduct from './components/Products/view';
import Development from './components/development/index';
import EditCategory from './components/Categories/edit';
import EditProduct from './components/Products/edit';
import Footer from './layouts/admin/Footer';
import Navbar from './layouts/admin/Navbar';
import Sidebar from './layouts/admin/Sidebar';


axios.defaults.baseURL = "http://localhost:8088/";
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.withCredentials = true;
axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem('auth_token')
    config.headers.Authorization = token ? `Bearer ${token}` : ''
    return config
})

if (window.location.pathname.includes('/admin')) {
    axios.get('/api/users/me').then(response => {
        
    }).catch(error => {
        if(error.response.status == 401){
            localStorage.clear()
            window.location.href = `${process.env.REACT_APP_URL}/login`
        }
    })
}

function App() {

    return (
        <div>
            {!window.location.pathname.includes('/admin') ?

                <BrowserRouter>
                    <Routes>
                        <Route
                            path="/"
                            element={<Development />}
                        />

                        <Route
                            path="/home"
                            element={<Home />}
                        />

                        <Route
                            path="/login"
                            element={<Login />}
                        />

                        <Route
                            path="/register"
                            element={<Register />}
                        />


                    </Routes>
                </BrowserRouter>
                :
                <div className='sb-nav-fixed'>
                    <Navbar />
                    <div id="layoutSidenav">
                        <div id="layoutSidenav_nav">
                            <Sidebar />
                        </div>
                        <div id="layoutSidenav_content">
                            <BrowserRouter>
                                <Routes>
                                    <Route
                                        path="/admin"
                                        element={<Main />}
                                    />
                                    <Route
                                        path="/admin/categories"
                                        element={<Categories />}
                                    />

                                    <Route
                                        path='/admin/edit-category/:id'
                                        element={<EditCategory />}
                                    />

                                    <Route
                                        path="/admin/add-product"
                                        element={<Products />}
                                    />
                                    <Route
                                        path="/admin/view-product"
                                        element={<ViewProduct />}
                                    />

                                    <Route
                                        path='/admin/edit-product/:id'
                                        element={<EditProduct />}
                                    />

                                    <Route
                                        path="/admin/users"
                                        element={<Users />}
                                    />
                                </Routes>
                            </BrowserRouter>
                        </div>
                        <Footer />
                    </div>
                </div>
            }
        </div>
    );
}

export default App;