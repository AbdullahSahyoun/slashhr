import React from "react";
import PropTypes from "prop-types";

const Card = ({ children, className = "" }) => {
  return (
    <div
      className={`rounded-xl border border-gray-200 bg-white shadow-sm ${className}`}
    >
      {children}
    </div>
  );
};

const CardHeader = ({ children, className = "" }) => {
  return (
    <div className={`px-4 py-3 border-b border-gray-100 ${className}`}>
      {children}
    </div>
  );
};

const CardTitle = ({ children, className = "" }) => {
  return (
    <h3 className={`text-base font-semibold text-gray-900 ${className}`}>
      {children}
    </h3>
  );
};

const CardContent = ({ children, className = "" }) => {
  return <div className={`px-4 py-3 ${className}`}>{children}</div>;
};

Card.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

CardHeader.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

CardTitle.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

CardContent.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export { Card, CardHeader, CardTitle, CardContent };
export default Card;
