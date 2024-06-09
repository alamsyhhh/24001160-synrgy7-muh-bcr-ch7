import React from 'react';

interface AccordionItemProps {
  id: string;
  header: string;
  body: string;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ id, header, body }) => {
  return (
    <div className="accordion-item">
      <h2 className="accordion-header" id={`heading${id}`}>
        <button
          className="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#collapse${id}`}
          aria-expanded="false"
          aria-controls={`collapse${id}`}
        >
          {header}
        </button>
      </h2>
      <div
        id={`collapse${id}`}
        className="accordion-collapse collapse"
        aria-labelledby={`heading${id}`}
        data-bs-parent="#accordionExample"
      >
        <div className="accordion-body">{body}</div>
      </div>
    </div>
  );
};

export default AccordionItem;
