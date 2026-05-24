"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/store/cart-store";
import { X, Minus, MessageCircleHeart, Heart } from "lucide-react";

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

const BASE_PADDING_RIGHT = 20;
const BASE_PADDING_BOTTOM = 40;
const FOLLOW_RADIUS_X = 90;
const FOLLOW_RADIUS_Y = 70;
const SMOOTHING_FACTOR = 0.08;
const SCROLL_IMPULSE_FACTOR = 0.35;
const SCROLL_DECAY = 0.92;

export default function GroceryAssistant() {
  const [isVisible, setIsVisible] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [mood, setMood] = useState<Mood>("idle");
  const [isHovered, setIsHovered] = useState(false);
  const [showFloatingEmojis, setShowFloatingEmojis] = useState(false);
  const [showSpeech, setShowSpeech] = useState(false);
  const [speechText, setSpeechText] = useState("");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);
  const [lookDirection, setLookDirection] = useState({ x: 0, y: 0 });
  const [headTilt, setHeadTilt] = useState(0);
  const [showHeart, setShowHeart] = useState(false);
  const [isWalking, setIsWalking] = useState(false);
  const [walkSpeed, setWalkSpeed] = useState(0);
  const [scrollVelocity, setScrollVelocity] = useState(0);
  const [characterX, setCharacterX] = useState(0);
  const [characterY, setCharacterY] = useState(0);
  const [walkCycle, setWalkCycle] = useState(0);

  const characterRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const currentXRef = useRef(0);
  const currentYRef = useRef(0);
  const targetXRef = useRef(0);
  const targetYRef = useRef(0);
  const lastScrollYRef = useRef(0);
  const scrollOffsetRef = useRef(0);
  const prevCartRef = useRef(0);
  const moodTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const walkTimeRef = useRef(0);
  const mousePosRef = useRef({ x: 0, y: 0 });

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

  // Reduced motion detection
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // Mouse tracking — store in ref for animation loop, state for reactive rendering
  useEffect(() => {
    if (isReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      const pos = { x: e.clientX, y: e.clientY };
      mousePosRef.current = pos;
      setMousePos(pos);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isReducedMotion]);

  // Position tracking + scroll + walk animation loop (reads mousePosRef for perf)
  useEffect(() => {
    if (isReducedMotion) return;

    const updateBasePosition = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const baseX = w - 100 - BASE_PADDING_RIGHT;
      const baseY = h - 160 - BASE_PADDING_BOTTOM;
      targetXRef.current = baseX;
      targetYRef.current = baseY;

      if (currentXRef.current === 0 && currentYRef.current === 0) {
        currentXRef.current = baseX;
        currentYRef.current = baseY;
        setCharacterX(baseX);
        setCharacterY(baseY);
      }
    };

    updateBasePosition();
    lastScrollYRef.current = window.scrollY;

    const animate = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      // Base position (bottom-right)
      const baseX = w - 100 - BASE_PADDING_RIGHT;
      const baseY = h - 160 - BASE_PADDING_BOTTOM;

      // Mouse influence from ref (no state dependency)
      const mouse = mousePosRef.current;
      const dx = mouse.x - w / 2;
      const dy = mouse.y - h / 2;
      const mouseOffsetX = (dx / (w / 2)) * FOLLOW_RADIUS_X;
      const mouseOffsetY = (dy / (h / 2)) * FOLLOW_RADIUS_Y;

      // Scroll tracking
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollYRef.current;
      lastScrollYRef.current = currentScrollY;

      if (Math.abs(scrollDelta) > 0.5) {
        scrollOffsetRef.current += scrollDelta * SCROLL_IMPULSE_FACTOR;
        scrollOffsetRef.current = Math.max(-40, Math.min(40, scrollOffsetRef.current));
      }
      scrollOffsetRef.current *= SCROLL_DECAY;
      if (Math.abs(scrollOffsetRef.current) < 0.1) scrollOffsetRef.current = 0;

      // Calculate target position
      const targetX = baseX + mouseOffsetX;
      const targetY = baseY + mouseOffsetY + scrollOffsetRef.current;

      targetXRef.current = targetX;
      targetYRef.current = targetY;

      // Smooth interpolation
      currentXRef.current += (targetX - currentXRef.current) * SMOOTHING_FACTOR;
      currentYRef.current += (targetY - currentYRef.current) * SMOOTHING_FACTOR;

      // Calculate movement speed for walk animation
      const speed = Math.abs(targetX - currentXRef.current) + Math.abs(targetY - currentYRef.current);
      const normalizedSpeed = Math.min(1, speed / 30);

      // Walk cycle
      walkTimeRef.current += normalizedSpeed * 0.15 + 0.01;
      const isMoving = normalizedSpeed > 0.05 || Math.abs(scrollOffsetRef.current) > 2;

      setCharacterX(Math.round(currentXRef.current * 10) / 10);
      setCharacterY(Math.round(currentYRef.current * 10) / 10);
      setIsWalking(isMoving);
      setWalkSpeed(normalizedSpeed);
      setScrollVelocity(scrollDelta);
      setWalkCycle(walkTimeRef.current);

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    const handleResize = () => updateBasePosition();
    window.addEventListener("resize", handleResize);

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, [isReducedMotion]);

  // Eye tracking
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

      const maxLook = 6;
      const lookX = Math.max(-maxLook, Math.min(maxLook, (dx / (distance || 1)) * maxLook));
      const lookY = Math.max(-maxLook, Math.min(maxLook, (dy / (distance || 1)) * maxLook));

      setLookDirection({ x: lookX, y: lookY });
      setHeadTilt(dx > 0 ? Math.min(6, dx / 60) : Math.max(-6, dx / 60));
    };

    updateEyeTracking();
  }, [mousePos, isReducedMotion]);

  // Blink interval
  useEffect(() => {
    if (isReducedMotion) return;

    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 120);
    }, 3000 + Math.random() * 2000);

    return () => clearInterval(blinkInterval);
  }, [isReducedMotion]);

  // Random look-around when idle
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

  // Cart events subscription
  useEffect(() => {
    if (isReducedMotion) return;

    const unsub = useCartStore.subscribe(
      (state, prevState) => {
        const newCart = state.cart;
        const prevCart = prevState.cart;
        const newCount = newCart.reduce((sum: number, item) => sum + item.quantity, 0);
        const prevCount = prevCart.reduce((sum: number, item) => sum + item.quantity, 0);

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

  // Idle speech
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
        return "M 20 36 Q 32 46 44 36";
      case "sad":
        return "M 20 40 Q 32 32 44 40";
      case "surprised":
        return "M 24 32 Q 32 44 40 32 Q 32 48 24 32";
      case "wave":
        return "M 22 38 Q 32 44 42 38";
      default:
        return "M 22 38 L 42 38";
    }
  };

  const getBodyAnimation = () => {
    if (isReducedMotion) return undefined;

    if (mood === "dance") {
      return {
        rotate: [0, -6, 6, -6, 6, 0],
        y: [0, -8, -4, -8, -4, 0],
        transition: { repeat: 2, duration: 0.8 },
      };
    }
    if (mood === "celebrate" || mood === "excited") {
      return {
        y: [0, -12, 0, -8, 0],
        transition: { repeat: 3, duration: 0.5 },
      };
    }
    if (mood === "surprised") {
      return {
        scale: [1, 1.08, 1],
        transition: { duration: 0.3 },
      };
    }
    if (isHovered && !isWalking) {
      return {
        y: [0, -3, 0],
        transition: { repeat: Infinity, duration: 1.2 },
      };
    }
    if (!isWalking) {
      return {
        y: [0, -1, 0, -1, 0],
        transition: { repeat: Infinity, duration: 3, ease: [0.42, 0, 0.58, 1] as const },
      };
    }
    return undefined;
  };

  // Helper: walking leg positions
  const getLegY = (legIndex: number) => {
    if (!isWalking || isReducedMotion) return 0;
    const phase = legIndex === 0 ? 0 : Math.PI;
    return Math.sin(walkCycle * 3 + phase) * (3 + walkSpeed * 4);
  };

  // Hair blow amount based on movement speed
  const hairSway = isWalking ? walkSpeed * 3 + Math.abs(scrollVelocity) * 0.05 : 0;

  return (
    <AnimatePresence>
      <motion.div
        ref={characterRef}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        className="fixed z-50"
        style={{
          left: characterX,
          top: characterY,
          willChange: "left, top",
        }}
      >
        {/* Speech Bubble */}
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

        {/* Control Buttons — only show when not minimized */}
        {!isMinimized && (
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex gap-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="w-6 h-6 rounded-full bg-white shadow-md flex items-center justify-center text-[#666] hover:bg-[#e0f7fa] hover:text-[#00b4d8] transition-colors"
            aria-label={isMinimized ? "Maximize assistant" : "Minimize assistant"}
          >
            {isMinimized ? <MessageCircleHeart className="w-3 h-3" /> : <Minus className="w-3 h-3" />}
          </button>
          <button
            onClick={() => setIsVisible(false)}
            className="w-6 h-6 rounded-full bg-white shadow-md flex items-center justify-center text-[#666] hover:bg-red-50 hover:text-red-500 transition-colors"
            aria-label="Hide assistant"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
        )}

        {/* Main Character */}
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
                style={{
                  filter: scrollVelocity > 5 ? "blur(0.3px)" : "none",
                }}
              >
                {/* Floating Emojis */}
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

                {/* Heart Animation */}
                <AnimatePresence>
                  {showHeart && (
                    <motion.div
                      initial={{ opacity: 1, y: 0, scale: 0 }}
                      animate={{ opacity: 0, y: -60, scale: [0, 1.5, 1] }}
                      transition={{ duration: 1.2 }}
                      className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none z-20"
                    >
                      <Heart className="w-8 h-8 text-[#ff4f8b] fill-[#ff4f8b]" />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* === SVG CHARACTER — HOODIE BOY (Pixar-style) === */}
                <svg
                  width="90"
                  height="120"
                  viewBox="0 0 72 100"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ display: "block" }}
                >
                  {/* ── SHADOW under feet ── */}
                  <ellipse cx="36" cy="96" rx="14" ry="3" fill="rgba(0,0,0,0.08)" />

                  {/* ── LEGS — Blue Jeans ── */}
                  {/* Left leg */}
                  <g>
                    <rect x="24" y={78 + getLegY(0)} width="11" height="14" rx="3" fill="#457b9d" />
                    {/* Jeans seam */}
                    <line x1="29" y1={78 + getLegY(0)} x2="29" y2={92 + getLegY(0)} stroke="#3a6f8f" strokeWidth="0.5" opacity="0.5" />
                  </g>
                  {/* Right leg */}
                  <g>
                    <rect x="37" y={78 + getLegY(1)} width="11" height="14" rx="3" fill="#457b9d" />
                    {/* Jeans seam */}
                    <line x1="42" y1={78 + getLegY(1)} x2="42" y2={92 + getLegY(1)} stroke="#3a6f8f" strokeWidth="0.5" opacity="0.5" />
                  </g>

                  {/* ── SHOES — Red & White Sneakers ── */}
                  {/* Left shoe */}
                  <g>
                    <rect x="22" y={90 + getLegY(0)} width="15" height="6" rx="3" fill="#e63946" />
                    <rect x="22" y={94 + getLegY(0)} width="15" height="2" rx="1" fill="white" />
                    <rect x="23" y={91 + getLegY(0)} width="4" height="2" rx="1" fill="white" opacity="0.4" />
                    {/* Laces */}
                    <line x1="26" y1="92" x2="28" y2="92" stroke="white" strokeWidth="0.6" opacity="0.5" />
                    <line x1="30" y1="92" x2="32" y2="92" stroke="white" strokeWidth="0.6" opacity="0.5" />
                  </g>
                  {/* Right shoe */}
                  <g>
                    <rect x="35" y={90 + getLegY(1)} width="15" height="6" rx="3" fill="#e63946" />
                    <rect x="35" y={94 + getLegY(1)} width="15" height="2" rx="1" fill="white" />
                    <rect x="36" y={91 + getLegY(1)} width="4" height="2" rx="1" fill="white" opacity="0.4" />
                    {/* Laces */}
                    <line x1="39" y1="92" x2="41" y2="92" stroke="white" strokeWidth="0.6" opacity="0.5" />
                    <line x1="43" y1="92" x2="45" y2="92" stroke="white" strokeWidth="0.6" opacity="0.5" />
                  </g>

                  {/* ── BODY — Turquoise Hoodie ── */}
                  {/* Main torso */}
                  <rect x="19" y="44" width="34" height="33" rx="8" fill="#00b4d8" />
                  {/* Orange center zipper stripe */}
                  <rect x="34.5" y="44" width="3" height="33" rx="1.5" fill="#ff6d00" />
                  {/* Zipper teeth */}
                  <line x1="35" y1="46" x2="35" y2="75" stroke="#e85d04" strokeWidth="0.5" opacity="0.4" />
                  <line x1="37" y1="46" x2="37" y2="75" stroke="#e85d04" strokeWidth="0.5" opacity="0.4" />
                  {/* Hoodie pocket */}
                  <rect x="22" y="62" width="22" height="6" rx="3" fill="#0096c7" opacity="0.5" />
                  {/* Pocket line */}
                  <line x1="33" y1="62" x2="33" y2="68" stroke="#0096c7" strokeWidth="0.8" opacity="0.3" />

                  {/* E-GROCERY logo patch */}
                  <rect x="24" y="50" width="24" height="8" rx="2.5" fill="white" opacity="0.95" />
                  <text x="36" y="56" textAnchor="middle" fontSize="4.2" fontWeight="bold" fill="#00b4d8" fontFamily="Arial, sans-serif" letterSpacing="0.5">
                    E-GROCERY
                  </text>

                  {/* ── HOOD (behind head) ── */}
                  <path d="M 18 43 Q 18 20 36 20 Q 54 20 54 43" fill="#00b4d8" />
                  {/* Orange hood inner lining */}
                  <path d="M 19 43 Q 19 22 36 22 Q 53 22 53 43" fill="none" stroke="#ff6d00" strokeWidth="1.8" opacity="0.7" />
                  {/* Hood drawstrings */}
                  <path d="M 32 43 Q 30 50 28 54" fill="none" stroke="#ff6d00" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M 40 43 Q 42 50 44 54" fill="none" stroke="#ff6d00" strokeWidth="1.5" strokeLinecap="round" />
                  <circle cx="28" cy="54" r="1.5" fill="#ff6d00" />
                  <circle cx="44" cy="54" r="1.5" fill="#ff6d00" />

                  {/* ── ARMS (hoodie sleeves) ── */}
                  {/* Left arm — waves on hover */}
                  <g>
                    <motion.path
                      d="M 19 48 Q 12 55 14 68"
                      fill="none"
                      stroke="#00b4d8"
                      strokeWidth="10"
                      strokeLinecap="round"
                      animate={{
                        d: isHovered || mood === "wave"
                          ? ["M 19 48 Q 6 42 8 58", "M 19 48 Q 4 40 6 56", "M 19 48 Q 6 42 8 58"]
                          : ["M 19 48 Q 12 55 14 68"],
                      }}
                      transition={{
                        duration: mood === "wave" ? 0.5 : 1.2,
                        repeat: isHovered || mood === "wave" ? Infinity : 0,
                        repeatType: "mirror",
                      }}
                    />
                    {/* Left hand — animated in sync with arm */}
                    <motion.circle
                      r="4"
                      fill="#FFE0BD"
                      animate={{
                        cx: isHovered || mood === "wave" ? [8, 6, 8] : [14],
                        cy: isHovered || mood === "wave" ? [58, 56, 58] : [68],
                      }}
                      transition={{
                        duration: mood === "wave" ? 0.5 : 1.2,
                        repeat: isHovered || mood === "wave" ? Infinity : 0,
                        repeatType: "mirror",
                      }}
                    />
                    {/* Fingers detail (only when not waving) */}
                    {!(isHovered || mood === "wave") && (
                      <>
                        <line x1="15" y1="66" x2="16" y2="70" stroke="#e8c9a0" strokeWidth="0.8" strokeLinecap="round" />
                        <line x1="17" y1="67" x2="17" y2="70" stroke="#e8c9a0" strokeWidth="0.8" strokeLinecap="round" />
                      </>
                    )}
                  </g>

                  {/* Right arm — relaxed at side */}
                  <g>
                    <path
                      d="M 53 48 Q 60 55 58 68"
                      fill="none"
                      stroke="#00b4d8"
                      strokeWidth="10"
                      strokeLinecap="round"
                    />
                    {/* Right hand */}
                    <circle cx="58" cy="68" r="4" fill="#FFE0BD" />
                    {/* Fingers detail */}
                    <line x1="57" y1="66" x2="56" y2="70" stroke="#e8c9a0" strokeWidth="0.8" strokeLinecap="round" />
                    <line x1="59" y1="66" x2="59" y2="70" stroke="#e8c9a0" strokeWidth="0.8" strokeLinecap="round" />
                  </g>

                  {/* ── NECK ── */}
                  <rect x="33" y="40" width="6" height="7" rx="3" fill="#FFE0BD" />

                  {/* ── HEAD ── */}
                  <g style={{ transformOrigin: "36px 28px" }}>
                    <motion.g
                      animate={{ rotate: headTilt }}
                      transition={{ type: "spring", stiffness: 150, damping: 15 }}
                    >
                      {/* Face */}
                      <circle cx="36" cy="26" r="17" fill="#FFE0BD" />

                      {/* ── EARS ── */}
                      <ellipse cx="19" cy="26" rx="3" ry="4.5" fill="#f5cba7" />
                      <ellipse cx="53" cy="26" rx="3" ry="4.5" fill="#f5cba7" />

                      {/* ── HAIR — Fluffy Light Brown ── */}
                      {/* Main hair volume */}
                      <path d="M 16 20 C 16 8 24 6 36 6 C 48 6 56 8 56 20 C 58 14 56 8 48 5 C 40 2 32 2 24 5 C 16 8 14 14 16 20 Z" fill="#d4a373" />
                      {/* Hair highlight layer */}
                      <path d="M 20 12 C 24 8 30 7 36 7 C 42 7 48 8 52 12" fill="none" stroke="#e0b98a" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
                      {/* Hair spiky tufts */}
                      <path d="M 22 8 C 24 4 28 3 32 5" fill="none" stroke="#c4884d" strokeWidth="2" strokeLinecap="round" />
                      <path d="M 34 4 C 36 2 40 2 44 5" fill="none" stroke="#c4884d" strokeWidth="2" strokeLinecap="round" />
                      <path d="M 46 5 C 50 3 53 5 55 10" fill="none" stroke="#d4a373" strokeWidth="2" strokeLinecap="round" />

                      {/* ── BANGS (sweeping fringe) ── */}
                      <path d="M 18 16 Q 24 12 30 14 Q 36 15 42 13 Q 48 10 54 15" fill="none" stroke="#c4884d" strokeWidth="1.8" strokeLinecap="round" opacity="0.7" />

                      {/* Side hair — left */}
                      <motion.path d="M 16 20 Q 15 24 17 28 Q 18 24 18 20 Z" fill="#d4a373"
                        animate={{
                          d: hairSway > 0.5
                            ? "M 15 20 Q 14 24 16 30 Q 16 24 17 20 Z"
                            : "M 16 20 Q 15 24 17 28 Q 18 24 18 20 Z",
                        }}
                        transition={{ duration: 0.3 }}
                      />
                      {/* Side hair — right */}
                      <motion.path d="M 56 20 Q 57 24 55 28 Q 54 24 54 20 Z" fill="#d4a373"
                        animate={{
                          d: hairSway > 0.5
                            ? "M 57 20 Q 58 24 56 30 Q 56 24 55 20 Z"
                            : "M 56 20 Q 57 24 55 28 Q 54 24 54 20 Z",
                        }}
                        transition={{ duration: 0.3 }}
                      />

                      {/* ── EYEBROWS ── */}
                      <path d="M 23 17 Q 27 14.5 31 17" fill="none" stroke="#8B5E3C" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M 41 17 Q 45 14.5 49 17" fill="none" stroke="#8B5E3C" strokeWidth="1.5" strokeLinecap="round" />

                      {/* ── BLUSH (when happy) ── */}
                      {(mood === "happy" || mood === "excited" || mood === "celebrate" || isHovered) && (
                        <>
                          <ellipse cx="22" cy="30" rx="5" ry="3" fill="#ffb3c6" opacity="0.5" />
                          <ellipse cx="50" cy="30" rx="5" ry="3" fill="#ffb3c6" opacity="0.5" />
                        </>
                      )}

                      {/* ── EYES — Big & Expressive ── */}
                      {/* Left eye */}
                      <g transform={`translate(${lookDirection.x * 0.2}px, ${lookDirection.y * 0.2}px)`}>
                        <motion.g animate={getEyeStyle()} style={{ transformOrigin: "27px 24px" }}>
                          {/* Sclera */}
                          <ellipse cx="27" cy="24" rx="6" ry="6.5" fill="white" />
                          {/* Iris */}
                          <ellipse cx="28" cy="24" rx="4" ry="4.5" fill="#5c3a1e" />
                          {/* Main highlight */}
                          <circle cx="30" cy="22" r="1.5" fill="white" opacity="0.95" />
                          {/* Secondary highlight */}
                          <circle cx="26" cy="25.5" r="0.7" fill="white" opacity="0.5" />
                        </motion.g>
                      </g>

                      {/* Right eye */}
                      <g transform={`translate(${lookDirection.x * 0.2}px, ${lookDirection.y * 0.2}px)`}>
                        <motion.g animate={getEyeStyle()} style={{ transformOrigin: "45px 24px" }}>
                          {/* Sclera */}
                          <ellipse cx="45" cy="24" rx="6" ry="6.5" fill="white" />
                          {/* Iris */}
                          <ellipse cx="46" cy="24" rx="4" ry="4.5" fill="#5c3a1e" />
                          {/* Main highlight */}
                          <circle cx="48" cy="22" r="1.5" fill="white" opacity="0.95" />
                          {/* Secondary highlight */}
                          <circle cx="44" cy="25.5" r="0.7" fill="white" opacity="0.5" />
                        </motion.g>
                      </g>

                      {/* ── NOSE ── */}
                      <path d="M 35 28 Q 37 30 35 31.5" fill="none" stroke="#d4a574" strokeWidth="1.3" strokeLinecap="round" />

                      {/* ── MOUTH ── */}
                      <svg x="20" y="30" width="32" height="18" viewBox="0 0 64 24" overflow="visible">
                        <path
                          d={getMouthPath()}
                          fill="none"
                          stroke="#2d1810"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </motion.g>
                  </g>
                </svg>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Minimized state */}
        {isMinimized && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMinimized(false)}
            className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00b4d8] to-[#0077b6] shadow-lg flex items-center justify-center text-white"
            aria-label="Show assistant"
          >
            <span className="text-xl">🛒</span>
          </motion.button>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
