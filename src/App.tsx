import "./App.css";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  Menu,
  X,
  Star,
  Plus,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Truck,
  Award,
  Leaf,
  Coffee,
  Package,
  Zap,
  Mail,
  MapPin,
  Phone,
  CheckCircle,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  tag?: string;
  roast?: string;
}

interface Testimonial {
  id: number;
  name: string;
  location: string;
  rating: number;
  text: string;
  avatar: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

// ─── Paste your product image URLs here ──────────────────────────────────────
const PRODUCT_IMAGES = {
  ethiopianYirgacheffe:
    "https://mycoffeeco.com/cdn/shop/files/WashedValleyproductimg.png?v=1758435620&width=800",
  colombianSupremo:
    "https://mycoffeeco.com/cdn/shop/files/Amber_Blend_Coffee_beans_ca1a18d5-814e-4f7f-ae22-aca710d0d5e6.png?v=1779351902&width=800",
  sumatraMandheling:
    "https://mycoffeeco.com/cdn/shop/files/Asset1_4x_4dbd911a-081c-4939-a926-d7d534209f79.png?v=1759322334&w=520&h=480&fit=crop&auto=format",
  guatemalaAntiqua:
    "https://mycoffeeco.com/cdn/shop/files/My_Coffee_Co._SMHW-3BOMBER_Ice_Core_Cold_Brew_Coffee_Maker_online_in_India.png?v=1780397587&width=800",
  kenyaAA:
    "https://mycoffeeco.com/cdn/shop/files/My_Coffee_Co._Buy_Pedrini_Eco_Moka_Pot_online_in_India_1.png?v=1780410310&width=800",
};

const bestSellers: Product[] = [
  {
    id: 1,
    name: "Washed Valley",
    price: 375,
    originalPrice: 475,
    rating: 4.9,
    reviews: 34,
    image: PRODUCT_IMAGES.ethiopianYirgacheffe,
    tag: "Best Seller",
    roast: "Cherry Cocoa",
  },
  {
    id: 2,
    name: "Amber Blend",
    price: 285,
    originalPrice: 350,
    rating: 4.8,
    reviews: 21,
    image: PRODUCT_IMAGES.colombianSupremo,
    tag: "New",
    roast: "Dark Chocolate Roasted Nuts",
  },
  {
    id: 3,
    name: "Classic Pour Over",
    price: 500,
    originalPrice: 600,
    rating: 4.7,
    reviews: 20,
    image: PRODUCT_IMAGES.sumatraMandheling,
    roast: "Smooth & Balanced",
  },
  {
    id: 4,
    name: "MHW-3BOMBER Ice Core Cold Brew Coffee Maker",
    price: 3199,
    originalPrice: 3700,
    rating: 4.8,
    reviews: 18,
    image: PRODUCT_IMAGES.guatemalaAntiqua,
    tag: "Staff Pick",
    roast: "Compact And Lightweight",
  },
  {
    id: 5,
    name: "Pedrini Eco Moka Pot",
    price: 1800,
    originalPrice: 2200,
    rating: 4.9,
    reviews: 15,
    image: PRODUCT_IMAGES.kenyaAA,
    roast: "Light Blue, 3 Cups",
  },
];

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Ananya Sharma",
    location: "Bengaluru, India",
    rating: 5,
    text:
      "Absolutely loved the premium taste and smooth flavor. The experience feels luxurious from the very first sip.",
    avatar: "photo-1494790108377-be9c29b29330",
  },
  {
    id: 2,
    name: "Rohan Mehta",
    location: "Mumbai, India",
    rating: 5,
    text:
      "Fast delivery and amazing quality. The packaging feels incredibly premium. My go-to every morning now.",
    avatar: "photo-1507003211169-0a1dd7228f2d",
  },
  {
    id: 3,
    name: "Priya Nair",
    location: "Kochi, India",
    rating: 5,
    text: "One of the best coffee brands I have tried. Rich aroma",
    avatar: "photo-1438761681033-6461ffad8d80",
  },
];

