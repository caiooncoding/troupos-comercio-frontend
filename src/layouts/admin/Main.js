import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import '../../assets/admin/css/styles.css';
import '../../assets/admin/js/scripts';

const Admin = () => {

  return (
    <div className='sb-nav-fixed'>
      <Navbar />
      <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
          <Sidebar />
        </div>


        <div id="layoutSidenav_content">
          <main>

            <p className='lead'>
              Escolha uma sessão do painel.
            </p>

          </main>
          <Footer />
        </div>

      </div>
    </div>
  )
}

export default Admin;