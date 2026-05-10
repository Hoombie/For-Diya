import { useEffect, useRef } from "react";

export default function PinkHeartGift() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);

    // Heart parametric function (your original idea)
    const heartX = (t) => 15 * Math.sin(t) ** 3;
    const heartY = (t) =>
      12 * Math.cos(t) -
      5 * Math.cos(2 * t) -
      2 * Math.cos(3 * t) -
      Math.cos(4 * t);

    // Precompute heart points
    const heartPoints = [];
    for (let i = 0; i < 6000; i++) {
      const x = heartX(i) * 20;
      const y = heartY(i) * 20;
      heartPoints.push({ x, y });
    }

    // Pink stream particles
    const particles = Array.from({ length: 120 }).map(() => ({
      x: Math.random() * w,
      y: Math.random() * h,
      speed: 2 + Math.random() * 4,
      size: 2 + Math.random() * 3,
      alpha: 0.3 + Math.random() * 0.7,
    }));

    function drawHeart() {
      ctx.save();
      ctx.translate(w / 2, h / 2);
      ctx.strokeStyle = "rgba(255, 105, 180, 0.9)";
      ctx.lineWidth = 2;
      ctx.beginPath();

      heartPoints.forEach((p, i) => {
        if (i === 0) ctx.moveTo(p.x, -p.y);
        else ctx.lineTo(p.x, -p.y);
      });

      ctx.stroke();
      ctx.restore();
    }

    function drawParticles() {
      for (let p of particles) {
        ctx.fillStyle = `rgba(255, 105, 180, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        p.y += p.speed;

        // reset when off screen
        if (p.y > h) {
          p.y = -10;
          p.x = Math.random() * w;
        }
      }
    }

    function animate() {
      ctx.fillStyle = "rgba(0,0,0,0.25)";
      ctx.fillRect(0, 0, w, h);

      drawParticles();
      drawHeart();

      requestAnimationFrame(animate);
    }

    animate();

    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ display: "block", background: "black" }}
    />
  );
}