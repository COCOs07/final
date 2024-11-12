import React from 'react';

const SeatIcon = ({ seatNumber, isOccupied, onClick }) => {
  const fillColor = isOccupied ? '#ff9900' : '#66cc33';

  return (
    <div onClick={onClick} style={{ cursor: 'pointer' }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 150"
        width="100px"
        height="150px"
        fill={fillColor}
      >
        <rect x="10" y="10" width="80" height="60" rx="15" ry="15" />
        <rect x="10" y="80" width="80" height="60" rx="15" ry="15" />
        <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="16">
          Seat {seatNumber}
        </text>
      </svg>
    </div>
  );
};

export default SeatIcon;
