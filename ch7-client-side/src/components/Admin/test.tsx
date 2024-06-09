import React from 'react';

interface BreadcrumbProps {
  breadcrumbs: string[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ breadcrumbs }) => {
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        {breadcrumbs.map((breadcrumb, index) => (
          <li key={index} className="breadcrumb-item">
            {index < breadcrumbs.length - 1 ? (
              <a href="#">{breadcrumb}</a>
            ) : (
              <span>{breadcrumb}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
