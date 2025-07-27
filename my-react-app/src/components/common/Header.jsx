import React from 'react';
import PropTypes from 'prop-types';
import BreadCrumb from '../ui/BreadCrumb';

const Header = ({ 
  breadcrumbItems = [],
  className = '',
  onBreadcrumbClick,
  ...props 
}) => {
  const handleBreadcrumbClick = (item, index) => {
    if (onBreadcrumbClick) {
      onBreadcrumbClick(item, index);
    }
  };

  return (
    <div className={`w-full bg-white ${className}`} {...props}>
      {/* Header Content */}
      <div className="flex items-center gap-[18px] pt-[24px] pb-[24px] px-[72px]">
        {/* Profile Icon */}
        <img 
          src="/images/img_group_2570.svg" 
          alt="Profile"
          className="w-[44px] h-[44px]"
        />
        
        {/* Breadcrumb */}
        <BreadCrumb
          items={breadcrumbItems}
          separator=">"
          onItemClick={handleBreadcrumbClick}
          className="flex items-center gap-[80px]"
        />
      </div>
      
      {/* Header Divider */}
      <div className="w-full h-[1px] bg-header-1"></div>
    </div>
  );
};

Header.propTypes = {
  breadcrumbItems: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        href: PropTypes.string,
        disabled: PropTypes.bool,
      }),
    ])
  ),
  className: PropTypes.string,
  onBreadcrumbClick: PropTypes.func,
};

export default Header;