import React from "react";
import { Link } from "react-router-dom";
import Table from "./common/table";

function LendsTable({ lends, onReturn }) {
  const formatDate = (date) => {
    const options = {
      day: "numeric",
      year: "numeric",
      month: "long",
      hour: "numeric",
      minute: "numeric",
    };

    if (!date) return null;

    return new Date(date).toLocaleDateString("en-US", options);
  };

  const columns = [
    {
      label: "Date Out",
      content: (lend) => <div>{formatDate(lend.dateOut)}</div>,
    },
    {
      label: "Date Returned",
      content: (lend) => <div>{formatDate(lend.dateReturned) || "Lent"}</div>,
    },
    {
      label: "Book",
      content: (lend) => <div>{lend.Book.title}</div>,
    },
    {
      label: "User",
      content: (lend) => (
        <Link to={`/books/user/${lend.UserId}`}>{lend.User.name}</Link>
      ),
    },
    {
      key: "Return",
      content: (book) => (
        <button
          onClick={() => onReturn(book)}
          className="btn btn-danger btn-sm"
          disabled={book.dateReturned !== null}
        >
          Return
        </button>
      ),
    },
  ];

  return <Table columns={columns} data={lends} />;
}

export default LendsTable;
