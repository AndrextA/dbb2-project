import React from 'react';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='row'>
      <div className="col bg-body-tertiary py-2 display-6">
        &copy; {currentYear} Database II Project. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
