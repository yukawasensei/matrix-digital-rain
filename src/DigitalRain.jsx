import React, { useEffect, useRef, useState } from 'react';
import './DigitalRain.css';

const chars = '01ABCDEFGHIJKLMNOPQRSTUVWXYZあアイウ';
const fontSize = 14;
const columns = Math.floor(window.innerWidth / fontSize);
const drops = Array(columns).fill(0);

const DigitalRain = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  
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
          
          // 增强的碰撞检测
          const charX = i * fontSize;
          const charY = drops[i] * fontSize;
          const dx = charX - mouseRef.current.x;
          const dy = charY - mouseRef.current.y;
          const distance = Math.sqrt(dx*dx + dy*dy);
          
          if (distance < 120) { // 增加影响半径到120像素
            const force = (1 - distance/120) * 3; // 增加排斥力度
            // 添加更复杂的波动效果
            const time = Date.now();
            const waveX = Math.sin(time/200 + i/5) * 0.5; // 水平波动
            const waveY = Math.cos(time/300) * 0.5; // 垂直波动
            drops[i] -= force * (1 + waveY);
            // 添加水平偏移
            const horizontalOffset = waveX * force * 2;
            ctx.fillText(char, charX + horizontalOffset, drops[i] * fontSize);
            continue; // 跳过默认的fillText
          }

          if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
          }
          drops[i] += 0.5 + Math.random() * 0.5; // 基础下落速度
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

  const [ripples, setRipples] = useState([]);
  
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // 更新鼠标位置引用
    mouseRef.current = { x, y };
    
    // 添加新涟漪
    setRipples(prev => [
      ...prev.slice(-3),
      { x, y, id: Date.now() }
    ]);
  };

  return (
    <div
      className="ripple-container"
      onMouseMove={handleMouseMove}
      style={{ position: 'relative', width: '100vw', height: '100vh' }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 1
        }}
      />
      {ripples.map(ripple => (
        <div
          key={ripple.id}
          className="ripple"
          style={{
            left: ripple.x,
            top: ripple.y,
            position: 'absolute',
            pointerEvents: 'none'
          }}
        />
      ))}
    </div>
  );
};

export default DigitalRain;