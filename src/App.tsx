import React, { useState } from 'react';
import { 
  Bed, Wifi, Coffee, ShieldCheck, MapPin, Phone, MessageSquare, Star, 
  Calendar, Users, ChevronRight, CheckCircle2, Award, QrCode, Sparkles, 
  Search, Clock, Heart, Menu, X, ArrowRight, ExternalLink, Filter, Info, PhoneCall
} from 'lucide-react';

// --- DATA DEFINITIONS ---

const HOTEL_INFO = {
  name: "234 Backpackers",
  tagline: "Your Premium Home in the Heart of Auckland CBD",
  phone: "+64 9 300 6340",
  phoneRaw: "+6493006340",
  address: "234 Hobson Street, Auckland CBD, Auckland 1010, New Zealand",
  whatsappUrl: "https://wa.me/6493006340?text=Hello%20234%20Backpackers,%20I%20would%20like%20to%20inquire%20about%20booking%20a%20stay.",
  email: "stay@234backpackers.co.nz",
  rating: 4.9,
  totalReviews: 1248,
};

const ROOMS = [
  {
    id: "4-bed-mixed",
    title: "4-Bed Mixed Dormitory",
    category: "Dorm",
    price: "$45",
    period: "per night / bed",
    image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&q=80&w=800",
    description: "Spacious and air-conditioned mixed dorm with comfortable pod beds, personal reading lights, USB charging ports, and secure lockers.",
    amenities: ["Free High-Speed Wi-Fi", "Secure Locker", "Reading Light & USB", "Shared Bathroom", "Linen Included"],
    maxGuests: 1,
    badge: "Most Popular"
  },
  {
    id: "6-bed-female",
    title: "6-Bed Female Only Dormitory",
    category: "Dorm",
    price: "$42",
    period: "per night / bed",
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=800",
    description: "Designed exclusively for female travelers. Features premium security access, ensuite bathrooms, hair dryers, and cozy vanity mirrors.",
    amenities: ["Female Only Access", "Ensuite Bathroom", "Hair Dryer", "Secure Locker", "Free Wi-Fi"],
    maxGuests: 1,
    badge: "Ladies Choice"
  },
  {
    id: "private-double",
    title: "Private Double Room with En-suite",
    category: "Private",
    price: "$130",
    period: "per night / room",
    image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&q=80&w=800",
    description: "Perfect for couples or friends seeking privacy. Queen-sized plush bed, flat-screen TV, modern en-suite bathroom, and city views.",
    amenities: ["Queen Bed", "Private En-suite", "Smart TV", "City Views", "Coffee/Tea Maker", "Free Wi-Fi"],
    maxGuests: 2,
    badge: "Best Value Private"
  },
  {
    id: "deluxe-twin",
    title: "Deluxe Twin Room",
    category: "Private",
    price: "$120",
    period: "per night / room",
    image: "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&q=80&w=800",
    description: "Two comfortable single beds with crisp white linen, work desk, natural daylight, and daily housekeeping service.",
    amenities: ["2 Single Beds", "Work Desk", "Daily Housekeeping", "Shared Luxury Bathroom", "Free Wi-Fi"],
    maxGuests: 2,
    badge: "Budget Private"
  },
  {
    id: "3-bed-private",
    title: "Triple Private Room",
    category: "Private",
    price: "$150",
    period: "per night / room",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800",
    description: "Ideal for small groups or families of three. Includes one bunk bed and one single bed with plenty of luggage storage space.",
    amenities: ["1 Bunk + 1 Single", "Spacious Layout", "Luggage Storage", "Ensuite Bathroom", "Free Wi-Fi"],
    maxGuests: 3,
    badge: "Group Favorite"
  }
];

const FACILITIES = [
  {
    icon: <Wifi className="w-7 h-7 text-amber-500" />,
    title: "High-Speed Fibre Wi-Fi",
    description: "Complimentary ultra-fast unlimited Wi-Fi accessible in every room and social area.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800"
  },
  {
    icon: <Coffee className="w-7 h-7 text-amber-500" />,
    title: "Fully Equipped Guest Kitchen",
    description: "Cook your favorite meals with modern ovens, stovetops, microwaves, and free tea & coffee.",
    image: "https://images.unsplash.com/photo-1565183997392-2f6f122e5c12?auto=format&fit=crop&q=80&w=800"
  },
  {
    icon: <ShieldCheck className="w-7 h-7 text-amber-500" />,
    title: "24/7 Secure Access",
    description: "Electronic keycard access, security cameras throughout, and individual secure lockers.",
    image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&q=80&w=800"
  },
  {
    icon: <Clock className="w-7 h-7 text-amber-500" />,
    title: "24-Hour Reception & Tour Desk",
    description: "Friendly multilingual staff ready to assist with check-in, local tips, and Hobbiton tours.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800"
  },
  {
    icon: <Sparkles className="w-7 h-7 text-amber-500" />,
    title: "Modern Laundry Facilities",
    description: "Coin-operated washing machines, dryers, and ironing stations available anytime.",
    image: "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&q=80&w=800"
  },
  {
    icon: <Heart className="w-7 h-7 text-amber-500" />,
    title: "Vibrant Social Lounge",
    description: "Relax, watch Netflix on the giant screen, play board games, or meet global travelers.",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800"
  }
];