const categories = [
  {
    name: "Coffee Beans",
    icon: Coffee,
    image:
      "https://mycoffeeco.com/cdn/shop/files/My_Coffee_Co._Coffee_beans_online_in_India.png?width=600",
    count: "20 products",
  },
  {
    name: "Drip Bags",
    icon: Zap,
    image:
      "https://mycoffeeco.com/cdn/shop/files/mcc_drip_coffee_3_1.png?v=1779350409&width=600",
    count: "14 products",
  },
  {
    name: "Instant Coffee",
    icon: Package,
    image:
      "https://mycoffeeco.com/cdn/shop/files/mcc_instant_coffee_3_1.png?v=1778667001&width=400",
    count: "25 products",
  },
  {
    name: "Accessories",
    icon: Coffee,
    image:
      "https://mycoffeeco.com/cdn/shop/files/Untitled_design_c3d21282-fb2e-48cf-8faf-d5feba226183.jpg?v=1778156938&width=600",
    count: "20 products",
  },
];

const instagramPosts = [
  "photo-1509042239860-f550ce710b93",
  "photo-1495474472287-4d71bcdd2085",
  "photo-1447933601403-0c6688de566e",
  "photo-1514432324607-a09d9b4aefdd",
  "photo-1497935586351-b67a49e012bf",
  "photo-1511537190424-bbbab87ac5eb",
];

// ─── Micro components ─────────────────────────────────────────────────────────

function StarRating({
  rating,
  small = false,
}: {
  rating: number;
  small?: boolean;
}) {
  return (
    <div className={`flex gap-0.5 ${small ? "scale-90 origin-left" : ""}`}>
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={12}
          className={
            s <= Math.round(rating)
              ? "text-amber-400 fill-amber-400"
              : "text-gray-200 fill-gray-200"
          }
        />
      ))}
    </div>
  );
}

