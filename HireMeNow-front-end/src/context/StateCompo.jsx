import React, { useState, useEffect } from 'react';
import { JobContext } from './JobContext';

export default function StateCompo({ children }) {
  const [jobs, setJobs] = useState(() => {
    // Intenta obtener los datos del localStorage al inicializar
    const savedJobs = localStorage.getItem('jobs');
    return savedJobs ? JSON.parse(savedJobs) : [];
  });

  // Guarda los datos en el localStorage cada vez que cambien
  useEffect(() => {
    localStorage.setItem('jobs', JSON.stringify(jobs));
  }, [jobs]);

  const handleJobs = (data) => {
    setJobs(data);
  };

  return (
    <JobContext.Provider value={{ jobs, handleJobs }}>
      {children}
    </JobContext.Provider>
  );
}
