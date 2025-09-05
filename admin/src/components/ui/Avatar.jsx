import React from "react";
import PropTypes from "prop-types";

const Avatar = ({ src, alt = "avatar", size = "md", fallback = "?" }) => {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-14 w-14",
    xl: "h-20 w-20",
  };

  const classes = `
    rounded-full
    object-cover
    bg-gray-200
    flex items-center justify-center
    font-semibold text-gray-600
    ${sizeClasses[size] || sizeClasses.md}
  `.trim();

  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className={classes}
      />
    );
  }

  return <div className={classes}>{fallback}</div>;
};

Avatar.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  size: PropTypes.oneOf(["sm", "md", "lg", "xl"]),
  fallback: PropTypes.string,
};

export default Avatar;
