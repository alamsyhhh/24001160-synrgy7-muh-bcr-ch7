import React, { useState } from 'react';
import { User } from '../../services/userService';

interface UserTableProps {
  users: User[];
  loading: boolean;
  error: string | null;
  page: number;
  pageSize: number;
  totalPages: number;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
}

const UserTable: React.FC<UserTableProps> = ({
  users,
  loading,
  error,
  page,
  pageSize,
  totalPages,
  setPage,
  setPageSize,
}) => {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof User;
    direction: 'asc' | 'desc';
  } | null>(null);

  const handleSort = (key: keyof User) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig?.key === key && sortConfig?.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedUsers = React.useMemo(() => {
    if (sortConfig !== null) {
      return [...users].sort((a, b) => {
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
    return users;
  }, [users, sortConfig]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(Number(e.target.value));
    setPage(1); // Always set page to 1 when pageSize changes
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

  const getSortIcon = (key: keyof User) => {
    if (!sortConfig || sortConfig.key !== key) {
      return '▼';
    }
    return sortConfig.direction === 'asc' ? '▲' : '▼';
  };

  return (
    <div className="mt-1">
      <div className="d-flex align-items-center mb-3">
        <img
          src="./img/Rectangle9.png"
          alt=""
          style={{ marginRight: '10px', height: '40px' }}
        />
        <h6 className="mb-0">List Users</h6>
      </div>
      <table className="table table-lg table-hover w-100">
        <thead className="table-primary">
          <tr>
            <th scope="col">No</th>
            <th
              scope="col"
              className="sortable"
              onClick={() => handleSort('email')}
            >
              <span>Email</span>
              <span className="sort-icon">{getSortIcon('email')}</span>
            </th>
            <th
              scope="col"
              className="sortable"
              onClick={() => handleSort('username')}
            >
              <span>Username</span>
              <span className="sort-icon">{getSortIcon('username')}</span>
            </th>
            <th
              scope="col"
              className="sortable"
              onClick={() => handleSort('role')}
            >
              <span>Role</span>
              <span className="sort-icon">{getSortIcon('role')}</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={4} className="text-center">
                Loading...
              </td>
            </tr>
          ) : error ? (
            <tr>
              <td colSpan={4} className="text-center text-danger">
                {error}
              </td>
            </tr>
          ) : (
            sortedUsers.map((user, index) => (
              <tr key={user.id}>
                <th scope="row">{(page - 1) * pageSize + index + 1}</th>
                <td>{user.email}</td>
                <td>{user.username}</td>
                <td>{user.role}</td>
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

export default UserTable;
