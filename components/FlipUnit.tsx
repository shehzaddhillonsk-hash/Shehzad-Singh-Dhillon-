
import React, { useState, useEffect, useRef } from 'react';

interface FlipUnitProps {
  value: number;
}

const FlipUnit: React.FC<FlipUnitProps> = ({ value }) => {
  const [current, setCurrent] = useState(value);
  const [next, setNext] = useState(value);
  const [isFlipping, setIsFlipping] = useState(false);
  const prevValueRef = useRef(value);

  useEffect(() => {
    if (value !== current) {
      setNext(value);
      setIsFlipping(true);
      
      const timer = setTimeout(() => {
        setIsFlipping(false);
        setCurrent(value);
      }, 600);
      
      return () => clearTimeout(timer);
    }
  }, [value, current]);

  const pad = (n: number) => n.toString().padStart(2, '0');

  return (
    <div className={`flip-card ${isFlipping ? 'flipping' : ''}`}>
      {/* Static Top - shows the NEXT value's top half */}
      <div className="top">{pad(next)}</div>
      
      {/* Static Bottom - shows the CURRENT value's bottom half */}
      <div className="bottom">{pad(current)}</div>
      
      {/* Flipping Leaf */}
      <div className="leaf">
        {/* Front of leaf - shows CURRENT value's top half */}
        <div className="leaf-front">{pad(current)}</div>
        {/* Back of leaf - shows NEXT value's bottom half */}
        <div className="leaf-back">{pad(next)}</div>
      </div>
    </div>
  );
};

export default FlipUnit;
