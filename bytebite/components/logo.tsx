import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="logo-container">
      <div className="logo-circle">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="50" cy="50" r="45" fill="#fcd7d0" />
          <path
            d="M50 30 C 60 20, 80 20, 85 40 C 90 60, 70 75, 50 85 C 30 75, 10 60, 15 40 C 20 20, 40 20, 50 30"
            fill="#e3d6ca"
          />
        </svg>
      </div>
      <span className="logo-text">ByteBite</span>
      
      <style jsx>{`
        .logo-container {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .logo-circle {
          width: 80px;
          height: 80px;
        }
        
        .logo-text {
          font-size: 24px;
          font-weight: bold;
          color: #be0822;
        }
      `}</style>
    </div>
  );
};

export default Logo;