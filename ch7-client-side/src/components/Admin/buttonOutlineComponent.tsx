import React from 'react';

interface CarFilterButtonProps {
  label: string;
  onClick: () => void;
  isActive: boolean;
  isWarning: boolean; // Add new prop for warning color
}

const CarFilterButton: React.FC<CarFilterButtonProps> = ({
  label,
  onClick,
  isActive,
  isWarning,
}) => {
  const buttonClass = isWarning
    ? isActive
      ? 'btn-primary'
      : 'btn-outline-primary'
    : isActive
    ? 'btn-info'
    : 'btn-outline-info';

  return (
    <button
      type="button"
      className={`cark btn ${buttonClass}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default CarFilterButton;
