'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

// Updated URLs for BUY, RENT, SELL to be distinct pages
const navLinks = [
  { label: 'PROPERTIES', href: '/properties' },
  { label: 'BUY',        href: '/buy' },
  { label: 'RENT',       href: '/rent' },
  { label: 'SELL',       href: '/sell' },
  { label: 'ABOUT',      href: '/about' },
  { label: 'CONTACT',    href: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen]       = useState(false);
  const [scrolled, setScrolled]   = useState(false);
  const pathname                  = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Improved Active Logic
  const isActive = (href: string) => {
    // 1. If we are on PROPERTIES link, check if we are on /properties OR a sub-page like /properties/lifestyle
    if (href === '/properties') {
      return pathname === '/properties' || pathname.startsWith('/properties/');
    }
    // 2. For other links, check exact match
    return pathname === href;
  };

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
          {navLinks.map(({ label, href }) => {
            const active = isActive(href);
            return (
              <li key={label}>
                <Link
                  href={href}
                  style={{
                    color: active ? '#A37238' : 'rgba(255,255,255,0.82)',
                    letterSpacing: '0.12em',
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    fontFamily: '"Josefin Sans", sans-serif',
                    textDecoration: 'none',
                    transition: 'color 0.2s ease',
                    paddingBottom: '2px',
                    borderBottom: active ? '1px solid #A37238' : '1px solid transparent',
                  }}
                  onMouseEnter={e => {
                    if (!active) (e.currentTarget as HTMLElement).style.color = '#A37238';
                  }}
                  onMouseLeave={e => {
                    if (!active) (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.82)';
                  }}
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
                transform:
                  isOpen
                    ? i === 0 ? 'translateY(6.5px) rotate(45deg)'
                    : i === 2 ? 'translateY(-6.5px) rotate(-45deg)'
                    : 'scaleX(0)'
                    : 'none',
                opacity: isOpen && i === 1 ? 0 : 1,
              }}
            />
          ))}
        </button>
      </div>

      <div
        style={{
          backgroundColor: '#111216',
          maxHeight: isOpen ? '400px' : '0',
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
                <Link
                  href={href}
                  onClick={() => setIsOpen(false)}
                  style={{
                    display: 'block',
                    padding: '10px 0',
                    color: active ? '#A37238' : 'rgba(255,255,255,0.78)',
                    letterSpacing: '0.12em',
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    fontFamily: '"Josefin Sans", sans-serif',
                    textDecoration: 'none',
                    borderBottom: '1px solid rgba(163,114,56,0.1)',
                  }}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}