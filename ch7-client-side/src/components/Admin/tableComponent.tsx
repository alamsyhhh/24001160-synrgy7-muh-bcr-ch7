import React from 'react';
import { Car } from '../../services/carServices';

interface CarTableProps {
  cars: Car[];
  loading: boolean;
  error: string | null;
  page: number;
  pageSize: number;
  totalPages: number;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
}

const CarTable: React.FC<CarTableProps> = ({
  cars,
  loading,
  error,
  page,
  pageSize,
  totalPages,
  setPage,
  setPageSize,
}) => {
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(Number(e.target.value));
  };

  const handleJumpToPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPage(Number(e.target.value));
  };

  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <li key={i} className={`page-item ${page === i ? 'active' : ''}`}>
          <button className="page-link" onClick={() => handlePageChange(i)}>
            {i}
          </button>
        </li>
      );
    }
    return pages;
  };

  if (error) return <p>{error}</p>;

  return (
    <div className="mt-4">
      <div className="d-flex align-items-center mb-3">
        <img
          src="./img/Rectangle9.png"
          alt=""
          style={{ marginRight: '10px', height: '40px' }}
        />
        <h6 className="mb-0">List Car</h6>
      </div>
      <table className="table table-hover w-100">
        <thead className="table-primary">
          <tr>
            <th scope="col">No</th>
            <th scope="col">Name</th>
            <th scope="col">Category</th>
            <th scope="col">Price</th>
            <th scope="col">Start Rent</th>
            <th scope="col">Finish Rent</th>
            <th scope="col">Created At</th>
            <th scope="col">Updated At</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={8} className="text-center">
                Loading...
              </td>
            </tr>
          ) : (
            cars.map((car, index) => (
              <tr key={car.id}>
                <th scope="row">{(page - 1) * pageSize + index + 1}</th>
                <td>{car.name}</td>
                <td>{car.category}</td>
                <td>{car.price}</td>
                <td>{car.startRent || '-'}</td>
                <td>{car.finishRent || '-'}</td>
                <td>{new Date(car.createdAt).toLocaleDateString()}</td>
                <td>{new Date(car.updatedAt).toLocaleDateString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div className="d-flex justify-content-between align-items-center mt-3">
        <div className="d-flex align-items-center">
          <div className="mr-3 mb-5">
            <label>Limit</label>
            <select
              className="form-select"
              value={pageSize}
              onChange={handlePageSizeChange}
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>
          <div className="mx-4 mb-5">
            <label>Jump to page</label>
            <select
              className="form-select"
              value={page}
              onChange={handleJumpToPageChange}
            >
              {Array.from({ length: totalPages }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>
        </div>
        <nav className="ml-auto">
          <ul className="pagination mb-0">
            <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
              <button
                className="page-link"
                onClick={() => handlePageChange(page - 1)}
                aria-label="Previous"
              >
                &laquo;
              </button>
            </li>
            {renderPagination()}
            <li
              className={`page-item ${page === totalPages ? 'disabled' : ''}`}
            >
              <button
                className="page-link"
                onClick={() => handlePageChange(page + 1)}
                aria-label="Next"
              >
                &raquo;
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default CarTable;
