import React from 'react';

const Testimonials = () => {
  return (
    <section className="bg-white py-12">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-blue-800 mb-6">What Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 shadow rounded bg-blue-50">
            <p className="mb-4">“I found my lost bag within 2 days. This platform really works!”</p>
            <h4 className="font-semibold text-blue-700">— Aisha, Student</h4>
          </div>
          <div className="p-6 shadow rounded bg-blue-50">
            <p className="mb-4">“Very smooth and helpful process. I returned a wallet to its owner!”</p>
            <h4 className="font-semibold text-blue-700">— Rafi, Service Holder</h4>
          </div>
          <div className="p-6 shadow rounded bg-blue-50">
            <p className="mb-4">“Secure and trustworthy site for finding valuable lost items.”</p>
            <h4 className="font-semibold text-blue-700">— Tania, Freelancer</h4>
          </div>
        </div>
      </div>
    </section>
  );
};


export default Testimonials;