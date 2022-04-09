import React from "react";
import Joi from "joi";
import { Navigate } from "react-router-dom";

import { getBook, saveBook } from "../services/bookService";
import { saveLend } from "../services/lendService";
import { saveUser } from "../services/userService";
import withRouter from "../utils/withRouter";
import Form from "./common/form";

class LendForm extends Form {
  state = {
    data: {
      name: "",
      phone: "",
      email: "",
    },
    redirect: false,
    errors: {},
  };

  schema = Joi.object({
    name: Joi.string().min(3).max(21).required(),
    phone: Joi.string()
      .length(10)
      .pattern(/^[0-9]+$/)
      .required(),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
  });

  doSubmit = async () => {
    const { navigate } = this.props.router;
    const { id: bookId } = this.props.router.params;

    const { data } = await saveUser(this.state.data);
    const lend = { userId: data.user.id.toString(), bookId };
    console.log(lend);

    const { data: book } = await getBook(bookId);
    book.status = false;
    console.log(book);
    await saveBook(book);

    await saveLend(lend);

    navigate("/books/lends");
  };

  render() {
    if (this.state.redirect)
      return <Navigate to={"/not-found"} replace={true} />;

    return (
      <div className="mx-3">
        <h1>User Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "Name")}
          {this.renderInput("phone", "Phone")}
          {this.renderInput("email", "Email")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default withRouter(LendForm);
