"use client"; // Menandai sebagai Client Component

import React, { useState, useEffect } from 'react';
import { db } from '../../lib/firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import styles from './WorkAdmin.module.css';

function WorkAdmin() {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({ image: '', category: '', title: '' });
  const [editingProject, setEditingProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const projectsCollectionRef = collection(db, "work");

  const getProjects = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getDocs(projectsCollectionRef);
      setProjects(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } catch (err) {
      console.error("Error fetching projects:", err);
      setError("Failed to load projects.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProjects();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (editingProject) {
      setEditingProject({ ...editingProject, [name]: value });
    } else {
      setNewProject({ ...newProject, [name]: value });
    }
  };

  const addProject = async (e) => {
    e.preventDefault();
    setError('');
    if (!newProject.image || !newProject.category || !newProject.title) {
      setError("All fields are required.");
      return;
    }
    try {
      await addDoc(projectsCollectionRef, newProject);
      setNewProject({ image: '', category: '', title: '' });
      getProjects();
    } catch (err) {
      console.error("Error adding project:", err);
      setError("Failed to add project.");
    }
  };

  const startEditing = (project) => {
    setEditingProject({ ...project });
  };

  const updateProject = async (e) => {
    e.preventDefault();
    setError('');
    if (!editingProject.image || !editingProject.category || !editingProject.title) {
      setError("All fields are required.");
      return;
    }
    try {
      const projectDoc = doc(db, "work", editingProject.id);
      await updateDoc(projectDoc, { 
        image: editingProject.image, 
        category: editingProject.category, 
        title: editingProject.title 
      });
      setEditingProject(null);
      getProjects();
    } catch (err) {
      console.error("Error updating project:", err);
      setError("Failed to update project.");
    }
  };

  const deleteProject = async (id) => {
    setError('');
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        const projectDoc = doc(db, "work", id);
        await deleteDoc(projectDoc);
        getProjects();
      } catch (err) {
        console.error("Error deleting project:", err);
        setError("Failed to delete project.");
      }
    }
  };

  return (
    <div className={styles['work-admin']}>
      <h2>Manage Work Projects</h2>

      {error && <p className={styles['error-message']}>{error}</p>}

      {/* Add/Edit Form */}
      <div className={styles['form-container']}>
        <h3>{editingProject ? 'Edit Project' : 'Add New Project'}</h3>
        <form onSubmit={editingProject ? updateProject : addProject}>
          <div className={styles['form-group']}>
            <label htmlFor="image">Image URL:</label>
            <input
              type="text"
              id="image"
              name="image"
              value={editingProject ? editingProject.image : newProject.image}
              onChange={handleChange}
              placeholder="e.g., /images/dummy-project.png"
              required
            />
          </div>
          <div className={styles['form-group']}>
            <label htmlFor="category">Category:</label>
            <input
              type="text"
              id="category"
              name="category"
              value={editingProject ? editingProject.category : newProject.category}
              onChange={handleChange}
              placeholder="e.g., PRODUCT DESIGN"
              required
            />
          </div>
          <div className={styles['form-group']}>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={editingProject ? editingProject.title : newProject.title}
              onChange={handleChange}
              placeholder="e.g., Brand Identity & Motion Design"
              required
            />
          </div>
          <div className={styles['form-actions']}>
            <button type="submit" className={styles['submit-button']}>
              {editingProject ? 'Update Project' : 'Add Project'}
            </button>
            {editingProject && (
              <button 
                type="button" 
                onClick={() => setEditingProject(null)} 
                className={styles['cancel-button']}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Projects List */}
      <h3>Current Projects</h3>
      {loading ? (
        <p>Loading projects...</p>
      ) : projects.length === 0 ? (
        <p>No projects found. Add some above!</p>
      ) : (
        <div className={styles['projects-list']}>
          {projects.map((project) => (
            <div key={project.id} className={styles['project-item']}>
              <img src={project.image} alt={project.title} className={styles['project-thumbnail']} />
              <div className={styles['project-details']}>
                <h4>{project.title}</h4>
                <p className={styles['category-text']}>{project.category}</p>
              </div>
              <div className={styles['project-actions']}>
                <button onClick={() => startEditing(project)} className={styles['edit-button']}>
                  Edit
                </button>
                <button onClick={() => deleteProject(project.id)} className={styles['delete-button']}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default WorkAdmin;
