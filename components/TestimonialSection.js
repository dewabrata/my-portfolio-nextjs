"use client"; // Menandai sebagai Client Component

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import styles from './TestimonialSection.module.css';
import { db } from '../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

function TestimonialSection() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const testimonialsCollectionRef = collection(db, "testimonials");

  const getTestimonials = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getDocs(testimonialsCollectionRef);
      setTestimonials(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } catch (err) {
      console.error("Error fetching testimonials:", err);
      setError("Failed to load testimonials. Please check your Firebase configuration and Firestore rules.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTestimonials();
  }, []);

  // Fungsi untuk mengganti slide
  const goToSlide = useCallback((index) => {
    if (isAnimating || testimonials.length === 0) return;
    
    setIsAnimating(true);
    setActiveIndex(index);
    
    // Setelah animasi selesai, reset state animasi
    setTimeout(() => {
      setIsAnimating(false);
    }, 600); // Match dengan durasi animasi CSS
  }, [isAnimating, testimonials.length]);
  
  // Auto slide
  useEffect(() => {
    if (testimonials.length === 0) return; // Jangan jalankan auto-slide jika tidak ada testimonial

    const interval = setInterval(() => {
      const nextIndex = (activeIndex + 1) % testimonials.length;
      goToSlide(nextIndex);
    }, 3000); // Ganti slide setiap 3 detik
    
    return () => clearInterval(interval); // Cleanup
  }, [activeIndex, goToSlide, testimonials.length]);
  
  // Fungsi untuk menampilkan bintang rating
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span 
          key={i} 
          className={`${styles.star} ${i <= rating ? styles.filled : styles.empty}`}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  if (loading) {
    return <section id="testimonial" className={styles['testimonial-section']}><p>Loading testimonials...</p></section>;
  }

  if (error) {
    return <section id="testimonial" className={styles['testimonial-section']}><p className={styles['error-message']}>{error}</p></section>;
  }

  if (testimonials.length === 0) {
    return <section id="testimonial" className={styles['testimonial-section']}><p>No testimonials found. Add some from the admin panel!</p></section>;
  }

  return (
    <section id="testimonial" className={styles['testimonial-section']}>
      <div className={styles['testimonial-content']}>
        {/* Header */}
        <div className={styles['testimonial-header']}>
          <div className={styles.subtitle}>Testimonial</div>
          <h2>Happy Words From Happy Customer</h2>
        </div>
        
        {/* Testimonial Slider */}
        <div className={styles['testimonial-slider']}>
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.id}
              className={`${styles['testimonial-slide']} ${index === activeIndex ? styles.active : ''}`}
              style={{
                transform: `translateX(${(index - activeIndex) * 100}%)`,
                opacity: index === activeIndex ? 1 : 0
              }}
            >
              <div className={styles['testimonial-layout']}>
                {/* Left Image */}
                <div className={styles['left-image']}>
                  {/* Menggunakan Image dari next/image */}
                  <img src={testimonial.leftImage} alt={`${testimonial.name} friend 1`} width={100} height={100} />
                </div>
                
                {/* Testimonial Content */}
                <div className={styles['testimonial-body']}>
                  <div className={styles.rating}>
                    {renderStars(testimonial.rating)}
                  </div>
                  <p className={styles['testimonial-text']}>{testimonial.text}</p>
                  <div className={styles['testimonial-author']}>
                    <h3 className={styles['author-name']}>{testimonial.name}</h3>
                    <p className={styles['author-position']}>{testimonial.position}</p>
                  </div>
                </div>
                
                {/* Right Image */}
                <div className={styles['right-image']}>
                  {/* Menggunakan Image dari next/image */}
                  <img src={testimonial.rightImage} alt={`${testimonial.name} friend 2`} width={100} height={100} />
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Slide Indicators */}
        <div className={styles['slide-indicators']}>
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`${styles.indicator} ${index === activeIndex ? styles.active : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        
        {/* Decorative Element */}
        <div className={styles['decorative-signature']}>
          <svg width="70" height="40" viewBox="0 0 70 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5,20 Q20,5 35,20 T65,20" stroke="#c9fb37" strokeWidth="2" fill="none" />
          </svg>
        </div>
      </div>
    </section>
  );
}

export default TestimonialSection;
