"use client"; // Menandai sebagai Client Component

import React, { useState, useEffect } from 'react';
import styles from './ServicesSection.module.css'; // Menggunakan CSS Modules

// Data dummy untuk layanan
const dummyServices = [
  {
    id: "01",
    title: "Illustration Design",
    category: "Designer",
    description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit."
  },
  {
    id: "02",
    title: "Business Branding",
    category: "Branding",
    description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit."
  },
  {
    id: "03",
    title: "Web UI/UX Design",
    category: "UI/UX Design",
    description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit."
  },
  {
    id: "04",
    title: "Application Design",
    category: "Web Design",
    description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit."
  },
  {
    id: "05",
    title: "Digital Marketing",
    category: "SEO Analytics",
    description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit."
  }
];

// Data dummy untuk proses
const dummyProcess = [
  {
    id: 1,
    title: "Concept",
    description: "Neque porro quisquam est cupiditate non provident",
    steps: [
      "Researching your existing hierarchy",
      "Target audiences and competitive research",
      "Developing a strategy"
    ]
  },
  {
    id: 2,
    title: "Design",
    description: "Neque porro quisquam est cupiditate non provident",
    steps: [
      "Creating wireframes and mockups",
      "Creating typography, color palettes",
      "Finalizing the design"
    ]
  },
  {
    id: 3,
    title: "Webflow",
    description: "Neque porro quisquam est cupiditate non provident",
    steps: [
      "Setting site metadata functionality needs",
      "Developing interactions, scroll animations",
      "Perfecting the design"
    ]
  }
];

function ServicesSection() {
  // State untuk melacak layanan yang aktif (untuk animasi)
  const [activeService, setActiveService] = useState(null);
  
  // Toggle layanan aktif
  const toggleService = (id) => {
    if (activeService === id) {
      setActiveService(null);
    } else {
      setActiveService(id);
    }
  };

  return (
    <section id="services" className={styles['services-section']}>
      <div className={styles['services-content']}>
        {/* Services Header */}
        <div className={styles['services-header']}>
          <div className={styles.subtitle}>Services That I Provide</div>
          <h2>My Special Service For Your Business Development</h2>
        </div>
        
        {/* Services List */}
        <div className={styles['services-list']}>
          {dummyServices.map((service) => (
            <div 
              key={service.id} 
              className={`${styles['service-item']} ${activeService === service.id ? styles.active : ''}`}
              onClick={() => toggleService(service.id)}
            >
              <div className={styles['service-number']}>{service.id}</div>
              <div className={styles['service-content']}>
                <div className={styles['service-category']}>{service.category}</div>
                <h3 className={styles['service-title']}>{service.title}</h3>
              </div>
              <div className={styles['service-description']}>
                <p>{service.description}</p>
              </div>
              <div className={styles['expand-icon']}>+</div>
            </div>
          ))}
        </div>
        
        {/* Process Section */}
        <div className={styles['process-section']}>
          <div className={styles['process-header']}>
            <div className={styles.subtitle}>Working Process</div>
            <h2>Your Dream Website In Just Few Steps</h2>
          </div>
          
          <div className={styles['process-cards']}>
            {dummyProcess.map((process) => (
              <div key={process.id} className={styles['process-card']}>
                <h3 className={styles['process-card-title']}>{process.title}</h3>
                <p className={styles['process-card-description']}>{process.description}</p>
                <ul className={styles['process-steps']}>
                  {process.steps.map((step, index) => (
                    <li key={index} className={styles['process-step']}>
                      <span className={styles['step-bullet']}></span>
                      {step}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;
