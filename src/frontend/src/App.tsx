import { useState, useRef, useEffect } from 'react';
import { Heart, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import Confetti from '@/components/Confetti';
import FloatingHearts from '@/components/FloatingHearts';

function App() {
  const [name, setName] = useState('Hina Sadat');
  const [showConfetti, setShowConfetti] = useState(false);
  const [showFloatingHearts, setShowFloatingHearts] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [noButtonMessage, setNoButtonMessage] = useState('No');
  const [noAttempts, setNoAttempts] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const noMessages = [
    "Are you really sure?",
    "Think again…",
    "No escaping love!",
    "Come on, say yes 💖",
    "Pleaseeee 😢",
    "Really? 🥺",
    "Don't break my heart 💔",
    "One more chance? 🥹",
    "Pretty please? 🙏",
    "I'll be sad 😭",
    "Reconsider? 💕",
    "You're breaking my heart 💘",
    "Is that your final answer? 😰",
    "Give me a chance! 🌹",
    "Don't do this to me 😔",
    "I promise I'll be good! 😇",
    "Just one yes? 🥰",
    "You know you want to 😏",
    "Stop playing hard to get 😤",
    "My heart can't take this 💗",
    "Think of all the fun we'll have! 🎉",
    "You're making me cry 😿",
    "I'll buy you chocolate 🍫",
    "Please please please? 🙇",
    "Don't be like that 😣",
    "You're killing me here 💀",
    "I'm not giving up! 💪",
    "Say yes already! 😩",
    "Why are you doing this? 😭",
    "I'll do anything! 🎁",
    "You're so mean 😢",
    "Just click yes! ➡️",
    "I know you love me 💝",
    "Stop running away! 🏃",
    "You can't escape love 💞",
    "This is torture 😫",
    "Have mercy on me 🙏",
    "I'm begging you 🥺",
    "You're my only one 💖",
    "Don't leave me hanging 😰",
    "I'll wait forever 🕐",
    "You know you want to say yes 😊",
    "Come on, be mine 💕",
    "I'll make you happy! 😄",
    "Trust me on this 🤝",
    "We're meant to be 💑",
    "Stop being stubborn 😤",
    "You're testing my patience 😅",
    "I won't give up on us 💪",
    "Say yes and make me smile 😁"
  ];

  useEffect(() => {
    // Initialize audio
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
      audioRef.current.loop = true;
    }
  }, []);

  useEffect(() => {
    if (audioRef.current && !isMuted) {
      audioRef.current.play().catch(() => {
        // Autoplay might be blocked, user needs to interact first
      });
    }
  }, [isMuted]);

  const handleYesClick = () => {
    setShowSuccessDialog(true);
    setShowConfetti(true);
    setShowFloatingHearts(true);
    
    // Stop confetti after 5 seconds but keep hearts
    setTimeout(() => {
      setShowConfetti(false);
    }, 5000);
  };

  const moveNoButton = () => {
    if (!containerRef.current || !noButtonRef.current) return;

    const container = containerRef.current;
    const button = noButtonRef.current;
    const containerRect = container.getBoundingClientRect();
    const buttonRect = button.getBoundingClientRect();

    // Use actual button dimensions
    const buttonWidth = buttonRect.width;
    const buttonHeight = buttonRect.height;
    const padding = 10;

    // Calculate safe movement bounds
    const maxX = (containerRect.width - buttonWidth) / 2 - padding;
    const maxY = (containerRect.height - buttonHeight) / 2 - padding;

    // Generate random position within bounds
    const randomX = (Math.random() * 2 - 1) * maxX;
    const randomY = (Math.random() * 2 - 1) * maxY;

    setNoButtonPosition({ x: randomX, y: randomY });
    setNoButtonMessage(noMessages[noAttempts % noMessages.length]);
    setNoAttempts(prev => prev + 1);
  };

  const handleNoClick = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    moveNoButton();
  };

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
      setIsMuted(!isMuted);
    }
  };

  const resetApp = () => {
    setShowSuccessDialog(false);
    setShowConfetti(false);
    setShowFloatingHearts(false);
    setNoAttempts(0);
    setNoButtonMessage('No');
    setNoButtonPosition({ x: 0, y: 0 });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-valentine-light via-valentine-medium to-valentine-dark flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {showConfetti && <Confetti />}
      {showFloatingHearts && <FloatingHearts />}
      
      <audio ref={audioRef} src="/assets/romantic-music.mp3" />
      
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4 text-valentine-text hover:bg-valentine-accent/20 z-50"
        onClick={toggleMute}
      >
        {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
      </Button>

      {/* Floating hearts decoration */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <Heart
            key={i}
            className="absolute text-valentine-accent/20 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${20 + Math.random() * 40}px`,
              height: `${20 + Math.random() * 40}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${10 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      <Card className="max-w-2xl w-full bg-white/90 backdrop-blur-sm border-valentine-accent shadow-2xl p-6 sm:p-8 md:p-12 text-center relative z-10">
        <div className="space-y-6 sm:space-y-8">
          {/* Editable Name Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-2 flex-wrap">
              <Heart className="h-6 w-6 sm:h-8 sm:w-8 fill-valentine-primary text-valentine-primary" />
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-display font-bold text-valentine-primary break-words">
                {name}
              </h1>
              <Heart className="h-6 w-6 sm:h-8 sm:w-8 fill-valentine-primary text-valentine-primary" />
            </div>
            
            <div className="max-w-xs mx-auto">
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter name..."
                className="text-center text-base sm:text-lg font-handwriting border-valentine-accent focus:border-valentine-primary focus:ring-valentine-primary"
              />
            </div>
          </div>

          {/* Main Question */}
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-display font-bold text-valentine-text">
              Will you be my Valentine?
            </h2>
            <div className="text-4xl sm:text-5xl">💝</div>
          </div>

          {/* Buttons Section */}
          <div ref={containerRef} className="relative min-h-[200px] sm:min-h-[250px] flex items-center justify-center overflow-hidden">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 items-center justify-center w-full px-4">
              {/* Yes Button */}
              <Button
                onClick={handleYesClick}
                className="bg-valentine-primary hover:bg-valentine-primary/90 text-white font-bold px-8 sm:px-12 py-6 sm:py-8 text-xl sm:text-2xl rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 w-full sm:w-auto max-w-[200px]"
              >
                Yes! 💕
              </Button>

              {/* No Button - moves only on click/tap */}
              <Button
                ref={noButtonRef}
                onClick={handleNoClick}
                onTouchEnd={handleNoClick}
                variant="outline"
                className="border-valentine-accent text-valentine-text hover:bg-valentine-accent/10 font-semibold px-6 sm:px-8 py-5 sm:py-6 text-lg sm:text-xl rounded-full shadow-md w-full sm:w-auto max-w-[200px] touch-manipulation"
                style={{
                  transform: `translate(${noButtonPosition.x}px, ${noButtonPosition.y}px)`,
                  transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                }}
              >
                {noButtonMessage}
              </Button>
            </div>
          </div>

          {/* Romantic Quote */}
          <div className="pt-4 sm:pt-6 border-t border-valentine-accent/30">
            <p className="text-base sm:text-lg md:text-xl font-handwriting text-valentine-secondary italic px-2">
              "Every moment with you feels like a dream come true..."
            </p>
          </div>
        </div>
      </Card>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md bg-white/95 backdrop-blur-sm border-valentine-accent">
          <DialogHeader>
            <DialogTitle className="text-center text-3xl sm:text-4xl font-display text-valentine-primary">
              Yay! 🎉
            </DialogTitle>
            <DialogDescription className="text-center space-y-4 pt-4">
              <div className="text-5xl sm:text-6xl animate-bounce">
                💖
              </div>
              <p className="text-xl sm:text-2xl font-handwriting text-valentine-text">
                You're my Valentine 💕
              </p>
              <p className="text-base sm:text-lg font-handwriting text-valentine-secondary italic">
                {name}, you made me the happiest!
              </p>
              <div className="flex justify-center gap-2 text-4xl pt-4">
                <Heart className="h-8 w-8 fill-valentine-primary text-valentine-primary animate-pulse" />
                <Heart className="h-8 w-8 fill-valentine-accent text-valentine-accent animate-pulse delay-100" />
                <Heart className="h-8 w-8 fill-valentine-primary text-valentine-primary animate-pulse delay-200" />
              </div>
              <Button
                onClick={resetApp}
                className="mt-6 bg-valentine-primary hover:bg-valentine-primary/90 text-white font-semibold px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all"
              >
                Start Over 💝
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <footer className="absolute bottom-4 text-center text-xs sm:text-sm text-valentine-text/70 px-4">
        © {new Date().getFullYear()}. Built with <Heart className="inline h-4 w-4 fill-valentine-primary text-valentine-primary" /> using{' '}
        <a 
          href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== 'undefined' ? window.location.hostname : 'valentine-app')}`}
          target="_blank" 
          rel="noopener noreferrer" 
          className="hover:text-valentine-primary transition-colors"
        >
          caffeine.ai
        </a>
      </footer>
    </div>
  );
}

export default App;
