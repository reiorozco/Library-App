import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import BookForm from "./components/bookForm";
import LendForm from "./components/lendForm";
import UserForm from "./components/userForm";
import NavBar from "./components/navBar";
import Books from "./components/books";
import NotFound from "./components/notFound";
import Lends from "./components/lends";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      <ToastContainer />

      <Routes>
        <Route index element={<Navigate to={"/books"} />} />

        <Route path={"books"} element={<NavBar />}>
          <Route index element={<Books />} />

          <Route path={":id"} element={<BookForm />} />
          <Route path={"lend/:id"} element={<LendForm />} />
          <Route path={"lends"} element={<Lends />} />
          <Route path={"user/:id"} element={<UserForm />} />

          <Route path={"*"} element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
