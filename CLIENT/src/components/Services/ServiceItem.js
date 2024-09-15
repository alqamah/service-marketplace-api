import React from 'react';

const ServiceItem = ({ service }) => {
  return (
    <div>
      <h3>{service.name}</h3>
      <p>Category: {service.category}</p>
      <p>Price: ${service.price}</p>
      <p>{service.description}</p>
    </div>
  );
};

export default ServiceItem;