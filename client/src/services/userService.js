import http from "./httpService";

export function getUsers() {
  return http.get("/api/users");
}

export function getUser(bookId) {
  return http.get(`/api/users/${bookId}`);
}

export function saveUser(user) {
  if (user.id) {
    const body = { ...user };
    delete body.id;
    return http.put(`/api/users/${user.id}`, body);
  }

  return http.post("/api/users", user);
}

export function deleteUser(userId) {
  return http.delete(`/api/users/${userId}`);
}
