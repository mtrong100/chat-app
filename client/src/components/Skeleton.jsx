import React from "react";
import { twMerge } from "tailwind-merge";
import PropTypes from "prop-types";

const Skeleton = ({ className = "" }) => {
  return (
    <div className={twMerge("bg-darkSaga animate-pulse", className)}></div>
  );
};

Skeleton.propTypes = {
  className: PropTypes.string,
};

export default Skeleton;
