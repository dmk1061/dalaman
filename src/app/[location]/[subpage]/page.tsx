import React from 'react';

type SubPageProps = {
    params: {
        location: string;
        subpage: string;
    }
}

const LocationSubPage = ({ params }: SubPageProps) => {
  const { location, subpage } = params;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4 capitalize">{subpage} in {location}</h1>
      <p>Здесь будет информация о разделе '{subpage}' для локации '{location}'.</p>
    </div>
  );
};

export default LocationSubPage; 