'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image'; // Added Image import
import { Property } from '@/types';
import { BASE_URL } from '@/lib/api';

/* ─── helpers ──────────────────────────────────────────────────────────── */
function getImageUrl(p: Property): string {
  if (!p.main_image)
    return 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=80';
  return p.main_image.startsWith('http') ? p.main_image : BASE_URL + p.main_image;
}

function formatPrice(price: string | number): string {
  const n = typeof price === 'string' ? parseFloat(price) : price;
  if (n >= 1_000_000) return `FROM ${(n / 1_000_000).toFixed(0)} MILLION`;
  if (n >= 1_000)     return `KES ${(n / 1_000).toFixed(0)}K`;
  return `KES ${n.toLocaleString()}`;
}

function getPropType(p: Property): string {
  const t = (p as any).property_type || (p as any).type || '';
  return t ? t.toUpperCase().replace(/_/g, ' ') : 'LUXURY PROPERTY';
}

/* ─── component ────────────────────────────────────────────────────────── */
export default function Hero() {
  const router = useRouter();

  // --- Slider State (Original) ---
  const [properties, setProperties] = useState<Property[]>([]);
  const [current, setCurrent]       = useState(0);
  const [prev, setPrev]             = useState<number | null>(null);
  const [sliding, setSliding]       = useState(false);
  const [dir, setDir]               = useState<'left' | 'right'>('right');
  const [imgReady, setImgReady]     = useState<Record<number, boolean>>({});
  const timerRef                    = useRef<ReturnType<typeof setTimeout> | null>(null);

  // --- Search State (Original) ---
  const [location, setLocation] = useState('');
  const [propType, setPropType] = useState('');
  const [budget, setBudget]     = useState('');

  // --- NEW SECTIONS STATE ---
  const [newFeature, setNewFeature] = useState<Property | null>(null);
  const [privateListing, setPrivateListing] = useState<Property | null>(null);
  const [featuredListings, setFeaturedListings] = useState<Property[]>([]);
  const [constructionListings, setConstructionListings] = useState<Property[]>([]);
  
  // Password Modal State
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState('');

  /* --- Fetch Data --- */
  useEffect(() => {
    // Original Fetch for Slider
    fetch(`${BASE_URL}/api/properties/?limit=20`)
      .then(r => r.json())
      .then(data => {
        const list: Property[] = Array.isArray(data) ? data : (data.results ?? []);
        setProperties(list);
      })
      .catch(console.error);

    // NEW: Fetch New Feature (Latest 1)
    fetch(`${BASE_URL}/api/properties/?ordering=-created_at&limit=1`)
      .then(r => r.json())
      .then(data => { if (data.length > 0) setNewFeature(data[0]); })
      .catch(console.error);

    // NEW: Fetch Private Listing
    fetch(`${BASE_URL}/api/properties/?is_private=true&limit=1`)
      .then(r => r.json())
      .then(data => { if (data.length > 0) setPrivateListing(data[0]); })
      .catch(console.error);

    // NEW: Fetch Featured Listings
    fetch(`${BASE_URL}/api/properties/?is_featured=true&limit=4`)
      .then(r => r.json())
      .then(data => setFeaturedListings(Array.isArray(data) ? data : []))
      .catch(console.error);

    // NEW: Fetch Construction Listings
    fetch(`${BASE_URL}/api/properties/?status=under_development&limit=3`)
      .then(r => r.json())
      .then(data => setConstructionListings(Array.isArray(data) ? data : []))
      .catch(console.error);

  }, []);

  /* --- Slider Logic (Unchanged) --- */
  const goTo = useCallback((next: number, direction: 'left' | 'right') => {
    if (sliding || properties.length === 0) return;
    if (timerRef.current) clearTimeout(timerRef.current);
    setDir(direction);
    setPrev(current);
    setSliding(true);
    timerRef.current = setTimeout(() => {
      setCurrent(next);
      setPrev(null);
      setSliding(false);
    }, 600);
  }, [sliding, current, properties.length]);

  const goPrev = () => goTo((current - 1 + properties.length) % properties.length, 'left');
  const goNext = useCallback(() => goTo((current + 1) % properties.length, 'right'), [current, goTo, properties.length]);

  useEffect(() => {
    if (properties.length < 2) return;
    const id = setTimeout(goNext, 6000);
    return () => clearTimeout(id);
  }, [current, goNext, properties.length]);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (location) params.set('location', location);
    if (propType) params.set('type', propType);
    if (budget)   params.set('budget', budget);
    router.push(`/properties?${params.toString()}`);
  };

  // Password Check Logic (Demo: password is "premium")
  const handlePasswordSubmit = () => {
    if (passwordInput.toLowerCase() === 'premium') {
      setShowPasswordModal(false);
      if(privateListing) router.push(`/properties/${privateListing.slug}`);
    } else {
      setPasswordError('Incorrect password. Hint: premium');
    }
  };

  const total     = properties.length;
  const prop      = total > 0 ? properties[current] : null;
  const prevProp  = total > 0 ? properties[(current - 1 + total) % total] : null;
  const nextProp  = total > 0 ? properties[(current + 1) % total] : null;
  const prevSlide = prev !== null ? properties[prev] : null;

  const dropStyle: React.CSSProperties = {
    flex: 1,
    background: '#1a1b1f',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '8px',
    padding: '12px 32px 12px 36px',
    color: 'rgba(255,255,255,0.75)',
    fontSize: '0.78rem',
    fontFamily: '"Josefin Sans", sans-serif',
    letterSpacing: '0.04em',
    outline: 'none',
    cursor: 'pointer',
    appearance: 'none' as const,
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11' height='11' viewBox='0 0 24 24' fill='none' stroke='%23A37238' stroke-width='2.5'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 12px center',
    width: '100%',
  };

  return (
    <>
      {/* ══════════════ SLIDER (Unchanged) ══════════════ */}
      <section style={{ position: 'relative', width: '100%', height: '100vh', minHeight: '560px', overflow: 'hidden', background: '#0d0d10', fontFamily: '"Josefin Sans", sans-serif' }}>

        {/* exiting slide */}
        {sliding && prevSlide && (
          <div style={{ position: 'absolute', inset: 0, zIndex: 1, animation: `slideOut${dir === 'right' ? 'Left' : 'Right'} 0.6s ease forwards` }}>
            <img src={getImageUrl(prevSlide)} alt={prevSlide.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(10,10,14,0.3) 0%, rgba(10,10,14,0.15) 35%, rgba(10,10,14,0.6) 70%, rgba(10,10,14,0.9) 100%)' }} />
          </div>
        )}

        {/* current slide */}
        {prop && (
          <div style={{ position: 'absolute', inset: 0, zIndex: 2, animation: sliding ? `slideIn${dir === 'right' ? 'Right' : 'Left'} 0.6s ease forwards` : 'none' }}>
            <img src={getImageUrl(prop)} alt={prop.title} onLoad={() => setImgReady(r => ({ ...r, [current]: true }))}
              style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: imgReady[current] ? 1 : 0, transition: 'opacity 0.4s' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(10,10,14,0.3) 0%, rgba(10,10,14,0.15) 35%, rgba(10,10,14,0.6) 70%, rgba(10,10,14,0.9) 100%)' }} />
          </div>
        )}

        {/* spinner while loading */}
        {total === 0 && (
          <div style={{ position: 'absolute', inset: 0, background: '#111216', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 5 }}>
            <div style={{ width: '32px', height: '32px', border: '2px solid rgba(163,114,56,0.3)', borderTop: '2px solid #A37238', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
          </div>
        )}

        {/* centre content */}
        {prop && (
          <div key={`c-${current}`} style={{ position: 'absolute', inset: 0, zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 24px 200px', gap: '22px' }}>
            <h1 style={{ fontSize: 'clamp(2.8rem, 9vw, 6.5rem)', fontWeight: 300, letterSpacing: '0.15em', color: '#fff', lineHeight: 1, margin: 0, textTransform: 'uppercase', animation: 'fadeUp 0.55s ease both', textShadow: '0 2px 40px rgba(0,0,0,0.6)' }}>
              {prop.title}
            </h1>
            <Link href={`/properties/${prop.slug}`}
              style={{ display: 'inline-block', background: '#A37238', color: '#fff', padding: '13px 44px', borderRadius: '100px', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.18em', textDecoration: 'none', boxShadow: '0 8px 28px rgba(163,114,56,0.4)', animation: 'fadeUp 0.65s ease both', transition: 'background 0.2s, transform 0.2s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#8a5f2e'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#A37238'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}>
              LEARN MORE
            </Link>
          </div>
        )}

        {/* info strip */}
        {prop && (
          <div key={`s-${current}`} style={{ position: 'absolute', bottom: '80px', left: '50%', transform: 'translateX(-50%)', zIndex: 20, width: '88%', maxWidth: '720px', animation: 'fadeUp 0.7s ease both' }}>
            <div style={{ border: '1px solid rgba(255,255,255,0.2)', borderRadius: '100px', backdropFilter: 'blur(12px)', background: 'rgba(8,8,12,0.5)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '18px', padding: '12px 28px 7px', borderBottom: '1px solid rgba(255,255,255,0.08)', flexWrap: 'wrap' }}>
                <SLabel>{(prop.neighborhood || 'NAIROBI').toUpperCase()}</SLabel>
                <SDivider /><SLabel>{getPropType(prop)}</SLabel>
                <SDivider /><SLabel>{formatPrice(prop.price)}</SLabel>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '18px', padding: '7px 28px 12px', flexWrap: 'wrap' }}>
                <SIcon type="bed"   label={`${prop.bedrooms} BEDROOMS`} />
                <SDivider />
                <SIcon type="plot"  label={`${prop.area_sqft?.toLocaleString() ?? '—'} SQFT PLOT`} />
                <SDivider />
                <SIcon type="floor" label={`${prop.bathrooms} SQFT FLOORPLAN`} />
              </div>
            </div>
          </div>
        )}

        {/* dots */}
        {total > 1 && (
          <div style={{ position: 'absolute', bottom: '52px', left: '50%', transform: 'translateX(-50%)', zIndex: 20, display: 'flex', gap: '6px' }}>
            {properties.map((_, i) => (
              <button key={i} onClick={() => goTo(i, i > current ? 'right' : 'left')}
                style={{ width: i === current ? '22px' : '6px', height: '6px', borderRadius: '100px', border: 'none', background: i === current ? '#A37238' : 'rgba(255,255,255,0.3)', cursor: 'pointer', padding: 0, transition: 'all 0.3s' }} />
            ))}
          </div>
        )}

        {/* prev/next buttons */}
        {prevProp && <NavBtn side="left" label="Previous Villa" name={`Villa ${prevProp.title.toUpperCase()}`} onClick={goPrev} />}
        {nextProp && <NavBtn side="right" label="Next Villa" name={`Villa ${nextProp.title.toUpperCase()}`} onClick={goNext} />}
      </section>

      {/* ══════════════ SEARCH BAR (Unchanged) ══════════════ */}
      <div style={{ background: '#111216', padding: '28px 24px 36px', fontFamily: '"Josefin Sans", sans-serif' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto', background: '#18191e', borderRadius: '14px', padding: '22px 24px', border: '1px solid rgba(163,114,56,0.15)', boxShadow: '0 8px 40px rgba(0,0,0,0.4)' }}>
          <p style={{ margin: '0 0 14px', fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em' }}>Search for available properties</p>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'stretch' }}>
            <div style={{ flex: 1, minWidth: '130px', position: 'relative' }}>
              <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#A37238', pointerEvents: 'none', zIndex: 1 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"/></svg>
              </span>
              <select value={location} onChange={e => setLocation(e.target.value)} style={dropStyle}>
                <option value="">Location</option>
                <option value="karen">Karen</option>
                <option value="westlands">Westlands</option>
                <option value="kilimani">Kilimani</option>
              </select>
            </div>

            <div style={{ flex: 1, minWidth: '130px', position: 'relative' }}>
              <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#A37238', pointerEvents: 'none', zIndex: 1 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
              </span>
              <select value={propType} onChange={e => setPropType(e.target.value)} style={dropStyle}>
                <option value="">Property Type</option>
                <option value="house">House</option>
                <option value="apartment">Apartment</option>
                <option value="villa">Villa</option>
              </select>
            </div>

            <div style={{ flex: 1, minWidth: '110px', position: 'relative' }}>
              <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#A37238', pointerEvents: 'none', zIndex: 1 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/></svg>
              </span>
              <select value={budget} onChange={e => setBudget(e.target.value)} style={dropStyle}>
                <option value="">Budget</option>
                <option value="0-10m">Under 10M</option>
                <option value="10m-20m">10M – 20M</option>
                <option value="20m-50m">20M – 50M</option>
              </select>
            </div>

            <button onClick={handleSearch}
              style={{ flexShrink: 0, background: '#A37238', color: '#fff', border: 'none', borderRadius: '8px', padding: '12px 26px', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', cursor: 'pointer', fontFamily: '"Josefin Sans", sans-serif', transition: 'background 0.2s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#8a5f2e'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#A37238'; }}>
              Search Now
            </button>
          </div>
        </div>
      </div>

      {/* ══════════════ VIEW NEW FEATURES ══════════════ */}
      {newFeature && (
        <section style={{ background: '#111216', padding: '80px 24px', fontFamily: '"Josefin Sans", sans-serif' }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <p style={{ color: '#A37238', letterSpacing: '0.2em', marginBottom: '8px' }}>EXCLUSIVE LISTING</p>
            <h2 style={{ color: '#fff', fontSize: '3rem', marginBottom: '40px', fontWeight: 300 }}>View New Features</h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              <div style={{ position: 'relative', height: '500px', borderRadius: '4px', overflow: 'hidden' }}>
                <Image src={getImageUrl(newFeature)} alt={newFeature.title} fill style={{ objectFit: 'cover' }} unoptimized />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }} />
                <div style={{ position: 'absolute', bottom: '30px', left: '30px' }}>
                   <h3 style={{ color: '#fff', fontSize: '1.5rem', margin: 0 }}>{newFeature.title}</h3>
                   <p style={{ color: '#A37238' }}>{newFeature.neighborhood}</p>
                </div>
              </div>
              <div style={{ position: 'relative', height: '500px', borderRadius: '4px', overflow: 'hidden' }}>
                 <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80" style={{width:'100%', height:'100%', objectFit:'cover'}} alt="Interior" />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ══════════════ PRIVATE LISTINGS ══════════════ */}
      {privateListing && (
        <section style={{ background: '#0d0d10', padding: '80px 24px', fontFamily: '"Josefin Sans", sans-serif' }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', height: '600px' }}>
            <Image src={getImageUrl(privateListing)} alt="Private Listing" fill style={{ objectFit: 'cover' }} unoptimized />
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)' }} />
            
            <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '60px' }}>
              <p style={{ color: '#A37238', letterSpacing: '0.2em', marginBottom: '8px' }}>EXCLUSIVE ACCESS</p>
              <h2 style={{ color: '#fff', fontSize: '3.5rem', fontWeight: 300, marginBottom: '20px' }}>Private Listings<br/>for premium buyers</h2>
              <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '500px', marginBottom: '30px' }}>
                Gain access to off-market properties and exclusive investment opportunities not available to the public.
              </p>
              <button onClick={() => setShowPasswordModal(true)} style={{ background: '#A37238', color: '#fff', border: 'none', padding: '16px 40px', width: 'fit-content', textTransform: 'uppercase', letterSpacing: '0.15em', cursor: 'pointer' }}>
                Learn More
              </button>
            </div>
          </div>
        </section>
      )}

      {/* ══════════════ FEATURED LISTINGS ══════════════ */}
      <section style={{ background: '#111216', padding: '80px 24px', fontFamily: '"Josefin Sans", sans-serif' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <p style={{ color: '#A37238', letterSpacing: '0.2em', marginBottom: '8px' }}>PROPERTIES</p>
          <h2 style={{ color: '#fff', fontSize: '3rem', marginBottom: '40px', fontWeight: 300 }}>Featured Property Listings</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {featuredListings.map((p) => (
              <div key={p.id} style={{ position: 'relative', height: '400px', overflow: 'hidden' }}>
                <Image src={getImageUrl(p)} alt={p.title} fill style={{ objectFit: 'cover' }} unoptimized />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent 50%)' }} />
                <div style={{ position: 'absolute', bottom: '20px', left: '20px', right: '20px' }}>
                  <h3 style={{ color: '#fff', fontSize: '1.2rem', margin: 0 }}>{p.title}</h3>
                  <p style={{ color: '#A37238', fontSize: '0.9rem', marginBottom: '10px' }}>{formatPrice(p.price)}</p>
                  <Link href={`/properties/${p.slug}`} style={{ color: '#fff', textDecoration: 'none', borderBottom: '1px solid #fff', fontSize: '0.8rem', letterSpacing: '0.1em' }}>LEARN MORE</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ UNDER CONSTRUCTION ══════════════ */}
      <section style={{ background: '#0d0d10', padding: '80px 24px', fontFamily: '"Josefin Sans", sans-serif' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <p style={{ color: '#A37238', letterSpacing: '0.2em', marginBottom: '8px' }}>COMING SOON</p>
          <h2 style={{ color: '#fff', fontSize: '3rem', marginBottom: '40px', fontWeight: 300 }}>Property Under Construction</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {constructionListings.map((p) => (
              <div key={p.id} style={{ position: 'relative', height: '350px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
                <Image src={getImageUrl(p)} alt={p.title} fill style={{ objectFit: 'cover' }} unoptimized />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.95), transparent 60%)' }} />
                <div style={{ position: 'absolute', bottom: '20px', left: '20px', right: '20px' }}>
                  <h3 style={{ color: '#fff', fontSize: '1.2rem', margin: 0 }}>{p.title}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem', marginBottom: '10px' }}>{p.neighborhood}</p>
                  <Link href={`/properties/${p.slug}`} style={{ color: '#A37238', textDecoration: 'none', borderBottom: '1px solid #A37238', fontSize: '0.8rem', letterSpacing: '0.1em' }}>LEARN MORE</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ PASSWORD MODAL ══════════════ */}
      {showPasswordModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: '#1a1b1e', padding: '40px', width: '400px', borderRadius: '4px', border: '1px solid #A37238' }}>
            <h3 style={{ color: '#fff', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Enter Password</h3>
            <input 
              type="password" 
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              placeholder="Enter premium password"
              style={{ width: '100%', padding: '12px', background: '#111216', border: '1px solid #333', color: '#fff', marginBottom: '10px' }}
            />
            {passwordError && <p style={{ color: 'red', fontSize: '0.8rem', marginBottom: '10px' }}>{passwordError}</p>}
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={handlePasswordSubmit} style={{ flex: 1, background: '#A37238', color: '#fff', border: 'none', padding: '12px', cursor: 'pointer' }}>Submit</button>
              <button onClick={() => setShowPasswordModal(false)} style={{ flex: 1, background: 'transparent', color: '#fff', border: '1px solid #333', padding: '12px', cursor: 'pointer' }}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes spin   { to{transform:rotate(360deg)} }
        @keyframes slideInRight  { from{transform:translateX(5%);opacity:0.5} to{transform:translateX(0);opacity:1} }
        @keyframes slideInLeft   { from{transform:translateX(-5%);opacity:0.5} to{transform:translateX(0);opacity:1} }
        @keyframes slideOutLeft  { from{transform:translateX(0);opacity:1} to{transform:translateX(-4%);opacity:0} }
        @keyframes slideOutRight { from{transform:translateX(0);opacity:1} to{transform:translateX(4%);opacity:0} }
      `}</style>
    </>
  );
}

/* ── strip helpers ── */
function SLabel({ children }: { children: React.ReactNode }) {
  return <span style={{ fontSize: '0.67rem', fontWeight: 500, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.78)', whiteSpace: 'nowrap' }}>{children}</span>;
}
function SDivider() {
  return <span style={{ width: '1px', height: '12px', background: 'rgba(255,255,255,0.22)', flexShrink: 0 }} />;
}
const SVGS = {
  bed:   <svg width="14" height="14" viewBox="0 0 24 24" fill="#A37238"><path d="M7 13c1.66 0 3-1.34 3-3S8.66 7 7 7s-3 1.34-3 3 1.34 3 3 3zm12-6h-8v7H3V5H1v15h2v-3h18v3h2v-9c0-2.21-1.79-4-4-4z"/></svg>,
  plot:  <svg width="14" height="14" viewBox="0 0 24 24" fill="#A37238"><path d="M3 3v18h18V3H3zm8 16H5v-6h6v6zm0-8H5V5h6v6zm8 8h-6v-6h6v6zm0-8h-6V5h6v6z"/></svg>,
  floor: <svg width="14" height="14" viewBox="0 0 24 24" fill="#A37238"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>,
};
function SIcon({ type, label }: { type: 'bed'|'plot'|'floor'; label: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
      {SVGS[type]}
      <span style={{ fontSize: '0.64rem', fontWeight: 500, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.72)', whiteSpace: 'nowrap' }}>{label}</span>
    </div>
  );
}

/* ── nav button ── */
function NavBtn({ side, label, name, onClick }: { side: 'left'|'right'; label: string; name: string; onClick: () => void }) {
  const isLeft = side === 'left';
  return (
    <button onClick={onClick}
      style={{ position: 'absolute', bottom: '22px', [side]: '28px', zIndex: 30, display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '100px', padding: isLeft ? '8px 18px 8px 8px' : '8px 8px 8px 18px', cursor: 'pointer', backdropFilter: 'blur(8px)', color: '#fff', transition: 'all 0.2s', fontFamily: '"Josefin Sans", sans-serif' }}
      onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(163,114,56,0.22)'; el.style.borderColor = 'rgba(163,114,56,0.55)'; }}
      onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(255,255,255,0.08)'; el.style.borderColor = 'rgba(255,255,255,0.2)'; }}>
      {isLeft && (
        <span style={{ width: '30px', height: '30px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
        </span>
      )}
      <div style={{ textAlign: isLeft ? 'left' : 'right' }}>
        <p style={{ margin: 0, fontSize: '0.55rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.08em' }}>{label}</p>
        <p style={{ margin: 0, fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.03em', maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{name}</p>
      </div>
      {!isLeft && (
        <span style={{ width: '30px', height: '30px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
        </span>
      )}
    </button>
  );
}