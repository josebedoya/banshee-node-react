import React from 'react';
import moment from 'moment';

const Footer = () => (
  <footer className='footer'>
    &copy; {moment().format('YYYY')} Banshee S.A.
  </footer>
);

export default Footer;
