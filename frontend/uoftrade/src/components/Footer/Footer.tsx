//footer comp

'use client';

import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-primary text-white py-4">
      <div className="container mx-auto text-center">
        <p className="mt-2 text-sm">Developed With Love.</p>
        <p className="mt-2 text-sm">© {new Date().getFullYear()} UofTrade. All rights reserved.</p>
        
      </div>
    </footer>
  );
};

export default Footer;
