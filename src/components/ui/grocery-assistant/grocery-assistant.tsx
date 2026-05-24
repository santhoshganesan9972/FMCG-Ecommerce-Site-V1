"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/store/cart-store";
import { X, Minus2, MessageCircleHeart, Heart } from "lucide-react";

type Mood = "idle" | "happy" | "excited" | "sad" | "surprised" | "thinking" | "wave" | "celebrate" | "dance" | "thankyou";

interface FloatingItem {
  id: number;
  emoji: string;
  delay: number;
}

const FLOATING_ITEMS: FloatingItem[] = [
  { id: 1, emoji: "🥬", delay: 0 },
  { id: 2, emoji: "🍎", delay: 0.1 },
  { id: 3, emoji: "🥛", delay: 0.2 },
  { id: 4, emoji: "🍿", delay: 0.15 },
  { id: 5, emoji: "🧃", delay: 0.25 },
];

export default function GroceryAssistant() {
  const [isVisible, setIsVisible] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [mood, setMood] = useState<Mood>("idle");
  const [isHovered, setIsHovered] = useState(false);
  const [showFloatingEmojis, setShowFloatingEmojis] = useState(false);
  const [showSpeech, setShowSpeech] = useState(false);
  const [speechText, setSpeechText] = useState("");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [characterPos, setCharacterPos] = useState({ x: 0, y: 0 });
  const [isWalking, setIsWalking] = useState(false);
  const [walkSpeed, setWalkSpeed] = useState(0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);
  const [lookDirection, setLookDirection] = useState({ x: 0, y: 0 });
  const [headTilt, setHeadTilt] = useState(0);
  const [showHeart, setShowHeart] = useState(false);

  const characterRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();
  const targetPosRef = useRef({ x: 0, y: 0 });
  const currentPosRef = useRef({ x: 0, y: 0 });
  const prevCartRef = useRef<number>(0);
  const moodTimeoutRef = useRef<NodeJS.Timeout>();

  const randomSpeech = useCallback(() => {
    const speeches = [
      "Hi there! 👋",
      "Need help shopping? 🛒",
      "Fresh items just for you!",
      "I love groceries! 🥬",
      "Click me for fun!",
      "Great deals today! 💰",
      "Your cart looks good! ✨",
    ];
    return speeches[Math.floor(Math.random() * speeches.length)];
  }, []);

  const setTemporaryMood = useCallback((newMood: Mood, duration: number = 2000, speech?: string) => {
    if (moodTimeoutRef.current) {
      clearTimeout(moodTimeoutRef.current);
    }
    setMood(newMood);
    if (speech) {
      setSpeechText(speech);
      setShowSpeech(true);
    }
    moodTimeoutRef.current = setTimeout(() => {
      setMood("idle");
      setShowSpeech(false);
    }, duration);
  }, []);

  const triggerClickReaction = useCallback(() => {
    const reactions: Array<{ mood: Mood; speech: string; showEmojis?: boolean; showHeart?: boolean }> = [
      { mood: "happy", speech: "Yay! 🎉" },
      { mood: "wave", speech: "Hi there! 👋" },
      { mood: "excited", speech: "Let's shop! 🛒", showEmojis: true },
      { mood: "thankyou", speech: "Thank you! ❤️", showHeart: true },
      { mood: "surprised", speech: "Oh! 😮" },
      { mood: "dance", speech: "Dance time! 💃", showEmojis: true },
      { mood: "celebrate", speech: "Party time! 🎊", showEmojis: true },
    ];

    const reaction = reactions[Math.floor(Math.random() * reactions.length)];
    setTemporaryMood(reaction.mood, 3000, reaction.speech);
    
    if (reaction.showEmojis) {
      setShowFloatingEmojis(true);
      setTimeout(() => setShowFloatingEmojis(false), 2500);
    }
    
    if (reaction.showHeart) {
      setShowHeart(true);
      setTimeout(() => setShowHeart(false), 2000);
    }
  }, [setTemporaryMood]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (isReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isReducedMotion]);

  useEffect(() => {
    if (isReducedMotion || !characterRef.current) return;

    const updateEyeTracking = () => {
      const rect = characterRef.current?.getBoundingClientRect();
      if (!rect) return;

      const charCenterX = rect.left + rect.width / 2;
      const charCenterY = rect.top + rect.height / 2;

      const dx = mousePos.x - charCenterX;
      const dy = mousePos.y - charCenterY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      const maxLook = 5;
      const lookX = Math.max(-maxLook, Math.min(maxLook, (dx / (distance || 1)) * maxLook));
      const lookY = Math.max(-maxLook, Math.min(maxLook, (dy / (distance || 1)) * maxLook));

      setLookDirection({ x: lookX, y: lookY });
      setHeadTilt(dx > 0 ? Math.min(8, dx / 50) : Math.max(-8, dx / 50));
    };

    updateEyeTracking();
  }, [mousePos, isReducedMotion]);

  useEffect(() => {
    if (isReducedMotion) return;

    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
    }, 3000 + Math.random() * 2000);

    return () => clearInterval(blinkInterval);
  }, [isReducedMotion]);

  useEffect(() => {
    if (isReducedMotion) return;

    const lookAroundInterval = setInterval(() => {
      if (mood === "idle" && !isHovered) {
        const randomX = (Math.random() - 0.5) * 8;
        const randomY = (Math.random() - 0.5) * 4;
        setLookDirection({ x: randomX, y: randomY });
      }
    }, 2500 + Math.random() * 1500);

    return () => clearInterval(lookAroundInterval);
  }, [isReducedMotion, mood, isHovered]);

  useEffect(() => {
    if (isReducedMotion) return;

    const unsub = useCartStore.subscribe(
      (state) => state.cart,
      (newCart, prevCart) => {
        const newCount = newCart.reduce((sum, item) => sum + item.quantity, 0);
        const prevCount = prevCart.reduce((sum, item) => sum + item.quantity, 0);

        if (newCount > prevCount) {
          const diff = newCount - prevCount;
          if (diff >= 3) {
            setTemporaryMood("celebrate", 3500, "Wow! Big order! 🎉");
            setShowFloatingEmojis(true);
            setTimeout(() => setShowFloatingEmojis(false), 3000);
          } else {
            setTemporaryMood("happy", 2500, "Added to cart! 🛒");
          }
        } else if (newCount < prevCount) {
          setTemporaryMood("sad", 2000, "Oh, okay... 😢");
        }

        prevCartRef.current = newCount;
      }
    );

    return unsub;
  }, [isReducedMotion, setTemporaryMood]);

  useEffect(() => {
    const idleSpeechInterval = setInterval(() => {
      if (mood === "idle" && !isHovered && Math.random() > 0.5) {
        setSpeechText(randomSpeech());
        setShowSpeech(true);
        setTimeout(() => setShowSpeech(false), 3000);
      }
    }, 15000);

    return () => clearInterval(idleSpeechInterval);
  }, [mood, isHovered, randomSpeech]);

  if (!isVisible) return null;

  const getEyeStyle = () => {
    if (isBlinking) return { scaleY: 0.1 };
    if (mood === "happy" || mood === "excited" || mood === "celebrate" || mood === "dance") return { scaleY: 0.85, borderRadius: "0 0 50% 50%" };
    if (mood === "sad") return { scaleY: 0.9, borderRadius: "50% 50% 0 0" };
    if (mood === "surprised" || mood === "thankyou") return { scale: 1.3 };
    return { scaleY: 1 };
  };

  const getMouthPath = () => {
    switch (mood) {
      case "happy":
      case "excited":
      case "celebrate":
      case "dance":
      case "thankyou":
        return "M 28 48 Q 36 56 44 48";
      case "sad":
        return "M 28 54 Q 36 48 44 54";
      case "surprised":
        return "M 32 46 Q 36 54 40 46 Q 36 58 32 46";
      case "wave":
        return "M 30 49 Q 36 54 42 49";
      default:
        return "M 28 50 L 44 50";
    }
  };

  const getBodyAnimation = () => {
    if (isReducedMotion) return {};
    
    if (mood === "dance") {
      return {
        rotate: [0, -5, 5, -5, 5, 0],
        y: [0, -10, -5, -10, -5, 0],
        transition: { repeat: 2, duration: 0.8 },
      };
    }
    if (mood === "celebrate" || mood === "excited") {
      return {
        y: [0, -15, 0, -10, 0],
        transition: { repeat: 3, duration: 0.5 },
      };
    }
    if (mood === "surprised") {
      return {
        scale: [1, 1.1, 1],
        transition: { duration: 0.3 },
      };
    }
    if (isHovered) {
      return {
        y: [0, -3, 0],
        transition: { repeat: Infinity, duration: 1.5 },
      };
    }
    return {
      y: [0, -1, 0, -1, 0],
      transition: { repeat: Infinity, duration: 3, ease: "easeInOut" },
    };
  };

  return (
    <AnimatePresence>
      <motion.div
        ref={characterRef}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        className="fixed bottom-24 md:bottom-8 right-4 z-50"
        style={{ willChange: "transform" }}
      >
        <AnimatePresence>
          {showSpeech && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute -top-16 right-0 bg-white rounded-2xl shadow-lg border border-[#e8e8e8] px-4 py-2 whitespace-nowrap z-10"
            >
              <p className="text-xs font-semibold text-[#1a1a1a]">{speechText}</p>
              <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white border-r border-b border-[#e8e8e8] rotate-45" />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex gap-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="w-6 h-6 rounded-full bg-white shadow-md flex items-center justify-center text-[#666] hover:bg-[#fff0f6] hover:text-[#ff4f8b] transition-colors"
            aria-label={isMinimized ? "Maximize assistant" : "Minimize assistant"}
          >
            {isMinimized ? <MessageCircleHeart className="w-3 h-3" /> : <Minus2 className="w-3 h-3" />}
          </button>
          <button
            onClick={() => setIsVisible(false)}
            className="w-6 h-6 rounded-full bg-white shadow-md flex items-center justify-center text-[#666] hover:bg-red-50 hover:text-red-500 transition-colors"
            aria-label="Hide assistant"
          >
            <X className="w-3 h-3" />
          </button>
        </div>

        <AnimatePresence>
          {!isMinimized && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="cursor-pointer select-none"
              onClick={triggerClickReaction}
              onMouseEnter={() => {
                setIsHovered(true);
                if (mood === "idle") {
                  setMood("happy");
                }
              }}
              onMouseLeave={() => {
                setIsHovered(false);
                if (mood === "happy" && !moodTimeoutRef.current) {
                  setMood("idle");
                }
              }}
            >
              <motion.div
                animate={getBodyAnimation()}
                className="relative"
              >
                <AnimatePresence>
                  {showFloatingEmojis &&
                    FLOATING_ITEMS.map((item) => (
                      <motion.span
                        key={item.id}
                        initial={{ opacity: 1, y: 0, x: (item.id - 3) * 15, scale: 0 }}
                        animate={{
                          opacity: 0,
                          y: -80 - item.id * 10,
                          x: (item.id - 3) * 25,
                          scale: [0, 1.2, 0.8],
                          rotate: (item.id - 3) * 30,
                        }}
                        transition={{
                          duration: 1.5,
                          delay: item.delay,
                          ease: "easeOut",
                        }}
                        className="absolute top-0 left-1/2 text-2xl pointer-events-none z-20"
                      >
                        {item.emoji}
                      </motion.span>
                    ))}
                </AnimatePresence>

                <AnimatePresence>
                  {showHeart && (
                    <motion.div
                      initial={{ opacity: 1, y: 0, scale: 0 }}
                      animate={{ opacity: 0, y: -60, scale: [0, 1.5, 1] }}
                      transition={{ duration: 1.2 }}
                      className="absolute top-2 left-1/2 -translate-x-1/2 pointer-events-none z-20"
                    >
                      <Heart className="w-8 h-8 text-[#ff4f8b] fill-[#ff4f8b]" />
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="relative w-20 h-28 md:w-24 md:h-32">
                  <motion.div
                    className="absolute -top-2 left-1/2 -translate-x-1/2 w-10 h-6 md:w-12 md:h-7"
                    animate={{
                      y: isHovered ? -2 : 0,
                      rotate: isHovered ? -5 : 0,
                    }}
                  >
                    <div className="w-full h-3 md:h-4 bg-[#0c831f] rounded-full" />
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 md:w-10 h-4 md:h-5 bg-[#0c831f] rounded-b-lg" />
                  </motion.div>

                  <motion.div
                    className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-16 md:w-20 md:h-20 bg-[#FFE0BD] rounded-full overflow-hidden"
                    style={{
                      rotate: headTilt,
                      boxShadow: isHovered ? "0 4px 20px rgba(255, 79, 139, 0.2)" : "none",
                    }}
                  >
                    <div className="absolute -bottom-4 md:-bottom-5 left-1/2 -translate-x-1/2 w-14 md:w-16 h-8 md:h-10 bg-[#0c831f] rounded-b-full opacity-80" />

                    <div className="absolute top-5 md:top-6 left-3 md:left-3.5 w-3.5 h-3.5 md:w-4 md:h-4">
                      <motion.div
                        className="w-full h-full bg-[#2d1810] rounded-full relative"
                        animate={getEyeStyle()}
                        style={{
                          transform: `translate(${lookDirection.x * 0.3}px, ${lookDirection.y * 0.3}px)`,
                        }}
                      >
                        <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-white rounded-full opacity-80" />
                      </motion.div>
                    </div>
                    <div className="absolute top-5 md:top-6 right-3 md:right-3.5 w-3.5 h-3.5 md:w-4 md:h-4">
                      <motion.div
                        className="w-full h-full bg-[#2d1810] rounded-full relative"
                        animate={getEyeStyle()}
                        style={{
                          transform: `translate(${lookDirection.x * 0.3}px, ${lookDirection.y * 0.3}px)`,
                        }}
                      >
                        <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-white rounded-full opacity-80" />
                      </motion.div>
                    </div>

                    {mood === "happy" || mood === "excited" || mood === "celebrate" ? (
                      <>
                        <div className="absolute top-9 md:top-10 left-1 w-2.5 h-1.5 bg-pink-300 rounded-full opacity-60" />
                        <div className="absolute top-9 md:top-10 right-1 w-2.5 h-1.5 bg-pink-300 rounded-full opacity-60" />
                      </>
                    ) : null}

                    <div className="absolute top-10 md:top-11 left-1/2 -translate-x-1/2">
                      <svg width="48" height="64" viewBox="0 0 72 80" className="w-10 h-10 md:w-12 md:h-12 -mt-1">
                        <path
                          d={getMouthPath()}
                          fill="none"
                          stroke="#2d1810"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </motion.div>

                  <motion.div
                    className="absolute bottom-6 left-1/2 -translate-x-1/2 w-14 h-12 md:w-16 md:h-14 bg-[#0c831f] rounded-lg rounded-t-2xl"
                    animate={{
                      y: mood === "dance" ? [0, -3, 0, 3, 0] : 0,
                      transition: { repeat: mood === "dance" ? Infinity : 0, duration: 0.4 },
                    }}
                  >
                    <div className="absolute top-1 left-1/2 -translate-x-1/2 w-10 h-2 md:w-12 md:h-2.5 bg-[#ff4f8b] rounded" />
                    <div className="absolute top-4 left-2 w-1.5 h-1.5 bg-[#ffd700] rounded-full" />
                    <div className="absolute top-4 right-2 w-1.5 h-1.5 bg-[#ffd700] rounded-full" />
                  </motion.div>

                  <div className="absolute -left-0.5 top-14 md:top-16">
                    <motion.div
                      className="w-4 h-8 md:w-5 md:h-10 bg-[#FFE0BD] rounded-full origin-top"
                      animate={{
                        rotate: mood === "wave" ? [-15, -60, -20, -55, -25, -15] : isHovered ? -20 : 0,
                        y: mood === "wave" ? [0, -2, 0, -1, 0] : 0,
                      }}
                      transition={{
                        duration: mood === "wave" ? 0.6 : 0.3,
                        repeat: mood === "wave" ? 3 : 0,
                      }}
                    />
                  </div>

                  <motion.div
                    className="absolute -right-0.5 top-14 md:top-16"
                    animate={{
                      rotate: isHovered ? 20 : 0,
                    }}
                  >
                    <div className="w-4 h-8 md:w-5 md:h-10 bg-[#FFE0BD] rounded-full" />
                    <div className="absolute -bottom-1 -right-2 md:-right-3 w-10 h-9 md:w-12 md:h-11 bg-[#ff4f8b] rounded-t-lg rounded-b-md">
                      <div className="absolute -top-0.5 left-0 right-0 h-1.5 bg-[#fff0f6]" />
                      <div className="absolute top-2 left-1.5 text-xs">🥬</div>
                      <div className="absolute top-4 right-1.5 text-xs">🍎</div>
                      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 text-xs">🥛</div>
                    </div>
                  </motion.div>

                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-1">
                    <motion.div
                      className="w-4 h-2.5 bg-[#0a6b19] rounded-b-lg"
                      animate={{
                        y: isWalking ? [0, -4, 0] : 0,
                        transition: {
                          repeat: isWalking ? Infinity : 0,
                          duration: 0.3,
                          delay: walkSpeed > 0.5 ? 0 : 0.15,
                        },
                      }}
                    />
                    <motion.div
                      className="w-4 h-2.5 bg-[#0a6b19] rounded-b-lg"
                      animate={{
                        y: isWalking ? [0, -4, 0] : 0,
                        transition: {
                          repeat: isWalking ? Infinity : 0,
                          duration: 0.3,
                          delay: walkSpeed > 0.5 ? 0.15 : 0,
                        },
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {isMinimized && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMinimized(false)}
            className="w-12 h-12 rounded-full bg-gradient-to-br from-[#ff4f8b] to-[#e63872] shadow-lg flex items-center justify-center text-white"
            aria-label="Show assistant"
          >
            <span className="text-xl">🛒</span>
          </motion.button>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