function ProductCard({ product, index }: { product: Product; index: number }) {
  const [wishlisted, setWishlisted] = useState(false);
  const [added, setAdded] = useState(false);

  function handleAdd() {
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.07 }}
      viewport={{ once: true }}
      className="flex-shrink-0 w-[220px] md:w-[260px] bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 group"
    >
      <div className="relative overflow-hidden bg-secondary h-[200px] md:h-[240px]">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.tag && (
          <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full">
            {product.tag}
          </span>
        )}
        <button
          onClick={() => setWishlisted(!wishlisted)}
          className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm transition-transform duration-200 active:scale-90"
          aria-label="Add to wishlist"
        >
          <Heart
            size={14}
            className={
              wishlisted ? "fill-red-500 text-red-500" : "text-gray-400"
            }
          />
        </button>
      </div>
      <div className="p-4">
        {product.roast && (
          <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest">
            {product.roast}
          </span>
        )}
        <h3 className="font-semibold text-sm mt-0.5 leading-snug text-foreground line-clamp-2 min-h-[44px]">
          {product.name}
        </h3>
        <div className="flex items-center gap-1.5 mt-1.5">
          <StarRating rating={product.rating} />
          <span className="text-[10px] text-muted-foreground">
            ({product.reviews})
          </span>
        </div>
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-baseline gap-1.5">
            <span className="font-semibold text-foreground">
              ₹{product.price}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-muted-foreground line-through">
                ₹{product.originalPrice}
              </span>
            )}
          </div>
          <button
            onClick={handleAdd}
            className={`flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-full transition-all duration-200 active:scale-95 cursor-pointer ${
              added
                ? "bg-green-500 text-white"
                : "bg-primary text-primary-foreground"
            }`}
          >
            {added ? <CheckCircle size={12} /> : <Plus size={12} />}
            {added ? "Added" : "Add"}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Header ───────────────────────────────────────────────────────────────────

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handler, {
      passive: true,
    });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    if (searchOpen) setTimeout(() => searchRef.current?.focus(), 80);
  }, [searchOpen]);

  const navLinks = ["Coffee", "Instant", "Equipment", "Accessories", "Blog"];

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-white"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-14 md:h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <a href="#" className="flex-shrink-0 flex items-center gap-2">
            <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center">
              <Coffee size={14} className="text-white" />
            </div>
            <span
              className="font-bold text-base md:text-lg tracking-tight text-foreground"
              style={{
                fontFamily: "'Playfair Display', serif",
              }}
            >
              My Coffee Co.
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {link}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1 md:gap-2">
            <button
              onClick={() => setSearchOpen(true)}
              className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-secondary transition-colors"
              aria-label="Search"
            >
              <Search size={18} className="text-foreground" />
            </button>
            <button
              className="w-9 h-9 hidden md:flex items-center justify-center rounded-full hover:bg-secondary transition-colors"
              aria-label="Account"
            >
              <User size={18} className="text-foreground" />
            </button>
            <button
              className="w-9 h-9 hidden md:flex items-center justify-center rounded-full hover:bg-secondary transition-colors"
              aria-label="Wishlist"
            >
              <Heart size={18} className="text-foreground" />
            </button>
            <button
              className="relative w-9 h-9 flex items-center justify-center rounded-full hover:bg-secondary transition-colors"
              aria-label="Cart"
            >
              <ShoppingBag size={18} className="text-foreground" />
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-primary text-primary-foreground text-[9px] font-bold rounded-full flex items-center justify-center">
                2
              </span>
            </button>
            <button
              onClick={() => setMenuOpen(true)}
              className="lg:hidden w-9 h-9 flex items-center justify-center rounded-full hover:bg-secondary transition-colors"
              aria-label="Menu"
            >
              <Menu size={18} className="text-foreground" />
            </button>
          </div>
        </div>
      </header>

      {/* Search overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm flex items-start justify-center pt-20 px-4"
            onClick={() => setSearchOpen(false)}
          >
            <motion.div
              initial={{ y: -20, opacity: 0, scale: 0.97 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -20, opacity: 0, scale: 0.97 }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 300,
              }}
              className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
                <Search
                  size={18}
                  className="text-muted-foreground flex-shrink-0"
                />
                <input
                  ref={searchRef}
                  type="search"
                  placeholder="Search for coffee, equipment, gifts..."
                  className="flex-1 text-sm outline-none bg-transparent text-foreground placeholder:text-muted-foreground"
                />
                <button
                  onClick={() => setSearchOpen(false)}
                  className="p-1 hover:bg-secondary rounded-full transition-colors"
                >
                  <X size={16} className="text-muted-foreground" />
                </button>
              </div>
              <div className="px-5 py-4">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">
                  Popular
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Ethiopian Yirgacheffe",
                    "Pour Over Kit",
                    "Cold Brew",
                    "Gift Box",
                    "Subscription",
                  ].map((s) => (
                    <button
                      key={s}
                      className="text-xs bg-secondary text-foreground px-3 py-1.5 rounded-full hover:bg-muted transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "spring",
                damping: 30,
                stiffness: 300,
              }}
              className="absolute right-0 top-0 h-full w-[280px] bg-white flex flex-col shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-5 h-16 border-b border-border">
                <span
                  className="font-bold text-base"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                  }}
                >
                  My Coffee Co.
                </span>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-secondary transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
              <nav className="flex-1 overflow-y-auto px-5 py-6 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <a
                    key={link}
                    href="#"
                    className="flex items-center justify-between py-3 text-base font-medium text-foreground border-b border-border/50 hover:text-primary transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link}
                    <ArrowRight size={14} className="text-muted-foreground" />
                  </a>
                ))}
              </nav>
              <div className="px-5 py-6 border-t border-border flex flex-col gap-3">
                <button className="w-full bg-primary text-primary-foreground font-semibold py-3 rounded-full text-sm transition-all active:scale-95">
                  Shop Coffee
                </button>
                <div className="flex items-center justify-center gap-6 pt-2">
                  <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <User size={16} /> Account
                  </button>
                  <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <Heart size={16} /> Wishlist
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-foreground min-h-[520px] md:min-h-[720px]">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1800&h=1200&fit=crop&auto=format"
          alt="Premium coffee being poured"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end pb-6 md:pb-20 px-5 md:px-12 max-w-7xl mx-auto w-full pt-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-white/70 mb-4">
            Specialty Coffee · Roasted to Order
          </span>
          <div className="flex flex-col gap-0">
            <h1
              className="text-white font-bold leading-[1.1] mb-2"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2.4rem, 7vw, 5.5rem)",
                maxWidth: "14ch",
              }}
            >
              Small Sips
            </h1>
            <h1
              className="text-white font-bold leading-[1.1] mb-4"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2.4rem, 7vw, 5.5rem)",
                maxWidth: "14ch",
              }}
            >
              Big Moments
            </h1>
          </div>
          <p className="text-white/80 text-base md:text-lg max-w-md mb-8 font-light leading-relaxed">
            Discover rich flavors crafted for modern lifestyles. Freshly
            sourced, expertly roasted, and delivered right to your door.
          </p>
          {/* <div className="flex flex-col gap-3 max-w-xs"> */}
          <div className="flex flex-col sm:flex-row gap-3 mt-5">
            <button className="bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-full w-fit sm:min-w-[10px] cursor-pointer">
              Shop Collections
            </button>

            <button className="bg-white/15 backdrop-blur-sm text-white font-semibold px-6 py-3 rounded-full border border-white/20 w-fit sm:min-w-[180px] cursor-pointer">
              Explore Collections
            </button>
          </div>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex items-center gap-6 mt-10 pt-8 border-t border-white/15"
        >
          {[
            { n: "50K+", l: "Happy Customers" },
            { n: "98%", l: "Satisfaction Rate" },
            { n: "3", l: "Coffee Blends" },

            { n: "4.9★", l: "Average Rating" },
          ].map((b) => (
            <div key={b.n} className="flex flex-col">
              <span className="text-white font-bold text-lg leading-none">
                {b.n}
              </span>
              <span className="text-white/60 text-xs mt-0.5">{b.l}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-5 right-5 md:right-10"
        animate={{ y: [0, 6, 0] }}
        transition={{
          repeat: Infinity,
          duration: 2,
          ease: "easeInOut",
        }}
      >
        <div className="w-5 h-8 rounded-full border border-white/30 flex items-start justify-center pt-1.5">
          <div className="w-1 h-2 bg-white/50 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}

// ─── Featured Categories ───────────────────────────────────────────────────────

function FeaturedCategories() {
  return (
    <section className="py-8 md:py-10 px-4 md:px-6 max-w-7xl mx-auto">
      <div className="flex items-end justify-between mb-6 md:mb-8">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary mb-2 block">
            Browse
          </span>
          <h2
            className="text-2xl md:text-3xl font-bold text-foreground"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Shop by Category
          </h2>
        </div>
        <a
          href="#"
          className="hidden md:flex items-center gap-1 text-sm font-medium text-primary hover:gap-2 transition-all"
        >
          View all <ArrowRight size={14} />
        </a>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
        {categories.map((cat, i) => (
          <motion.a
            key={cat.name}
            href="#"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            viewport={{ once: true }}
            className={`relative overflow-hidden rounded-2xl group cursor-pointer ${
              i === 0 ? "col-span-2 md:col-span-1" : ""
            }`}
            style={{ aspectRatio: "1/1" }}
          >
            <img
              src={cat.image}
              alt={cat.name}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
              <p className="text-white font-semibold text-sm md:text-base leading-snug">
                {cat.name}
              </p>
              <p className="text-white/60 text-xs mt-0.5">{cat.count}</p>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}

// ─── Best Sellers ─────────────────────────────────────────────────────────────

function BestSellers() {
  const scrollRef = useRef<HTMLDivElement>(null);

  function scroll(dir: "left" | "right") {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -280 : 280,
      behavior: "smooth",
    });
  }

  return (
    <section className="py-1 md:py-6 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-end justify-between mb-6 md:mb-8">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary mb-2 block">
              Our New Launches
            </span>
            <h2
              className="text-2xl md:text-3xl font-bold text-foreground"
              style={{
                fontFamily: "'Playfair Display', serif",
              }}
            >
              Featured Products
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              className="w-9 h-9 bg-card rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-shadow border border-border"
              aria-label="Scroll left"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-9 h-9 bg-card rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-shadow border border-border"
              aria-label="Scroll right"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide pl-4 md:pl-6 pr-4 md:pr-6 max-w-7xl mx-auto pb-2"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {bestSellers.map((product, i) => (
          <div key={product.id} style={{ scrollSnapAlign: "start" }}>
            <ProductCard product={product} index={i} />
          </div>
        ))}
        {/* View all card */}
        <motion.a
          href="#"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.35 }}
          viewport={{ once: true }}
          className="flex-shrink-0 w-[220px] md:w-[260px] bg-primary/5 border-2 border-dashed border-primary/20 rounded-2xl flex flex-col items-center justify-center gap-3 p-8 hover:bg-primary/10 transition-colors group cursor-pointer"
        >
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
            <ArrowRight size={20} className="text-primary" />
          </div>
          <div className="text-center">
            <p className="font-semibold text-foreground text-sm">View All</p>
            <p className="text-xs text-muted-foreground mt-0.5">20+ products</p>
          </div>
        </motion.a>
      </div>
    </section>
  );
}

