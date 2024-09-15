import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchServices } from '../redux/slices/serviceSlice';
import ServiceList from '../components/Services/ServiceList';
import ServiceForm from '../components/Services/ServiceForm';

const Services = () => {
  const dispatch = useDispatch();
  const { services, loading, error } = useSelector((state) => state.services);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="services">
      <h1>Services</h1>
      <button onClick={() => setShowForm(!showForm)} className="btn btn-primary">
        {showForm ? 'Hide Form' : 'Add New Service'}
      </button>
      {showForm && <ServiceForm />}
      <ServiceList services={services} />
    </div>
  );
};

export default Services;