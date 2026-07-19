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
  Home,
  Compass,
  Sparkles,
  BadgeCheck,
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

function MobileBottomNav() {
  const items = [
    { label: "Home", icon: Home, active: true },
    { label: "Shop", icon: Compass },
    { label: "Offers", icon: Sparkles },
    { label: "Cart", icon: ShoppingBag },
    { label: "Profile", icon: User },
  ];

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-blue-100/80 bg-white/95 backdrop-blur-xl md:hidden">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-2 py-2">
        {items.map(({ label, icon: Icon, active }) => (
          <button
            key={label}
            className={`flex flex-1 flex-col items-center gap-1 rounded-2xl px-2 py-2 text-[11px] font-medium transition-all ${
              active ? "text-primary" : "text-slate-500"
            }`}
          >
            <div className={`rounded-full p-1.5 ${active ? "bg-blue-50" : ""}`}>
              <Icon size={16} />
            </div>
            <span>{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}

function MobileExperienceCards() {
  const highlights = [
    {
      title: "Freshly roasted",
      text: "Roasted to order and shipped within 24 hours.",
      icon: BadgeCheck,
    },
    {
      title: "Free delivery",
      text: "Enjoy seamless delivery on orders above ₹800.",
      icon: Truck,
    },
    {
      title: "Member perks",
      text: "Get early access to new origins and launch drops.",
      icon: Sparkles,
    },
  ];

  return (
    <section className="px-4 pb-4 sm:px-6">
      <div className="rounded-[24px] border border-blue-100 bg-white p-3 shadow-[0_18px_45px_rgba(10,6,255,0.08)]">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
              Why it feels premium
            </p>
            <h2 className="text-base font-semibold text-slate-900">
              Curated for your daily ritual
            </h2>
          </div>
          <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
            New
          </span>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-1">
          {highlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.a
                key={item.title}
                href="#"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.06 }}
                viewport={{ once: true }}
                className="min-w-[152px] rounded-[18px] border border-slate-100 bg-slate-50/80 p-3"
              >
                <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon size={16} />
                </div>
                <p className="text-sm font-semibold text-slate-900">
                  {item.title}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-slate-500">
                  {item.text}
                </p>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
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
              className="absolute right-0 top-0 h-full w-[290px] bg-white flex flex-col shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative overflow-hidden bg-gradient-to-br from-primary via-blue-600 to-[#0b0b8f] p-5 text-white">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.25),transparent_45%)]" />
                <div className="relative flex items-start justify-between">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/70">
                      Coffee club
                    </p>
                    <p className="mt-2 text-lg font-semibold">
                      Curated drops for calmer mornings.
                    </p>
                  </div>
                  <button
                    onClick={() => setMenuOpen(false)}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto px-4 py-4">
                <div className="rounded-[18px] border border-blue-100 bg-blue-50/70 p-3 text-sm text-slate-700">
                  New this week • Amber Blend with roasted cacao notes.
                </div>
                <nav className="mt-4 flex flex-col gap-2">
                  {navLinks.map((link, index) => (
                    <motion.a
                      key={link}
                      href="#"
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * index }}
                      className="flex items-center justify-between rounded-[14px] border border-transparent bg-slate-50 px-3 py-3 text-sm font-medium text-slate-700 transition-all hover:border-blue-100 hover:bg-white"
                      onClick={() => setMenuOpen(false)}
                    >
                      {link}
                      <ArrowRight size={14} className="text-primary" />
                    </motion.a>
                  ))}
                </nav>
              </div>

              <div className="border-t border-border px-4 py-4">
                <button className="w-full rounded-full bg-primary px-4 py-3 text-sm font-semibold text-white transition-all active:scale-95">
                  Shop Coffee
                </button>
                <div className="mt-3 flex items-center justify-center gap-4 text-sm text-slate-500">
                  <button className="flex items-center gap-1.5 transition-colors hover:text-primary">
                    <User size={14} /> Account
                  </button>
                  <button className="flex items-center gap-1.5 transition-colors hover:text-primary">
                    <Heart size={14} /> Wishlist
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
    <section className="relative w-full overflow-hidden bg-[#0500b8] min-h-[460px] md:min-h-[580px]">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1800&h=1200&fit=crop&auto=format"
          alt="Premium coffee being poured"
          className="h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/65 via-black/35 to-[#0a06ff]/80" />
      </div>

      <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl flex-col justify-between px-4 pb-6 pt-16 sm:px-6 md:px-10 md:pb-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08 }}
          className="max-w-2xl"
        >
          <span className="inline-block rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/80">
            Specialty Coffee • Roasted to Order
          </span>
          <h1
            className="mt-4 text-4xl font-bold leading-[1.05] text-white sm:text-5xl"
            style={{
              fontFamily: "'Playfair Display', serif",
            }}
          >
            Coffee that feels like a premium ritual.
          </h1>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/80 sm:text-base">
            Discover bright single-origin beans, refined brewing gear, and a
            calm shopping experience designed for your morning reset.
          </p>
          <div className="mt-5 flex flex-col gap-2 sm:flex-row">
            <button className="w-fit rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white transition-all active:scale-95">
              Shop Collections
            </button>
            <button className="w-fit rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all active:scale-95">
              Explore New Launches
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 rounded-[20px] border border-white/15 bg-white/10 p-3 backdrop-blur-md"
        >
          <div className="flex items-center justify-between gap-3 text-white/90">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70">
                Today’s highlight
              </p>
              <p className="text-sm font-semibold">
                Amber Blend • Dark chocolate, roasted nuts
              </p>
            </div>
            <button className="rounded-full bg-white px-3 py-2 text-xs font-semibold text-primary">
              Try it
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Featured Categories ───────────────────────────────────────────────────────

