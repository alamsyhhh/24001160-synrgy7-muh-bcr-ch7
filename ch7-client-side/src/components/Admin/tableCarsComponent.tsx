import React, { useState } from 'react';
import { Car } from '../../services/carServices';
import formatDateTime from '../../utils/formatDateTimeUtil'; // Import the formatDateTime function

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
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Car;
    direction: 'asc' | 'desc';
  } | null>(null);

  const handleSort = (key: keyof Car) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig?.key === key && sortConfig?.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedCars = React.useMemo(() => {
    if (sortConfig !== null) {
      return [...cars].sort((a, b) => {
        const key = sortConfig?.key;
        const direction = sortConfig?.direction;

        if (a[key] !== undefined && b[key] !== undefined) {
          if (a[key]! < b[key]!) {
            return direction === 'asc' ? -1 : 1;
          }
          if (a[key]! > b[key]!) {
            return direction === 'asc' ? 1 : -1;
          }
        }

        return 0;
      });
    }
    return cars;
  }, [cars, sortConfig]);

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

  const getSortIcon = (key: keyof Car) => {
    if (!sortConfig || sortConfig.key !== key) {
      return '▼';
    }
    return sortConfig.direction === 'asc' ? '▲' : '▼';
  };

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
            <th scope="col" onClick={() => handleSort('name')}>
              Name {getSortIcon('name')}
            </th>
            <th scope="col" onClick={() => handleSort('category')}>
              Category {getSortIcon('category')}
            </th>
            <th scope="col" onClick={() => handleSort('price')}>
              Price {getSortIcon('price')}
            </th>
            <th scope="col" onClick={() => handleSort('startRent')}>
              Start Rent {getSortIcon('startRent')}
            </th>
            <th scope="col" onClick={() => handleSort('finishRent')}>
              Finish Rent {getSortIcon('finishRent')}
            </th>
            <th scope="col" onClick={() => handleSort('createdAt')}>
              Created At {getSortIcon('createdAt')}
            </th>
            <th scope="col" onClick={() => handleSort('updatedAt')}>
              Updated At {getSortIcon('updatedAt')}
            </th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={8} className="text-center">
                Loading...
              </td>
            </tr>
          ) : error ? (
            <tr>
              <td colSpan={8} className="text-center text-danger">
                {error}
              </td>
            </tr>
          ) : (
            sortedCars.map((car, index) => (
              <tr key={car.id}>
                <th scope="row">{(page - 1) * pageSize + index + 1}</th>
                <td>{car.name}</td>
                <td>{car.category}</td>
                <td>{car.price}</td>
                <td>{car.startRent ? formatDateTime(car.startRent) : '-'}</td>
                <td>{car.finishRent ? formatDateTime(car.finishRent) : '-'}</td>
                <td>{formatDateTime(car.createdAt)}</td>
                <td>{formatDateTime(car.updatedAt)}</td>
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
