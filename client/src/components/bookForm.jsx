import React from "react";
import Joi from "joi";
import { Navigate } from "react-router-dom";

import { getBook, saveBook } from "../services/bookService";
import withRouter from "../utils/withRouter";
import Form from "./common/form";

class BookForm extends Form {
  state = {
    data: {
      title: "",
    },
    redirect: false,
    errors: {},
  };

  schema = Joi.object({
    id: Joi.number(),
    title: Joi.string().label("Title").required(),
    status: Joi.boolean(),
  });

  async populateBook() {
    try {
      const { id: bookId } = this.props.router.params;
      console.log(bookId);
      if (bookId === "new") return;

      const { data: book } = await getBook(bookId);
      console.log(book);
      this.setState({ data: book });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.setState({ redirect: true });
    }
  }

  async componentDidMount() {
    await this.populateBook();
  }

  doSubmit = async () => {
    const { navigate } = this.props.router;

    await saveBook(this.state.data);

    navigate("/");
  };

  render() {
    if (this.state.redirect)
      return <Navigate to={"/not-found"} replace={true} />;

    return (
      <div className="mx-3">
        <h1>Book Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default withRouter(BookForm);
