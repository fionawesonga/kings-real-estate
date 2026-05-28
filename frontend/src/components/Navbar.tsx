'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

const navLinks = [
  { label: 'PROPERTIES', href: '/properties' },
  { label: 'BUY',        href: '/buy' },
  { label: 'SELL',       href: '/sell' },
  { label: 'ABOUT',      href: '/about' },
  { label: 'CONTACT',    href: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen]       = useState(false);
  const [scrolled, setScrolled]   = useState(false);
  const [rentOpen, setRentOpen]   = useState(false);
  const pathname                  = usePathname();
  const rentRef                   = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (rentRef.current && !rentRef.current.contains(event.target as Node)) {
        setRentOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isActive = (href: string) => {
    // Properties
    if (href === '/properties') return pathname === '/properties' || pathname.startsWith('/properties/');
    
    // Buy (Updated: Now works for /buy, /buy/residential, /buy/commercial, /buy/land)
    if (href === '/buy') return pathname.startsWith('/buy/');

    // Rent
    if (href === '/rent') return pathname.startsWith('/rent/');
    
    return pathname === href;
  };

  const isRentActive = isActive('/rent');

  const getLinkStyle = (active: boolean): React.CSSProperties => ({
    color: active ? '#A37238' : 'rgba(255,255,255,0.82)',
    letterSpacing: '0.12em',
    fontSize: '0.72rem',
    fontWeight: 600,
    fontFamily: '"Josefin Sans", sans-serif',
    textDecoration: 'none',
    transition: 'color 0.2s ease',
    paddingBottom: '2px',
    borderTop: 'none',
    borderLeft: 'none',
    borderRight: 'none',
    borderBottom: active ? '1px solid #A37238' : '1px solid transparent',
    background: 'transparent',
    cursor: 'pointer',
    display: 'inline-block',
    verticalAlign: 'middle',
  });

  return (
    <nav
      style={{
        backgroundColor: '#111216',
        borderBottom: scrolled ? '1px solid rgba(163,114,56,0.25)' : '1px solid transparent',
        transition: 'border-color 0.3s ease',
      }}
      className="fixed w-full z-50"
    >
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12 flex items-center justify-between h-[90px]">

        <Link href="/" className="flex-shrink-0">
          <Image
            src="/images/kings-logo.png"
            alt="King's Estate Globe"
            width={120}
            height={70}
            priority
            className="object-contain"
            style={{ maxHeight: '70px', width: 'auto' }}
          />
        </Link>

        <ul className="hidden md:flex items-center gap-8 lg:gap-10 list-none m-0 p-0">
          
          {navLinks.slice(0, 2).map(({ label, href }) => {
            const active = isActive(href);
            return (
              <li key={label}>
                <Link
                  href={href}
                  style={getLinkStyle(active)}
                  onMouseEnter={e => { if (!active) (e.currentTarget as HTMLElement).style.color = '#A37238'; }}
                  onMouseLeave={e => { if (!active) (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.82)'; }}
                >
                  {label}
                </Link>
              </li>
            );
          })}

          {/* RENT Dropdown */}
          <li 
            className="relative" 
            ref={rentRef}
            onMouseEnter={() => setRentOpen(true)} 
            onMouseLeave={() => setRentOpen(false)}
          >
            <button
              onClick={() => setRentOpen(!rentOpen)}
              style={getLinkStyle(isRentActive)}
            >
              RENT
            </button>

            {rentOpen && (
              <div 
                className="absolute top-full left-1/2 -translate-x-1/2 mt-0 w-40 shadow-2xl overflow-hidden z-50"
                style={{ backgroundColor: 'white', border: '1px solid #ccc' }} 
              >
                <ul className="py-1">
                  {/* Residential */}
                  <li>
                    <Link 
                      href="/rent/residential"
                      onClick={() => setRentOpen(false)}
                      className="block px-3 py-2 text-sm text-center transition hover:bg-gray-50"
                      style={{ 
                        fontFamily: '"Josefin Sans", sans-serif', 
                        color: pathname === '/rent/residential' ? '#A37238' : '#111',
                        fontWeight: 600 
                      }}
                    >
                      RESIDENTIAL
                    </Link>
                  </li>
                  {/* Commercial */}
                  <li style={{ borderTop: '1px solid #eee' }}>
                    <Link 
                      href="/rent/commercial"
                      onClick={() => setRentOpen(false)}
                      className="block px-3 py-2 text-sm text-center transition hover:bg-gray-50"
                      style={{ 
                        fontFamily: '"Josefin Sans", sans-serif', 
                        color: pathname === '/rent/commercial' ? '#A37238' : '#111',
                        fontWeight: 600 
                      }}
                    >
                      COMMERCIAL
                    </Link>
                  </li>
                  {/* Airbnb */}
                  <li style={{ borderTop: '1px solid #eee' }}>
                    <Link 
                      href="/rent/airbnbs"
                      onClick={() => setRentOpen(false)}
                      className="block px-3 py-2 text-sm text-center transition hover:bg-gray-50"
                      style={{ 
                        fontFamily: '"Josefin Sans", sans-serif', 
                        color: pathname === '/rent/airbnbs' ? '#A37238' : '#111',
                        fontWeight: 600 
                      }}
                    >
                      AIRBNB
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </li>

          {navLinks.slice(2).map(({ label, href }) => {
            const active = isActive(href);
            return (
              <li key={label}>
                <Link
                  href={href}
                  style={getLinkStyle(active)}
                  onMouseEnter={e => { if (!active) (e.currentTarget as HTMLElement).style.color = '#A37238'; }}
                  onMouseLeave={e => { if (!active) (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.82)'; }}
                >
                  {label}
                </Link>
              </li>
            );
          })}

        </ul>

        <button
          onClick={() => setIsOpen(prev => !prev)}
          aria-label="Toggle menu"
          className="flex md:hidden flex-col justify-center items-center gap-[5px] p-2"
        >
          {[0, 1, 2].map(i => (
            <span
              key={i}
              style={{
                display: 'block',
                width: '22px',
                height: '1.5px',
                backgroundColor: '#A37238',
                transition: 'transform 0.3s ease, opacity 0.3s ease',
                transform: isOpen ? (i === 0 ? 'translateY(6.5px) rotate(45deg)' : i === 2 ? 'translateY(-6.5px) rotate(-45deg)' : 'scaleX(0)') : 'none',
                opacity: isOpen && i === 1 ? 0 : 1,
              }}
            />
          ))}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      <div
        style={{
          backgroundColor: '#111216',
          maxHeight: isOpen ? '600px' : '0',
          overflow: 'hidden',
          transition: 'max-height 0.35s ease',
          borderTop: isOpen ? '1px solid rgba(163,114,56,0.2)' : 'none',
        }}
      >
        <ul className="flex flex-col gap-1 px-6 py-4 list-none m-0 p-0">
          {navLinks.map(({ label, href }) => {
            const active = isActive(href);
            return (
              <li key={label}>
                <Link href={href} onClick={() => setIsOpen(false)} style={{ display: 'block', padding: '10px 0', color: active ? '#A37238' : 'rgba(255,255,255,0.78)', letterSpacing: '0.12em', fontSize: '0.72rem', fontWeight: 600, fontFamily: '"Josefin Sans", sans-serif', textDecoration: 'none', borderBottom: '1px solid rgba(163,114,56,0.1)' }}>
                  {label}
                </Link>
              </li>
            );
          })}
          <li style={{ borderBottom: '1px solid rgba(163,114,56,0.1)' }}>
             <span className="block pt-4 pb-2 text-xs text-gray-500 uppercase tracking-widest font-bold">Rent Categories</span>
          </li>
          <li><Link href="/rent/residential" onClick={() => setIsOpen(false)} className="block py-2 pl-4 text-gray-400 hover:text-white text-xs uppercase">Residential</Link></li>
          <li><Link href="/rent/commercial" onClick={() => setIsOpen(false)} className="block py-2 pl-4 text-gray-400 hover:text-white text-xs uppercase">Commercial</Link></li>
          <li><Link href="/rent/airbnbs" onClick={() => setIsOpen(false)} className="block py-2 pl-4 text-gray-400 hover:text-white text-xs uppercase">Airbnb</Link></li>
        </ul>
      </div>
    </nav>
  );
}