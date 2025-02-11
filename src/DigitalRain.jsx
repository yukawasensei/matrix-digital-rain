import React, { useEffect, useRef } from 'react';
import './DigitalRain.css';

const chars = '01ABCDEFGHIJKLMNOPQRSTUVWXYZあアイウ';
const fontSize = 14;
const columns = Math.floor(window.innerWidth / fontSize);
const drops = Array(columns).fill(0);

const DigitalRain = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // 设置canvas尺寸
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    
    // 颜色梯度
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#0F0');
    gradient.addColorStop(0.2, '#0FA');
    gradient.addColorStop(1, '#0F0');
    
    let animationFrameId;
    let lastTime = 0;
    const interval = 50; // 控制下落速度

    const draw = (timestamp) => {
      if (timestamp - lastTime > interval) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = gradient;
        ctx.font = `${fontSize}px monospace`;

        for (let i = 0; i < drops.length; i++) {
          const char = chars[Math.floor(Math.random() * chars.length)];
          ctx.fillText(char, i * fontSize, drops[i] * fontSize);
          
          if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
          }
          drops[i]++;
        }
        lastTime = timestamp;
      }
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();
    window.addEventListener('resize', resizeCanvas);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 9999
      }}
    />
  );
};

export default DigitalRain;