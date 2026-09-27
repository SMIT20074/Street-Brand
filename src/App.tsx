import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { 
  ShoppingBag, Heart, Search, X, Volume2, VolumeX, ArrowRight, Play, Check, 
  RotateCcw, Sliders, Eye, Sparkles, Plus, Minus, ShieldCheck, Zap, Globe, 
  ChevronRight, Maximize2, MoveRight, Layers, Cpu, ExternalLink, RefreshCw, Send,
  Tv, Compass, Sparkle, Compass as CompassIcon, Flame
} from 'lucide-react';

// Synthesized Web Audio API Sound Generator for Ultra-Responsive Tactical Feedback
const playSound = (type = 'hover') => {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;
    if (type === 'hover') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.03);
      gain.gain.setValueAtTime(0.015, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.03);
      osc.start(now);
      osc.stop(now + 0.03);
    } else if (type === 'click') {
      osc.type = 'square';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(110, now + 0.05);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);
      osc.start(now);
      osc.stop(now + 0.05);
    } else if (type === 'add') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, now);
      osc.frequency.exponentialRampToValueAtTime(1046.50, now + 0.08);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);
      osc.start(now);
      osc.stop(now + 0.08);
    } else if (type === 'glitch') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(150 + Math.random() * 600, now);
      gain.gain.setValueAtTime(0.03, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);
      osc.start(now);
      osc.stop(now + 0.04);
    }
  } catch (e) {
    // Audio Context handled silently if restricted
  }
};

const PRODUCTS = [
  {
    id: 'prod-01',
    name: 'EXO-SHELL TACTICAL HOODIE V2',
    category: 'HOODIES',
    price: 380,
    gsm: '550 Heavyweight Organic Cotton',
    stock: 4,
    maxStock: 25,
    tag: 'LIMITED DROP',
    description: 'Constructed from Japanese 550 GSM dense fleece with water-repellent laser-cut shoulder overlays and dual magnetic chest utility pockets.',
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&q=80&w=1000'
    ]
  },
  {
    id: 'prod-02',
    name: 'CYBER-GRID OVERSIZED ARCHIVE TEE',
    category: 'TEES',
    price: 145,
    gsm: '320 GSM Combed Cotton',
    stock: 12,
    maxStock: 50,
    tag: 'POPULAR',
    description: 'Signature drop-shoulder fit featuring high-density puff printed grid graphic across the spine and subtle industrial label on the left rib.',
    images: [
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&q=80&w=1000'
    ]
  },
  {
    id: 'prod-03',
    name: 'NEO-TOKYO MODULAR CARGO PANT',
    category: 'BOTTOMS',
    price: 420,
    gsm: '420 Ripstop Nylon / Cotton',
    stock: 3,
    maxStock: 15,
    tag: 'ULTRA LOW STOCK',
    description: '8-pocket articulation system with quick-release Fidlock magnetic buckles, expandable gusset, and adjustable ankle cinch straps.',
    images: [
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&q=80&w=1000'
    ]
  },
  {
    id: 'prod-04',
    name: 'ACID-VOID PARKA JACKET 01',
    category: 'OUTERWEAR',
    price: 650,
    gsm: '3-Layer GoreTech Membrane',
    stock: 2,
    maxStock: 10,
    tag: 'FLAGSHIP',
    description: 'Fully seam-sealed waterproof outer shell with internal carry sling, high-neck storm hood, and neon accent heat-transfer decals.',
    images: [
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&q=80&w=1000'
    ]
  },
  {
    id: 'prod-05',
    name: 'CTRL//MASK BALACLAVA CAP',
    category: 'ACCESSORIES',
    price: 95,
    gsm: 'Merino Wool Blend',
    stock: 18,
    maxStock: 40,
    tag: 'ESSENTIAL',
    description: 'Convertible headwear system transitioning seamlessly from structured tactical beanie to full thermal face protection.',
    images: [
      'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1521369984125-a4de2c42168b?auto=format&fit=crop&q=80&w=1000'
    ]
  },
  {
    id: 'prod-06',
    name: 'MATRIX INDUSTRIAL BELT BAG',
    category: 'ACCESSORIES',
    price: 210,
    gsm: '1000D Cordura Nylon',
    stock: 7,
    maxStock: 30,
    tag: 'NEW REVISION',
    description: 'Weatherproof modular crossbody chest rig featuring matte black aluminum COBRA buckle and laser-cut webbing attachments.',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&q=80&w=1000'
    ]
  }
];