const OFFERS = [
  {
    id: "weekend-getaway",
    title: "Weekend Getaway Special",
    tagline: "Relax & Recharge in Auckland CBD",
    description: "Enjoy a relaxing weekend stay with complimentary late checkout (12 PM) and free barista coffee on arrival.",
    price: "$90",
    originalPrice: "$110",
    discount: "18% OFF",
    image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=800",
    benefits: ["2 Nights in Private or Dorm", "Free Barista Coffee", "Late Checkout at 12 PM", "Free Luggage Storage"],
    validity: "Valid for Friday-Sunday stays"
  },
  {
    id: "extended-stay",
    title: "Extended Stay Explorer",
    tagline: "Stay 5+ Nights & Save Big",
    description: "Exploring New Zealand for longer? Save up to 25% when you book your stay for 5 consecutive nights or more.",
    price: "$38",
    originalPrice: "$50",
    discount: "25% OFF",
    image: "https://images.unsplash.com/photo-1540518614846-7ede433c4ef0?auto=format&fit=crop&q=80&w=800",
    benefits: ["Special Weekly Rate", "Weekly Linen Change", "Free Laundry Token (1/week)", "Priority Room Choice"],
    validity: "Minimum stay: 5 nights"
  },
  {
    id: "romantic-stay",
    title: "Romantic City Escape",
    tagline: "For Couples Visiting Auckland",
    description: "Experience Auckland in style with our romantic private room package including complimentary chocolates and sparkling juice.",
    price: "$145",
    originalPrice: "$180",
    discount: "20% OFF",
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&q=80&w=800",
    benefits: ["Private En-suite Room", "Welcome Chocolates & Juice", "Rose Petal Touch", "Late Checkout 1 PM"],
    validity: "Available year-round for couples"
  },
  {
    id: "family-stay",
    title: "Family & Small Group Pack",
    tagline: "Comfortable & Budget Friendly",
    description: "Bringing the family or group of friends? Book our Triple Private Room at a special discounted group rate.",
    price: "$135",
    originalPrice: "$160",
    discount: "15% OFF",
    image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&q=80&w=800",
    benefits: ["Triple Private Room", "Free Breakfast Cereal & Toast", "Board Games Access", "Tour Booking Assistance"],
    validity: "Min 3 guests per booking"
  },
  {
    id: "business-stay",
    title: "Digital Nomad & Business Stay",
    tagline: "Fast Wi-Fi & Quiet Workspace",
    description: "Designed for remote workers and business travelers needing ultra-fast internet, quiet desk spaces, and central location.",
    price: "$110",
    originalPrice: "$130",
    discount: "15% OFF",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800",
    benefits: ["High-speed Dedicated Desk", "Unlimited Printing (10 pages)", "Complimentary Tea/Coffee", "Private Room Upgrade"],
    validity: "Mon-Fri business package"
  },
  {
    id: "seasonal-special",
    title: "Spring / Summer Kiwi Explorer",
    tagline: "Discover Auckland's Best Attractions",
    description: "Book your seasonal holiday in Auckland with free discount vouchers for Sky Tower, Auckland Museum, and ferry rides.",
    price: "$40",
    originalPrice: "$48",
    discount: "16% OFF",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800",
    benefits: ["Dorm Bed Accommodation", "Auckland Attraction Vouchers", "Free City Map & Guide", "Social BBQ Night Access"],
    validity: "Valid throughout current season"
  }
];

const GALLERY_IMAGES = [
  {
    url: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&q=80&w=1000",
    category: "Rooms",
    title: "Modern Dormitory Pods"
  },
  {
    url: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&q=80&w=1000",
    category: "Rooms",
    title: "Private Double Room"
  },
  {
    url: "https://images.unsplash.com/photo-1565183997392-2f6f122e5c12?auto=format&fit=crop&q=80&w=1000",
    category: "Kitchen",
    title: "Spacious Guest Kitchen"
  },
  {
    url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1000",
    category: "Lounge",
    title: "Cozy Social Lounge"
  },
  {
    url: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=1000",
    category: "Rooms",
    title: "Female En-suite Dorm"
  },
  {
    url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=1000",
    category: "Rooms",
    title: "Triple Private Room"
  },
  {
    url: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=1000",
    category: "Exterior",
    title: "Hobson Street Entrance"
  },
  {
    url: "https://images.unsplash.com/photo-1540518614846-7ede433c4ef0?auto=format&fit=crop&q=80&w=1000",
    category: "Lounge",
    title: "Relaxation Area & TV Room"
  }
];

const REVIEWS = [
  {
    id: 1,
    name: "Liam O'Connor",
    country: "Ireland",
    role: "Solo Backpacker",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200",
    rating: 5,
    date: "2 weeks ago",
    service: "Dormitory Stay",
    text: "Absolute gem on Hobson Street! Super clean rooms, blazing fast Wi-Fi, and the kitchen has everything you need. The staff gave great tips on Hobbiton and local spots. Will definitely stay again!"
  },
  {
    id: 2,
    name: "Sophie & Marcus",
    country: "Germany",
    role: "Couple Travelers",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
    rating: 5,
    date: "1 month ago",
    service: "Private Double Room",
    text: "We booked the private en-suite room for 3 nights. It was spotless, comfortable, and right in the heart of Auckland CBD. Walking distance to SkyCity and the waterfront. Highly recommend!"
  },
  {
    id: 3,
    name: "Takuma Sato",
    country: "Japan",
    role: "Adventure Traveler",
    avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&q=80&w=200",
    rating: 5,
    date: "3 weeks ago",
    service: "6-Bed Dorm",
    text: "Very secure, friendly atmosphere, and extremely clean bathrooms. The location at 234 Hobson Street makes it so easy to catch the SkyBus from the airport. Top notch hostel!"
  },
  {
    id: 4,
    name: "Chloe Martin",
    country: "France",
    role: "Digital Nomad",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200",
    rating: 5,
    date: "2 months ago",
    service: "Extended Stay",
    text: "Stayed here for a week while working remotely. The lounge area is great for laptop work and the Wi-Fi never dropped once. Great value for money in central Auckland."
  }
];

// --- MAIN APP COMPONENT ---

