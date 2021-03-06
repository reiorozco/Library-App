import React from "react";
import { Link } from "react-router-dom";
import Table from "./common/table";

function BooksTable({ books, onDelete }) {
  const columns = [
    {
      label: "Title",
      content: (book) => <Link to={`/books/${book.id}`}>{book.title}</Link>,
    },
    {
      key: "Lend",
      content: (book) => (
        <Link
          to={`/books/lend/${book.id}`}
          className={book.status === false ? "btn disabled p-0" : null}
        >
          <button className="btn btn-primary btn-sm">Lend</button>
        </Link>
      ),
    },
    {
      key: "delete",
      content: (book) => (
        <button
          onClick={() => onDelete(book)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      ),
    },
  ];

  return <Table columns={columns} data={books} />;
}

export default BooksTable;
