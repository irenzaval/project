// hooks/useAnimation.js
import { useRef, useCallback } from 'react';

export const useAnimation = () => {
  const animationRef = useRef(null);
  
  const animate = useCallback((duration, callback) => {
    let startTime = null;
    
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      callback(progress);
      
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(step);
      }
    };
    
    animationRef.current = requestAnimationFrame(step);
  }, []);
  
  const stopAnimation = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  }, []);
  
  return { animate, stopAnimation };
};