export default function App() {
  const [activePage, setActivePage] = useState<'home' | 'rooms' | 'gallery' | 'offers-reviews'>('home');
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedRoomForBooking, setSelectedRoomForBooking] = useState<string>('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Quick search form state
  const [checkInDate, setCheckInDate] = useState('2026-11-20');
  const [checkOutDate, setCheckOutDate] = useState('2026-11-23');
  const [guestsCount, setGuestsCount] = useState('1');

  const handleOpenBooking = (roomName?: string) => {
    if (roomName) setSelectedRoomForBooking(roomName);
    setBookingModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      
      {/* TOP NOTIFICATION BANNER */}
      <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 text-slate-950 text-xs sm:text-sm font-semibold py-2 px-4 text-center shadow-md flex items-center justify-center gap-3">
        <span className="bg-slate-950 text-amber-400 px-2 py-0.5 rounded-full text-[11px] uppercase tracking-wider font-bold">Auckland CBD</span>
        <span>📍 234 Hobson Street | Direct WhatsApp Booking: <a href={HOTEL_INFO.whatsappUrl} target="_blank" rel="noreferrer" className="underline font-bold hover:text-white transition">{HOTEL_INFO.phone}</a></span>
        <span className="hidden md:inline">✨ Best Rate Guarantee when booking direct!</span>
      </div>

      {/* HEADER & NAVIGATION */}
      <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <button 
            onClick={() => setActivePage('home')}
            className="flex items-center gap-3 text-left group cursor-pointer focus:outline-none"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-slate-950 font-black text-xl shadow-lg shadow-amber-500/25 group-hover:scale-105 transition transform">
              234
            </div>
            <div>
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white block group-hover:text-amber-400 transition">
                234 BACKPACKERS
              </span>
              <span className="text-xs text-amber-400/90 tracking-widest uppercase font-medium block">
                Auckland CBD • New Zealand
              </span>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            <button 
              onClick={() => setActivePage('home')} 
              className={`text-sm font-medium transition cursor-pointer hover:text-amber-400 ${activePage === 'home' ? 'text-amber-400 font-semibold' : 'text-slate-300'}`}
            >
              Home
            </button>
            <button 
              onClick={() => setActivePage('rooms')} 
              className={`text-sm font-medium transition cursor-pointer hover:text-amber-400 ${activePage === 'rooms' ? 'text-amber-400 font-semibold' : 'text-slate-300'}`}
            >
              Rooms & Pricing
            </button>
            <button 
              onClick={() => setActivePage('gallery')} 
              className={`text-sm font-medium transition cursor-pointer hover:text-amber-400 ${activePage === 'gallery' ? 'text-amber-400 font-semibold' : 'text-slate-300'}`}
            >
              Facilities & Gallery
            </button>
            <button 
              onClick={() => setActivePage('offers-reviews')} 
              className={`text-sm font-medium transition cursor-pointer hover:text-amber-400 ${activePage === 'offers-reviews' ? 'text-amber-400 font-semibold' : 'text-slate-300'}`}
            >
              Special Offers & Reviews
            </button>
          </nav>

          {/* Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <a 
              href={HOTEL_INFO.whatsappUrl} 
              target="_blank" 
              rel="noreferrer"
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2 shadow-lg shadow-emerald-900/30 transition transform hover:-translate-y-0.5"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>
            <button 
              onClick={() => handleOpenBooking()}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg shadow-amber-500/20 transition transform hover:-translate-y-0.5 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Now</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-slate-300 hover:text-white p-2 focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-6 py-5 space-y-4 shadow-2xl animate-fadeIn">
            <button 
              onClick={() => { setActivePage('home'); setMobileMenuOpen(false); }} 
              className={`block w-full text-left py-2 font-medium ${activePage === 'home' ? 'text-amber-400 font-bold' : 'text-slate-200'}`}
            >
              Home
            </button>
            <button 
              onClick={() => { setActivePage('rooms'); setMobileMenuOpen(false); }} 
              className={`block w-full text-left py-2 font-medium ${activePage === 'rooms' ? 'text-amber-400 font-bold' : 'text-slate-200'}`}
            >
              Rooms & Pricing
            </button>
            <button 
              onClick={() => { setActivePage('gallery'); setMobileMenuOpen(false); }} 
              className={`block w-full text-left py-2 font-medium ${activePage === 'gallery' ? 'text-amber-400 font-bold' : 'text-slate-200'}`}
            >
              Facilities & Gallery
            </button>
            <button 
              onClick={() => { setActivePage('offers-reviews'); setMobileMenuOpen(false); }} 
              className={`block w-full text-left py-2 font-medium ${activePage === 'offers-reviews' ? 'text-amber-400 font-bold' : 'text-slate-200'}`}
            >
              Special Offers & Reviews
            </button>
            <div className="pt-4 border-t border-slate-800 flex flex-col gap-3">
              <a 
                href={HOTEL_INFO.whatsappUrl} 
                target="_blank" 
                rel="noreferrer"
                className="bg-emerald-600 text-white py-3 rounded-xl font-medium text-center flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Booking ({HOTEL_INFO.phone})</span>
              </a>
              <button 
                onClick={() => { setMobileMenuOpen(false); handleOpenBooking(); }}
                className="bg-amber-500 text-slate-950 py-3 rounded-xl font-bold text-center flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Direct Now</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* PAGE CONTENT CONTAINER */}
      <main className="flex-grow">
        {activePage === 'home' && (
          <HomePage 
            setActivePage={setActivePage} 
            handleOpenBooking={handleOpenBooking} 
            checkInDate={checkInDate}
            setCheckInDate={setCheckInDate}
            checkOutDate={checkOutDate}
            setCheckOutDate={setCheckOutDate}
            guestsCount={guestsCount}
            setGuestsCount={setGuestsCount}
          />
        )}
        {activePage === 'rooms' && (
          <RoomsPage handleOpenBooking={handleOpenBooking} />
        )}
        {activePage === 'gallery' && (
          <GalleryPage />
        )}
        {activePage === 'offers-reviews' && (
          <OffersReviewsPage handleOpenBooking={handleOpenBooking} />
        )}
      </main>

      {/* FOOTER */}
      <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Col 1 */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-slate-950 font-bold text-lg">
                234
              </div>
              <span className="font-bold text-white text-lg">234 BACKPACKERS</span>
            </div>
            <p className="text-sm leading-relaxed mb-4 text-slate-400">
              Your premier home away from home in Auckland CBD. Clean, modern, secure, and right in the heart of New Zealand's most vibrant city.
            </p>
            <div className="flex items-center gap-2 text-amber-400 text-sm font-semibold">
              <Star className="w-4 h-4 fill-amber-400" />
              <span>4.9 / 5.0 Rating (1,248+ Reviews)</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-white font-bold text-base mb-4">Quick Navigation</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => setActivePage('home')} className="hover:text-amber-400 transition cursor-pointer">Home</button>
              </li>
              <li>
                <button onClick={() => setActivePage('rooms')} className="hover:text-amber-400 transition cursor-pointer">Rooms & Pricing</button>
              </li>
              <li>
                <button onClick={() => setActivePage('gallery')} className="hover:text-amber-400 transition cursor-pointer">Facilities & Gallery</button>
              </li>
              <li>
                <button onClick={() => setActivePage('offers-reviews')} className="hover:text-amber-400 transition cursor-pointer">Special Offers & Packages</button>
              </li>
              <li>
                <button onClick={() => setActivePage('offers-reviews')} className="hover:text-amber-400 transition cursor-pointer">Customer Reviews & Ratings</button>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact Info */}
          <div>
            <h4 className="text-white font-bold text-base mb-4">Contact & Location</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <span>{HOTEL_INFO.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-amber-500 shrink-0" />
                <a href={`tel:${HOTEL_INFO.phoneRaw}`} className="hover:text-white transition">{HOTEL_INFO.phone}</a>
              </li>
              <li className="flex items-center gap-3">
                <MessageSquare className="w-5 h-5 text-emerald-500 shrink-0" />
                <a href={HOTEL_INFO.whatsappUrl} target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline font-medium">WhatsApp Booking</a>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter / WhatsApp Callout */}
          <div>
            <h4 className="text-white font-bold text-base mb-4">Instant Support</h4>
            <p className="text-sm text-slate-400 mb-4">
              Have questions about check-in, group bookings, or airport transfers? Message us directly on WhatsApp anytime!
            </p>
            <a 
              href={HOTEL_INFO.whatsappUrl} 
              target="_blank" 
              rel="noreferrer"
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-3 rounded-xl font-medium text-sm flex items-center justify-center gap-2 shadow-lg transition"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chat on WhatsApp (+64 9 300 6340)</span>
            </a>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-slate-900 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} 234 Backpackers. All rights reserved. Located at 234 Hobson Street, Auckland CBD.</p>
          <div className="flex gap-6">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms & Conditions</span>
            <span className="hover:text-slate-400 cursor-pointer">Hostel Rules</span>
          </div>
        </div>
      </footer>

      {/* BOOKING MODAL */}
      {bookingModalOpen && (
        <BookingModal 
          isOpen={bookingModalOpen} 
          onClose={() => setBookingModalOpen(false)} 
          initialRoom={selectedRoomForBooking}
        />
      )}

    </div>
  );
}

