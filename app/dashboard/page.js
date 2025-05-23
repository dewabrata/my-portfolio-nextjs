"use client"; // Menandai sebagai Client Component

import React, { useState, useEffect } from 'react';
import { signOut } from "firebase/auth";
import { auth, db } from '../../lib/firebase';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import WorkAdmin from '../../components/admin/WorkAdmin';
import styles from './DashboardPage.module.css';

function DashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('work');
  const [user, loading, error] = useAuthState(auth);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    if (!loading) {
      if (user) {
        setUserEmail(user.email);
      } else {
        router.push('/admin/login');
      }
    }
  }, [user, loading, router]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/admin/login');
    } catch (error) {
      console.error("Logout error:", error);
      alert("Failed to log out.");
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'work':
        return <WorkAdmin />;
      case 'services':
        return <div><h2>Manage Services</h2><p>Coming Soon...</p></div>;
      case 'testimonials':
        return <div><h2>Manage Testimonials</h2><p>Coming Soon...</p></div>;
      default:
        return <div><h2>Welcome to Dashboard</h2></div>;
    }
  };

  return (
    <div className={styles['dashboard-page']}>
      <aside className={styles.sidebar}>
        <div className={styles['sidebar-header']}>
          <h3>Admin Panel</h3>
          <p className={styles['user-email']}>{userEmail}</p>
        </div>
        <nav className={styles['sidebar-nav']}>
          <ul>
            <li>
              <button 
                className={activeTab === 'work' ? styles.active : ''} 
                onClick={() => setActiveTab('work')}
              >
                Manage Work
              </button>
            </li>
            <li>
              <button 
                className={activeTab === 'services' ? styles.active : ''} 
                onClick={() => setActiveTab('services')}
              >
                Manage Services
              </button>
            </li>
            <li>
              <button 
                className={activeTab === 'testimonials' ? styles.active : ''} 
                onClick={() => setActiveTab('testimonials')}
              >
                Manage Testimonials
              </button>
            </li>
          </ul>
        </nav>
        <button onClick={handleLogout} className={styles['logout-button']}>
          Logout
        </button>
      </aside>
      <main className={styles['main-content']}>
        {renderContent()}
      </main>
    </div>
  );
}

export default DashboardPage;
