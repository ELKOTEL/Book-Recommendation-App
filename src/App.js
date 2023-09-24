import React, { useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import BookList from './components/BookList';
import RecommendationList from './components/RecommendationList';
import axios from 'axios';

const API_KEY = 'AIzaSyCYB0C1dljRXTZP20e_4ndr5tLKXCiDmm4';
const BASE_URL = 'https://www.googleapis.com/books/v1/volumes';

const App = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [recommendedBooks, setRecommendedBooks] = useState([]);
  const userLikedGenres = ['fantasy', 'mystery']


  const handleSearch = async (query) => {
    try {
      const response = await axios.get(BASE_URL, {
        params: {
          q: query,
          key: API_KEY,
        },
      });
        console.log(response)
      const books = response.data.items.map((item) => ({
        id: item.id,
        title: item.volumeInfo.title,
        author: item.volumeInfo.authors ? item.volumeInfo.authors[0] : 'Unknown',
        thumbnail: item.volumeInfo.imageLinks?.thumbnail || '',
      }));

      setSearchResults(books);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };
  const handleRecommend = async (query) => {
    try {
      const responsee = await axios.get(BASE_URL, {
        params: {
          key: API_KEY,
        },
      });
     // console.log(responsee)
      const result = searchResults.filter((item) => ({
        id: item.id,
        title: item.volumeInfo.title,
        author: item.volumeInfo.authors ? item.volumeInfo.authors[0] : 'Unknown',
        thumbnail: item.volumeInfo.imageLinks?.thumbnail || '',
      }));

      setRecommendedBooks(result);
    } catch (error) {
      console.error('Error filtring books:', error);
    }
  };

  return (
    <div className="app">
      <h1>Book Recommendation App</h1>
      <SearchBar onSearch={handleSearch} />
      <BookList books={searchResults} />
      <RecommendationList recommendedBooks={recommendedBooks} />
    </div>
  );
};

export default App;
