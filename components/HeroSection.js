"use client";

import React from 'react';
import styles from './HeroSection.module.css';
import SimliAgentComponent from '../app/SimliAgent';

function HeroSection() {
  return (
    <section id="home" className={styles['hero-section']}>
      <div className={styles.container}>
        {/* Left Sidebar */}
        <div className={styles['hero-sidebar-left']}>
          <div className={styles['sidebar-top']}>
            <span className={styles['dots']}>⋮⋮⋮</span>
            <span className={styles['rotate-text']}>(+02)-574-328-301</span>
          </div>
          <div className={styles['sidebar-bottom']}>
            <span className={styles['rotate-text']}>SCROLL DOWN</span>
            <span className={styles['arrow-down']}>&darr;</span>
          </div>
        </div>

        {/* Main Content */}
        <div className={styles['hero-content']}>
          <p className={styles['freelance-text']}>Currently Available For Freelance <span className={styles['arrow-icon']}>&#8599;</span></p>
          <h1 className={styles.title}>
            Creative Visual <br /> <span className={styles['designer-text']}>Designer</span>
          </h1>
          <div className={styles['work-process']}>
            <button className={styles['play-button']}>
              <i className="bi bi-play-fill"></i>
            </button>
            <span className={styles['work-process-text']}>Work Process</span>
            <div className={styles['black-circle']}></div>
          </div>
        </div>

        {/* Simli Agent Avatar Column */}
        <div className={styles['hero-profile-col']}>
          <SimliAgentComponent />
        </div>

        {/* Right Sidebar */}
        <div className={styles['hero-sidebar-right']}>
          <span className={styles['rotate-text']}>FOLLOW ME</span>
          <div className={styles['social-icons']}>
            <a href="#" className={styles['social-icon']}><i className="bi bi-facebook"></i></a>
            <a href="#" className={styles['social-icon']}><i className="bi bi-twitter"></i></a>
            <a href="#" className={styles['social-icon']}><i className="bi bi-linkedin"></i></a>
            <a href="#" className={styles['social-icon']}><i className="bi bi-globe"></i></a>
            <a href="#" className="text-white"><i className="bi bi-instagram"></i></a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
