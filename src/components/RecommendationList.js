import React from 'react';
import BookCard from './BookCard';

const RecommendationList = ({ recommendedBooks }) => {
  return (
    <div className="recommendation-list">
      <h2>Recommended Books</h2>
      <div className="book-list">
        {recommendedBooks.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default RecommendationList;
