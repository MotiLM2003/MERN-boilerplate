import React, { useEffect, useRef } from 'react';

const Bubbles = () => {
  const containerRef = useRef();

  useEffect(() => {
    const timer = setInterval(createBubble, 1200);
    return () => {
      clearInterval(timer);
    };
  }, []);

  const createBubble = () => {
    if (!containerRef.current) return;
    const bubble = document.createElement('span');
    var size = Math.random() * 60;
    bubble.style.width = 15 + size + 'px';
    bubble.style.height = 15 + size + 'px';
    bubble.style.left = Math.random() * (window.innerWidth - 70) + 'px';
    containerRef.current.appendChild(bubble);
    setTimeout(() => {
      bubble.remove();
    }, 5000);
  };

  return <div className='bubble-container' ref={containerRef}></div>;
};

export default Bubbles;
