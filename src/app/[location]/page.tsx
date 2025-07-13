import React from 'react';

type LocationPageProps = {
    params: {
        location: string;
    }
}

const LocationPage = ({ params }: LocationPageProps) => {
  const { location } = params;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4 capitalize">{location}</h1>
      <p>Здесь будет общая информация о локации: {location}.</p>
    </div>
  );
};

export default LocationPage; 