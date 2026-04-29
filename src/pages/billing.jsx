import React from 'react';
import { FaFileInvoiceDollar, FaCreditCard, FaMoneyBillWave, FaDownload, FaPaypal } from 'react-icons/fa';

function Billing({ role = 'admin' }) {
  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-serif text-gray-800">
            {role === 'admin' ? 'Financial Overview' : 'My Invoices'}
          </h1>
          <p className="text-gray-500 mt-1">
            {role === 'admin' 
              ? 'Track revenue, pending payments, and generate invoices.' 
              : 'View your billing history and settle pending payments.'}
          </p>
        </div>
        {role === 'admin' && (
          <button className="bg-amber-600 text-white px-6 py-3 rounded text-sm font-bold tracking-widest uppercase hover:bg-amber-500 shadow-md transition-colors flex items-center gap-2">
            <FaFileInvoiceDollar /> Generate Invoice
          </button>
        )}
      </div>

      {role === 'admin' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-100 flex items-center gap-5">
            <div className="bg-green-50 p-5 rounded-full text-green-600 text-3xl"><FaMoneyBillWave /></div>
            <div>
              <p className="text-gray-400 font-bold tracking-widest uppercase text-xs mb-1">Total Revenue</p>
              <h2 className="text-3xl font-serif text-gray-800">$124,500</h2>
            </div>
          </div>
          <div className="bg-white rounded-xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-100 flex items-center gap-5">
            <div className="bg-amber-50 p-5 rounded-full text-amber-600 text-3xl"><FaFileInvoiceDollar /></div>
            <div>
              <p className="text-gray-400 font-bold tracking-widest uppercase text-xs mb-1">Pending Dues</p>
              <h2 className="text-3xl font-serif text-gray-800">$12,300</h2>
            </div>
          </div>
          <div className="bg-white rounded-xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-100 flex items-center gap-5">
            <div className="bg-blue-50 p-5 rounded-full text-blue-600 text-3xl"><FaCreditCard /></div>
            <div>
              <p className="text-gray-400 font-bold tracking-widest uppercase text-xs mb-1">Processing</p>
              <p className="text-lg font-serif text-gray-800 mt-1">Stripe & PayPal</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-amber-900/5 border border-amber-500/20 rounded-xl p-8 mb-8 flex justify-between items-center">
          <div>
            <h3 className="text-amber-600 font-bold tracking-widest uppercase text-sm mb-2">Outstanding Balance</h3>
            <p className="text-4xl font-serif text-gray-800">$450.00</p>
          </div>
          <button className="bg-black text-white px-8 py-4 rounded font-bold tracking-widest uppercase text-sm hover:bg-gray-800 transition-colors shadow-lg flex items-center gap-3">
            <FaPaypal /> Pay Securely Now
          </button>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] p-6 overflow-x-auto border border-gray-100">
        <h2 className="text-xl font-serif text-gray-800 mb-6">
          {role === 'admin' ? 'Recent Transactions' : 'Invoice History'}
        </h2>
        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-400 border-b border-gray-100 text-xs uppercase tracking-widest">
              <th className="pb-4 font-bold">Invoice #</th>
              {role === 'admin' && <th className="pb-4 font-bold">Guest</th>}
              <th className="pb-4 font-bold">Date</th>
              <th className="pb-4 font-bold">Amount</th>
              <th className="pb-4 font-bold">Status</th>
              <th className="pb-4 font-bold text-right">Receipt</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {[1, 2, 3].map((item) => (
              <tr key={item} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                <td className="py-5 font-bold text-gray-800">#INV-{20230+item}</td>
                {role === 'admin' && <td className="py-5 font-medium text-gray-700">Guest {item}</td>}
                <td className="py-5 text-gray-500 font-medium">Oct {15+item}, 2023</td>
                <td className="py-5 font-serif font-bold text-lg text-gray-800">${item * 150 + 50}.00</td>
                <td className="py-5">
                  {item === 1 ? (
                    <span className="bg-red-100/50 text-red-700 border border-red-200 px-3 py-1 rounded text-xs font-bold tracking-wide">Pending</span>
                  ) : (
                    <span className="bg-green-100/50 text-green-700 border border-green-200 px-3 py-1 rounded text-xs font-bold tracking-wide">Paid</span>
                  )}
                </td>
                <td className="py-5 text-right flex justify-end">
                  <button className="text-amber-600 font-bold flex items-center gap-2 hover:text-amber-800 text-xs uppercase tracking-widest">
                    <FaDownload /> PDF
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Billing;