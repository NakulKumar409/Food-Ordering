import React from 'react';

const Location = () => {
  const restaurantLocations = [
    {
      name: 'Main Branch',
      address: 'Shop 42, Krishna Market, Sector 12, Noida',
      city: 'Noida',
      state: 'Uttar Pradesh',
      pincode: '201301',
      phone: '+91 9876543210',
      mapLink: 'https://goo.gl/maps/example'
    },
    {
      name: 'City Center Branch',
      address: 'Ground Floor, Omaxe Mall, Sector 18, Noida',
      city: 'Noida',
      state: 'Uttar Pradesh',
      pincode: '201301',
      phone: '+91 8765432109',
      mapLink: 'https://goo.gl/maps/example2'
    }
  ];

  return (
    <section className="location-section bg-gray-100 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Our Locations</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {restaurantLocations.map((location, index) => (
            <div 
              key={index} 
              className="location-card bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <h3 className="text-2xl font-semibold text-green-600 mb-4">{location.name}</h3>
              <div className="location-details">
                <p className="text-gray-700 mb-2">
                  <strong>Address:</strong> {location.address}
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>City:</strong> {location.city}
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>State:</strong> {location.state}
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Pincode:</strong> {location.pincode}
                </p>
                <p className="text-gray-700 mb-4">
                  <strong>Contact:</strong> {location.phone}
                </p>
                <a 
                  href={location.mapLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                >
                  View on Map
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Location;
