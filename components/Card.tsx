
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-white dark:bg-dark-card shadow-lg rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 ${className}`}>
      {children}
    </div>
  );
};

export default Card;