// --- HOME PAGE COMPONENT (6 Sections) ---
function HomePage({ 
  setActivePage, 
  handleOpenBooking,
  checkInDate,
  setCheckInDate,
  checkOutDate,
  setCheckOutDate,
  guestsCount,
  setGuestsCount
}: { 
  setActivePage: (p: 'home' | 'rooms' | 'gallery' | 'offers-reviews') => void;
  handleOpenBooking: (room?: string) => void;
  checkInDate: string;
  setCheckInDate: (s: string) => void;
  checkOutDate: string;
  setCheckOutDate: (s: string) => void;
  guestsCount: string;
  setGuestsCount: (s: string) => void;
}) {
  return (
    <div>
      {/* SECTION 1: HERO BANNER */}
      <section className="relative min-h-[85vh] flex items-center justify-center bg-slate-950 overflow-hidden">
        {/* Background Image with Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&q=80&w=2000" 
            alt="234 Backpackers Auckland" 
            className="w-full h-full object-cover object-center opacity-40 scale-105 animate-pulse duration-[10000ms]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center">
          
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-6 backdrop-blur-md">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span>Top Rated Auckland CBD Backpackers • 234 Hobson Street</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight max-w-4xl mb-6 leading-tight">
            Experience Auckland from the Heart at <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-200">234 Backpackers</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mb-10 leading-relaxed">
            Modern pods, private rooms, ultra-fast fiber Wi-Fi, and a vibrant social atmosphere right on Hobson Street. Book direct for the best rates guaranteed.
          </p>

          {/* Quick Search Widget */}
          <div className="w-full max-w-4xl bg-slate-900/90 backdrop-blur-xl border border-slate-800 p-4 sm:p-6 rounded-2xl shadow-2xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="text-left">
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Check-in Date</label>
              <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-sm">
                <Calendar className="w-4 h-4 text-amber-500 shrink-0" />
                <input 
                  type="date" 
                  value={checkInDate}
                  onChange={(e) => setCheckInDate(e.target.value)}
                  className="bg-transparent text-white w-full focus:outline-none"
                />
              </div>
            </div>

            <div className="text-left">
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Check-out Date</label>
              <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-sm">
                <Calendar className="w-4 h-4 text-amber-500 shrink-0" />
                <input 
                  type="date" 
                  value={checkOutDate}
                  onChange={(e) => setCheckOutDate(e.target.value)}
                  className="bg-transparent text-white w-full focus:outline-none"
                />
              </div>
            </div>

            <div className="text-left">
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Guests</label>
              <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-sm">
                <Users className="w-4 h-4 text-amber-500 shrink-0" />
                <select 
                  value={guestsCount}
                  onChange={(e) => setGuestsCount(e.target.value)}
                  className="bg-transparent text-white w-full focus:outline-none cursor-pointer"
                >
                  <option value="1" className="bg-slate-900">1 Guest (Dorm / Private)</option>
                  <option value="2" className="bg-slate-900">2 Guests (Double / Twin)</option>
                  <option value="3" className="bg-slate-900">3 Guests (Triple Room)</option>
                  <option value="4" className="bg-slate-900">4+ Guests (Group)</option>
                </select>
              </div>
            </div>

            <div className="flex items-end">
              <button 
                onClick={() => handleOpenBooking()}
                className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-bold py-3 px-6 rounded-xl shadow-lg transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Search className="w-4 h-4" />
                <span>Check Availability</span>
              </button>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href={HOTEL_INFO.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-6 py-3.5 rounded-xl shadow-xl flex items-center gap-2.5 transition transform hover:-translate-y-0.5"
            >
              <MessageSquare className="w-5 h-5" />
              <span>Instant WhatsApp Booking (+64 9 300 6340)</span>
            </a>
            <button 
              onClick={() => setActivePage('rooms')}
              className="bg-slate-800 hover:bg-slate-700 text-white font-medium px-6 py-3.5 rounded-xl border border-slate-700 transition cursor-pointer flex items-center gap-2"
            >
              <span>Explore All Rooms</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

      {/* SECTION 2: LOCATION & ABOUT HIGHLIGHT */}
      <section className="py-20 bg-slate-900 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div>
              <span className="text-amber-400 text-sm font-bold uppercase tracking-widest block mb-3">Prime CBD Location</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6">
                Located at 234 Hobson Street — Right Where the Action Is
              </h2>
              <p className="text-slate-300 leading-relaxed mb-6">
                Whether you just arrived in Auckland via the SkyBus or are planning a day trip to Waiheke Island, 234 Backpackers places you within minutes of SkyCity, Queen Street shopping, Viaduct Harbour, and Britomart transport station.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0 mt-1">✓</div>
                  <div>
                    <h4 className="text-white font-semibold">2 Minutes Walk to SkyCity & Casino</h4>
                    <p className="text-sm text-slate-400">Enjoy Auckland's iconic entertainment, dining, and observation tower right at your doorstep.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0 mt-1">✓</div>
                  <div>
                    <h4 className="text-white font-semibold">Direct Airport Bus Stop Nearby</h4>
                    <p className="text-sm text-slate-400">SkyBus drop-off and pickup points are just around the corner on Hobson Street.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0 mt-1">✓</div>
                  <div>
                    <h4 className="text-white font-semibold">Supermarkets & Cafes Abound</h4>
                    <p className="text-sm text-slate-400">Countdown supermarket, convenience stores, and award-winning coffee shops within 100 meters.</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => setActivePage('gallery')}
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-3 rounded-xl transition cursor-pointer"
                >
                  View Photo Gallery
                </button>
                <a 
                  href="https://maps.google.com/?q=234+Hobson+Street+Auckland" 
                  target="_blank" 
                  rel="noreferrer"
                  className="bg-slate-800 hover:bg-slate-700 text-white font-medium px-6 py-3 rounded-xl border border-slate-700 transition flex items-center gap-2"
                >
                  <MapPin className="w-4 h-4 text-amber-400" />
                  <span>Open Google Maps</span>
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-3xl blur-xl opacity-20"></div>
              <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1000" 
                  alt="Auckland Skyline" 
                  className="w-full h-[400px] object-cover hover:scale-105 transition duration-700"
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950 p-6">
                  <div className="flex items-center justify-between text-white">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-amber-400 font-bold">Address</p>
                      <p className="font-medium text-sm">234 Hobson Street, Auckland CBD</p>
                    </div>
                    <span className="bg-emerald-600 text-xs px-3 py-1.5 rounded-full font-bold">Open 24/7</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 3: ROOMS & PRICING PREVIEW */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-amber-400 text-sm font-bold uppercase tracking-widest block mb-2">Comfort & Affordability</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Featured Rooms & Dorms</h2>
            </div>
            <button 
              onClick={() => setActivePage('rooms')}
              className="mt-4 md:mt-0 text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1 cursor-pointer"
            >
              <span>View all {ROOMS.length} room types</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ROOMS.slice(0, 3).map((room) => (
              <div key={room.id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl hover:border-amber-500/50 transition duration-300 flex flex-col group">
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={room.image} 
                    alt={room.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md text-amber-400 text-xs font-bold px-3 py-1 rounded-full border border-amber-500/30">
                    {room.badge}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-slate-950/90 backdrop-blur-md text-white px-3 py-1 rounded-xl text-sm font-extrabold border border-slate-800">
                    {room.price} <span className="text-xs text-slate-400 font-normal">{room.period}</span>
                  </div>
                </div>

                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{room.title}</h3>
                    <p className="text-slate-400 text-sm mb-4 line-clamp-2">{room.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {room.amenities.slice(0, 3).map((amenity, idx) => (
                        <span key={idx} className="bg-slate-950 text-slate-300 text-xs px-2.5 py-1 rounded-lg border border-slate-800">
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
                    <button 
                      onClick={() => handleOpenBooking(room.title)}
                      className="flex-grow bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-2.5 px-4 rounded-xl text-sm transition text-center cursor-pointer"
                    >
                      Book This Room
                    </button>
                    <a 
                      href={HOTEL_INFO.whatsappUrl} 
                      target="_blank" 
                      rel="noreferrer"
                      className="bg-emerald-600 hover:bg-emerald-500 text-white p-2.5 rounded-xl transition"
                      title="Inquire via WhatsApp"
                    >
                      <MessageSquare className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button 
              onClick={() => setActivePage('rooms')}
              className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-8 py-3.5 rounded-xl border border-slate-700 transition cursor-pointer inline-flex items-center gap-2"
            >
              <span>Explore All Rooms & Pricing</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 4: FACILITIES & AMENITIES */}
      <section className="py-20 bg-slate-900 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-400 text-sm font-bold uppercase tracking-widest block mb-2">Everything You Need</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">World-Class Hostel Facilities</h2>
            <p className="text-slate-400 text-base">
              Designed for backpackers, digital nomads, and explorers who appreciate cleanliness, security, and top-notch social spaces.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FACILITIES.map((facility, index) => (
              <div 
                key={index} 
                className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl group hover:border-amber-500/50 transition duration-300 flex flex-col"
              >
                <div className="relative h-52 overflow-hidden">
                  <img 
                    src={facility.image} 
                    alt={facility.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                  <div className="absolute top-3 left-3 w-10 h-10 rounded-xl bg-slate-950/80 backdrop-blur-md border border-amber-500/30 flex items-center justify-center shadow-lg">
                    {facility.icon}
                  </div>
                </div>

                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{facility.title}</h3>
                    <p className="text-slate-300 text-sm leading-relaxed">{facility.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: SPECIAL OFFERS TEASER */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-amber-500/30 rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="relative z-10 max-w-2xl">
              <span className="bg-amber-500/20 text-amber-400 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider inline-block mb-4 border border-amber-500/30">
                Exclusive Deals
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
                Special Offers & Extended Stay Discounts
              </h2>
              <p className="text-slate-300 mb-8 leading-relaxed">
                Planning a weekend getaway or staying in Auckland for 5+ nights? Discover our special packages with up to 25% off, free barista coffee, and complimentary late checkouts.
              </p>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => setActivePage('offers-reviews')}
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-8 py-3.5 rounded-xl transition cursor-pointer flex items-center gap-2"
                >
                  <span>View All 6 Special Packages</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a 
                  href={HOTEL_INFO.whatsappUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-6 py-3.5 rounded-xl transition flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Ask on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: REVIEWS & TRUST SUMMARY */}
      <section className="py-20 bg-slate-900 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-400 text-sm font-bold uppercase tracking-widest block mb-2">Trusted Worldwide</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">What Our Guests Say</h2>
            <div className="flex items-center justify-center gap-2 text-amber-400 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-amber-400" />
              ))}
            </div>
            <p className="text-slate-300 font-medium">4.9 / 5.0 Average Rating based on 1,248+ Google & Trustpilot Reviews</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {REVIEWS.slice(0, 2).map((review) => (
              <div key={review.id} className="bg-slate-950 border border-slate-800 p-8 rounded-2xl shadow-xl relative">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <img src={review.avatar} alt={review.name} className="w-14 h-14 rounded-full object-cover border-2 border-amber-500" />
                    <div>
                      <h4 className="text-white font-bold text-lg">{review.name}</h4>
                      <p className="text-xs text-amber-400">{review.role} • {review.country}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 bg-amber-500/10 text-amber-400 px-3 py-1 rounded-full text-xs font-bold border border-amber-500/20">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{review.rating}.0</span>
                  </div>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed italic mb-4">"{review.text}"</p>
                <div className="flex items-center justify-between text-xs text-slate-500 pt-4 border-t border-slate-800">
                  <span>Stayed in {review.service}</span>
                  <span>{review.date}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button 
              onClick={() => setActivePage('offers-reviews')}
              className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-8 py-3.5 rounded-xl border border-slate-700 transition cursor-pointer inline-flex items-center gap-2"
            >
              <span>View Full Reviews, Breakdown & QR Code</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}

// --- ROOMS & PRICING PAGE ---
function RoomsPage({ handleOpenBooking }: { handleOpenBooking: (room?: string) => void }) {
  const [filter, setFilter] = useState<'All' | 'Dorm' | 'Private'>('All');

  const filteredRooms = filter === 'All' 
    ? ROOMS 
    : ROOMS.filter(r => r.category === filter);

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-amber-400 text-sm font-bold uppercase tracking-widest block mb-2">Accommodation Options</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">Rooms & Pricing at 234 Backpackers</h1>
          <p className="text-slate-300 text-base">
            Choose from budget-friendly pod dorms to comfortable private rooms with en-suite bathrooms. All bookings include free high-speed Wi-Fi and access to guest kitchen facilities.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center gap-3 mb-12">
          {['All', 'Dorm', 'Private'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat as any)}
              className={`px-6 py-2.5 rounded-xl font-bold text-sm transition cursor-pointer ${
                filter === cat 
                  ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20' 
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {cat === 'All' ? 'All Room Types' : `${cat} Rooms`}
            </button>
          ))}
        </div>

        {/* Room Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRooms.map((room) => (
            <div key={room.id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between group hover:border-amber-500/50 transition duration-300">
              <div>
                <div className="relative h-60 overflow-hidden">
                  <img 
                    src={room.image} 
                    alt={room.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md text-amber-400 text-xs font-bold px-3 py-1 rounded-full border border-amber-500/30">
                    {room.badge}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-slate-950/90 backdrop-blur-md text-white px-3.5 py-1.5 rounded-xl text-base font-extrabold border border-slate-800 shadow-lg">
                    {room.price} <span className="text-xs text-slate-400 font-normal">{room.period}</span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{room.title}</h3>
                  <p className="text-slate-400 text-sm mb-4 leading-relaxed">{room.description}</p>
                  
                  <div className="space-y-2 mb-6">
                    <p className="text-xs font-semibold text-amber-400 uppercase tracking-wider">Room Amenities:</p>
                    <div className="flex flex-wrap gap-2">
                      {room.amenities.map((amenity, idx) => (
                        <span key={idx} className="bg-slate-950 text-slate-300 text-xs px-2.5 py-1 rounded-lg border border-slate-800 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-500" />
                          <span>{amenity}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <div className="pt-4 border-t border-slate-800 flex items-center gap-3">
                  <button 
                    onClick={() => handleOpenBooking(room.title)}
                    className="flex-grow bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3 px-4 rounded-xl text-sm transition text-center cursor-pointer shadow-lg shadow-amber-500/20"
                  >
                    Book Now
                  </button>
                  <a 
                    href={HOTEL_INFO.whatsappUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="bg-emerald-600 hover:bg-emerald-500 text-white p-3 rounded-xl transition shadow-lg"
                    title="Inquire via WhatsApp"
                  >
                    <MessageSquare className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

// --- FACILITIES & GALLERY PAGE ---
function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Rooms', 'Kitchen', 'Lounge', 'Exterior'];

  const filteredGallery = activeCategory === 'All'
    ? GALLERY_IMAGES
    : GALLERY_IMAGES.filter(img => img.category === activeCategory);

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-amber-400 text-sm font-bold uppercase tracking-widest block mb-2">Visual Tour</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">Facilities & Photo Gallery</h1>
          <p className="text-slate-300 text-base">
            Take a visual walkthrough of 234 Backpackers. From our spacious social lounge and modern kitchen to spotless pod dorms and private rooms on Hobson Street.
          </p>
        </div>

        {/* Facilities Grid */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Our Core Amenities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FACILITIES.map((facility, index) => (
              <div key={index} className="bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-xl flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
                  {facility.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">{facility.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{facility.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Gallery Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-xl font-bold text-sm transition cursor-pointer ${
                activeCategory === cat 
                  ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20' 
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredGallery.map((item, idx) => (
            <div key={idx} className="group relative h-72 rounded-2xl overflow-hidden border border-slate-800 shadow-xl">
              <img 
                src={item.url} 
                alt={item.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-90 transition"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-xs uppercase tracking-wider text-amber-400 font-bold block mb-1">{item.category}</span>
                <h4 className="text-white font-bold text-lg">{item.title}</h4>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

// --- SPECIAL OFFERS & REVIEWS PAGE ---
function OffersReviewsPage({ handleOpenBooking }: { handleOpenBooking: (room?: string) => void }) {
  return (
    <div className="py-16 space-y-24">
      
      {/* SECTION 1: SPECIAL OFFERS & PACKAGES */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-amber-400 text-sm font-bold uppercase tracking-widest block mb-2">Exclusive Deals</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">Special Offers & Packages</h1>
          <p className="text-slate-300 text-base">
            Discover exceptional stays and exclusive offers designed to make your Auckland experience unforgettable. Book direct for verified best rates.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {OFFERS.map((offer) => (
            <div key={offer.id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between group hover:border-amber-500/50 transition duration-300">
              <div>
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={offer.image} 
                    alt={offer.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-extrabold px-3 py-1 rounded-full shadow-lg">
                    {offer.discount}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-slate-950/90 backdrop-blur-md text-white px-3.5 py-1.5 rounded-xl text-base font-extrabold border border-slate-800">
                    {offer.price} <span className="text-xs text-slate-400 line-through font-normal">{offer.originalPrice}</span>
                  </div>
                </div>

                <div className="p-6">
                  <span className="text-xs text-amber-400 font-bold uppercase tracking-wider block mb-1">{offer.tagline}</span>
                  <h3 className="text-xl font-bold text-white mb-2">{offer.title}</h3>
                  <p className="text-slate-400 text-sm mb-4 leading-relaxed">{offer.description}</p>
                  
                  <div className="space-y-2 mb-6">
                    <p className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Package Benefits:</p>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {offer.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <p className="text-[11px] text-amber-400/90 italic bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
                    {offer.validity}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <div className="pt-4 border-t border-slate-800 flex items-center gap-3">
                  <button 
                    onClick={() => handleOpenBooking(offer.title)}
                    className="flex-grow bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3 px-4 rounded-xl text-sm transition text-center cursor-pointer shadow-lg shadow-amber-500/20"
                  >
                    Claim Offer
                  </button>
                  <a 
                    href={HOTEL_INFO.whatsappUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="bg-emerald-600 hover:bg-emerald-500 text-white p-3 rounded-xl transition shadow-lg"
                    title="Inquire via WhatsApp"
                  >
                    <MessageSquare className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 2: CUSTOMER REVIEWS & RATINGS WITH QR CODE & BREAKDOWN */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-800 pt-20">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-amber-400 text-sm font-bold uppercase tracking-widest block mb-2">Verified Feedback</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">Customer Reviews & Ratings</h2>
          <p className="text-slate-300 text-base">
            See why travelers rate 234 Backpackers 4.9 out of 5 stars across Google Reviews and Trustpilot.
          </p>
        </div>

        {/* Rating Summary Card & Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          
          {/* Overall Rating Box */}
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-xl flex flex-col items-center justify-center text-center">
            <span className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-2">Overall Score</span>
            <div className="text-6xl font-black text-white mb-2">4.9</div>
            <div className="flex items-center gap-1 text-amber-400 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400" />
              ))}
            </div>
            <p className="text-sm text-slate-300 font-medium">Based on 1,248+ verified reviews</p>
            <div className="mt-6 flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-4 py-1.5 rounded-full text-xs font-bold border border-emerald-500/20">
              <CheckCircle2 className="w-4 h-4" />
              <span>100% Verified Guest Stays</span>
            </div>
          </div>

          {/* Rating Breakdown Bars */}
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-xl flex flex-col justify-center">
            <h4 className="text-white font-bold text-base mb-4">Rating Breakdown</h4>
            <div className="space-y-3">
              {[
                { stars: 5, percent: 88 },
                { stars: 4, percent: 9 },
                { stars: 3, percent: 2 },
                { stars: 2, percent: 1 },
                { stars: 1, percent: 0 },
              ].map((item) => (
                <div key={item.stars} className="flex items-center gap-3 text-sm">
                  <span className="w-12 text-slate-300 font-medium">{item.stars} Stars</span>
                  <div className="flex-grow h-3 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: `${item.percent}%` }}></div>
                  </div>
                  <span className="w-10 text-right text-xs text-slate-400">{item.percent}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* QR Code Review Us Card */}
          <div className="bg-gradient-to-br from-amber-600/20 via-slate-900 to-slate-900 border border-amber-500/40 p-8 rounded-2xl shadow-xl flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4">
              <QrCode className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold text-white mb-2">Scan & Review Us!</h4>
            <p className="text-slate-300 text-xs mb-6">
              Just stayed with us? Scan or click below to leave your review on Google or Trustpilot.
            </p>
            <a 
              href="https://maps.google.com/?q=234+Hobson+Street+Auckland" 
              target="_blank" 
              rel="noreferrer"
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-2.5 rounded-xl text-xs transition shadow-lg flex items-center gap-2"
            >
              <span>Open Google Review Page</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

        {/* Individual Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {REVIEWS.map((review) => (
            <div key={review.id} className="bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <img src={review.avatar} alt={review.name} className="w-14 h-14 rounded-full object-cover border-2 border-amber-500" />
                    <div>
                      <h4 className="text-white font-bold text-lg">{review.name}</h4>
                      <p className="text-xs text-amber-400">{review.role} • {review.country}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 bg-amber-500/10 text-amber-400 px-3 py-1 rounded-full text-xs font-bold border border-amber-500/20">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{review.rating}.0</span>
                  </div>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed italic mb-6">"{review.text}"</p>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400 pt-4 border-t border-slate-800">
                <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Verified Stay ({review.service})
                </span>
                <span>{review.date}</span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* SECTION 3: GOOGLE MAPS LOCATION & WHATSAPP BOOKING */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-800 pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div>
            <span className="text-amber-400 text-sm font-bold uppercase tracking-widest block mb-2">Find Us Easily</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6">Visit 234 Backpackers in Auckland CBD</h2>
            <p className="text-slate-300 leading-relaxed mb-6">
              Our central location at 234 Hobson Street makes arriving from Auckland Airport or exploring the North Island effortless. We are available 24 hours a day, 7 days a week.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-4 bg-slate-900 border border-slate-800 p-4 rounded-xl">
                <MapPin className="w-6 h-6 text-amber-500 shrink-0" />
                <div>
                  <h4 className="text-white font-semibold text-sm">Full Address</h4>
                  <p className="text-xs text-slate-400">{HOTEL_INFO.address}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-slate-900 border border-slate-800 p-4 rounded-xl">
                <PhoneCall className="w-6 h-6 text-amber-500 shrink-0" />
                <div>
                  <h4 className="text-white font-semibold text-sm">Direct Phone</h4>
                  <a href={`tel:${HOTEL_INFO.phoneRaw}`} className="text-xs text-amber-400 hover:underline">{HOTEL_INFO.phone}</a>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-slate-900 border border-slate-800 p-4 rounded-xl">
                <MessageSquare className="w-6 h-6 text-emerald-500 shrink-0" />
                <div>
                  <h4 className="text-white font-semibold text-sm">WhatsApp Instant Booking & Help</h4>
                  <a href={HOTEL_INFO.whatsappUrl} target="_blank" rel="noreferrer" className="text-xs text-emerald-400 hover:underline font-medium">Click here to chat instantly ({HOTEL_INFO.phone})</a>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <a 
                href={HOTEL_INFO.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3.5 rounded-xl shadow-lg flex items-center gap-2 transition"
              >
                <MessageSquare className="w-5 h-5" />
                <span>Book via WhatsApp</span>
              </a>
              <a 
                href="https://maps.google.com/?q=234+Hobson+Street+Auckland"
                target="_blank"
                rel="noreferrer"
                className="bg-slate-800 hover:bg-slate-700 text-white font-medium px-6 py-3.5 rounded-xl border border-slate-700 transition flex items-center gap-2"
              >
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>Open in Google Maps</span>
              </a>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl h-[450px]">
            <iframe 
              title="234 Hobson Street Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2559.887654321!2d174.7570!3d-36.8485!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6d0d47efa0000001%3A0x123456789abcdef!2s234%20Hobson%20Street%2C%20Auckland%20CBD%2C%20Auckland%201010%2C%20New%20Zealand!5e0!3m2!1sen!2snz!4v1600000000000!5m2!1sen!2snz" 
              className="w-full h-full border-0 filter invert-[90%] hue-rotate-180 contrast-125"
              loading="lazy"
            ></iframe>
          </div>

        </div>
      </div>

    </div>
  );
}

// --- BOOKING MODAL COMPONENT ---
function BookingModal({ isOpen, onClose, initialRoom }: { isOpen: boolean; onClose: () => void; initialRoom?: string }) {
  const [roomType, setRoomType] = useState(initialRoom || ROOMS[0].title);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [checkIn, setCheckIn] = useState('2026-11-20');
  const [checkOut, setCheckOut] = useState('2026-11-23');
  const [guests, setGuests] = useState('1');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Also construct WhatsApp redirect message
    const message = `Hello 234 Backpackers, I would like to book:\nRoom: ${roomType}\nCheck-in: ${checkIn}\nCheck-out: ${checkOut}\nGuests: ${guests}\nName: ${fullName}\nPhone: ${phone}`;
    const waUrl = `https://wa.me/6493006340?text=${encodeURIComponent(message)}`;
    
    setTimeout(() => {
      window.open(waUrl, '_blank');
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative animate-scaleUp">
        
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-slate-400 hover:text-white bg-slate-800 p-2 rounded-full cursor-pointer transition"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="mb-6">
              <span className="text-amber-400 text-xs font-bold uppercase tracking-widest block mb-1">Direct Booking</span>
              <h3 className="text-2xl font-extrabold text-white">Book Your Stay at 234 Backpackers</h3>
              <p className="text-slate-400 text-xs mt-1">Address: 234 Hobson Street, Auckland CBD • Phone: +64 9 300 6340</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Select Room / Package</label>
                <select 
                  value={roomType}
                  onChange={(e) => setRoomType(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-amber-500"
                >
                  {ROOMS.map(r => (
                    <option key={r.id} value={r.title}>{r.title} ({r.price} {r.period})</option>
                  ))}
                  {OFFERS.map(o => (
                    <option key={o.id} value={o.title}>Offer: {o.title} ({o.price})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Check-in Date</label>
                  <input 
                    type="date" 
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-amber-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Check-out Date</label>
                  <input 
                    type="date" 
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-amber-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Full Name</label>
                  <input 
                    type="text" 
                    placeholder="John Doe"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-amber-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Phone / WhatsApp</label>
                  <input 
                    type="text" 
                    placeholder="+64 ..."
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-amber-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Number of Guests</label>
                <select 
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-amber-500"
                >
                  <option value="1">1 Guest</option>
                  <option value="2">2 Guests</option>
                  <option value="3">3 Guests</option>
                  <option value="4">4+ Guests (Group)</option>
                </select>
              </div>

              <div className="pt-2">
                <button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-bold py-3.5 px-6 rounded-xl shadow-lg transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>Confirm & Send via WhatsApp (+64 9 300 6340)</span>
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="py-12 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white">Booking Inquiry Prepared!</h3>
            <p className="text-slate-300 text-sm max-w-sm mx-auto">
              Redirecting you to WhatsApp with your booking details for 234 Backpackers (+64 9 300 6340)...
            </p>
            <div className="pt-4">
              <button 
                onClick={onClose}
                className="bg-slate-800 hover:bg-slate-700 text-white font-medium px-6 py-2 rounded-xl text-sm transition"
              >
                Close Window
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
