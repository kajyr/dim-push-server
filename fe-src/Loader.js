import React from "react";
import PropTypes from "prop-types";
import styled, { keyframes } from "styled-components";

const rotate = keyframes`
  0% {
      transform: rotate(0deg);
  }

  100% {
      transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  margin: ${(p) => (p.nomargin ? 0 : "2em")} 0;
  overflow: hidden;
  text-align: center;
`;

const Svg = styled.svg`
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  margin: 0 auto;
  text-indent: -9999em;
  position: relative;
  animation-duration: 1s;
  transform: translateZ(0);
  animation: ${rotate} 1.4s infinite linear;
  top: 0;
  transform-origin: 50% 50%;
  fill: #757575;
`;

const LoadingSpinner = ({ small, width, nomargin, ...other }) => {
  const size = small ? "20px" : width;
  return (
    <Spinner nomargin={nomargin} {...other}>
      <Svg viewBox="0 0 50 50" size={size}>
        <path d="M50,25 L45,25 C45,13.954305 36.045695,5 25,5 C13.954305,5 5,13.954305 5,25 C5,36.045695 13.954305,45 25,45 L25,50 C11.1928813,50 0,38.8071187 0,25 C0,11.1928813 11.1928813,0 25,0 C38.8071187,0 50,11.1928813 50,25 Z" />
      </Svg>
    </Spinner>
  );
};

LoadingSpinner.defaultProps = {
  width: "30px",
};

LoadingSpinner.propTypes = {
  width: PropTypes.string,
  small: PropTypes.bool,
  nomargin: PropTypes.bool,
};

export default LoadingSpinner;
