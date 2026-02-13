import { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';

interface FloatingHeart {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
}

export default function FloatingHearts() {
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);

  useEffect(() => {
    const initialHearts: FloatingHeart[] = [];
    
    for (let i = 0; i < 20; i++) {
      initialHearts.push({
        id: i,
        x: Math.random() * 100,
        size: Math.random() * 30 + 20,
        duration: Math.random() * 3 + 3,
        delay: Math.random() * 2,
      });
    }

    setHearts(initialHearts);

    // Add new hearts periodically
    const interval = setInterval(() => {
      setHearts((prev) => [
        ...prev,
        {
          id: Date.now(),
          x: Math.random() * 100,
          size: Math.random() * 30 + 20,
          duration: Math.random() * 3 + 3,
          delay: 0,
        },
      ]);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute bottom-0 animate-float-up"
          style={{
            left: `${heart.x}%`,
            animationDuration: `${heart.duration}s`,
            animationDelay: `${heart.delay}s`,
          }}
        >
          <Heart
            className="fill-valentine-primary text-valentine-primary opacity-70"
            style={{
              width: `${heart.size}px`,
              height: `${heart.size}px`,
            }}
          />
        </div>
      ))}
    </div>
  );
}
