import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { getLends, returnBook } from "../services/lendService";
import { getBook, saveBook } from "../services/bookService";
import { paginate } from "../utils/paginate";
import Pagination from "./common/pagination";
import LendsTable from "./lendsTable";
import SearchBox from "./searchBox";

function Lends() {
  const [lends, setLends] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const pageSize = 5;

  useEffect(async () => {
    const { data: lends } = await getLends();
    setLends(lends);
  }, []);

  const handleReturn = async (lend) => {
    const originalLends = lends;

    const mapLend = originalLends.map((l) => {
      if (l.dateOut === lend.dateOut) l.dateReturned = new Date().toISOString();
      return l;
    });
    setLends(mapLend);

    try {
      const { UserId, BookId, dateOut } = lend;
      const body = {
        userId: UserId,
        bookId: BookId,
        dateOut,
      };
      await returnBook(body);

      const { data: book } = await getBook(BookId);
      book.status = true;
      console.log(book);
      await saveBook(book);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This lend has already been returned.");

      setLends(originalLends);
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
    let filtered = lends;
    if (searchQuery)
      filtered = lends.filter((b) =>
        b.User.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );

    const paginateLends = paginate(filtered, currentPage, pageSize);

    return { totalCount: filtered.length, data: paginateLends };
  };
  const { data: allLends, totalCount } = getPagedData();

  const infoText =
    totalCount === 0
      ? "There are no lends in the database"
      : `Showing ${totalCount} lends in the database`;

  return (
    <div className="mx-3">
      <p>{infoText}</p>

      <SearchBox
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Search by User..."
      />

      <LendsTable lends={allLends} onReturn={handleReturn} />

      <Pagination
        itemsCount={totalCount}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default Lends;
