import React from 'react';

interface BreadcrumbProps {
  breadcrumbs: React.ReactNode[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ breadcrumbs }) => {
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        {breadcrumbs.map((breadcrumb, index) => (
          <React.Fragment key={index}>
            <li className="breadcrumb-item">
              {index < breadcrumbs.length - 1 ? (
                <a href="#" className="breadcrumb-separator">
                  {breadcrumb}
                </a>
              ) : (
                <span>{breadcrumb}</span>
              )}
            </li>
            {index < breadcrumbs.length - 1 && (
              <span className="breadcrumb-separator">{' > '}</span>
            )}
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
