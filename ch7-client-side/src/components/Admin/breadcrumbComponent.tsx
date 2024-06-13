import React from 'react';
import { Link } from 'react-router-dom';

interface BreadcrumbProps {
  breadcrumbs: { label: string; path: string }[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ breadcrumbs }) => {
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        {breadcrumbs.map((breadcrumb, index) => (
          <React.Fragment key={index}>
            <li className="breadcrumb-item">
              {index < breadcrumbs.length - 1 ? (
                <Link to={breadcrumb.path} className="breadcrumb-link">
                  {breadcrumb.label}
                </Link>
              ) : (
                <span>{breadcrumb.label}</span>
              )}
            </li>
            {index < breadcrumbs.length - 1 && (
              <span className="breadcrumb-separator mx-2"> {' > '}</span>
            )}
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
