"use client"; // Menandai sebagai Client Component

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './WorkSection.module.css';
import { db } from '../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

function WorkSection() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 6;

  const projectsCollectionRef = collection(db, "work");

  const getProjects = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getDocs(projectsCollectionRef);
      setProjects(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } catch (err) {
      console.error("Error fetching projects:", err);
      setError("Failed to load projects. Please check your Firebase configuration and Firestore rules.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProjects();
  }, []);

  // Menghitung total halaman
  const totalPages = Math.ceil(projects.length / projectsPerPage);
  
  // Mendapatkan proyek untuk halaman saat ini
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);
  
  // Fungsi untuk mengubah halaman
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  // Fungsi untuk halaman sebelumnya
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  // Fungsi untuk halaman selanjutnya
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  if (loading) {
    return <section id="work" className={styles['work-section']}><p>Loading projects...</p></section>;
  }

  if (error) {
    return <section id="work" className={styles['work-section']}><p className={styles['error-message']}>{error}</p></section>;
  }

  if (projects.length === 0) {
    return <section id="work" className={styles['work-section']}><p>No projects found. Add some from the admin panel!</p></section>;
  }

  return (
    <section id="work" className={styles['work-section']}>
      <div className={styles['work-content']}>
        <div className={styles['work-header']}>
          <div className={styles.subtitle}>Complete Project</div>
          <h2>Look At My Portfolio And Give Me Your Feedback</h2>
        </div>
        
        <div className={styles['asymmetric-grid']}>
          {/* Baris 1: 2 proyek horizontal */}
          <div className={`${styles['grid-row']} ${styles['row-1']}`}>
            {currentProjects.slice(0, 2).map(project => (
              <div key={project.id} className={`${styles['project-card']} ${styles[project.size]}`}>
                <div className={styles['project-image']}>
                  <Image src={project.image} alt={project.title} width={600} height={400} /> {/* Tambahkan width dan height */}
                  <div className={styles['project-overlay']}>
                    <span className={styles['view-project']}>+</span>
                  </div>
                  <span className={styles['expand-icon']}>+</span>
                </div>
                <div className={styles['project-info']}>
                  <span className={styles['project-category']}>{project.category}</span>
                  <h3 className={styles['project-title']}>{project.title}</h3>
                </div>
              </div>
            ))}
          </div>
          
          {/* Baris 2: 2 proyek horizontal */}
          <div className={`${styles['grid-row']} ${styles['row-2']}`}>
            {currentProjects.slice(2, 4).map(project => (
              <div key={project.id} className={`${styles['project-card']} ${styles[project.size]}`}>
                <div className={styles['project-image']}>
                  <Image src={project.image} alt={project.title} width={600} height={400} />
                  <div className={styles['project-overlay']}>
                    <span className={styles['view-project']}>+</span>
                  </div>
                  <span className={styles['expand-icon']}>+</span>
                </div>
                <div className={styles['project-info']}>
                  <span className={styles['project-category']}>{project.category}</span>
                  <h3 className={styles['project-title']}>{project.title}</h3>
                </div>
              </div>
            ))}
          </div>
          
          {/* Baris 3: 2 proyek horizontal */}
          <div className={`${styles['grid-row']} ${styles['row-3']}`}>
            {currentProjects.slice(4, 6).map(project => (
              <div key={project.id} className={`${styles['project-card']} ${styles[project.size]}`}>
                <div className={styles['project-image']}>
                  <Image src={project.image} alt={project.title} width={600} height={400} />
                  <div className={styles['project-overlay']}>
                    <span className={styles['view-project']}>+</span>
                  </div>
                  <span className={styles['expand-icon']}>+</span>
                </div>
                <div className={styles['project-info']}>
                  <span className={styles['project-category']}>{project.category}</span>
                  <h3 className={styles['project-title']}>{project.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Pagination */}
        <div className={styles.pagination}>
          <button 
            onClick={goToPreviousPage} 
            disabled={currentPage === 1}
            className={`${styles['page-button']} ${styles['prev-button']}`}
          >
            &laquo; Prev
          </button>
          
          <div className={styles['page-numbers']}>
            {[...Array(totalPages).keys()].map(number => (
              <button
                key={number + 1}
                onClick={() => paginate(number + 1)}
                className={`${styles['page-number']} ${currentPage === number + 1 ? styles.active : ''}`}
              >
                {number + 1}
              </button>
            ))}
          </div>
          
          <button 
            onClick={goToNextPage} 
            disabled={currentPage === totalPages}
            className={`${styles['page-button']} ${styles['next-button']}`}
          >
            Next &raquo;
          </button>
        </div>
        
        <div className={styles['more-work']}>
          <button className={styles['more-work-button']}>
            <span className={styles['more-work-text']}>Click More Work</span>
          </button>
        </div>
      </div>
    </section>
  );
}

export default WorkSection;