const LOOKBOOK_ITEMS = [
  { id: 1, title: 'ARCHIVE // 001 - TOKYO DRIFT', rotation: -4, x: -10, y: 0, image: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&q=80&w=800', location: 'Shibuya Underpass', camera: 'Leica M10 / 35mm Summilux' },
  { id: 2, title: 'ARCHIVE // 002 - ACID RAIN', rotation: 6, x: 20, y: -15, image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800', location: 'Berlin East Side', camera: 'Contax T2 / Portra 400' },
  { id: 3, title: 'ARCHIVE // 003 - BRUTALIST SHADOW', rotation: -2, x: -15, y: 15, image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=800', location: 'London Barbican', camera: 'Hasselblad 500C/M' },
  { id: 4, title: 'ARCHIVE // 004 - NEON DUALITY', rotation: 5, x: 10, y: 10, image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=800', location: 'Seoul Gangnam Roof', camera: 'Sony A1 / 85mm GM' }
];

const ARCHIVE_VIDEOS = [
  { id: 'vid-1', title: 'RUNWAY // SYSTEM OVERRIDE', year: '2026', specs: '4K RAW // 120 FPS // RED V-RAPTOR', thumbnail: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&q=80&w=800', youtubeId: 'zOc189jUqzg' },
  { id: 'vid-2', title: 'LAB DOCUMENTARY // 550 GSM', year: '2025', specs: '1080p FILM // 24 FPS // ARRI ALEXA MINI', thumbnail: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=800', youtubeId: 'zOc189jUqzg' },
  { id: 'vid-3', title: 'STREET OPS // SHIBUYA NIGHT', year: '2026', specs: '4K ANAMORPHIC // 60 FPS // BLACKMAGIC 6K', thumbnail: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=800', youtubeId: 'zOc189jUqzg' }
];

const COMMUNITY_POSTS = [
  { id: 1, handle: '@kai_cyber', fit: 'EXO-SHELL HOODIE + MATRIX RIG', image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=800', location: 'Tokyo' },
  { id: 2, handle: '@ren_matrix', fit: 'ACID-VOID PARKA + NEO PANT', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800', location: 'Berlin' },
  { id: 3, handle: '@zero_arch', fit: 'CYBER-GRID TEE + CTRL CAP', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800', location: 'New York' },
  { id: 4, handle: '@lux_void', fit: 'FULL TACTICAL SYSTEM 01', image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=800', location: 'Seoul' }
];

export default function App() {
  // Global App States
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [cursorText, setCursorText] = useState('');
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [cursorVariant, setCursorVariant] = useState('default');
  
  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [videoModalUrl, setVideoModalUrl] = useState(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [discountApplied, setDiscountApplied] = useState(false);
  const [promoCode, setPromoCode] = useState('');

  // 1-of-1 Custom Garment Builder State
  const [customGarment, setCustomGarment] = useState({
    color: '#0a0a0a',
    colorName: 'OBSIDIAN VOID',
    text: 'NEON//CTRL',
    textColor: '#ff0033',
    patch: 'TACTICAL GLITCH',
    size: 'L',
    price: 320
  });

  // AI Fit Predictor State
  const [heightCm, setHeightCm] = useState(178);
  const [weightKg, setWeightKg] = useState(74);

  // Time Clocks State
  const [times, setTimes] = useState({ tokyo: '', berlin: '', ny: '', mumbai: '' });

  // Scroll Progress Setup
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Custom Cursor Tracker
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Audio Handler wrapper
  const triggerAudio = (type) => {
    if (soundEnabled) playSound(type);
  };

  // Toast System
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Dynamic Live World Clocks
  useEffect(() => {
    const updateClocks = () => {
      const now = new Date();
      const getTZ = (tz) => new Intl.DateTimeFormat('en-US', { timeZone: tz, hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).format(now);
      setTimes({
        tokyo: getTZ('Asia/Tokyo'),
        berlin: getTZ('Europe/Berlin'),
        ny: getTZ('America/New_York'),
        mumbai: getTZ('Asia/Kolkata')
      });
    };
    updateClocks();
    const interval = setInterval(updateClocks, 1000);
    return () => clearInterval(interval);
  }, []);

  // Cart helper actions
  const addToCart = (product, selectedSize = 'L') => {
    triggerAudio('add');
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id && item.selectedSize === selectedSize);
      if (existing) {
        return prev.map(item => item.id === product.id && item.selectedSize === selectedSize ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { ...product, selectedSize, qty: 1 }];
    });
    showToast(`ADDED ${product.name} [${selectedSize}] TO TACTICAL BAG`);
  };

  const toggleWishlist = (productId) => {
    triggerAudio('click');
    setWishlist(prev => 
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  const cartSubtotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const cartTotal = discountApplied ? cartSubtotal * 0.8 : cartSubtotal;

  // AI Fit Predictor Math Calculation
  const calculatePredictedSize = () => {
    const ratio = weightKg / (heightCm / 100);
    if (ratio < 38) return { size: 'S', fit: 'Tailored Boxy Fit', gsm: '380 GSM Heavy Fleece', shoulderDrop: '5.2 cm' };
    if (ratio < 42) return { size: 'M', fit: 'Standard Oversized Fit', gsm: '450 GSM Heavy Fleece', shoulderDrop: '6.5 cm' };
    if (ratio < 47) return { size: 'L', fit: 'Aggressive Drop-Shoulder Fit', gsm: '550 GSM Dense Fleece', shoulderDrop: '8.0 cm' };
    if (ratio < 52) return { size: 'XL', fit: 'Maximum Tactical Silhouette', gsm: '550 GSM Dense Fleece', shoulderDrop: '9.5 cm' };
    return { size: 'XXL', fit: 'Extreme Avant-Garde Volumetric', gsm: '600 GSM Ultra-Dense', shoulderDrop: '11.0 cm' };
  };

  const predictedFit = calculatePredictedSize();

  return (
    <div className="min-h-screen bg-[#030303] text-white selection:bg-[#ff0033] selection:text-black font-sans relative overflow-x-hidden cursor-none">
      
      {/* 16mm Film Grain Noise Overlay */}
      <div 
        className="fixed inset-0 pointer-events-none z-[999] opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      {/* Global Scroll Progress Bar */}
      <motion.div 
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[2px] bg-[#ff0033] z-[100] transform-origin-left"
      />

      {/* Custom Tactical Cursor */}
      <motion.div
        className="fixed pointer-events-none z-[1000] flex items-center justify-center mix-blend-difference"
        animate={{
          x: cursorPos.x - 16,
          y: cursorPos.y - 16,
          scale: cursorVariant === 'hover' ? 1.5 : 1
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 250, mass: 0.1 }}
      >
        <div className="w-8 h-8 rounded-full border border-white/60 flex items-center justify-center relative">
          <div className="w-1.5 h-1.5 bg-[#ff0033] rounded-full" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-1.5 bg-white/40" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-1.5 bg-white/40" />
          <div className="absolute left-0 top-1/2 -translate-y-1/2 h-[1px] w-1.5 bg-white/40" />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 h-[1px] w-1.5 bg-white/40" />
        </div>
        {cursorText && (
          <span className="absolute left-10 text-[10px] font-mono uppercase bg-[#ff0033] text-black tracking-widest px-1.5 py-0.5 font-bold whitespace-nowrap">
            {cursorText}
          </span>
        )}
      </motion.div>

      {/* Top Banner Ticker */}
      <div className="bg-black border-b border-white/10 text-[11px] font-mono tracking-widest text-zinc-400 py-1.5 overflow-hidden whitespace-nowrap flex items-center">
        <div className="animate-marquee flex items-center gap-8 shrink-0">
          <span className="flex items-center gap-2"><Flame className="w-3 h-3 text-[#ff0033]" /> DEV CLUB HACKATHON 2026 EDITION</span>
          <span>///</span>
          <span className="text-white">GLOBAL SHIPPING AVAILABLE</span>
          <span>///</span>
          <span className="text-[#ff0033]">USE CODE "NOIR2026" FOR 20% OFF</span>
          <span>///</span>
          <span>SYS_STATUS: OPERATIONAL</span>
          <span>///</span>
          <span>LIMITED QUANTITIES ALLOCATED</span>
        </div>
        <div className="animate-marquee flex items-center gap-8 shrink-0" aria-hidden="true">
          <span className="flex items-center gap-2"><Flame className="w-3 h-3 text-[#ff0033]" /> DEV CLUB HACKATHON 2026 EDITION</span>
          <span>///</span>
          <span className="text-white">GLOBAL SHIPPING AVAILABLE</span>
          <span>///</span>
          <span className="text-[#ff0033]">USE CODE "NOIR2026" FOR 20% OFF</span>
          <span>///</span>
          <span>SYS_STATUS: OPERATIONAL</span>
          <span>///</span>
          <span>LIMITED QUANTITIES ALLOCATED</span>
        </div>
      </div>

      {/* Navigation Header */}
      <header className="sticky top-0 z-40 bg-[#030303]/90 backdrop-blur-md border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <a 
            href="#" 
            onMouseEnter={() => { setCursorText('NOIR//CTRL'); triggerAudio('hover'); }}
            onMouseLeave={() => setCursorText('')}
            className="text-2xl font-black tracking-tighter text-white flex items-center gap-1 group"
          >
            <span className="group-hover:text-[#ff0033] transition-colors">NOIR</span>
            <span className="text-[#ff0033]">//</span>
            <span className="group-hover:text-zinc-400 transition-colors">CTRL</span>
          </a>
          <nav className="hidden md:flex items-center gap-6 text-xs font-mono tracking-widest text-zinc-400">
            <a href="#drop" onClick={() => triggerAudio('click')} className="hover:text-white transition-colors">01//DROP</a>
            <a href="#atelier" onClick={() => triggerAudio('click')} className="hover:text-white transition-colors">02//ATELIER</a>
            <a href="#fit-lab" onClick={() => triggerAudio('click')} className="hover:text-white transition-colors">03//FIT-LAB</a>
            <a href="#lookbook" onClick={() => triggerAudio('click')} className="hover:text-white transition-colors">04//LOOKBOOK</a>
            <a href="#archives" onClick={() => triggerAudio('click')} className="hover:text-white transition-colors">05//ARCHIVES</a>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {/* Sound Toggle */}
          <button 
            onClick={() => { setSoundEnabled(!soundEnabled); triggerAudio('click'); }}
            onMouseEnter={() => triggerAudio('hover')}
            className="p-2 border border-white/10 hover:border-[#ff0033] text-zinc-400 hover:text-white transition-all rounded-none flex items-center gap-2 text-xs font-mono"
            title="Toggle Audio Feedback"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-[#ff0033]" /> : <VolumeX className="w-4 h-4" />}
            <span className="hidden sm:inline">{soundEnabled ? 'AUDIO:ON' : 'AUDIO:OFF'}</span>
          </button>

          {/* Search Button */}
          <button 
            onClick={() => { setIsSearchOpen(true); triggerAudio('click'); }}
            onMouseEnter={() => triggerAudio('hover')}
            className="p-2 border border-white/10 hover:border-white text-zinc-400 hover:text-white transition-all"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Cart Trigger */}
          <button 
            onClick={() => { setIsCartOpen(true); triggerAudio('click'); }}
            onMouseEnter={() => triggerAudio('hover')}
            className="relative p-2 border border-white/10 bg-white/5 hover:border-[#ff0033] text-white transition-all flex items-center gap-2 px-3"
          >
            <ShoppingBag className="w-4 h-4 text-[#ff0033]" />
            <span className="text-xs font-mono font-bold">{cart.reduce((a, b) => a + b.qty, 0)}</span>
          </button>
        </div>
      </header>

      {}
      <section className="relative min-h-[90vh] border-b border-white/10 flex flex-col justify-between p-6 md:p-12 overflow-hidden bg-gradient-to-b from-zinc-950 via-black to-[#030303]">
        {/* Background Ambient Video/Grid Loop Mock */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&q=80&w=2000" 
            alt="Hero Background" 
            className="w-full h-full object-cover scale-105 filter grayscale contrast-200"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]" />
        </div>

        {/* Hero Top Grid */}
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs font-mono border-b border-white/10 pb-6 text-zinc-400">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#ff0033] animate-ping" />
            <span>SYSTEM ACTIVE // HACKATHON_BUILD_2026</span>
          </div>
          <div className="flex items-center gap-6">
            <span>LATITUDE: 35.6762° N</span>
            <span>LONGITUDE: 139.6503° E</span>
          </div>
        </div>

        {/* Hero Main Typography */}
        <div className="relative z-10 my-auto py-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block text-[#ff0033] font-mono text-sm tracking-widest mb-2 border-l-2 border-[#ff0033] pl-3">
              COLLECTION 004 / CYBER-BRUTALISM
            </span>
            <h1 className="text-5xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-none mb-6 uppercase">
              ARCHITECTS <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-400 to-zinc-700">
                OF DUALITY
              </span>
            </h1>
            <p className="max-w-xl text-zinc-400 text-sm md:text-base leading-relaxed font-light mb-8">
              High-performance streetwear engineered with heavyweight Japanese textiles, laser-welded seams, and anti-surveillance silhouettes.
            </p>

            <div className="flex flex-wrap gap-4">
              <a 
                href="#drop"
                onClick={() => triggerAudio('click')}
                onMouseEnter={() => { setCursorText('EXPLORE'); triggerAudio('hover'); }}
                onMouseLeave={() => setCursorText('')}
                className="bg-[#ff0033] text-black font-bold font-mono px-8 py-4 text-xs tracking-widest uppercase hover:bg-white transition-all flex items-center gap-3 group"
              >
                <span>ENTER THE DROP</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <button 
                onClick={() => { setVideoModalUrl('zOc189jUqzg'); triggerAudio('click'); }}
                onMouseEnter={() => { setCursorText('PLAY'); triggerAudio('hover'); }}
                onMouseLeave={() => setCursorText('')}
                className="border border-white/20 hover:border-white bg-black/40 text-white font-mono px-6 py-4 text-xs tracking-widest uppercase transition-all flex items-center gap-3 backdrop-blur-sm"
              >
                <Play className="w-4 h-4 text-[#ff0033] fill-[#ff0033]" />
                <span>SCAD FASHION FILM</span>
              </button>
            </div>
          </motion.div>
        </div>

        {/* Hero Footer Stats */}
        <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-white/10 pt-6 text-xs font-mono">
          <div>
            <span className="text-zinc-500 block">FABRIC SPEC</span>
            <span className="text-white font-bold">550 GSM COTTON</span>
          </div>
          <div>
            <span className="text-zinc-500 block">PRODUCTION</span>
            <span className="text-white font-bold">LIMITED 100 UNITS</span>
          </div>
          <div>
            <span className="text-zinc-500 block">HARDWARE</span>
            <span className="text-white font-bold">FIDLOCK MAGNETIC</span>
          </div>
          <div>
            <span className="text-zinc-500 block">DELIVERY STATUS</span>
            <span className="text-[#ff0033] font-bold">DISPATCHING WORLDWIDE</span>
          </div>
        </div>
      </section>

      {}
      <section className="relative py-12 border-b border-white/10 bg-black overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-[#ff0033]/5 pointer-events-none" />
        <div className="relative z-10 text-center px-4">
          <p className="font-mono text-xs text-[#ff0033] tracking-widest mb-2">LIMITED EDITION DROPS</p>
          <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tight">ENGINEERED FOR THE URBAN APATHY</h3>
        </div>
      </section>

      {}
      <section id="drop" className="p-6 md:p-12 border-b border-white/10 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-[#ff0033] font-mono text-xs tracking-widest block mb-2">// 01 CATALOGUE</span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight uppercase">THE DROP</h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {['ALL', 'HOODIES', 'TEES', 'OUTERWEAR', 'BOTTOMS', 'ACCESSORIES'].map((cat) => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); triggerAudio('click'); }}
                onMouseEnter={() => triggerAudio('hover')}
                className={`text-xs font-mono px-4 py-2 border transition-all ${
                  activeCategory === cat 
                    ? 'bg-white text-black border-white font-bold' 
                    : 'border-white/10 text-zinc-400 hover:border-white/40 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid with Parallax Tilt */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRODUCTS.filter(p => activeCategory === 'ALL' || p.category === activeCategory).map((product) => {
            const isWishlisted = wishlist.includes(product.id);
            return (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="group relative bg-zinc-950/80 border border-white/10 hover:border-[#ff0033] transition-colors flex flex-col justify-between"
                onMouseEnter={() => { setCursorText('VIEW'); triggerAudio('hover'); }}
                onMouseLeave={() => setCursorText('')}
              >
                {/* Image Container with Hover Swap */}
                <div 
                  className="relative aspect-[3/4] overflow-hidden bg-zinc-900 cursor-pointer"
                  onClick={() => { setSelectedProduct(product); triggerAudio('click'); }}
                >
                  <img 
                    src={product.images[0]} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter grayscale group-hover:grayscale-0"
                  />
                  <img 
                    src={product.images[1]} 
                    alt={product.name} 
                    className="w-full h-full object-cover absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  />

                  {/* Stock Tag */}
                  <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-2 py-1 text-[10px] font-mono text-zinc-300 border border-white/10">
                    {product.tag}
                  </div>

                  {/* Wishlist Heart */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product.id);
                    }}
                    className="absolute top-3 right-3 p-2 bg-black/80 border border-white/10 text-white hover:text-[#ff0033] transition-colors"
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[#ff0033] text-[#ff0033]' : ''}`} />
                  </button>

                  {/* Quick View Hover Trigger */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-white text-black font-mono text-xs font-bold px-4 py-2 flex items-center gap-2">
                      <Eye className="w-4 h-4" /> QUICK VIEW
                    </span>
                  </div>
                </div>

                {/* Product Info & Controls */}
                <div className="p-5 flex flex-col justify-between flex-1 border-t border-white/10">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-base tracking-tight group-hover:text-[#ff0033] transition-colors">
                        {product.name}
                      </h3>
                      <span className="font-mono font-bold text-lg text-white">${product.price}</span>
                    </div>
                    <p className="text-xs text-zinc-500 font-mono mb-4">{product.gsm}</p>
                  </div>

                  {/* Stock Meter */}
                  <div className="mb-4">
                    <div className="flex justify-between text-[10px] font-mono text-zinc-400 mb-1">
                      <span>STOCK ALLOCATION</span>
                      <span className="text-[#ff0033]">{product.stock} / {product.maxStock} LEFT</span>
                    </div>
                    <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-[#ff0033]" 
                        style={{ width: `${(product.stock / product.maxStock) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Direct Add CTA */}
                  <button 
                    onClick={() => addToCart(product, 'L')}
                    onMouseEnter={() => triggerAudio('hover')}
                    className="w-full bg-white/5 hover:bg-[#ff0033] border border-white/10 hover:border-[#ff0033] text-white hover:text-black font-mono text-xs py-3 font-bold transition-all flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4" /> ADD TO BAG
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {}
      <section id="atelier" className="p-6 md:p-12 border-b border-white/10 bg-zinc-950">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <span className="text-[#ff0033] font-mono text-xs tracking-widest block mb-2">// 02 INTERACTIVE BUILDER</span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight uppercase">ATELIER 1-OF-1</h2>
            <p className="text-zinc-400 text-sm font-mono mt-2">DESIGN YOUR CUSTOM GARMENT IN REAL-TIME</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Controls */}
            <div className="lg:col-span-5 space-y-6">
              {/* Colorway Selector */}
              <div>
                <label className="text-xs font-mono text-zinc-400 block mb-3 uppercase">01. Dye Colorway</label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { name: 'OBSIDIAN VOID', color: '#0a0a0a' },
                    { name: 'ACID WASH CYBER', color: '#1a232a' },
                    { name: 'TOXIC CRIMSON', color: '#2a0a0e' },
                    { name: 'CONCRETE GREY', color: '#2b2b2b' }
                  ].map((c) => (
                    <button
                      key={c.name}
                      onClick={() => { setCustomGarment(prev => ({ ...prev, color: c.color, colorName: c.name })); triggerAudio('click'); }}
                      className={`p-3 border text-left text-xs font-mono transition-all flex items-center gap-3 ${
                        customGarment.colorName === c.name ? 'border-[#ff0033] bg-white/5' : 'border-white/10 text-zinc-400'
                      }`}
                    >
                      <span className="w-4 h-4 rounded-full border border-white/20" style={{ backgroundColor: c.color }} />
                      <span>{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Text Input */}
              <div>
                <label className="text-xs font-mono text-zinc-400 block mb-2 uppercase">02. Chest Graphic Text</label>
                <input 
                  type="text" 
                  value={customGarment.text}
                  onChange={(e) => setCustomGarment(prev => ({ ...prev, text: e.target.value.toUpperCase() }))}
                  maxLength={12}
                  className="w-full bg-black border border-white/10 px-4 py-3 font-mono text-sm text-white focus:outline-none focus:border-[#ff0033]"
                />
              </div>

              {/* Typography Accent Color */}
              <div>
                <label className="text-xs font-mono text-zinc-400 block mb-2 uppercase">03. Graphic Ink Color</label>
                <div className="flex gap-3">
                  {['#ff0033', '#ffffff', '#00ff66', '#ffcc00'].map((color) => (
                    <button
                      key={color}
                      onClick={() => { setCustomGarment(prev => ({ ...prev, textColor: color })); triggerAudio('click'); }}
                      className={`w-8 h-8 rounded-full border-2 transition-transform ${
                        customGarment.textColor === color ? 'scale-125 border-white' : 'border-transparent'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              {/* Patch Selector */}
              <div>
                <label className="text-xs font-mono text-zinc-400 block mb-2 uppercase">04. Tactical Sleeve Patch</label>
                <div className="grid grid-cols-2 gap-3">
                  {['TACTICAL GLITCH', 'CYBER SKULL', 'NOIR EMBLEM', 'NONE'].map((patch) => (
                    <button
                      key={patch}
                      onClick={() => { setCustomGarment(prev => ({ ...prev, patch })); triggerAudio('click'); }}
                      className={`p-2 border text-xs font-mono text-center transition-all ${
                        customGarment.patch === patch ? 'border-[#ff0033] bg-white/5 text-white' : 'border-white/10 text-zinc-500'
                      }`}
                    >
                      {patch}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selector */}
              <div>
                <label className="text-xs font-mono text-zinc-400 block mb-2 uppercase">05. Size</label>
                <div className="flex gap-2">
                  {['S', 'M', 'L', 'XL', 'XXL'].map((sz) => (
                    <button
                      key={sz}
                      onClick={() => { setCustomGarment(prev => ({ ...prev, size: sz })); triggerAudio('click'); }}
                      className={`flex-1 py-2 border font-mono text-xs ${
                        customGarment.size === sz ? 'bg-white text-black font-bold border-white' : 'border-white/10 text-zinc-400'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Add Custom To Bag */}
              <button
                onClick={() => {
                  addToCart({
                    id: `custom-${Date.now()}`,
                    name: `1-OF-1 HOODIE [${customGarment.colorName}]`,
                    price: customGarment.price,
                    images: ['https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=1000']
                  }, customGarment.size);
                }}
                className="w-full bg-[#ff0033] text-black font-mono font-bold py-4 text-xs tracking-widest uppercase hover:bg-white transition-all flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" /> ADD CUSTOM 1-OF-1 TO BAG (${customGarment.price})
              </button>
            </div>

            {/* Right Live Vector Canvas Mock */}
            <div className="lg:col-span-7 bg-black border border-white/10 p-8 flex flex-col items-center justify-center relative min-h-[500px]">
              <div className="absolute top-4 left-4 text-[10px] font-mono text-zinc-500">
                LIVE PREVIEW // 1-OF-1 ATELIER RENDERING
              </div>

              {/* SVG Hoodie Representation */}
              <div className="relative w-72 md:w-96 aspect-square flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-2xl">
                  {/* Base Body */}
                  <path 
                    d="M 25,25 L 35,15 L 65,15 L 75,25 L 90,35 L 80,50 L 72,45 L 72,85 L 28,85 L 28,45 L 20,50 L 10,35 Z" 
                    fill={customGarment.color} 
                    stroke="#ffffff" 
                    strokeWidth="0.5" 
                    strokeOpacity="0.2"
                  />
                  {/* Hood Shadow */}
                  <path d="M 35,15 C 35,30 65,30 65,15 Z" fill="#000000" opacity="0.4" />
                  {/* Pocket */}
                  <path d="M 35,65 L 65,65 L 60,80 L 40,80 Z" fill="#ffffff" opacity="0.05" stroke="#ffffff" strokeWidth="0.3" />
                </svg>

                {/* Custom Chest Typography Overlay */}
                <div 
                  className="absolute top-[42%] text-center font-mono font-black text-sm tracking-widest uppercase pointer-events-none"
                  style={{ color: customGarment.textColor }}
                >
                  {customGarment.text || 'YOUR TEXT'}
                </div>

                {/* Patch Graphic Badge */}
                {customGarment.patch !== 'NONE' && (
                  <div className="absolute top-[35%] right-[22%] bg-black border border-white/20 px-1 py-0.5 text-[6px] font-mono text-[#ff0033]">
                    {customGarment.patch}
                  </div>
                )}
              </div>

              <div className="mt-6 flex gap-8 text-[11px] font-mono text-zinc-400">
                <span>COLOR: <strong className="text-white">{customGarment.colorName}</strong></span>
                <span>PATCH: <strong className="text-white">{customGarment.patch}</strong></span>
                <span>SIZE: <strong className="text-white">{customGarment.size}</strong></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {}
      <section id="fit-lab" className="p-6 md:p-12 border-b border-white/10 max-w-7xl mx-auto">
        <div className="mb-12">
          <span className="text-[#ff0033] font-mono text-xs tracking-widest block mb-2">// 03 ALGORITHMIC SIZING</span>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight uppercase">AI FIT PREDICTOR</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-zinc-950 border border-white/10 p-8">
          <div className="space-y-6">
            {/* Height Slider */}
            <div>
              <div className="flex justify-between text-xs font-mono mb-2">
                <span className="text-zinc-400">HEIGHT</span>
                <span className="text-white font-bold">{heightCm} CM</span>
              </div>
              <input 
                type="range" 
                min="150" 
                max="210" 
                value={heightCm}
                onChange={(e) => setHeightCm(Number(e.target.value))}
                className="w-full accent-[#ff0033] bg-zinc-800"
              />
            </div>

            {/* Weight Slider */}
            <div>
              <div className="flex justify-between text-xs font-mono mb-2">
                <span className="text-zinc-400">WEIGHT</span>
                <span className="text-white font-bold">{weightKg} KG</span>
              </div>
              <input 
                type="range" 
                min="45" 
                max="120" 
                value={weightKg}
                onChange={(e) => setWeightKg(Number(e.target.value))}
                className="w-full accent-[#ff0033] bg-zinc-800"
              />
            </div>
          </div>

          {/* Sizing Prediction Output */}
          <div className="border border-white/10 bg-black p-6 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono text-zinc-500 uppercase block mb-1">RECOMMENDED FIT PROFILE</span>
              <div className="text-5xl font-black text-[#ff0033] font-mono mb-2">{predictedFit.size}</div>
              <p className="text-sm font-bold text-white mb-4">{predictedFit.fit}</p>
              
              <div className="space-y-2 text-xs font-mono text-zinc-400">
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span>RECOMMENDED GSM:</span>
                  <span className="text-white">{predictedFit.gsm}</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span>SHOULDER DROP:</span>
                  <span className="text-white">{predictedFit.shoulderDrop}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 text-[10px] font-mono text-zinc-500 flex items-center gap-2">
              <Cpu className="w-3 h-3 text-[#ff0033]" /> CALCULATION BASED ON NOIR VOLUMETRIC METRICS
            </div>
          </div>
        </div>
      </section>

      {}
      <section id="lookbook" className="p-6 md:p-12 border-b border-white/10 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <span className="text-[#ff0033] font-mono text-xs tracking-widest block mb-2">// 04 INTERACTIVE LOOKBOOK</span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight uppercase">PHYSICS MOODBOARD</h2>
            <p className="text-zinc-400 text-xs font-mono mt-1">DRAG AND SCATTER POLAROID ARCHIVES</p>
          </div>

          <div className="relative h-[600px] border border-white/10 bg-zinc-950 overflow-hidden p-6 flex items-center justify-center">
            {LOOKBOOK_ITEMS.map((item) => (
              <motion.div
                key={item.id}
                drag
                dragConstraints={{ left: -200, right: 200, top: -150, bottom: 150 }}
                whileHover={{ scale: 1.05, zIndex: 50 }}
                whileTap={{ scale: 0.95 }}
                style={{ rotate: item.rotation, x: item.x, y: item.y }}
                className="absolute w-64 md:w-80 bg-zinc-900 border border-white/20 p-4 shadow-2xl cursor-grab active:cursor-grabbing"
                onMouseEnter={() => { setCursorText('DRAG'); triggerAudio('hover'); }}
                onMouseLeave={() => setCursorText('')}
              >
                <div className="aspect-[3/4] overflow-hidden bg-black mb-3">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover filter grayscale contrast-125" />
                </div>
                <div className="font-mono text-[11px]">
                  <h4 className="font-bold text-white">{item.title}</h4>
                  <p className="text-zinc-500">{item.location}</p>
                  <p className="text-[9px] text-[#ff0033] mt-1">{item.camera}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {}
      <section id="archives" className="p-6 md:p-12 border-b border-white/10 max-w-7xl mx-auto">
        <div className="mb-12">
          <span className="text-[#ff0033] font-mono text-xs tracking-widest block mb-2">// 05 CINEMA ARCHIVES</span>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight uppercase">EDITORIAL FILMS</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ARCHIVE_VIDEOS.map((vid) => (
            <div 
              key={vid.id}
              onClick={() => { setVideoModalUrl(vid.youtubeId); triggerAudio('click'); }}
              onMouseEnter={() => { setCursorText('PLAY'); triggerAudio('hover'); }}
              onMouseLeave={() => setCursorText('')}
              className="group border border-white/10 bg-zinc-950 cursor-pointer overflow-hidden"
            >
              <div className="relative aspect-video overflow-hidden">
                <img src={vid.thumbnail} alt={vid.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter grayscale" />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                  <Play className="w-10 h-10 text-[#ff0033] fill-[#ff0033]" />
                </div>
              </div>
              <div className="p-4 font-mono">
                <span className="text-[10px] text-[#ff0033]">{vid.year}</span>
                <h3 className="font-bold text-sm text-white">{vid.title}</h3>
                <p className="text-[10px] text-zinc-500 mt-1">{vid.specs}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {}
      <section className="p-6 md:p-12 border-b border-white/10 bg-zinc-950">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <span className="text-[#ff0033] font-mono text-xs tracking-widest block mb-2">// 06 COMMUNITY GALLERY</span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight uppercase">SEEN IN THE WILD</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {COMMUNITY_POSTS.map((post) => (
              <div key={post.id} className="relative group overflow-hidden border border-white/10 bg-black">
                <img src={post.image} alt={post.handle} className="w-full aspect-[3/4] object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end font-mono">
                  <span className="text-xs font-bold text-[#ff0033]">{post.handle}</span>
                  <span className="text-[10px] text-white">{post.fit}</span>
                  <span className="text-[9px] text-zinc-500">{post.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {}
      <footer className="p-6 md:p-12 bg-black border-t border-white/10 font-mono text-xs text-zinc-400">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h4 className="text-white font-bold mb-4">GLOBAL HUBS CLOCKS</h4>
            <ul className="space-y-2">
              <li className="flex justify-between"><span>TOKYO JST:</span> <span className="text-white">{times.tokyo}</span></li>
              <li className="flex justify-between"><span>BERLIN CET:</span> <span className="text-white">{times.berlin}</span></li>
              <li className="flex justify-between"><span>NEW YORK EST:</span> <span className="text-white">{times.ny}</span></li>
              <li className="flex justify-between"><span>MUMBAI IST:</span> <span className="text-white">{times.mumbai}</span></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">LEGAL // MANIFESTO</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white">TERMS OF TRANSMISSION</a></li>
              <li><a href="#" className="hover:text-white">PRIVACY PROTOCOL</a></li>
              <li><a href="#" className="hover:text-white">SUSTAINABILITY MATRIX</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">DISPATCH ENCRYPTION</h4>
            <p className="text-zinc-500 mb-3 text-[11px]">SUBSCRIBE FOR RESTOCK NOTIFICATIONS</p>
            <div className="flex">
              <input type="email" placeholder="ENTER EMAIL..." className="bg-zinc-900 border border-white/10 px-3 py-2 text-white w-full focus:outline-none focus:border-[#ff0033]" />
              <button onClick={() => showToast('ENCRYPTED EMAIL SUBSCRIBED')} className="bg-[#ff0033] text-black px-3 font-bold">JOIN</button>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">DEV CLUB 2026</h4>
            <p className="text-zinc-500 text-[11px]">FRONTEND HACKATHON ENTRY</p>
            <p className="text-[#ff0033] mt-2 font-bold">NOIR//CTRL ALL RIGHTS RESERVED</p>
          </div>
        </div>
      </footer>

      {}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-zinc-950 border-l border-white/10 z-50 p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-6">
                  <h3 className="font-mono font-bold text-lg flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5 text-[#ff0033]" /> TACTICAL BAG [{cart.reduce((a, b) => a + b.qty, 0)}]
                  </h3>
                  <button onClick={() => setIsCartOpen(false)} className="text-zinc-400 hover:text-white">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {cart.length === 0 ? (
                  <div className="text-center py-12 font-mono text-zinc-500">
                    BAG IS EMPTY // NO ITEMS ALLOCATED
                  </div>
                ) : (
                  <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2">
                    {cart.map((item, idx) => (
                      <div key={idx} className="flex gap-4 border border-white/10 p-3 bg-black">
                        <img src={item.images[0]} alt={item.name} className="w-16 h-20 object-cover" />
                        <div className="flex-1 font-mono">
                          <h4 className="text-xs font-bold text-white">{item.name}</h4>
                          <span className="text-[10px] text-zinc-400">SIZE: {item.selectedSize}</span>
                          <div className="flex justify-between items-center mt-2">
                            <span className="text-xs font-bold text-[#ff0033]">${item.price}</span>
                            <div className="flex items-center gap-2 border border-white/10 px-2 py-0.5">
                              <span className="text-xs text-white">QTY: {item.qty}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Promo Code & Checkout */}
              {cart.length > 0 && (
                <div className="border-t border-white/10 pt-4 space-y-4 font-mono">
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder="PROMO CODE (NOIR2026)" 
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="bg-black border border-white/10 px-3 py-2 text-xs text-white w-full focus:outline-none"
                    />
                    <button 
                      onClick={() => {
                        if (promoCode === 'NOIR2026') {
                          setDiscountApplied(true);
                          showToast('20% DISCOUNT APPLIED');
                        } else {
                          showToast('INVALID PROMO CODE');
                        }
                      }}
                      className="bg-white text-black text-xs font-bold px-3"
                    >
                      APPLY
                    </button>
                  </div>

                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between text-zinc-400">
                      <span>SUBTOTAL:</span>
                      <span>${cartSubtotal}</span>
                    </div>
                    {discountApplied && (
                      <div className="flex justify-between text-[#ff0033]">
                        <span>DISCOUNT (20%):</span>
                        <span>-${cartSubtotal * 0.2}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-white/10">
                      <span>TOTAL:</span>
                      <span>${cartTotal}</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => {
                      setIsCartOpen(false);
                      setIsCheckoutOpen(true);
                    }}
                    className="w-full bg-[#ff0033] text-black font-bold py-4 text-xs tracking-widest uppercase hover:bg-white transition-all flex items-center justify-center gap-2"
                  >
                    PROCEED TO CHECKOUT
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 p-6 flex flex-col items-center justify-start pt-24"
          >
            <button onClick={() => setIsSearchOpen(false)} className="absolute top-6 right-6 text-white">
              <X className="w-8 h-8" />
            </button>

            <div className="w-full max-w-2xl">
              <input 
                type="text" 
                placeholder="SEARCH ARCHIVES..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="w-full bg-transparent border-b-2 border-white/20 text-2xl md:text-4xl font-mono text-white p-4 focus:outline-none focus:border-[#ff0033]"
              />

              <div className="mt-8 space-y-4 font-mono max-h-[50vh] overflow-y-auto">
                {PRODUCTS.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())).map(p => (
                  <div 
                    key={p.id}
                    onClick={() => {
                      setSelectedProduct(p);
                      setIsSearchOpen(false);
                    }}
                    className="p-4 border border-white/10 bg-zinc-950 hover:border-[#ff0033] cursor-pointer flex justify-between items-center"
                  >
                    <span className="font-bold text-white">{p.name}</span>
                    <span className="text-[#ff0033]">${p.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {}
      <AnimatePresence>
        {videoModalUrl && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-4 md:p-12"
          >
            <button onClick={() => setVideoModalUrl(null)} className="absolute top-6 right-6 text-white">
              <X className="w-8 h-8" />
            </button>
            <div className="w-full max-w-5xl aspect-video border border-white/20">
              <iframe 
                src={`https://www.youtube.com/embed/${videoModalUrl}?autoplay=1`} 
                title="Fashion Film"
                className="w-full h-full"
                allow="autoplay"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {}
      <AnimatePresence>
        {isCheckoutOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-6 font-mono"
          >
            <div className="bg-zinc-950 border border-white/20 p-8 max-w-lg w-full">
              <h3 className="text-2xl font-black text-white mb-4">ORDER DISPATCH CONFIRMED</h3>
              <p className="text-xs text-zinc-400 mb-6">YOUR ENCRYPTED ORDER HAS BEEN PLACED IN THE PRODUCTION QUEUE.</p>
              
              <div className="bg-black border border-white/10 p-4 mb-6 text-xs text-[#ff0033]">
                TRACKING ID: #NOIR-{Math.floor(100000 + Math.random() * 900000)}
              </div>

              <button 
                onClick={() => {
                  setCart([]);
                  setIsCheckoutOpen(false);
                  showToast('THANK YOU FOR YOUR PURCHASE');
                }}
                className="w-full bg-white text-black font-bold py-3 text-xs"
              >
                RETURN TO TRANSMISSION
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 right-6 bg-[#ff0033] text-black font-mono font-bold text-xs px-4 py-3 z-[1000] border border-white flex items-center gap-2 shadow-2xl"
          >
            <Zap className="w-4 h-4" /> {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}