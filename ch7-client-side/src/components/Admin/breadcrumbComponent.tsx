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
            {index > 0 && <span className="mx-1">{'>'}</span>}
            <li className="breadcrumb-item">
              {index < breadcrumbs.length - 1 ? (
                <a href="#">{breadcrumb}</a>
              ) : (
                <span>{breadcrumb}</span>
              )}
            </li>
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
