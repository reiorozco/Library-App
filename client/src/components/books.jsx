import React, { useEffect, useState } from "react";
import { deleteBook, getBooks } from "../services/bookService";
import { paginate } from "../utils/paginate";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import SearchBox from "./searchBox";
import BooksTable from "./booksTable";
import Pagination from "./common/pagination";

function Books() {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const pageSize = 5;

  useEffect(async () => {
    const { data: books } = await getBooks();
    setBooks(books);
  }, []);

  const handleDelete = async (book) => {
    const originalBooks = books;
    const filterBooks = originalBooks.filter((b) => b.id !== book.id);
    setBooks(filterBooks);

    try {
      await deleteBook(book.id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This book has already been deleted.");

      setBooks(originalBooks);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const getPagedData = () => {
    let filtered = books;
    if (searchQuery)
      filtered = books.filter((b) =>
        b.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );

    const paginateBooks = paginate(filtered, currentPage, pageSize);

    return { totalCount: filtered.length, data: paginateBooks };
  };
  const { data: allBooks, totalCount } = getPagedData();

  const infoText =
    totalCount === 0
      ? "There are no books in the database"
      : `Showing ${totalCount} books in the database`;

  return (
    <div className="mx-3">
      <Link
        to="/books/new"
        className="btn btn-primary"
        style={{ marginBottom: 20 }}
      >
        New Book
      </Link>

      <p>{infoText}</p>

      <SearchBox
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Search..."
      />

      <BooksTable books={allBooks} onDelete={handleDelete} />

      <Pagination
        itemsCount={totalCount}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default Books;
