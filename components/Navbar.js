"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import styles from './Navbar.module.css';
import logo from '../public/images/logo.png';

function AppNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false); // Close menu after clicking a link
    }
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles['navbar-brand']} onClick={() => scrollToSection('home')}>
          <Image
            src={logo}
            width={30}
            height={30}
            className={styles.logo}
            alt="Matias Logo"
          />
          Matias
        </div>

        <div className={`${styles['nav-links']} ${isOpen ? styles.open : ''}`}>
          <a onClick={() => scrollToSection('home')} className={styles['nav-link']}>HOME</a>
          <a onClick={() => scrollToSection('about')} className={styles['nav-link']}>ABOUT</a>
          <a onClick={() => scrollToSection('work')} className={styles['nav-link']}>WORK</a>
          <a onClick={() => scrollToSection('services')} className={styles['nav-link']}>SERVICES</a>
          <a onClick={() => scrollToSection('testimonial')} className={styles['nav-link']}>TESTIMONIAL</a>
          <a onClick={() => scrollToSection('blog')} className={styles['nav-link']}>BLOG</a>
          <a onClick={() => scrollToSection('contact')} className={styles['nav-link']}>CONTACT</a>
        </div>

        <div className={styles['navbar-actions']}>
          <button className={styles['lets-talk-btn']}>Let's Talk &rarr;</button>
          <button className={styles['menu-toggle']} onClick={() => setIsOpen(!isOpen)}>
            <i className="bi bi-list"></i>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default AppNavbar;
