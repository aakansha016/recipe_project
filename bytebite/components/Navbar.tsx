import React from 'react';
import Logo from './Logo';

const Navbar: React.FC = () => {
  return (
    <>
      <nav className="navbar">
        <div className="top-banner">#BE0822</div>
        <div className="nav-container">
          <Logo />
          <div className="nav-links">
            <a href="/create">Create</a>
            <a href="/ideas">Ideas</a>
            <a href="/explore">Explore</a>
            <button className="login-button">Login/Register</button>
          </div>
        </div>

        <style jsx>{`
          .navbar {
            width: 100%;
          }

          .top-banner {
            background-color: #BE0822;
            color: white;
            text-align: center;
            padding: 10px 0;
            font-weight: bold;
          }

          .nav-container {
            background-color: #fff9f5;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px 40px;
          }

          .nav-links {
            display: flex;
            gap: 20px;
            font-size: 18px;
          }

          .nav-links a {
            color: #be0822;
            text-decoration: none;
            font-weight: 600;
          }

          .login-button {
            background-color: #be0822;
            color: #fff9f5;
            padding: 10px 15px;
            font-size: 16px;
            font-weight: bold;
            border-radius: 5px;
            border: none;
          }
        `}</style>
      </nav>
    </>
  );
};

export default Navbar;
