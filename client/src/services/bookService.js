import http from "./httpService";

export function getBooks() {
  return http.get("/api/books");
}

export function getMovie(bookId) {
  return http.get(`/api/books/${bookId}`);
}

export function saveBook(book) {
  if (book.id) {
    const body = { ...book };
    delete body.id;
    return http.put(`/api/books/${book.id}`, body);
  }

  return http.post("/api/books", book);
}

export function deleteBook(bookId) {
  return http.delete(`/api/books/${bookId}`);
}
