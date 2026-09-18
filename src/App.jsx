// src/App.jsx
import React from 'react';
import './App.css';
import {
  newsItems,
  courses,
  workshops,
  galleryItems,
  galleryFilters,
  testimonials
} from './data.js';

/* ==================================================================
   CONSTANTS
================================================================== */

/* The hero wallpaper is fixed — it no longer follows the news carousel.
   Swap this single path to change the hero backdrop. */
// const HERO_BACKGROUND = '/assets/hero/hero-japi.jpg';


/* ==================================================================
   VALIDATION — shared by the Reserve-a-Seat modal and the contact form
================================================================== */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Indian mobile numbers: optional +91 or leading 0, then a 10-digit
// number starting 6-9. Spaces/dashes are stripped before testing.
const PHONE_RE = /^(?:\+91|0)?[6-9]\d{9}$/;

const isValidEmail = value => EMAIL_RE.test(value.trim());
const isValidPhone = value => PHONE_RE.test(value.replace(/[\s-]/g, ''));
const isValidContact = value => isValidEmail(value) || isValidPhone(value);


/* ==================================================================
   HOOKS
================================================================== */

// Reveal elements as they scroll into view
const useReveal = (deps = []) => {
  React.useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      els.forEach(el => el.classList.add('is-visible'));
      return;
    }
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};

/* Tiny hash router: '#news/<slug>' opens a single article.
   Avoids pulling in a routing dependency for one view. */
