import http from "./httpService";

export function getLends() {
  return http.get("/api/lends");
}

export function saveLend(lend) {
  return http.post("/api/lends", lend);
}

export function returnBook(lend) {
  return http.post("/api/returns", lend);
}