// ─── Why Choose Us ────────────────────────────────────────────────────────────

function WhyChooseUs() {
  const reasons = [
    {
      icon: Leaf,
      title: "Direct Trade",
      description:
        "We source directly from farmers, ensuring fair pay and exceptional quality at the origin.",
    },
    {
      icon: Zap,
      title: "Roasted to Order",
      description:
        "Every batch is roasted the day your order is placed — never sitting in a warehouse.",
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description:
        "Dispatched within 24 hours. Free shipping on orders over $50, always.",
    },
    {
      icon: Award,
      title: "Award-Winning",
      description:
        "Multiple SCA awards for excellence. Recognised by the Specialty Coffee Association.",
    },
  ];

  return (
    <section className="py-4 md:py-6 px-4 md:px-6 max-w-7xl mx-auto">
      <div className="text-center mb-6 md:mb-10">
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary mb-3 block">
          Our Promise
        </span>
        <h2
          className="text-2xl md:text-4xl font-bold text-foreground"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Why Choose My Coffee Co.
        </h2>
        <p className="text-muted-foreground mt-3 max-w-xl mx-auto text-base leading-relaxed">
          We believe great coffee starts long before it reaches your cup.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-8">
        {reasons.map((r, i) => (
          <motion.div
            key={r.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: i * 0.1 }}
            viewport={{ once: true }}
            className="group flex flex-col items-center text-center gap-4 p-6 rounded-2xl border border-transparent hover:border-primary/20 hover:bg-primary/5 transition-all duration-300 cursor-pointer"
          >
            <div className="w-14 h-14 bg-primary/8 rounded-2xl flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
              <r.icon
                size={24}
                className="text-primary group-hover:text-white transition-colors duration-300"
              />
            </div>
            <div>
              <h3 className="font-semibold text-foreground text-base mb-1">
                {r.title}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {r.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ─── Signature Collection Banner ───────────────────────────────────────────────

function SignatureBanner() {
  return (
    <section className="px-4 mt-4 md:px-6 max-w-7xl mx-auto pb-8 md:pb-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.55 }}
        viewport={{ once: true }}
        className="relative rounded-3xl overflow-hidden"
        style={{ minHeight: "340px" }}
      >
        <img
          src="https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?w=1400&h=600&fit=crop&auto=format"
          alt="Signature coffee collection"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" />
        <div className="relative z-10 flex flex-col justify-center h-full p-8 md:p-14 max-w-xl">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary bg-primary/20 backdrop-blur-sm px-3 py-1 rounded-full w-fit mb-4">
            Limited Edition
          </span>
          <h2
            className="text-white text-2xl md:text-4xl font-bold leading-snug mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            The Signature Reserve Collection
          </h2>
          <p className="text-white/75 text-sm md:text-base mb-6 leading-relaxed">
            Six exceptional single-origins, curated by our head roaster. Each
            bag tells a story of place, process, and passion.
          </p>
          <button className="w-fit bg-white text-foreground font-semibold px-6 py-3 rounded-full text-sm hover:bg-primary hover:text-white transition-all duration-200 active:scale-95 cursor-pointer">
            Explore the Collection
          </button>
        </div>
      </motion.div>
    </section>
  );
}

// ─── Equipment Grid ────────────────────────────────────────────────────────────

function EquipmentGrid() {
  const items = [
    {
      name: "NanoFoamer",
      price: 799,
      image:
        "https://mycoffeeco.com/cdn/shop/files/My_Coffee_Co._Subminimal_NanoFoamer_Lithium_online_in_India.png?v=1780398363&width=800",
      badge: "New Arrival",
    },
    {
      name: "French Press",
      price: 1299,
      image:
        "https://images.unsplash.com/photo-1558996338-294a904a1815?w=400&h=400&fit=crop&auto=format",
      badge: "Best Seller",
    },
    {
      name: "Aeropress Coffee Maker",
      price: 2499,
      image:
        "https://images.unsplash.com/photo-1783351583781-0f3b2d91b8b6?w=400&h=400&fit=crop&auto=format",
    },
    {
      name: "Encore Grinder",
      price: 8999,
      image:
        "https://images.unsplash.com/photo-1581701663554-291c6c9e56d2?w=400&h=400&fit=crop&auto=format",
      badge: "Staff Pick",
    },
  ];

  return (
    <section className="py-6 md:py-8 px-4 md:px-6 max-w-7xl mx-auto">
      <div className="flex items-end justify-between mb-8 md:mb-10">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary mb-2 block">
            Gear Up
          </span>
          <h2
            className="text-2xl md:text-3xl font-bold text-foreground"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Brewing Equipment
          </h2>
        </div>
        <a
          href="#"
          className="hidden md:flex items-center gap-1 text-sm font-medium text-primary hover:gap-2 transition-all"
        >
          Shop all <ArrowRight size={14} />
        </a>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
        {items.map((item, i) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            viewport={{ once: true }}
            className="bg-card rounded-2xl overflow-hidden group cursor-pointer shadow-sm hover:shadow-md transition-shadow"
          >
            <div
              className="relative overflow-hidden bg-secondary"
              style={{ aspectRatio: "1" }}
            >
              <img
                src={item.image}
                alt={item.name}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {item.badge && (
                <span className="absolute top-2.5 left-2.5 bg-foreground text-background text-[9px] font-semibold uppercase tracking-wider px-2 py-1 rounded-full">
                  {item.badge}
                </span>
              )}
            </div>
            <div className="p-3 md:p-4">
              <p className="font-medium text-xs md:text-sm text-foreground leading-snug">
                {item.name}
              </p>
              <p className="text-primary font-semibold text-sm mt-1">
                ₹{item.price}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

function Testimonials() {
  const [active, setActive] = useState(0);

  function go(dir: "prev" | "next") {
    setActive((a) =>
      dir === "next"
        ? (a + 1) % testimonials.length
        : (a - 1 + testimonials.length) % testimonials.length,
    );
  }

  const t = testimonials[active];

  return (
    <section className="py-6 md:py-10 px-4 md:px-6 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary mb-2 block">
          Reviews
        </span>
        <h2
          className="text-2xl md:text-4xl font-bold text-foreground"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          What Our Customers Say
        </h2>
      </div>

      <div className="max-w-2xl mx-auto relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.35 }}
            className="bg-card rounded-3xl p-8 md:p-12 shadow-sm border border-border text-center"
          >
            <div className="flex justify-center mb-5">
              <StarRating rating={t.rating} />
            </div>
            <p
              className="text-foreground text-base md:text-lg leading-relaxed mb-8"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontStyle: "italic",
              }}
            >
              &ldquo;{t.text}&rdquo;
            </p>
            <div className="flex items-center justify-center gap-3">
              <img
                src={`https://images.unsplash.com/${t.avatar}?w=80&h=80&fit=crop&auto=format`}
                alt={t.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="text-left">
                <p className="font-semibold text-sm text-foreground">
                  {t.name}
                </p>
                <p className="text-xs text-muted-foreground">{t.location}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-3 mt-6">
          <button
            onClick={() => go("prev")}
            className="w-9 h-9 bg-card border border-border rounded-full flex items-center justify-center shadow-sm hover:shadow transition-shadow"
            aria-label="Previous"
          >
            <ChevronLeft size={16} />
          </button>
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`transition-all duration-300 rounded-full ${
                  i === active ? "w-6 h-2 bg-primary" : "w-2 h-2 bg-muted"
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
          <button
            onClick={() => go("next")}
            className="w-9 h-9 bg-card border border-border rounded-full flex items-center justify-center shadow-sm hover:shadow transition-shadow"
            aria-label="Next"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}

// ─── Instagram Gallery ────────────────────────────────────────────────────────

function InstagramGallery() {
  return (
    <section className="py-6 md:py-12 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <div className="flex items-center gap-2">
            {/* <Instagram size={18} className="text-foreground" /> */}
            <span className="font-semibold text-foreground text-sm md:text-base">
              @mycoffeeco
            </span>
          </div>
          <a
            href="#"
            className="text-xs font-medium text-primary flex items-center gap-1 hover:gap-2 transition-all"
          >
            Follow Us <ArrowRight size={12} />
          </a>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-3">
          {instagramPosts.map((img, i) => (
            <motion.a
              key={img}
              href="#"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-xl group cursor-pointer"
              style={{ aspectRatio: "1" }}
            >
              <img
                src={`https://images.unsplash.com/${img}?w=300&h=300&fit=crop&auto=format`}
                alt="Instagram post"
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/30 transition-colors duration-300 flex items-center justify-center">
                {/* <Instagram
                  size={20}
                  className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                /> */}
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Newsletter ────────────────────────────────────────────────────────────────

function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  }

  return (
    <section className="py-8 md:py- px-4 md:px-6 bg-[#eef0ff]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto text-center"
      >
        <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Mail size={24} className="text-primary" />
        </div>
        <h2
          className="text-2xl md:text-4xl font-bold text-foreground mb-4"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Join the Coffee Club
        </h2>
        <p className="text-muted-foreground mb-8 text-base leading-relaxed max-w-md mx-auto">
          Get 10% off your first order, early access to new origins, and weekly
          brew tips from our roasters.
        </p>

        {submitted ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center gap-3"
          >
            <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle size={28} className="text-green-600" />
            </div>
            <p className="font-semibold text-foreground">
              You&apos;re in! Check your inbox for your 10% code.
            </p>
          </motion.div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 bg-card border border-border rounded-full px-5 py-3.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            />
            <button
              type="submit"
              className="bg-primary text-primary-foreground font-semibold px-7 py-3.5 rounded-full text-sm hover:bg-blue-600 transition-all active:scale-95 whitespace-nowrap"
            >
              Get 10% Off
            </button>
          </form>
        )}

        <p className="text-xs text-muted-foreground mt-4">
          No spam, ever. Unsubscribe anytime.
        </p>
      </motion.div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  const links = {
    Shop: [
      "Coffee Beans",
      "Drip Bags",
      "Instant Coffee",
      "Equipment",
      "Accessories",
    ],
    Learn: [
      "Brew Guides",
      "Origin Stories",
      "Coffee Science",
      "Tasting Notes",
      "Blog",
    ],
    Company: [
      "About Us",
      "Sustainability",
      "Careers",
      "Locations",
      "Terms of Service",
    ],
    Support: ["FAQ", "Shipping", "Returns", "Contact Us", "Track Order"],
  };

  return (
    <footer className="bg-foreground text-white">
      {/* Top */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-12 pb-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">
        {/* Brand */}
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Coffee size={16} className="text-white" />
            </div>
            <span
              className="font-bold text-base"
              style={{
                fontFamily: "'Playfair Display', serif",
              }}
            >
              My Coffee Co.
            </span>
          </div>
          <p className="text-white/55 text-xs leading-relaxed mb-5">
            Premium coffee crafted for modern lifestyles and unforgettable
            moments. From farm to cup, we ensure only the finest.
          </p>
          {/* <div className="flex gap-3">
            {[, Facebook, Twitter].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="Social media"
              >
                <Icon size={14} />
              </a>
            ))}
          </div>  */}
        </div>

        {/* Links */}
        {Object.entries(links).map(([heading, items]) => (
          <div key={heading}>
            <p className="font-semibold text-xs uppercase tracking-widest mb-4 text-white/90">
              {heading}
            </p>
            <ul className="flex flex-col gap-2.5">
              {items.map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-white/50 text-xs hover:text-white transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Contact strip */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex flex-wrap gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-5 text-white/40 text-xs">
            <span className="flex items-center gap-1.5">
              <MapPin size={11} /> India
            </span>
            <a
              href="mailto:hello@mycoffeeco.com"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Mail size={11} /> hello@mycoffeeco.com
            </a>
            <a
              href="tel:+910000000000"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone size={11} /> +91 00000 00000
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div
      className="min-h-screen bg-background"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Scrollbar hide */}
      <style>{`
        .scrollbar-hide { scrollbar-width: none; -ms-overflow-style: none; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scale-108 { scale: 1.08; }
        * { scroll-behavior: smooth; }
      `}</style>

      {/* <AnnouncementBar /> */}
      <Header />

      <main>
        <Hero />
        <FeaturedCategories />
        <EquipmentGrid />
        <BestSellers />
        <SignatureBanner />
        <WhyChooseUs />
        <Testimonials />
        <InstagramGallery />
        <Newsletter />
      </main>

      <Footer />
    </div>
  );
}
