import React from 'react';

import './global.css';

const Footer = () => (
  <footer id="main-footer" className="footer">
    <p>Copyright &copy; 2019 Banka All Right Reserved</p>
    <div>
      <a href="/">Terms of use</a>
|
      <a href="/">Privacy policy</a>
    </div>
  </footer>
);

const MainFooter = () => (
  <footer className="mainFooter">
    <p>Copyright &copy; 2019 Banka All Right Reserved</p>
  </footer>
);

export default { Footer, MainFooter };
