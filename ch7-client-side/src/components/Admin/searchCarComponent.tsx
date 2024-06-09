import React, { useState } from 'react';

interface SearchProps {
  onSearch: (value: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <form onSubmit={handleSearchSubmit} className="header_search">
      <input
        className="header_search_input"
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <button className="header_search_button" type="submit">
        <i className="bx bx-search"></i>
      </button>
    </form>
  );
};

export default Search;
