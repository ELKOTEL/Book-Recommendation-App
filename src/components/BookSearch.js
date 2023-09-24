import React, { useState } from 'react';
import axios from 'axios';

const API_KEY = 'AIzaSyCYB0C1dljRXTZP20e_4ndr5tLKXCiDmm4';
const BASE_URL = 'https://www.googleapis.com/books/v1/volumes';

const BookSearch = () => {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(BASE_URL, {
        params: {
          q: query,
          key: API_KEY,
        },
      });

      const fetchedBooks = response.data.items || [];
      setBooks(fetchedBooks);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  return (
    <div>
      <h1>Book Search</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter a search query"
      />
      <button onClick={handleSearch}>Search</button>
      
      <div>
        {books.map((book) => (
          <div key={book.id}>
            <h2>{book.volumeInfo.title}</h2>
            <p>Author: {book.volumeInfo.authors}</p>
            <p>Description: {book.volumeInfo.description}</p>
            {/* You can display more information as needed */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookSearch;
