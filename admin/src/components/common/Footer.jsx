import React from 'react';
import PropTypes from 'prop-types';

const Footer = ({ 
  className = '',
  children,
  ...props 
}) => {
  return (
    <footer className={`w-full bg-global-1 border-t border-gray-200 ${className}`} {...props}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="text-sm text-global-3">
            © 2024 SlasHR. All rights reserved.
          </div>
          {children}
        </div>
      </div>
    </footer>
  );
};

Footer.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default Footer;