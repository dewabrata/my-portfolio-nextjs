import React from 'react';
import Image from 'next/image'; // Menggunakan next/image untuk optimasi gambar
import styles from './AboutSection.module.css'; // Menggunakan CSS Modules
import profileIllustration from '../public/images/profile.png'; // Path gambar disesuaikan untuk Next.js public folder

function AboutSection() {
  return (
    <section id="about" className={styles['about-section']}>
      <div className={styles['about-content']}>
        {/* Introduction Text */}
        <div className={styles['intro-text']}>
          <div className={styles['star-icon']}>&#10059;</div> {/* Unicode star character */}
          <p>I'm David Matias, I'm a Brand & Webflow Designer, Currently residing in the lush Victoria Street London, Matias operates globally and is ready to take on any design challenge.</p>
        </div>
        
        {/* Selection Tabs */}
        <div className={styles['selection-tabs']}>
          <button className={`${styles['tab-btn']} ${styles.active}`}>ABOUT</button>
          <button className={styles['tab-btn']}>EXPERIENCE</button>
          <button className={styles['tab-btn']}>EDUCATION</button>
          <button className={styles['tab-btn']}>SKILLS</button>
        </div>
        
        {/* Personal Info Container */}
        <div className={styles['personal-info-container']}>
          <div className={styles.illustration}>
            <Image src={profileIllustration} alt="Profile Illustration" width={500} height={300} /> {/* Tambahkan width dan height */}
          </div>
          <div className={styles['info-details']}>
            <h2>Personal Info</h2>
            <p>Neque porro quisquam est, qui dolorem ipsum quia dolor sit consectetur, aliquam quaerat voluptatem. Ut enim ad minima veniam, exercitationem laboriosam, nisi ut aliquid ex ea autem velit esse quam nihil</p>
            <div className={styles['contact-grid']}>
              <div className={styles['contact-item']}>
                <h3>Email</h3>
                <p>Matias999@Gmail.Com</p>
              </div>
              <div className={styles['contact-item']}>
                <h3>Phone</h3>
                <p>+(2) 871 382 023</p>
              </div>
              <div className={styles['contact-item']}>
                <h3>Phone</h3>
                <p>Victoria Street London,</p>
              </div>
              <div className={styles['contact-item']}>
                <h3>Follow</h3>
                <div className={styles['social-icons']}>
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
                  <a href="https://example.com" target="_blank" rel="noopener noreferrer" aria-label="Globe"><i className="fas fa-globe"></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
