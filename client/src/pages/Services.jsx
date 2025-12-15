import React, { useEffect, useState } from 'react';
import './services.css';
import { useNavigate } from 'react-router-dom';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      const startTime = Date.now();

      try {
        const res = await fetch('http://localhost:7000/api/auth/service', { method: 'GET' });
        const data = await res.json();
        if (res.ok) setServices(data);
        else console.log('Error fetching services', data);
      } catch (error) {
        console.log('Error fetching services', error);
      } finally {
        // Ensure spinner shows for at least 2 seconds
        const elapsed = Date.now() - startTime;
        const delay = Math.max(1000 - elapsed, 0);
        setTimeout(() => setLoading(false), delay);
      }
    };
    fetchServices();
  }, []);

  const handleGetService = (service) => {
    navigate(`/services/${service._id}`);
  };

  return (
    <div className="services-container">
      <h2 className="services-title">Our Services</h2>

      {loading ? (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      ) : services.length === 0 ? (
        <p className="no-services">Services Not Available</p>
      ) : (
        <div className="services-grid">
          {services.map((service, idx) => (
            <div key={idx} className="service-card">
              <p><span className="label">Service:</span> <span className="value">{service.service}</span></p>
              <p><span className="label">Description:</span> <span className="value">{service.description}</span></p>
              <p><span className="label">Price:</span> <span className="value">${service.price}</span></p>
              <p><span className="label">Provider:</span> <span className="value">{service.provider}</span></p>

              <button className="get-service-btn" onClick={() => handleGetService(service)}>
                Get Service
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Services;
