import React from 'react';

interface CarFilterButtonProps {
  label: string;
  onClick: () => void;
  isActive: boolean;
}

const CarFilterButton: React.FC<CarFilterButtonProps> = ({
  label,
  onClick,
  isActive,
}) => {
  return (
    <button
      type="button"
      className={`cark btn ${isActive ? 'btn-primary' : 'btn-outline-primary'}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default CarFilterButton;
