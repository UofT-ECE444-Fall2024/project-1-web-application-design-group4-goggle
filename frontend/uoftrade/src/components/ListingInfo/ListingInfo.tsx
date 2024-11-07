import React from 'react';

const ListingInfo: React.FC = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem' }}>
      {/* Left Column - Main Details */}
      <div style={{ maxWidth: '60%' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Linear Algebra Textbook</h1>
        <p style={{ color: 'purple', fontSize: '1.25rem', fontWeight: 'bold' }}>$100.00</p>
        
        <div style={{ display: 'flex', gap: '1rem' }}>
          <div style={{
            width: '18rem', // Dynamic size for main image
            height: '18rem',  // Increased size
            backgroundColor: '#ddd',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            Main Image
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{
              width: '6rem',
              height: '6rem',
              backgroundColor: '#ddd',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              img1
            </div>
            <div style={{
              width: '6rem',
              height: '6rem',
              backgroundColor: '#ddd',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              img2
            </div>
            <div style={{
              width: '6rem',
              height: '6rem',
              backgroundColor: '#ddd',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              See More
            </div>
          </div>
        </div>

        <h3>Description</h3>
        <p style={{ fontSize: '0.875rem', color: '#666' }}>
          This is my description. Lorem ipsum dolor amet, consectetur adipiscing elit.
          Rhoncus curabitur accumsan semper accumsan primis lorem tortor rhoncus mus lacus.
          Overflow text gives makes read more hyperlink appga
        </p>
      </div>

      {/* Right Column - Seller Info */}
      <div style={{ maxWidth: '35%' }}>
        <p style={{ fontSize: '0.875rem', color: '#666' }}>Posted X days ago</p>
        <p style={{ fontSize: '1rem', fontWeight: 'bold' }}>St. George Campus</p>
        <p style={{ fontSize: '0.875rem', color: '#666' }}>Preferred Pickup Location: Bahen</p>
        
        <div style={{
          border: '1px solid #ddd',
          borderRadius: '0.5rem',
          padding: '1rem',
          textAlign: 'center'
        }}>
          <p style={{ fontWeight: 'bold' }}>SELLER</p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.5rem' }}>
            <img
              src="https://via.placeholder.com/3rem"
              alt="Seller"
              style={{ borderRadius: '50%', marginRight: '0.5rem' }}
            />
            <div>
              <p style={{ fontWeight: 'bold', margin: 0 }}>Peter Williams</p>
              <p style={{ color: '#f39c12', fontSize: '1rem', margin: 0 }}>★★★★★</p>
            </div>
          </div>
          <button style={{
            backgroundColor: '#6f42c1',
            color: '#fff',
            padding: '0.5rem 1rem',
            borderRadius: '0.25rem',
            border: 'none',
            cursor: 'pointer'
          }}>
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListingInfo;
