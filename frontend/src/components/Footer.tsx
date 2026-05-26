'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Footer() {
  const [form, setForm]       = useState({ name: '', email: '', message: '' });
  const [status, setStatus]   = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [touched, setTouched] = useState({ name: false, email: false, message: false });

  const valid = {
    name:    form.name.trim().length > 0,
    email:   /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email),
    message: form.message.trim().length > 0,
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setTouched(prev => ({ ...prev, [e.target.name]: true }));

  const handleSubmit = async () => {
    setTouched({ name: true, email: true, message: true });
    if (!valid.name || !valid.email || !valid.message) return;

    setStatus('sending');
    /* ── Replace this timeout with your real API call ── */
    await new Promise(r => setTimeout(r, 1400));
    setStatus('sent');
    setForm({ name: '', email: '', message: '' });
    setTouched({ name: false, email: false, message: false });
  };

  /* ── shared input style ── */
  const inputBase: React.CSSProperties = {
    width: '100%',
    background: 'transparent',
    border: '1px solid rgba(255,255,255,0.18)',
    borderRadius: '4px',
    padding: '10px 14px',
    color: '#fff',
    fontSize: '0.82rem',
    fontFamily: '"Montserrat", sans-serif',
    outline: 'none',
    letterSpacing: '0.03em',
  };

  return (
    <footer
      style={{
        backgroundColor: '#111216',
        borderTop: '1px solid rgba(163,114,56,0.35)',
        fontFamily: '"Montserrat", sans-serif',
      }}
    >
      {/* ── Main grid ───────────────────────────────────────────────── */}
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '56px 32px 32px',
          display: 'grid',
          gridTemplateColumns: 'minmax(120px,180px) 1fr minmax(220px,300px)',
          gap: '40px',
          alignItems: 'start',
        }}
        className="footer-grid"
      >

        {/* ── Col 1 : Logo ─────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <Link href="/">
            <Image
              src="/images/kings-logo.png"
              alt="King's Estate Globe"
              width={130}
              height={80}
              style={{ objectFit: 'contain', maxHeight: '80px', width: 'auto' }}
            />
          </Link>
        </div>

        {/* ── Col 2 : Contact form ──────────────────────────────────── */}
        <div>
          <h2
            style={{
              textAlign: 'center',
              fontSize: '1.25rem',
              fontWeight: 600,
              color: '#A37238',
              letterSpacing: '0.06em',
              marginBottom: '28px',
            }}
          >
            Contact Us
          </h2>

          {status === 'sent' ? (
            /* ── Success state ── */
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '16px',
                padding: '32px 0',
                animation: 'fadeIn 0.4s ease',
              }}
            >
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  border: '2px solid #A37238',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#A37238" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <p style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 600, letterSpacing: '0.04em' }}>
                Message Sent Successfully!
              </p>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.78rem', textAlign: 'center' }}>
                We'll get back to you as soon as possible.
              </p>
              <button
                onClick={() => setStatus('idle')}
                style={{
                  marginTop: '8px',
                  background: 'transparent',
                  border: '1px solid rgba(163,114,56,0.5)',
                  color: '#A37238',
                  padding: '8px 24px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '0.75rem',
                  letterSpacing: '0.08em',
                }}
              >
                SEND ANOTHER
              </button>
            </div>
          ) : (
            /* ── Form ── */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {/* Name + Email row */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <input
                    name="name"
                    placeholder="Name"
                    value={form.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={{
                      ...inputBase,
                      borderColor: touched.name && !valid.name ? '#c0392b' : 'rgba(255,255,255,0.18)',
                    }}
                  />
                  {touched.name && !valid.name && (
                    <p style={{ color: '#e74c3c', fontSize: '0.68rem', marginTop: '3px' }}>Required</p>
                  )}
                </div>
                <div>
                  <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={{
                      ...inputBase,
                      borderColor: touched.email && !valid.email ? '#c0392b' : 'rgba(255,255,255,0.18)',
                    }}
                  />
                  {touched.email && !valid.email && (
                    <p style={{ color: '#e74c3c', fontSize: '0.68rem', marginTop: '3px' }}>Valid email required</p>
                  )}
                </div>
              </div>

              {/* Message + privacy + button row */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', alignItems: 'start' }}>
                <div>
                  <textarea
                    name="message"
                    placeholder="How can we help you"
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={{
                      ...inputBase,
                      resize: 'none',
                      borderColor: touched.message && !valid.message ? '#c0392b' : 'rgba(255,255,255,0.18)',
                    }}
                  />
                  {touched.message && !valid.message && (
                    <p style={{ color: '#e74c3c', fontSize: '0.68rem', marginTop: '3px' }}>Required</p>
                  )}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.73rem', lineHeight: 1.6 }}>
                    By sending this form I confirm that I have read and accept King's Globe{' '}
                    <Link href="/privacy" style={{ color: '#A37238', textDecoration: 'none' }}>
                      Privacy Policy
                    </Link>
                  </p>

                  <button
                    onClick={handleSubmit}
                    disabled={status === 'sending'}
                    style={{
                      alignSelf: 'flex-start',
                      background: '#A37238',
                      color: '#fff',
                      border: 'none',
                      padding: '10px 32px',
                      borderRadius: '4px',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                      opacity: status === 'sending' ? 0.7 : 1,
                      transition: 'opacity 0.2s, background 0.2s',
                      fontFamily: '"Montserrat", sans-serif',
                    }}
                    onMouseEnter={e => { if (status !== 'sending') (e.currentTarget as HTMLElement).style.background = '#8a5f2e'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#A37238'; }}
                  >
                    {status === 'sending' ? 'SENDING…' : 'SEND'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ── Col 3 : Company info ─────────────────────────────────── */}
        <div>
          <h3
            style={{
              color: '#A37238',
              fontSize: '1.1rem',
              fontWeight: 600,
              letterSpacing: '0.06em',
              marginBottom: '24px',
            }}
          >
            Company
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {/* Address */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <span style={{ color: '#A37238', flexShrink: 0 }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"/>
                </svg>
              </span>
              <span style={{ color: '#fff', fontSize: '0.88rem', fontWeight: 500, letterSpacing: '0.04em' }}>
                KILIMANI
              </span>
            </div>

            {/* Phone */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <span style={{ color: '#A37238', flexShrink: 0 }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
              </span>
              <span style={{ color: '#fff', fontSize: '0.88rem', fontWeight: 500, letterSpacing: '0.04em' }}>
                +254 799302067
              </span>
            </div>

            {/* Email */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <span style={{ color: '#A37238', flexShrink: 0 }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
              </span>
              <span style={{ color: '#fff', fontSize: '0.88rem', fontWeight: 500, letterSpacing: '0.04em' }}>
                mauriceking@gmail.com
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Divider ──────────────────────────────────────────────────── */}
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 32px',
        }}
      >
        <hr style={{ border: 'none', borderTop: '1px solid rgba(163,114,56,0.3)', margin: '8px 0 24px' }} />
      </div>

      {/* ── Bottom bar ───────────────────────────────────────────────── */}
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 32px 36px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '32px',
          flexWrap: 'wrap',
        }}
      >
        {/* Social icons */}
        {[
          {
            label: 'X',
            href: '#',
            icon: (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            ),
          },
          {
            label: 'Instagram',
            href: '#',
            icon: (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            ),
          },
          {
            label: 'LinkedIn',
            href: '#',
            icon: (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            ),
          },
          {
            label: 'YouTube',
            href: '#',
            icon: (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/>
              </svg>
            ),
          },
          {
            label: 'Facebook',
            href: '#',
            icon: (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            ),
          },
        ].map(({ label, href, icon }) => (
          <a
            key={label}
            href={href}
            aria-label={label}
            style={{
              color: 'rgba(255,255,255,0.55)',
              transition: 'color 0.2s ease',
              display: 'flex',
            }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#A37238')}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.55)')}
          >
            {icon}
          </a>
        ))}

        <span
          style={{
            color: 'rgba(255,255,255,0.45)',
            fontSize: '0.78rem',
            letterSpacing: '0.04em',
          }}
        >
          @{new Date().getFullYear()} King's Estate Globe
        </span>
      </div>

      {/* ── Responsive styles ─────────────────────────────────────────── */}
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.35); }
        input:focus, textarea:focus { border-color: rgba(163,114,56,0.6) !important; }
        @media (max-width: 900px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}