import Head from "next/head";
import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper";

// ─── Custom Select ───────────────────────────────────────────────────────────
function CustomSelect({ id, placeholder, options, hasError, onClearError }) {
  const [open, setOpen]     = useState(false);
  const [selected, setSel]  = useState("");
  const [dropUp, setDropUp] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleOpen = () => {
    if (!open && ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      setDropUp(spaceBelow < 220);
    }
    setOpen((o) => !o);
  };

  const pick = (val) => { setSel(val); setOpen(false); onClearError(); };

  return (
    <div className={`cselect${open ? " cselect--open" : ""}${hasError ? " cselect--error" : ""}${dropUp ? " cselect--dropup" : ""}`} ref={ref}>
      <input type="hidden" id={id} name={id} value={selected} readOnly />
      <button type="button" className="cselect__trigger" onClick={handleOpen} aria-haspopup="listbox" aria-expanded={open}>
        <span className={selected ? "cselect__value" : "cselect__placeholder"}>{selected || placeholder}</span>
        <svg className="cselect__arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
      </button>
      {open && (
        <ul className="cselect__list" role="listbox">
          {options.map((opt) => (
            <li key={opt} role="option" aria-selected={selected === opt}
              className={`cselect__option${selected === opt ? " cselect__option--active" : ""}`}
              onMouseDown={(e) => { e.preventDefault(); pick(opt); }}>
              {opt}
              {selected === opt && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// ─── Static image data (not translated) ──────────────────────────────────────
const ROOM_IMGS = [
  [
    "/images/1-kisilik-1.jpeg",
    "/images/1-kisilik-2.jpeg",
    "/images/1-kisilik-3.jpeg",
    "/images/1-kisilik-4.jpeg",
    "/images/1-kisilik-5.jpeg",
  ],
  {
    normal: [
      "/images/2-kisilik-normal-1.jpeg",
      "/images/2-kisilik-normal-2.jpeg",
      "/images/2-kisilik-normal-3.jpeg",
      "/images/2-kisilik-normal-4.jpeg",
    ],
    deluxe: [
      "/images/2-kisilik-deluxe-1.jpeg",
      "/images/2-kisilik-deluxe-2.jpeg",
      "/images/2-kisilik-deluxe-3.jpeg",
      "/images/2-kisilik-deluxe-4.jpeg",
      "/images/2-kisilik-deluxe-5.jpeg",
    ],
  },
  [
    "/images/3-kisilik-1.jpeg",
    "/images/3-kisilik-2.jpeg",
    "/images/3-kisilik-3.jpeg",
    "/images/3-kisilik-4.jpeg",
    "/images/3-kisilik-5.jpeg",
    "/images/3-kisilik-6.jpeg",
  ],
];

const FAC_IMGS = [
  "/images/etut.jpg",
  "/images/dinlenme.jpeg",
  "/images/yemekhane.jpg",
  "/images/mutfak.png",
];

const GALLERY_IMGS = [
  // Dış & genel
  { src: "/images/dis-foto.jpeg",           alt: "Sardunya Kız Öğrenci Yurdu" },
  { src: "/images/manzara.jpg",             alt: "Manzara" },
  // Ek galeri fotoğrafları
  { src: "/images/galeri-1.jpeg",           alt: "Sardunya Kız Öğrenci Yurdu" },
  { src: "/images/galeri-2.jpeg",           alt: "Sardunya Kız Öğrenci Yurdu" },
  { src: "/images/galeri-3.jpeg",           alt: "Sardunya Kız Öğrenci Yurdu" },
  { src: "/images/galeri-4.jpeg",           alt: "Sardunya Kız Öğrenci Yurdu" },
  { src: "/images/galeri-5.jpeg",           alt: "Sardunya Kız Öğrenci Yurdu" },
  { src: "/images/galeri-6.jpeg",           alt: "Sardunya Kız Öğrenci Yurdu" },
  { src: "/images/galeri-7.jpeg",           alt: "Sardunya Kız Öğrenci Yurdu" },
  // Tek kişilik oda
  { src: "/images/1-kisilik-1.jpeg",        alt: "Tek Kişilik Oda" },
  { src: "/images/1-kisilik-2.jpeg",        alt: "Tek Kişilik Oda" },
  { src: "/images/1-kisilik-3.jpeg",        alt: "Tek Kişilik Oda" },
  { src: "/images/1-kisilik-4.jpeg",        alt: "Tek Kişilik Oda" },
  { src: "/images/1-kisilik-5.jpeg",        alt: "Tek Kişilik Oda" },
  // Çift kişilik normal
  { src: "/images/2-kisilik-normal-1.jpeg", alt: "Çift Kişilik Oda" },
  { src: "/images/2-kisilik-normal-2.jpeg", alt: "Çift Kişilik Oda" },
  { src: "/images/2-kisilik-normal-3.jpeg", alt: "Çift Kişilik Oda" },
  { src: "/images/2-kisilik-normal-4.jpeg", alt: "Çift Kişilik Oda" },
  // Çift kişilik deluxe
  { src: "/images/2-kisilik-deluxe-1.jpeg", alt: "Çift Kişilik Oda Deluxe" },
  { src: "/images/2-kisilik-deluxe-2.jpeg", alt: "Çift Kişilik Oda Deluxe" },
  { src: "/images/2-kisilik-deluxe-3.jpeg", alt: "Çift Kişilik Oda Deluxe" },
  { src: "/images/2-kisilik-deluxe-4.jpeg", alt: "Çift Kişilik Oda Deluxe" },
  { src: "/images/2-kisilik-deluxe-5.jpeg", alt: "Çift Kişilik Oda Deluxe" },
  // Üç kişilik oda
  { src: "/images/3-kisilik-1.jpeg",        alt: "Üç Kişilik Oda" },
  { src: "/images/3-kisilik-2.jpeg",        alt: "Üç Kişilik Oda" },
  { src: "/images/3-kisilik-3.jpeg",        alt: "Üç Kişilik Oda" },
  { src: "/images/3-kisilik-4.jpeg",        alt: "Üç Kişilik Oda" },
  { src: "/images/3-kisilik-5.jpeg",        alt: "Üç Kişilik Oda" },
  { src: "/images/3-kisilik-6.jpeg",        alt: "Üç Kişilik Oda" },
  // Tesisler
  { src: "/images/etut.jpg",                alt: "Etüt Salonu" },
  { src: "/images/dinlenme.jpeg",           alt: "Dinlenme Alanı" },
  { src: "/images/yemekhane.jpg",           alt: "Yemekhane" },
  { src: "/images/mutfak.png",              alt: "Mutfak" },
];

// ─── SVG Icons ────────────────────────────────────────────────────────────────
function CertIcon()    { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>; }
function FireIcon()    { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 3z"/></svg>; }
function HygIcon()     { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>; }
function MedIcon()     { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round"><path d="M3 21V8a2 2 0 012-2h14a2 2 0 012 2v13"/><path d="M3 21h18"/><path d="M9 21v-5h6v5"/><path d="M12 9v4M10 11h4"/></svg>; }
function IsoIcon()     { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>; }
function FoodIcon()    { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round"><path d="M18 8h1a4 4 0 010 8h-1"/><path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"/><path d="M6 1v3M10 1v3M14 1v3"/></svg>; }
function SecIcon()     { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>; }
function StudyIcon()   { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></svg>; }
function LaundryIcon() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="13" r="4"/><circle cx="16.5" cy="6.5" r="0.5" fill="currentColor"/></svg>; }
function GymIcon()     { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round"><path d="M6 4v16M18 4v16M2 9h4M18 9h4M2 15h4M18 15h4M6 9h12M6 15h12"/></svg>; }
function SocIcon()     { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>; }
function LibIcon()     { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>; }
function CafeIcon()    { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round"><path d="M18 8h1a4 4 0 010 8h-1"/><path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"/></svg>; }
function MedRIcon()    { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>; }
function WifiIcon()    { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.55a11 11 0 0114.08 0"/><path d="M1.42 9a16 16 0 0121.16 0"/><path d="M8.53 16.11a6 6 0 016.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>; }
function BusIcon()     { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="12" rx="2"/><path d="M2 9h20"/><path d="M7 4v5M17 4v5"/><circle cx="7" cy="19" r="2"/><circle cx="17" cy="19" r="2"/><path d="M5 16v3M19 16v3"/></svg>; }
function CleanIcon()   { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round"><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/><path d="M8 12l2 2 4-4"/></svg>; }
function PhoneIcon()   { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.5 1.18 2 2 0 012.18 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91A16 16 0 0015.91 17.7l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>; }
function MailIcon()    { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>; }
function MapIcon()     { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>; }
function ClockIcon()   { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>; }
function CheckIcon()   { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>; }
function DocIcon()     { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>; }
function IgIcon()      { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>; }
function FbIcon()      { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>; }
function WaIcon()      { return <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>; }
function FlowerCallIcon() {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="20" cy="7"  rx="4.2" ry="7.5" fill="rgba(255,255,255,0.88)" transform="rotate(0   20 20)" />
      <ellipse cx="20" cy="7"  rx="4.2" ry="7.5" fill="rgba(255,255,255,0.78)" transform="rotate(60  20 20)" />
      <ellipse cx="20" cy="7"  rx="4.2" ry="7.5" fill="rgba(255,255,255,0.88)" transform="rotate(120 20 20)" />
      <ellipse cx="20" cy="7"  rx="4.2" ry="7.5" fill="rgba(255,255,255,0.78)" transform="rotate(180 20 20)" />
      <ellipse cx="20" cy="7"  rx="4.2" ry="7.5" fill="rgba(255,255,255,0.88)" transform="rotate(240 20 20)" />
      <ellipse cx="20" cy="7"  rx="4.2" ry="7.5" fill="rgba(255,255,255,0.78)" transform="rotate(300 20 20)" />
      <circle cx="20" cy="20" r="9" fill="rgba(255,255,255,0.22)" />
      <path stroke="white" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"
        d="M16 17.2c.4.9 1 1.8 1.8 2.6.8.8 1.7 1.4 2.6 1.8l.8-.8c.2-.2.5-.3.7-.2.6.2 1.3.3 2 .3.3 0 .6.3.6.6v1.9c0 .3-.3.6-.6.6C18 24 14 20 14 15.1c0-.3.3-.6.6-.6h1.9c.3 0 .6.3.6.6 0 .7.1 1.4.3 2 .1.3 0 .6-.2.8l-.2.3z" />
    </svg>
  );
}
function RegIcon()     { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/><line x1="12" y1="11" x2="12" y2="17"/><line x1="9" y1="14" x2="15" y2="14"/></svg>; }
function ParkIcon()    { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round"><path d="M12 22V12"/><path d="M5 12h14"/><path d="M12 12C12 7 7 4 7 4s5 1 5 8z"/><path d="M12 12C12 7 17 4 17 4s-5 1-5 8z"/><path d="M8 22h8"/></svg>; }
function ShopIcon()    { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>; }
function UniIcon()     { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>; }
function DropIcon()    { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z"/></svg>; }
function ThermoIcon()  { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round"><path d="M14 14.76V3.5a2.5 2.5 0 00-5 0v11.26a4.5 4.5 0 105 0z"/></svg>; }
function BuildIcon()   { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>; }
function SunIcon()     { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>; }
function MonitorIcon() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>; }
function TvIcon()      { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="15" rx="2"/><polyline points="17 2 12 7 7 2"/></svg>; }
function UtensilsIcon(){ return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round"><path d="M4 9h16l-2 10a2 2 0 01-2 2H8a2 2 0 01-2-2L4 9z"/><path d="M2 9h20"/><path d="M8 9V6a4 4 0 018 0v3"/><line x1="12" y1="14" x2="12" y2="17"/></svg>; }
function CameraIcon()  { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round"><path d="M23 7l-7 5 7 5V7z"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>; }

// ─── Counter hook ────────────────────────────────────────────────────────────
const COUNTER_DURATION = 2000;

function useCountUp(target) {
  const [count, setCount] = useState(0);
  const raf = useRef(null);
  useEffect(() => {
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / COUNTER_DURATION, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.floor(eased * target));
      if (p < 1) raf.current = requestAnimationFrame(tick);
      else setCount(target);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [target]);
  return count;
}

function StatVal({ val }) {
  const isAnimatable = /^\d+[+%]?$/.test(val);
  const num = isAnimatable ? parseInt(val, 10) : 0;
  const suffix = isAnimatable ? val.replace(String(num), "") : "";
  const count = useCountUp(isAnimatable ? num : 0);
  if (!isAnimatable) return <>{val}</>;
  return <>{count}{suffix}</>;
}

// ─── Nearby Places Icon Map ───────────────────────────────────────────────────
const NEARBY_ICON_MAP = {
  university: <UniIcon />,
  park:       <ParkIcon />,
  hospital:   <MedIcon />,
  shopping:   <ShopIcon />,
  bus:        <BusIcon />,
  landmark:   <MapIcon />,
};

// ─── Icon Map ─────────────────────────────────────────────────────────────────
const ICON_MAP = {
  cert: <CertIcon />, fire: <FireIcon />, hyg: <HygIcon />,   med: <MedIcon />,
  iso:  <IsoIcon />,  food: <FoodIcon />, sec: <SecIcon />,   study: <StudyIcon />,
  laundry: <LaundryIcon />, gym: <GymIcon />, soc: <SocIcon />, lib: <LibIcon />,
  cafe: <CafeIcon />, medr: <MedRIcon />, wifi: <WifiIcon />, bus: <BusIcon />,
  clean: <CleanIcon />,
  drop: <DropIcon />, thermo: <ThermoIcon />, build: <BuildIcon />, sun: <SunIcon />,
  monitor: <MonitorIcon />, tv: <TvIcon />, utensils: <UtensilsIcon />, camera: <CameraIcon />,
};

// ─── Component ────────────────────────────────────────────────────────────────
export default function Home({ locales }) {
  const [lang,     setLang]     = useState("tr");
  const t = locales[lang];

  const [menuOpen,    setMenuOpen]    = useState(false);
  const [popupOpen,   setPopupOpen]   = useState(false);
  const [roomPopup,   setRoomPopup]   = useState(null);
  const [roomVariant, setRoomVariant] = useState("deluxe");
  const [langOpen,    setLangOpen]    = useState(false);
  const langRef = useRef(null);

  useEffect(() => {
    const close = (e) => { if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false); };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);
  const [lightbox,    setLightbox]    = useState(null);
  const [formErrors,  setFormErrors]  = useState({});
  const [isMounted,   setIsMounted]   = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [animKey, setAnimKey] = useState(0);
  const statsRef = useRef(null);
  const scrollLockY = useRef(0);
  const [closingPopup, setClosingPopup] = useState(false);
  const [closingRoom,  setClosingRoom]  = useState(false);

  const openPopup = () => { setFormErrors({}); setPopupOpen(true); };

  const closePopup = () => { setPopupOpen(false); };

  const closeRoom = () => { setRoomPopup(null); };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const f = e.target;
    const required = ["p-name", "p-phone", "p-email", "p-dept", "p-grade", "p-room"];
    const errors = {};
    required.forEach((id) => {
      if (!f[id]?.value?.trim()) errors[id] = true;
    });
    if (Object.keys(errors).length) { setFormErrors(errors); return; }
    setFormErrors({});
    setPopupOpen(false);
  };

  useEffect(() => { setIsMounted(true); }, []);

  // Lock body scroll when any popup is open
  useEffect(() => {
    const isOpen = popupOpen || !!roomPopup;
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [popupOpen, roomPopup]);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimKey((k) => k + 1); },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const atBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 300;
      setShowScrollTop(atBottom);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const locked = menuOpen || popupOpen || roomPopup !== null || lightbox !== null;
    document.body.style.overflow = locked ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen, popupOpen, roomPopup, lightbox]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <Head>
        <title>{t.meta.title}</title>
        <meta name="description" content={t.meta.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* ── STICKY SITE HEADER WRAPPER ── */}
      <div className="site-header">

        {/* ── TOP BAR ── */}
        <div className="topbar">
          <div className="container">
            <div className="topbar__inner">
              {/* Mobile scrolling ticker */}
              <div className="topbar__ticker-wrap" aria-hidden="true">
                <div className="topbar__ticker-track">
                  {[0, 1].map((i) => (
                    <span key={i} className="topbar__ticker-set">
                      <span className="topbar__item">
                        <PhoneIcon />
                        {t.contactSection.phones.map((phone, idx) => (
                          <span key={phone}>{idx > 0 && " / "}<a href={`tel:${phone.replace(/\s/g, "")}`} className="topbar__phone-link">{phone}</a></span>
                        ))}
                      </span>
                      <span className="topbar__ticker-dot">◆</span>
                      <a href={`mailto:${t.contactSection.email}`} className="topbar__item">
                        <MailIcon /> {t.contactSection.email}
                      </a>
                      <span className="topbar__ticker-dot">◆</span>
                      <a href="https://www.instagram.com/sardunyakizyurdu" target="_blank" rel="noopener noreferrer" className="topbar__item topbar__ticker-social">
                        <IgIcon />
                      </a>
                      <a href="https://www.facebook.com/profile.php?id=100070014077020" target="_blank" rel="noopener noreferrer" className="topbar__item topbar__ticker-social">
                        <FbIcon />
                      </a>
                      <span className="topbar__ticker-dot">◆</span>
                    </span>
                  ))}
                </div>
              </div>
              <div className="topbar__contact">
                <span className="topbar__item"><PhoneIcon /> {t.contactSection.phones.map((phone, i) => (
                  <span key={phone}>{i > 0 && " / "}<a href={`tel:${phone.replace(/\s/g, "")}`} className="topbar__phone-link">{phone}</a></span>
                ))}</span>
                <a href={`mailto:${t.contactSection.email}`} className="topbar__item"><MailIcon /> {t.contactSection.email}</a>
                <div className="topbar__social">
                  <a href="https://www.instagram.com/sardunyakizyurdu" target="_blank" rel="noopener noreferrer" className="topbar__social-link" aria-label="Instagram"><IgIcon /></a>
                  <a href="https://www.facebook.com/profile.php?id=100070014077020" target="_blank" rel="noopener noreferrer" className="topbar__social-link" aria-label="Facebook"><FbIcon /></a>
                </div>
              </div>
              <div className="topbar__right">
                <div className={`lang-switcher${langOpen ? " lang-switcher--open" : ""}`} ref={langRef}>
                  <button className="lang-switcher__trigger" onClick={() => setLangOpen(o => !o)} aria-label="Dil Seç">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
                      <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
                    </svg>
                    <span className="lang-switcher__current">{lang.toUpperCase()}</span>
                    <svg className="lang-switcher__arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                  </button>
                  {langOpen && (
                    <div className="lang-switcher__dropdown">
                      {[
                        { code: "tr", label: "Türkçe",  flag: "TR" },
                        { code: "en", label: "English", flag: "EN" },
                        { code: "de", label: "Deutsch", flag: "DE" },
                        { code: "ru", label: "Русский", flag: "RU" },
                        { code: "es", label: "Español", flag: "ES" },
                      ].map(({ code, label, flag }) => (
                        <button
                          key={code}
                          className={`lang-switcher__option${lang === code ? " lang-switcher__option--active" : ""}`}
                          onClick={() => { setLang(code); setLangOpen(false); }}
                        >
                          <span className={`lang-switcher__flag${/^[A-Z]+$/.test(flag) ? " lang-switcher__flag--text" : ""}`}>{flag}</span>
                          <span>{label}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── HEADER ── */}
        <header className="header">
          <div className="container">
            <div className="header__inner">
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                className="header__logo"
              >
                <img src="/images/logo_white.png" alt="Sardunya Kız Öğrenci Yurdu" />
              </a>
              <nav className="header__nav" aria-label="Ana Navigasyon">
                {t.nav.map((n) => (
                  <a key={n.href} href={n.href} className="header__link">{n.label}</a>
                ))}
              </nav>
              <button
                className={`header__burger${menuOpen ? " open" : ""}`}
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Menüyü aç/kapat"
                aria-expanded={menuOpen}
              >
                <span /><span /><span />
              </button>
            </div>
          </div>

          {/* Mobile drawer */}
          <nav className={`header__drawer${menuOpen ? " open" : ""}`} aria-label="Mobil Navigasyon">
            {t.nav.map((n) => (
              <a key={n.href} href={n.href} onClick={closeMenu}>{n.label}</a>
            ))}
            <button className="btn btn--primary" onClick={() => { closeMenu(); openPopup(); }}>
              {t.popup.ctaRoom}
            </button>
          </nav>
        </header>
      </div>{/* end .site-header */}

      {/* ── HERO ── */}
      <section className="hero">
        <img src="/images/sardunya_hero.svg" className="hero__bg-svg hero__bg-svg--desktop" aria-hidden alt="" />
        <img src="/images/sardunya_hero_mobile.svg" className="hero__bg-svg hero__bg-svg--mobile" aria-hidden alt="" />
        <div className="hero__overlay" aria-hidden />
        <div className="hero__content">
          <h1 className="hero__title">
            {t.hero.title}<br /><em>{t.hero.subtitle}</em>
          </h1>
          <p className="hero__sub">{t.hero.sub}</p>
          <div className="hero__actions">
            <button className="btn btn--primary" onClick={() => openPopup()}>
              {t.hero.cta1}
            </button>
            <a href="#iletisim" className="btn btn--outline-white">{t.hero.cta2}</a>
          </div>
          <div className="hero__pension-note">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
            {t.hero.pensionNote}
          </div>
        </div>
        <div className="hero__stats" ref={statsRef}>
          <div className="hero__stats-inner">
            {t.stats.map((s) => (
              <div key={s.lbl} className="hero__stat">
                <div className="hero__stat-val"><StatVal key={animKey} val={s.val} /></div>
                <div className="hero__stat-lbl">{s.lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CERTIFICATIONS ── */}
      <section className="certs" id="sertifikalar">
        <div className="container">
          <div className="certs__head">
            <span className="section-label">{t.certsSection.label}</span>
            <h2 className="section-title">{t.certsSection.title}</h2>
            <p className="section-sub">{t.certsSection.sub}</p>
          </div>
          <div className="certs__grid">
            {t.certItems.map((c) => (
              <div key={c.label} className="certs__card">
                <div className="certs__icon">{ICON_MAP[c.icon]}</div>
                <div className="certs__label">{c.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ROOMS ── */}
      <section className="rooms" id="odalar">
        <div className="container">
          <div className="rooms__head">
            <span className="section-label">{t.roomsSection.label}</span>
            <h2 className="section-title">{t.roomsSection.title}</h2>
          </div>
          <div className="rooms__grid">
            {t.roomItems.map((r, i) => (
              <div
                key={i}
                className="room-card"
                onClick={() => {
                  if (i === 1) { setRoomVariant("deluxe"); setRoomPopup({ ...r, hasVariants: true, variantImgs: ROOM_IMGS[1] }); }
                  else setRoomPopup({ ...r, imgs: ROOM_IMGS[i] });
                }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key !== "Enter") return;
                  if (i === 1) { setRoomVariant("deluxe"); setRoomPopup({ ...r, hasVariants: true, variantImgs: ROOM_IMGS[1] }); }
                  else setRoomPopup({ ...r, imgs: ROOM_IMGS[i] });
                }}
              >
                <div className="room-card__image">
                  <img src={Array.isArray(ROOM_IMGS[i]) ? ROOM_IMGS[i][0] : ROOM_IMGS[i].deluxe[0]} alt={r.name} />
                </div>
                <div className="room-card__overlay">
                  <h3 className="room-card__name">{r.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="services" id="hizmetler">
        <div className="container">
          <div className="services__head">
            <span className="section-label">{t.servicesSection.label}</span>
            <h2 className="section-title">{t.servicesSection.title}</h2>
          </div>
          <div className="services__grid">
            {t.serviceItems.map((s) => (
              <div key={s.title} className="svc-card">
                <div className="svc-card__icon">{ICON_MAP[s.icon]}</div>
                <h3 className="svc-card__title">{s.title}</h3>
                <p className="svc-card__desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FACILITIES ── */}
      <section className="facilities" id="tesisler">
        <div className="container">
          <div className="facilities__head">
            <span className="section-label">{t.facilitiesSection.label}</span>
            <h2 className="section-title">{t.facilitiesSection.title}</h2>
            <p className="section-sub">{t.facilitiesSection.sub}</p>
          </div>
          <div className="facilities__grid">
            {t.facilityItems.map((f, i) => (
              <div key={f.title} className="fac-card">
                <div className="fac-card__image" onClick={() => setLightbox({ imgs: FAC_IMGS, idx: i })} style={{ cursor: "zoom-in" }}>
                  <img src={FAC_IMGS[i]} alt={f.title} loading="lazy" />
                </div>
                <div className="fac-card__body">
                  <h3 className="fac-card__title">{f.title}</h3>
                  <p className="fac-card__desc">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REGISTRATION DOCS ── */}
      <section className="regdocs" id="kayit">
        <div className="container">
          <div className="regdocs__head">
            <span className="section-label">{t.regDocsSection.label}</span>
            <h2 className="section-title">{t.regDocsSection.title}</h2>
            <p className="section-sub">{t.regDocsSection.sub}</p>
          </div>
          <div className="regdocs__list">
            {t.regDocsSection.items.map((doc) => (
              <div key={doc} className="regdocs__item">
                <div className="regdocs__item-icon"><DocIcon /></div>
                <span className="regdocs__item-text">{doc}</span>
              </div>
            ))}
          </div>
          <p className="regdocs__note">{t.regDocsSection.note}</p>
        </div>
      </section>

      {/* ── CONTACT / MAP ── */}
      <section className="transport" id="iletisim">
        <div className="container">
          <div className="transport__head">
            <span className="section-label">{t.contactSection.label}</span>
            <h2 className="section-title">{t.contactSection.title}</h2>
          </div>
          <div className="transport__layout">
            <div className="transport__map">
              <iframe
                title="Sardunya Kız Öğrenci Yurdu Konum"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3049.5889984062815!2d26.408708476392096!3d40.151437971742766!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14b1a9d3b79b3a0f%3A0x5f84acd709205ff9!2zU2FyZHVueWEgS8SxeiDDlsSfcmVuY2kgWXVyZHU!5e0!3m2!1str!2str!4v1775164697787!5m2!1str!2str"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="contact-block">
              <h3 className="contact-block__title">{t.contactSection.contactTitle}</h3>
              <div className="contact-block__items">
                <div className="contact-block__item"><MapIcon /> {t.contactSection.address}</div>
                <div className="contact-block__item">
                  <PhoneIcon />
                  <span className="contact-block__phone-list">
                    {t.contactSection.phones.map((phone, i) => (
                      <span key={phone} className="contact-block__phone-entry">
                        {i > 0 && <span className="contact-block__phone-sep"> / </span>}
                        <a href={`tel:${phone.replace(/\s/g, "")}`} className="contact-block__phone-link">{phone}</a>
                      </span>
                    ))}
                  </span>
                </div>
                <a href={`mailto:${t.contactSection.email}`} className="contact-block__item contact-block__item--link"><MailIcon /> {t.contactSection.email}</a>
              </div>
              <button className="btn btn--primary contact-block__cta" onClick={() => openPopup()}>
                {t.popup.title}
              </button>
            </div>
          </div>
          <div className="nearby-places">
            <h4 className="nearby-places__title">{t.contactSection.nearbyPlaces.title}</h4>
            <div className="nearby-places__grid">
              {t.contactSection.nearbyPlaces.items.map((place) => (
                <div key={place.name} className={`nearby-places__card nearby-places__card--${place.type}`}>
                  <span className="nearby-places__icon">{NEARBY_ICON_MAP[place.type]}</span>
                  <div className="nearby-places__info">
                    <span className="nearby-places__name">{place.name}</span>
                    <span className="nearby-places__distance">{place.distance}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section className="about" id="hakkimizda">
        <div className="container">
          <div className="about__layout">
            <div className="about__image">
              <img src="/images/dis-foto.jpeg" alt="Sardunya Kız Öğrenci Yurdu" loading="lazy" />
            </div>
            <div>
              <div className="about__head">
                <span className="section-label">{t.aboutSection.label}</span>
                <h2 className="section-title">{t.aboutSection.title}</h2>
              </div>
              <p className="about__text">{t.aboutSection.text}</p>
              <div className="about__points">
                {t.aboutSection.points.map((p) => (
                  <div key={p} className="about__point">
                    <CheckIcon /> {p}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section className="gallery" id="galeri">
        <div className="container">
          <div className="gallery__head">
            <span className="section-label">{t.gallerySection.label}</span>
            <h2 className="section-title">{t.gallerySection.title}</h2>
          </div>
        </div>
        <div className="container">
          <div className="gallery__swiper-wrap">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              slidesPerView={1}
              spaceBetween={20}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 3500, disableOnInteraction: false }}
              loop={isMounted}
              breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
            >
              {GALLERY_IMGS.map((g, i) => (
                <SwiperSlide key={i}>
                  <div
                    className="gal-item"
                    onClick={(e) => { if (e.target.closest(".swiper-button-prev, .swiper-button-next")) return; setLightbox({ imgs: GALLERY_IMGS.map((x) => x.src), idx: i }); }}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === "Enter" && setLightbox({ imgs: GALLERY_IMGS.map((x) => x.src), idx: i })}
                  >
                    <img src={g.src} alt={g.alt} loading="lazy" />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="container">
          <div className="footer__inner">
            <img src="/images/logo_white.png" alt="Sardunya" className="footer__logo" />
            <div className="footer__info">
              <div className="footer__contacts">
                <div className="footer__contact-item"><MapIcon /> {t.contactSection.addressShort}</div>
                <div className="footer__contact-item"><PhoneIcon /> {t.contactSection.phones.map((phone, i) => (
                  <span key={phone}>{i > 0 && " / "}<a href={`tel:${phone.replace(/\s/g, "")}`} className="footer__phone-link">{phone}</a></span>
                ))}</div>
                <a href={`mailto:${t.contactSection.email}`} className="footer__contact-item footer__contact-item--link"><MailIcon /> {t.contactSection.email}</a>
              </div>
              <div className="footer__social">
                <a href="https://www.instagram.com/sardunyakizyurdu" target="_blank" rel="noopener noreferrer" className="footer__social-link" aria-label="Instagram"><IgIcon /></a>
                <a href="https://www.facebook.com/profile.php?id=100070014077020" target="_blank" rel="noopener noreferrer" className="footer__social-link" aria-label="Facebook"><FbIcon /></a>
              </div>
            </div>
          </div>
          <div className="footer__bottom">
            <p className="footer__copy">{t.footer.copy}</p>
          </div>
        </div>
      </footer>

      {/* ── FLOATING ACTION BUTTONS ── */}
      <div className="fab-stack">
        <a
          href="https://wa.me/905300386648"
          target="_blank"
          rel="noopener noreferrer"
          className="fab fab--wa"
          aria-label="WhatsApp"
        >
          <WaIcon />
        </a>
        <a
          href="tel:+905300386648"
          className="fab fab--call"
          aria-label="Bizi Ara: 0530 038 6648"
        >
          <PhoneIcon />
        </a>
        <button
          className="fab fab--reg"
          onClick={() => openPopup()}
          aria-label={t.popup.title}
        >
          <RegIcon />
          <span className="fab__label">{t.hero.cta1}</span>
        </button>
      </div>

      <button
        className={`scroll-top${showScrollTop ? " scroll-top--visible" : ""}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Yukarı çık"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
          <polyline points="18 15 12 9 6 15" />
        </svg>
      </button>

      {/* ── LIGHTBOX ── */}
      {lightbox && (
        <div className="lightbox-overlay" onClick={() => setLightbox(null)}>
          <button className="lightbox__close" onClick={() => setLightbox(null)} aria-label="Kapat">✕</button>
          <button
            className="lightbox__nav lightbox__nav--prev"
            onClick={(e) => { e.stopPropagation(); setLightbox((l) => ({ ...l, idx: (l.idx - 1 + l.imgs.length) % l.imgs.length })); }}
            aria-label="Önceki"
          >‹</button>
          <div className="lightbox__img-wrap" onClick={(e) => e.stopPropagation()}>
            <img src={lightbox.imgs[lightbox.idx]} alt="" />
          </div>
          <button
            className="lightbox__nav lightbox__nav--next"
            onClick={(e) => { e.stopPropagation(); setLightbox((l) => ({ ...l, idx: (l.idx + 1) % l.imgs.length })); }}
            aria-label="Sonraki"
          >›</button>
          <div className="lightbox__counter">{lightbox.idx + 1} / {lightbox.imgs.length}</div>
        </div>
      )}

      {/* ── ROOM POPUP ── */}
      {roomPopup && (
        <div className={`popup-overlay${closingRoom ? " popup-overlay--closing" : ""}`} onClick={closeRoom}>
          <div className={`popup popup--room${closingRoom ? " popup--closing" : ""}`} onClick={(e) => e.stopPropagation()}>
            <button className="popup__close popup__close--light" onClick={closeRoom} aria-label="Kapat">✕</button>
            <div className="room-popup__swiper">
              <Swiper key={roomPopup.hasVariants ? roomVariant : "single"} modules={[Navigation, Pagination]} navigation pagination={{ clickable: true }} loop={(roomPopup.hasVariants ? roomPopup.variantImgs[roomVariant] : roomPopup.imgs).length > 1}>
                {(roomPopup.hasVariants ? roomPopup.variantImgs[roomVariant] : roomPopup.imgs).map((img, i) => (
                  <SwiperSlide key={i}>
                    <div className="room-popup__slide" onClick={() => setLightbox({ imgs: roomPopup.hasVariants ? roomPopup.variantImgs[roomVariant] : roomPopup.imgs, idx: i })}>
                      <img src={img} alt={`${roomPopup.name} ${i + 1}`} />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className="room-popup__content">
              {roomPopup.hasVariants && (
                <div className="room-popup__variants">
                  <button className={`room-popup__variant-btn${roomVariant === "normal" ? " room-popup__variant-btn--active" : ""}`} onClick={() => setRoomVariant("normal")}>Normal</button>
                  <button className={`room-popup__variant-btn${roomVariant === "deluxe" ? " room-popup__variant-btn--active" : ""}`} onClick={() => setRoomVariant("deluxe")}>Deluxe</button>
                </div>
              )}
              <h2 className="room-popup__name">{roomPopup.name}</h2>
              <div className="room-popup__tags">
                {roomPopup.tags.map((tag) => <span key={tag} className="room-popup__tag">{tag}</span>)}
              </div>
              <button className="btn btn--primary room-popup__cta" onClick={() => { setRoomPopup(null); openPopup(); }}>
                {t.popup.ctaRoom}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── PRE-REGISTRATION POPUP ── */}
      {popupOpen && (
        <div className={`popup-overlay${closingPopup ? " popup-overlay--closing" : ""}`} onClick={closePopup}>
          <div className={`popup popup--form${closingPopup ? " popup--closing" : ""}`} onClick={(e) => e.stopPropagation()}>
            <div className="popup__header">
              <button className="popup__close" onClick={closePopup} aria-label="Kapat">✕</button>
              <h2 className="popup__title">{t.popup.title}</h2>
              <p className="popup__sub">{t.popup.sub}</p>
            </div>
            <form onSubmit={handleFormSubmit} noValidate style={{ display: "contents" }}>
              <div className="popup__body">
                <div className="contact__form-grid">
                  <div className="fg">
                    <label htmlFor="p-name">{t.popup.nameLbl} <span aria-hidden>*</span></label>
                    <input id="p-name" type="text" placeholder={t.popup.namePh} className={formErrors["p-name"] ? "input--error" : ""} onChange={() => setFormErrors((p) => ({ ...p, "p-name": false }))} />
                  </div>
                  <div className="fg">
                    <label htmlFor="p-phone">{t.popup.phoneLbl} <span aria-hidden>*</span></label>
                    <input id="p-phone" type="tel" placeholder={t.popup.phonePh} className={formErrors["p-phone"] ? "input--error" : ""} onChange={() => setFormErrors((p) => ({ ...p, "p-phone": false }))} />
                  </div>
                  <div className="fg contact__form-full">
                    <label htmlFor="p-email">{t.popup.emailLbl} <span aria-hidden>*</span></label>
                    <input id="p-email" type="email" placeholder={t.popup.emailPh} className={formErrors["p-email"] ? "input--error" : ""} onChange={() => setFormErrors((p) => ({ ...p, "p-email": false }))} />
                  </div>
                  <div className="fg">
                    <label htmlFor="p-dept">{t.popup.deptLbl} <span aria-hidden>*</span></label>
                    <input id="p-dept" type="text" placeholder={t.popup.deptPh} className={formErrors["p-dept"] ? "input--error" : ""} onChange={() => setFormErrors((p) => ({ ...p, "p-dept": false }))} />
                  </div>
                  <div className="fg">
                    <label htmlFor="p-grade">{t.popup.gradeLbl} <span aria-hidden>*</span></label>
                    <input id="p-grade" type="text" placeholder={t.popup.gradePh} className={formErrors["p-grade"] ? "input--error" : ""} onChange={() => setFormErrors((p) => ({ ...p, "p-grade": false }))} />
                  </div>
                  <div className="fg contact__form-full">
                    <label>{t.popup.roomLbl} <span aria-hidden>*</span></label>
                    <CustomSelect
                      id="p-room"
                      placeholder={t.popup.roomPh}
                      options={t.popup.roomOptions}
                      hasError={!!formErrors["p-room"]}
                      onClearError={() => setFormErrors((p) => ({ ...p, "p-room": false }))}
                    />
                  </div>
                  <div className="fg contact__form-full">
                    <label htmlFor="p-note">{t.popup.noteLbl}</label>
                    <textarea id="p-note" placeholder={t.popup.notePh} />
                  </div>
                </div>
              </div>
              <div className="popup__footer">
                <button type="submit" className="btn btn--primary contact__submit">{t.popup.cta}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export async function getStaticProps() {
  const fs   = require("fs");
  const path = require("path");
  const load = (locale) =>
    JSON.parse(fs.readFileSync(path.join(process.cwd(), `public/locales/${locale}.json`), "utf-8"));
  return {
    props: {
      locales: { tr: load("tr"), en: load("en"), de: load("de"), ru: load("ru"), es: load("es") },
    },
  };
}
