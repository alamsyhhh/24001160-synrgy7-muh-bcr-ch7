import React from 'react';

const CarCardShimmer: React.FC = () => {
  return (
    <div className="col-sm-4 mb-3 mt-3 mb-sm-4">
      <div className="card shimmer-card">
        <div className="shimmer-img"></div>
        <div className="card-body">
          <div className="shimmer-title"></div>
          <div className="shimmer-price"></div>
          <div className="shimmer-info"></div>
          <div className="shimmer-info"></div>
          <div className="shimmer-buttons"></div>
        </div>
      </div>
    </div>
  );
};

export default CarCardShimmer;
