/* eslint-disable import/no-extraneous-dependencies */
import PropTypes from 'prop-types';
import React, { useRef, useState, useEffect } from 'react';
import Tooltip from '@mui/material/Tooltip';

const OverflowTooltip = ({ children }) => {
  const textElementRef = useRef();
  const [isOverflowed, setIsOverflow] = useState(false);

  const checkOverflow = () => {
    // Using getBoundingClientRect, instead of scrollWidth and clientWidth, to get width with fractional accuracy
    const clientWidth = textElementRef.current.getBoundingClientRect().width;

    textElementRef.current.style.overflow = 'visible';
    const contentWidth = textElementRef.current.getBoundingClientRect().width;
    textElementRef.current.style.overflow = 'hidden';

    setIsOverflow(contentWidth > clientWidth);
  };

  useEffect(() => {
    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => {
      window.removeEventListener('resize', checkOverflow);
    };
  }, []);

  return (
    <Tooltip title={children} disableHoverListener={!isOverflowed}>
      <span
        ref={textElementRef}
        style={{
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {children}
      </span>
    </Tooltip>
  );
};

OverflowTooltip.propTypes = {
  children: PropTypes.shape({
    id: PropTypes.string,
  }).isRequired,
};

export default OverflowTooltip;
