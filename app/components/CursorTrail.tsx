'use client';

import { useEffect, useRef } from 'react';

interface Particle {
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    life: number;
    maxLife: number;
    type: 'sparkle' | 'star' | 'dot';
    rotation: number;
    rotationSpeed: number;
}

export default function CursorTrail() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const mouseRef = useRef({ x: 0, y: 0 });
    const lastSpawnRef = useRef(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Track mouse movement
        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };

            const now = Date.now();
            // Spawn particles every 30ms
            if (now - lastSpawnRef.current > 30) {
                lastSpawnRef.current = now;
                spawnParticle(e.clientX, e.clientY);
            }
        };

        const spawnParticle = (x: number, y: number) => {
            const types: ('sparkle' | 'star' | 'dot')[] = ['sparkle', 'star', 'dot'];
            const type = types[Math.floor(Math.random() * types.length)];

            particlesRef.current.push({
                x: x + (Math.random() - 0.5) * 10,
                y: y + (Math.random() - 0.5) * 10,
                size: Math.random() * 4 + 2,
                speedX: (Math.random() - 0.5) * 2,
                speedY: (Math.random() - 0.5) * 2,
                life: 0,
                maxLife: Math.random() * 30 + 20,
                type,
                rotation: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 0.1
            });

            // Limit particles
            if (particlesRef.current.length > 100) {
                particlesRef.current.shift();
            }
        };

        window.addEventListener('mousemove', handleMouseMove);

        // Animation loop
        let animationId: number;
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Update and draw particles
            particlesRef.current = particlesRef.current.filter(particle => {
                particle.life++;
                particle.x += particle.speedX;
                particle.y += particle.speedY;
                particle.rotation += particle.rotationSpeed;

                const lifeRatio = particle.life / particle.maxLife;
                const alpha = 1 - lifeRatio;

                if (particle.life >= particle.maxLife) return false;

                ctx.save();
                ctx.translate(particle.x, particle.y);
                ctx.rotate(particle.rotation);
                ctx.globalAlpha = alpha;

                // Draw different particle types
                if (particle.type === 'sparkle') {
                    // Gold sparkle
                    const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, particle.size);
                    gradient.addColorStop(0, '#FFD700');
                    gradient.addColorStop(0.5, '#FFA500');
                    gradient.addColorStop(1, 'transparent');
                    ctx.fillStyle = gradient;
                    ctx.fillRect(-particle.size, -particle.size, particle.size * 2, particle.size * 2);
                } else if (particle.type === 'star') {
                    // Star shape
                    ctx.fillStyle = '#FFD700';
                    ctx.beginPath();
                    for (let i = 0; i < 5; i++) {
                        const angle = (i * 4 * Math.PI) / 5;
                        const x = Math.cos(angle) * particle.size;
                        const y = Math.sin(angle) * particle.size;
                        if (i === 0) ctx.moveTo(x, y);
                        else ctx.lineTo(x, y);
                    }
                    ctx.closePath();
                    ctx.fill();
                } else {
                    // Simple dot
                    ctx.fillStyle = Math.random() > 0.5 ? '#FFD700' : '#DC2626';
                    ctx.beginPath();
                    ctx.arc(0, 0, particle.size, 0, Math.PI * 2);
                    ctx.fill();
                }

                ctx.restore();
                return true;
            });

            animationId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-50"
            style={{ mixBlendMode: 'screen' }}
        />
    );
}
