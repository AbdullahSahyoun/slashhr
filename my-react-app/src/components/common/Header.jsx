import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ 
  title = 'SlasHR',
  className = '',
  children,
  ...props 
}) => {
  return (
    <header className={`w-full bg-global-1 shadow-sm ${className}`} {...props}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-global-2">{title}</h1>
          </div>
          {children}
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
};

export default Header;