const useHashRoute = () => {
  const read = () => {
    const h = window.location.hash || '';
    const m = h.match(/^#news\/(.+)$/);
    return m ? decodeURIComponent(m[1]) : null;
  };
  const [slug, setSlug] = React.useState(read);
  React.useEffect(() => {
    const onHash = () => setSlug(read());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  return slug;
};

/* ==================================================================
   NAVBAR
================================================================== */

const Navbar = ({ onHome }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu, then scroll. If we're on an article view,
  // return to the main page first so the target section exists.
  const go = (id) => {
    setIsOpen(false);
    if (onHome) {
      onHome();
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      });
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  React.useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') setIsOpen(false); };
    const onResize = () => { if (window.innerWidth > 768) setIsOpen(false); };
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const links = [
    ['home', 'Home'],
    ['about', 'About'],
    ['classes', 'Classes'],
    ['workshops', 'Workshops'],
    ['news', 'News'],
    ['gallery', 'Gallery'],
    ['contact', 'Contact']
  ];

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container">
        <a href="#home" className="nav-logo" onClick={e => { e.preventDefault(); go('home'); }}>
          <img src="/assets/logo.jpeg" alt="Krishnapriya Artistry" className="nav-logo-img" />
          <span className="nav-logo-text">Krishnapriya <em>Artistry</em></span>
        </a>

        <div id="primary-nav" className={`nav-links ${isOpen ? 'active' : ''}`}>
          {links.map(([id, label]) => (
            <a key={id} href={`#${id}`} className="nav-link"
               onClick={e => { e.preventDefault(); go(id); }}>
              {label}
            </a>
          ))}
          <button className="btn btn-primary btn-sm" onClick={() => go('classes')}>Join a Class</button>
        </div>

        <button
          type="button"
          className="mobile-menu-btn"
          onClick={() => setIsOpen(o => !o)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
          aria-controls="primary-nav"
        >
          {isOpen ? '✕' : '☰'}
        </button>
      </div>
    </nav>
  );
};

/* ==================================================================
   HERO — fixed backdrop + school name, with the news bar docked at its base.
================================================================== */

const Hero = ({ onOpenArticle }) => {
  // --- News text: cycles through newsItems, always auto-advancing ---
  const [index, setIndex] = React.useState(0);
  const total = newsItems.length;

  React.useEffect(() => {
    const t = setTimeout(() => setIndex(i => (i + 1) % total), 6000);
    return () => clearTimeout(t);
  }, [index, total]);

  const goTo = i => setIndex((i + total) % total);
  const active = newsItems[index];

  // --- Backdrop: cycles through gallery images, completely independent
  //     of the news text above — changing one never affects the other. ---
  const bgImages = React.useMemo(() => galleryItems.map(g => g.img), []);
  const [bgIndex, setBgIndex] = React.useState(0);
  const bgTotal = bgImages.length;

  React.useEffect(() => {
    if (bgTotal < 2) return;
    const t = setTimeout(() => setBgIndex(i => (i + 1) % bgTotal), 7000);
    return () => clearTimeout(t);
  }, [bgIndex, bgTotal]);

  // Left/right arrows move between news items when focus is in the bar
  const onNavKeyDown = e => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(index - 1); }
    if (e.key === 'ArrowRight') { e.preventDefault(); goTo(index + 1); }
  };

  // Title click scrolls to the on-page News section; only "Read article"
  // opens the dedicated article view.
  const goToNewsSection = () => {
    document.getElementById('news')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="hero">
      {/* Backdrop — cycles through gallery images on its own timer */}
      <div className="hero-backdrop" aria-hidden="true">
        {bgImages.map((src, i) => (
          <img
            key={src}
            src={src}
            alt=""
            className={`hero-backdrop-img ${i === bgIndex ? 'active' : ''}`}
            fetchPriority={i === 0 ? 'high' : undefined}
          />
        ))}
        <div className="hero-scrim" />
      </div>

      {/* School name */}
      <div className="hero-center">
        <span className="hero-kicker">Art &amp; Craft Centre · Est. 2020</span>
        <h1 className="hero-title">Krishnapriya Artistry</h1>
        <div className="hero-rule" />
        <p className="hero-tagline">Create <span>•</span> Learn <span>•</span> Inspire</p>
        <p className="hero-location">Tarajan, Jorhat, Assam</p>
        <div className="hero-btns">
          <a href="#classes" className="btn btn-primary">Join a Class</a>
          <a href="#gallery" className="btn btn-ghost">Explore Our Work</a>
        </div>
      </div>

      {/* Glassy news bar. Auto-advances unconditionally, on its own timer,
          independent of the backdrop above. Clicking the title jumps to the
          News section on this page; only "Read article" opens the full
          dedicated article. */}
      <div
        className="hero-news"
        role="region"
        aria-label="Latest news"
        aria-roledescription="carousel"
        onKeyDown={onNavKeyDown}
      >
        <div className="container hero-news-inner">
          <div className="hero-news-label">
            <span className="pulse-dot" aria-hidden="true" />
            Latest
          </div>

          <div className="hero-news-body">
            <span className="hero-news-swap" key={active.id}>
              <span className="hero-news-cat">{active.category}</span>
              <button
                type="button"
                className="hero-news-title-btn"
                onClick={goToNewsSection}
                aria-label={`View "${active.title}" in the News section`}
              >
                <span className="hero-news-title">{active.title}</span>
              </button>
              <span className="hero-news-desc">{active.excerpt}</span>
              <span className="hero-news-meta">
                <time>{active.date}</time>
                <button
                  type="button"
                  className="hero-news-read"
                  onClick={() => onOpenArticle(active.slug)}
                >
                  Read article →
                </button>
              </span>
            </span>
          </div>

          {/* Navigation controls — right side of the bar */}
          <div className="hero-news-nav">
            <button
              type="button"
              className="hero-arrow"
              onClick={() => goTo(index - 1)}
              aria-label="Previous news item"
            >
              ‹
            </button>

            <div className="hero-dots" role="tablist" aria-label="Choose a news item">
              {newsItems.map((s, i) => (
                <button
                  type="button"
                  key={s.id}
                  role="tab"
                  className={`hero-dot ${i === index ? 'active' : ''}`}
                  aria-selected={i === index}
                  aria-label={s.title}
                  onClick={() => goTo(i)}
                />
              ))}
            </div>

            <button
              type="button"
              className="hero-arrow"
              onClick={() => goTo(index + 1)}
              aria-label="Next news item"
            >
              ›
            </button>
          </div>
        </div>

        {/* Progress track — always running, resets each time `index` changes */}
        <div className="hero-progress" aria-hidden="true">
          <span key={active.id} className="hero-progress-fill" />
        </div>
      </div>
    </section>
  );
};

/* ==================================================================
   STATS
================================================================== */

const Stats = () => (
  <section className="container stats-wrap">
    <div className="stats-grid reveal">
      <div className="stat-item stat-terracotta"><h3>5+</h3><p>Years in Tarajan</p></div>
      <div className="stat-item stat-teal"><h3>300+</h3><p>Students Trained</p></div>
      <div className="stat-item stat-gold"><h3>6</h3><p>Craft Disciplines</p></div>
      <div className="stat-item stat-pink"><h3>All</h3><p>Ages &amp; Skill Levels</p></div>
    </div>
  </section>
);

/* ==================================================================
   ABOUT + MISSION
================================================================== */

const About = () => (
  <section id="about" className="section-padding container">
    <div className="about-grid">
      <div className="about-img-wrap reveal">
        <img src="/assets/bihu-bamboo-wall-art.jpg" alt="Hand-painted Bihu scene on woven bamboo" className="about-img" />
        <img src="/assets/cane-lamp-birds.jpg" alt="Woven cane lampshade" className="about-img-float" />
      </div>
      <div className="about-text reveal">
        <span className="eyebrow">About the Studio</span>
        <h2>A Home for Handmade Things</h2>
        <p>
          Krishnapriya Artistry began in 2020 in Tarajan, Jorhat, as a small corner for colour and
          craft — and grew into a warm art &amp; craft centre where people of every age come to make
          things with their hands.
        </p>
        <p>
          From bamboo and cane work to embroidery, plate painting, crochet and upcycled décor, every
          class is hands-on, unhurried, and built around helping you find your own creative voice.
        </p>
        <div className="about-quote">Create • Learn • Inspire</div>
      </div>
    </div>

    {/* Mission statement */}
    <div className="mission reveal">
      <div className="mission-inner">
        <span className="eyebrow eyebrow-light">Our Mission</span>
        <blockquote className="mission-text">
          Our mission is to provide quality training and a creative learning environment in art and
          craft, nurture artistic talent, encourage innovation and self-expression, and preserve and
          promote Assam's rich traditional art and cultural heritage. We aim to uplift the creative
          work and traditional craftsmanship of rural artisans, especially those working with bamboo
          and cane, by bringing their unique skills and creations into the modern world through
          innovative designs, contemporary applications, wider markets and sustainable livelihood
          opportunities.
        </blockquote>
        <div className="mission-pills">
          <span>Quality Training</span>
          <span>Assamese Heritage</span>
          <span>Bamboo &amp; Cane Artisans</span>
          <span>Sustainable Livelihoods</span>
        </div>
      </div>
    </div>
  </section>
);

/* ==================================================================
   CLASSES
================================================================== */

const Courses = () => (
  <section id="classes" className="section-padding container">
    <div className="section-header reveal">
      <span className="eyebrow">What We Teach</span>
      <h2>Explore Your Creative Side</h2>
      <p>Six craft paths, one colourful studio.</p>
    </div>
    <div className="courses-grid">
      {courses.map((course, i) => (
        <div key={course.id} className="course-card reveal" style={{ transitionDelay: `${i * 70}ms` }}>
          <div className="course-img-wrap">
            <img src={course.image} alt={course.title} loading="lazy" />
            <span className="course-icon">{course.icon}</span>
          </div>
          <div className="course-body">
            <h3>{course.title}</h3>
            <p>{course.desc}</p>
            <a href="#contact" className="course-link">Learn More <span>→</span></a>
          </div>
        </div>
      ))}
    </div>
  </section>
);

/* ==================================================================
   WHY CHOOSE US
================================================================== */

const WhyChooseUs = () => (
  <section className="section-padding dark-section">
    <div className="container">
      <div className="section-header reveal">
        <span className="eyebrow eyebrow-light">Why Krishnapriya Artistry</span>
        <h2>More Than Just a Craft Class</h2>
      </div>
      <div className="features-grid">
        {[
          ['👩‍🎨', 'Guided by Makers', 'Learn from artists who paint, weave and craft every single day.', 'feature-terracotta'],
          ['🤝', 'Small & Supportive', 'Cosy batches mean real attention and a friendly, unhurried pace.', 'feature-teal'],
          ['🎋', 'Rooted in Assam', 'Traditional bamboo, cane and folk motifs carried into modern design.', 'feature-gold'],
          ['🌱', 'All Skill Levels', "Never held a brush or a hook before? You'll feel at home here.", 'feature-pink']
        ].map(([icon, title, text, cls], i) => (
          <div className="feature-item reveal" key={title} style={{ transitionDelay: `${i * 80}ms` }}>
            <div className={`feature-icon-wrapper ${cls}`}>{icon}</div>
            <h3>{title}</h3>
            <p>{text}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ==================================================================
   WORKSHOPS
================================================================== */

const ReserveModal = ({ workshop, onClose }) => {
  const [name, setName] = React.useState('');
  const [contact, setContact] = React.useState('');
  const [touched, setTouched] = React.useState(false);
  const [reserved, setReserved] = React.useState(false);

  const nameValid = name.trim().length > 1;
  const contactValid = isValidContact(contact);

  const handleSubmit = e => {
    e.preventDefault();
    setTouched(true);
    if (!nameValid || !contactValid) return;
    setReserved(true);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="reserve-title"
        onClick={e => e.stopPropagation()}
      >
        <button type="button" className="modal-close" onClick={onClose} aria-label="Close">✕</button>

        {reserved ? (
          <div className="modal-success">
            <span className="modal-success-icon" aria-hidden="true">✓</span>
            <h3>You're in, {name.trim().split(' ')[0]}!</h3>
            <p>We've noted your seat for <strong>{workshop.title}</strong> and will reach out at {contact} to confirm.</p>
            <button type="button" className="btn btn-primary" onClick={onClose}>Done</button>
          </div>
        ) : (
          <>
            <span className="modal-eyebrow">Reserve Your Seat</span>
            <h3 id="reserve-title">{workshop.title}</h3>
            <p className="modal-sub">
              {workshop.date}{workshop.time ? ` · ${workshop.time}` : ''}
              {workshop.location ? ` · ${workshop.location}` : ''}
            </p>

            <form onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label htmlFor="rsvp-name">Name</label>
                <input
                  id="rsvp-name"
                  type="text"
                  className={`form-control ${touched && !nameValid ? 'form-control-invalid' : ''}`}
                  placeholder="Your full name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
                {touched && !nameValid && <span className="field-error">Please enter your name.</span>}
              </div>
              <div className="form-group">
                <label htmlFor="rsvp-contact">Phone Number or Email</label>
                <input
                  id="rsvp-contact"
                  type="text"
                  className={`form-control ${touched && !contactValid ? 'form-control-invalid' : ''}`}
                  placeholder="e.g. 98765 43210 or you@email.com"
                  value={contact}
                  onChange={e => setContact(e.target.value)}
                />
                {touched && !contactValid && <span className="field-error">Enter a valid phone number or email.</span>}
              </div>
              <button type="submit" className="btn btn-primary btn-block">Participate</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

const Workshops = () => {
  const [reserveFor, setReserveFor] = React.useState(null);

  React.useEffect(() => {
    if (!reserveFor) return;
    const onKey = e => { if (e.key === 'Escape') setReserveFor(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [reserveFor]);

  return (
    <section id="workshops" className="section-padding container">
      <div className="section-header reveal">
        <span className="eyebrow">Weekend Workshops</span>
        <h2>Create Something Special</h2>
        <p>Drop-in sessions to try a craft without committing to a full course.</p>
      </div>
      <div className="workshops-grid">
        {workshops.map((ws, i) => (
          <div key={ws.id} className="workshop-card reveal" style={{ transitionDelay: `${i * 80}ms` }}>
            <div className="workshop-img-wrap">
              <img src={ws.img} alt={ws.title} loading="lazy" />
              <span className="workshop-date">
                {ws.date}
                {ws.time && <span className="workshop-time">{ws.time}</span>}
              </span>
            </div>
            <div className="workshop-content">
              <h3>{ws.title}</h3>
              <p>{ws.desc}</p>
              {(ws.location || ws.contact) && (
                <p className="workshop-meta">
                  {ws.location && <span>{ws.location}</span>}
                  {ws.location && ws.contact && <span aria-hidden="true">·</span>}
                  {ws.contact && <a href={`tel:+91${ws.contact}`}>Call {ws.contact}</a>}
                </p>
              )}
              <button type="button" className="course-link" onClick={() => setReserveFor(ws)}>
                Reserve a Seat <span>→</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {reserveFor && <ReserveModal workshop={reserveFor} onClose={() => setReserveFor(null)} />}
    </section>
  );
};

/* ==================================================================
   DEDICATED NEWS SECTION — editorial, infinite horizontal scroll
   Sits BEFORE the Gallery. Separate component from the hero news bar.
================================================================== */

const NewsCard = ({ item, onOpen, duplicate }) => (
  <article className="news-card">
    <button
      type="button"
      className="news-card-btn"
      onClick={() => onOpen(item.slug)}
      tabIndex={duplicate ? -1 : 0}
      aria-hidden={duplicate ? 'true' : undefined}
      aria-label={`Read the full article: ${item.title}`}
    >
      <div className="news-card-media">
        <img src={item.img} alt={duplicate ? '' : item.title} loading="lazy" />
        <span className="news-card-cat">{item.category}</span>
      </div>
      <div className="news-card-body">
        <time className="news-card-date">{item.date}</time>
        <h3 className="news-card-title">{item.title}</h3>
        <p className="news-card-excerpt">{item.excerpt}</p>
        <span className="news-card-link">Read More <span aria-hidden="true">→</span></span>
      </div>
    </button>
  </article>
);

const NewsSection = ({ onOpenArticle }) => {
  // Rendered twice back-to-back; the track translates exactly -50%,
  // so the second copy lands where the first began — no visible jump.
  const loop = [...newsItems, ...newsItems];

  return (
    <section id="news" className="section-padding news-section">
      <div className="container">
        <div className="section-header reveal">
          <span className="eyebrow">From the Studio</span>
          <h2>News &amp; Stories</h2>
          <p>Work from our artisans, students and workshops — in their own detail.</p>
        </div>
      </div>

      <div
        className="news-marquee"
        role="region"
        aria-label="Latest news, scrolling"
      >
        <ul className="news-track">
          {loop.map((item, i) => (
            <li className="news-track-item" key={`${item.id}-${i}`}>
              <NewsCard
                item={item}
                onOpen={onOpenArticle}
                duplicate={i >= newsItems.length}
              />
            </li>
          ))}
        </ul>
      </div>

      <p className="news-hint container">
        <span className="news-hint-hover">Hover to pause · </span>
        Select any story to read it in full
      </p>
    </section>
  );
};

/* ==================================================================
   SINGLE ARTICLE VIEW  (#news/<slug>)
================================================================== */

const ArticleView = ({ item, onClose }) => {
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [item.slug]);

  React.useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const more = newsItems.filter(n => n.slug !== item.slug).slice(0, 3);

  return (
    <main className="article-page">
      <div className="article-hero">
        <img src={item.wide || item.img} alt={item.title} />
        <div className="article-hero-scrim" />
        <div className="container article-hero-inner">
          <button type="button" className="article-back" onClick={onClose}>
            <span aria-hidden="true">←</span> Back to site
          </button>
          <span className="article-cat">{item.category}</span>
          <h1 className="article-title">{item.title}</h1>
          <time className="article-date">{item.date}</time>
        </div>
      </div>

      <div className="container article-body">
        <p className="article-lead">{item.excerpt}</p>
        {item.content.map((para, i) => <p key={i}>{para}</p>)}

        <figure className="article-figure">
          <img src={item.img} alt={item.title} />
          <figcaption>{item.title} · Krishnapriya Artistry</figcaption>
        </figure>

        <div className="article-cta">
          <a href="#classes" className="btn btn-primary" onClick={onClose}>Join a Class</a>
          <a href="#contact" className="btn btn-outline-dark" onClick={onClose}>Enquire About This</a>
        </div>
      </div>

      <div className="container article-more">
        <h2>More from the studio</h2>
        <div className="article-more-grid">
          {more.map(n => (
            <NewsCard key={n.id} item={n} onOpen={s => { window.location.hash = `news/${s}`; }} />
          ))}
        </div>
      </div>
    </main>
  );
};

/* ==================================================================
   GALLERY (filterable + lightbox)
================================================================== */

const Gallery = () => {
  const [filter, setFilter] = React.useState('All');
  const [lightbox, setLightbox] = React.useState(null);

  const shown = filter === 'All'
    ? galleryItems
    : galleryItems.filter(i => i.category === filter);

  React.useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') setLightbox(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <section id="gallery" className="section-padding container">
      <div className="section-header reveal">
        <span className="eyebrow">Made Here</span>
        <h2>Made With Imagination</h2>
        <p>A glimpse into our studio and student creations.</p>
      </div>

      <div className="gallery-filters reveal">
        {galleryFilters.map(f => (
          <button
            key={f}
            className={`filter-chip ${filter === f ? 'active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="gallery-grid">
        {shown.map(item => (
          <button
            key={item.id}
            className={`gallery-item ${filter === 'All' ? item.span : ''}`}
            onClick={() => setLightbox(item)}
          >
            <img src={item.img} alt={item.title} loading="lazy" />
            <div className="gallery-overlay">
              <span className="gallery-category">{item.category}</span>
              <h3>{item.title}</h3>
            </div>
          </button>
        ))}
      </div>

      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <button className="lightbox-close" onClick={() => setLightbox(null)}>✕</button>
          <figure className="lightbox-figure" onClick={e => e.stopPropagation()}>
            <img src={lightbox.img} alt={lightbox.title} />
            <figcaption>
              <span className="gallery-category">{lightbox.category}</span>
              <h3>{lightbox.title}</h3>
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  );
};

/* ==================================================================
   TESTIMONIALS
================================================================== */

const Testimonials = () => (
  <section className="section-padding container">
    <div className="testimonials-section">
      <div className="section-header reveal">
        <span className="eyebrow">Kind Words</span>
        <h2>What Our Students Say</h2>
      </div>
      <div className="testimonials-grid">
        {testimonials.map((t, i) => (
          <div key={t.id} className="testimonial-card reveal" style={{ transitionDelay: `${i * 90}ms` }}>
            <p className="testimonial-quote">{t.quote}</p>
            <div className="testimonial-author">
              <h4>{t.name}</h4>
              <p>{t.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ==================================================================
   CTA
================================================================== */

const CTA = () => (
  <section className="section-padding cta-section">
    <div className="container cta-content reveal">
      <h2>Ready to Make Something Beautiful?</h2>
      <p>Come create with us in Tarajan — every craft, every skill level, every age welcome.</p>
      <div className="cta-btns">
        <a href="#classes" className="btn btn-primary">Join a Class</a>
        <a href="#contact" className="btn btn-secondary">Contact Us</a>
      </div>
    </div>
  </section>
);

/* ==================================================================
   CONTACT
================================================================== */

const Contact = () => {
  const [sent, setSent] = React.useState(false);
  const [contact, setContact] = React.useState('');
  const [contactTouched, setContactTouched] = React.useState(false);

  const contactValid = isValidContact(contact);

  const handleSubmit = e => {
    e.preventDefault();
    setContactTouched(true);
    if (!contactValid) return;
    setSent(true);
  };

  return (
    <section id="contact" className="section-padding container">
      <div className="section-header reveal">
        <span className="eyebrow">Get in Touch</span>
        <h2>Visit or Write to Us</h2>
      </div>
      <div className="contact-container">
        <div className="contact-info reveal">
          <h3>Come Say Hello</h3>
          <ul className="contact-details">
            <li>
              <span className="contact-icon" aria-hidden="true">📍</span>
              <span className="contact-text">
                <span className="contact-label">Studio Address</span>
                <a
                  href="https://maps.google.com/?q=Tarajan,+Jorhat,+Assam"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Krishnapriya Artistry, Tarajan,<br />Jorhat, Assam
                </a>
              </span>
            </li>
            <li>
              <span className="contact-icon" aria-hidden="true">📞</span>
              <span className="contact-text">
                <span className="contact-label">Phone</span>
                <a href="tel:+9191016 94118">+91 91016 94118</a>
              </span>
            </li>
            <li>
              <span className="contact-icon" aria-hidden="true">💬</span>
              <span className="contact-text">
                <span className="contact-label">WhatsApp</span>
                <a href="https://wa.me/9101694118" target="_blank" rel="noopener noreferrer">
                  Message us on WhatsApp
                </a>
              </span>
            </li>
            <li>
              <span className="contact-icon" aria-hidden="true">✉️</span>
              <span className="contact-text">
                <span className="contact-label">Email</span>
                <a href="mailto:kalita.krishnapriya@gmail.com">kalita.krishnapriya@gmail.com</a>
              </span>
            </li>
            <li>
              <span className="contact-icon" aria-hidden="true">🕐</span>
              <span className="contact-text">
                <span className="contact-label">Opening Hours</span>
                Mon – Fri: 10:00 AM – 6:00 PM<br />
                Sat – Sun: 10:00 AM – 4:00 PM
              </span>
            </li>
          </ul>
        </div>

                <div className="contact-form reveal">
          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="cf-name">Name</label>
              <input id="cf-name" type="text" className="form-control" placeholder="Your name" />
            </div>
            <div className="form-group">
              <label htmlFor="cf-contact">Email or Phone</label>
              <input
                id="cf-contact"
                type="text"
                className={`form-control ${contactTouched && !contactValid ? 'form-control-invalid' : ''}`}
                placeholder="How to reach you"
                value={contact}
                onChange={e => setContact(e.target.value)}
                onBlur={() => setContactTouched(true)}
              />
              {contactTouched && !contactValid && (
                <span className="field-error">Enter a valid email address or phone number.</span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="cf-interest">Interested In</label>
              <select id="cf-interest" className="form-control" defaultValue="General Enquiry">
                <option>General Enquiry</option>
                {courses.map(c => <option key={c.id}>{c.title}</option>)}
                <option>Workshops</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="cf-msg">Message</label>
              <textarea id="cf-msg" className="form-control" placeholder="Tell us what you'd like to learn..." />
            </div>
            <button type="submit" className="btn btn-primary btn-block">
              {sent ? 'Thank you — we\'ll be in touch!' : 'Send Enquiry'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

/* ==================================================================
   FOOTER
================================================================== */

const Footer = () => (
  <footer className="footer dark-section">
    <div className="container">
      <div className="footer-grid">
        <div className="footer-brand">
          <div className="footer-logo">
            <img src="/assets/logo.jpeg" alt="Krishnapriya Artistry" />
            <h2>Krishnapriya <em>Artistry</em></h2>
          </div>
          <p>Art &amp; Craft Centre · Tarajan, Jorhat, Assam · Est. 2020</p>
          <p className="footer-mission">
            Preserving Assam's traditional craft and supporting rural bamboo and cane artisans.
          </p>
        </div>
        <div>
          <h4>Explore</h4>
          <ul className="footer-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#classes">Classes</a></li>
            <li><a href="#workshops">Workshops</a></li>
            <li><a href="#news">News</a></li>
            <li><a href="#gallery">Gallery</a></li>
          </ul>
        </div>
        <div>
          <h4>Connect</h4>
          <ul className="footer-links">
            <li><a href="#!">Instagram</a></li>
            <li><a href="https://www.facebook.com/p/Krishna-Priya-Artistry-100063784853848/">Facebook</a></li>
            <li><a href="#!">WhatsApp</a></li>
          </ul>
        </div>
        <div>
          <h4>Contact</h4>
          <ul className="footer-links">
            <li><a href="mailto:kalita.krishnapriya@gmail.com">kalita.krishnapriya@gmail.com</a></li>
            <li><a href="tel:+919876543210">+91 91016 94118</a></li>
            <li><a
                  href="https://maps.google.com/?q=Tarajan,+Jorhat,+Assam"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Tarajan, Jorhat, Assam
                </a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2026 Krishnapriya Artistry. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

/* ==================================================================
   APP
================================================================== */

export default function App() {
  const slug = useHashRoute();
  const article = slug ? newsItems.find(n => n.slug === slug) : null;

  const openArticle = React.useCallback(s => { window.location.hash = `news/${s}`; }, []);
  const closeArticle = React.useCallback(() => {
    // Setting location.hash directly fires a real, native hashchange event
    // in every browser — unlike pushState, which needed a manually
    // constructed HashChangeEvent that wasn't reliably firing the listener.
    window.location.hash = '';
    // Clean up the trailing '#' left behind, once the native event above
    // has already been picked up by useHashRoute.
    requestAnimationFrame(() => {
      history.replaceState('', document.title, window.location.pathname + window.location.search);
    });
  }, []);

  useReveal([slug]);

  if (article) {
    return (
      <>
        <Navbar onHome={closeArticle} />
        <ArticleView item={article} onClose={closeArticle} />
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main>
        <Hero onOpenArticle={openArticle} />
        <Stats />
        <About />
        <Courses />
        <WhyChooseUs />
        <Workshops />
        <NewsSection onOpenArticle={openArticle} />
        <Gallery />
        <Testimonials />
        <CTA />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
