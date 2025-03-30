import React, { useState } from 'react';
import { FiSearch, FiX, FiFilter, FiDatabase, FiServer, FiTable } from 'react-icons/fi';
import './searchbar.css'

function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [recentSearches, setRecentSearches] = useState([
    'student enrollment stats', 
    'database performance', 
    'query optimization'
  ]);

  // Sample search results
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    
    // Simulate API call with setTimeout
    setTimeout(() => {
      // Mock search results based on the query
      const mockResults = [
        {
          id: 1,
          title: "Database Structure Analysis",
          type: "document",
          icon: <FiDatabase />,
          preview: "Analysis of the current database structure and recommendations for optimization..."
        },
        {
          id: 2,
          title: "Query Performance Log",
          type: "report",
          icon: <FiServer />,
          preview: "Log of query performance metrics showing execution times and resource usage..."
        },
        {
          id: 3,
          title: "Student Records - CS301",
          type: "data",
          icon: <FiTable />,
          preview: "Student enrollment and performance data for Database Management Systems course..."
        }
      ];
      
      setSearchResults(mockResults);
      setIsSearching(false);
      
      // Add to recent searches if not already there
      if (!recentSearches.includes(searchQuery)) {
        setRecentSearches(prev => [searchQuery, ...prev].slice(0, 5));
      }
    }, 800);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSearch} className="search-form">
        <div className="search-input-container">
          <FiSearch className="search-icon" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search database objects, queries, or documents..."
            className="search-input"
          />
          {searchQuery && (
            <button type="button" onClick={clearSearch} className="clear-button">
              <FiX />
            </button>
          )}
          <button 
            type="button" 
            className={`filter-button ${showFilters ? 'active' : ''}`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <FiFilter />
          </button>
          <button type="submit" className="search-button">
            Search
          </button>
        </div>
        
        {showFilters && (
          <div className="filters-container">
            <div className="filter-options">
              <button 
                className={`filter-option ${selectedFilter === 'all' ? 'selected' : ''}`}
                onClick={() => setSelectedFilter('all')}
              >
                All
              </button>
              <button 
                className={`filter-option ${selectedFilter === 'tables' ? 'selected' : ''}`}
                onClick={() => setSelectedFilter('tables')}
              >
                Tables
              </button>
              <button 
                className={`filter-option ${selectedFilter === 'queries' ? 'selected' : ''}`}
                onClick={() => setSelectedFilter('queries')}
              >
                Queries
              </button>
              <button 
                className={`filter-option ${selectedFilter === 'reports' ? 'selected' : ''}`}
                onClick={() => setSelectedFilter('reports')}
              >
                Reports
              </button>
              <button 
                className={`filter-option ${selectedFilter === 'docs' ? 'selected' : ''}`}
                onClick={() => setSelectedFilter('docs')}
              >
                Documentation
              </button>
            </div>
          </div>
        )}
      </form>

      {/* Recent searches */}
      {!searchResults.length && !isSearching && searchQuery === '' && (
        <div className="recent-searches">
          <h3 className="recent-searches-title">Recent Searches</h3>
          <ul className="recent-searches-list">
            {recentSearches.map((search, index) => (
              <li key={index} className="recent-search-item">
                <button 
                  onClick={() => setSearchQuery(search)}
                  className="recent-search-button"
                >
                  <FiSearch className="recent-search-icon" />
                  <span>{search}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Search results */}
      {isSearching && (
        <div className="search-results">
          <div className="search-loading">
            <div className="search-spinner"></div>
            <p>Searching database resources...</p>
          </div>
        </div>
      )}

      {searchResults.length > 0 && (
        <div className="search-results">
          <h3 className="results-title">Search Results for "{searchQuery}"</h3>
          <ul className="results-list">
            {searchResults.map(result => (
              <li key={result.id} className="result-item">
                <div className="result-icon">{result.icon}</div>
                <div className="result-content">
                  <h4 className="result-title">{result.title}</h4>
                  <span className="result-type">{result.type}</span>
                  <p className="result-preview">{result.preview}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SearchBar;