function FeaturedCategories() {
  return (
    <section className="px-4 py-5 sm:px-6">
      <div className="mb-4 flex items-end justify-between">
        <div>
          <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
            Browse
          </span>
          <h2
            className="text-2xl font-bold text-slate-900"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Shop by Category
          </h2>
        </div>
        <a
          href="#"
          className="hidden text-sm font-medium text-primary md:inline-flex"
        >
          View all
        </a>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2">
        {categories.map((cat, i) => {
          const Icon = cat.icon;
          return (
            <motion.a
              key={cat.name}
              href="#"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              viewport={{ once: true }}
              className="min-w-[150px] overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-sm"
            >
              <div className="relative aspect-[4/3] bg-slate-50">
                <img
                  src={cat.image}
                  alt={cat.name}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-slate-900">
                    {cat.name}
                  </p>
                  <div className="rounded-full bg-blue-50 p-1.5 text-primary">
                    <Icon size={14} />
                  </div>
                </div>
                <p className="mt-1 text-xs text-slate-500">{cat.count}</p>
              </div>
            </motion.a>
          );
        })}
      </div>
    </section>
  );
}

// ─── Best Sellers ─────────────────────────────────────────────────────────────

function BestSellers() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  function goTo(index: number) {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  }

  const activeProduct = bestSellers[activeIndex];

  return (
    <section className="bg-[#f5f7ff] py-4 sm:py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-5 flex items-end justify-between">
          <div>
            <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
              Our New Launches
            </span>
            <h2
              className="text-2xl font-bold text-slate-900"
              style={{
                fontFamily: "'Playfair Display', serif",
              }}
            >
              Featured Products
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                goTo(
                  (activeIndex - 1 + bestSellers.length) % bestSellers.length,
                )
              }
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card shadow-sm transition-shadow hover:shadow-md"
              aria-label="Scroll left"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => goTo((activeIndex + 1) % bestSellers.length)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card shadow-sm transition-shadow hover:shadow-md"
              aria-label="Scroll right"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 pb-2 sm:px-6 lg:flex-row">
        <div className="overflow-hidden rounded-[28px] border border-blue-100 bg-white p-3 shadow-[0_18px_50px_rgba(10,6,255,0.08)] lg:w-[62%]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeProduct.id}
              initial={{ opacity: 0, x: direction > 0 ? 40 : -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? -40 : 40 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="rounded-[22px] bg-slate-50 p-3"
            >
              <div className="relative overflow-hidden rounded-[18px] bg-slate-100">
                <img
                  src={activeProduct.image}
                  alt={activeProduct.name}
                  className="h-[240px] w-full object-cover sm:h-[300px]"
                />
                {activeProduct.tag && (
                  <span className="absolute left-3 top-3 rounded-full bg-primary px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
                    {activeProduct.tag}
                  </span>
                )}
              </div>
              <div className="mt-4 flex items-start justify-between gap-3">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
                    {activeProduct.roast}
                  </p>
                  <h3 className="mt-1 text-lg font-semibold text-slate-900">
                    {activeProduct.name}
                  </h3>
                  <div className="mt-2 flex items-center gap-2">
                    <StarRating rating={activeProduct.rating} />
                    <span className="text-sm text-slate-500">
                      ({activeProduct.reviews} reviews)
                    </span>
                  </div>
                </div>
                <div className="rounded-full bg-primary/10 px-3 py-2 text-sm font-semibold text-primary">
                  ₹{activeProduct.price}
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between gap-3">
                <p className="text-sm text-slate-500">
                  Freshly roasted for your next ritual.
                </p>
                <button className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition-all active:scale-95">
                  Add to cart
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="rounded-[24px] border border-blue-100 bg-white p-3 shadow-[0_16px_40px_rgba(10,6,255,0.06)] lg:w-[38%]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
                Browse the lineup
              </p>
              <h3 className="text-base font-semibold text-slate-900">
                Pick your next roast
              </h3>
            </div>
            <div className="rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
              5 picks
            </div>
          </div>
          <div className="mt-3 space-y-2">
            {bestSellers.map((product, index) => (
              <button
                key={product.id}
                onClick={() => goTo(index)}
                className={`flex w-full items-center gap-3 rounded-[16px] border px-2.5 py-2 text-left transition-all ${
                  activeIndex === index
                    ? "border-primary bg-blue-50"
                    : "border-transparent bg-slate-50"
                }`}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-12 w-12 rounded-[12px] object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-slate-900">
                    {product.name}
                  </p>
                  <p className="text-xs text-slate-500">₹{product.price}</p>
                </div>
                <ChevronRight size={14} className="text-slate-400" />
              </button>
            ))}
          </div>
        </div>
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
  return (
    <footer className="border-t border-slate-200 bg-white px-4 pb-24 pt-6 sm:px-6 md:pb-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-4">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Coffee size={16} className="text-white" />
              </div>
              <span
                className="text-base font-bold text-slate-900"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                My Coffee Co.
              </span>
            </div>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-500">
              Premium coffee for calm mornings, slow afternoons, and
              unforgettable rituals.
            </p>
          </div>
          <a
            href="mailto:hello@mycoffeeco.com"
            className="rounded-full bg-blue-50 px-3 py-2 text-xs font-semibold text-primary"
          >
            Contact us
          </a>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm text-slate-600">
          <div>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
              Explore
            </p>
            <ul className="space-y-1.5">
              <li>
                <a href="#" className="hover:text-primary">
                  Coffee Beans
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary">
                  Drip Bags
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary">
                  Equipment
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
              Visit
            </p>
            <ul className="space-y-1.5">
              <li className="flex items-center gap-1.5">
                <MapPin size={13} /> India
              </li>
              <li className="flex items-center gap-1.5">
                <Mail size={13} /> hello@mycoffeeco.com
              </li>
              <li className="flex items-center gap-1.5">
                <Phone size={13} /> +91 00000 00000
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200 pt-3 text-xs text-slate-400">
          © 2026 My Coffee Co. Crafted for modern rituals.
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

      <main className="pb-24 md:pb-0">
        <Hero />
        <MobileExperienceCards />
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
      <MobileBottomNav />
    </div>
  );
}
