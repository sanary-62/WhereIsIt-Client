import React from 'react';

const HowItWorks = () => {
  return (
    <section className="bg-gray-100 py-12">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-blue-800 mb-6">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <img src="https://cdn-icons-png.flaticon.com/512/684/684908.png" alt="Lost" className="w-16 h-16 mx-auto mb-4" />
            <h3 className="text-xl font-semibold">Report Lost</h3>
            <p>Submit a report with item details and last known location.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <img src="https://cdn-icons-png.flaticon.com/512/679/679922.png" alt="Search" className="w-16 h-16 mx-auto mb-4" />
            <h3 className="text-xl font-semibold">Search Items</h3>
            <p>Browse through the listings of found items by others.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <img src="https://cdn-icons-png.flaticon.com/512/681/681494.png" alt="Return" className="w-16 h-16 mx-auto mb-4" />
            <h3 className="text-xl font-semibold">Connect & Return</h3>
            <p>Contact the person who found the item and get it back securely.</p>
          </div>
        </div>
      </div>
    </section>
  );
};


export default HowItWorks;