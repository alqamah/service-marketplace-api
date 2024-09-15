import React from 'react';
import ServiceItem from './ServiceItem';

const ServiceList = ({ services }) => {
  return (
    <div>
      {services.map((service) => (
        <ServiceItem key={service._id} service={service} />
      ))}
    </div>
  );
};

export default ServiceList;