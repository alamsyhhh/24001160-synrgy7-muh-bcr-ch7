import React from 'react';
import { useNavigate } from 'react-router-dom';

interface ButtonComponentProps {
  label: string;
  navigateTo?: string;
}

const ButtonComponent: React.FC<ButtonComponentProps> = ({
  label,
  navigateTo,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (navigateTo) {
      navigate(navigateTo);
    }
  };

  return (
    <button className="btn btn-success" onClick={handleClick}>
      {label}
    </button>
  );
};

export default ButtonComponent;
