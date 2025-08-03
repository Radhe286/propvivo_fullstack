 import React, { useEffect, useState } from 'react';
import CustomerInfo from './CustomerInfo';

function App() {
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const phone = '+911234567890'; // Your test phone number
    fetch(`http://localhost:5000/api/customer/${phone}`)
      .then(res => {
        if (!res.ok) throw new Error('Customer not found');
        return res.json();
      })
      .then(data => {
        setCustomer(data);
        setLoading(false);
      })
      .catch(err => {
        alert(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 to-white p-6 font-sans">
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-blue-700 mb-4 flex items-center">
          📞 Incoming Call
        </h2>
        {loading ? (
          <p className="text-gray-500">Loading customer info...</p>
        ) : customer ? (
          <CustomerInfo customer={customer} />
        ) : (
          <p className="text-red-600">No customer found for this number.</p>
        )}
      </div>
    </div>
  );
}

export default App;
