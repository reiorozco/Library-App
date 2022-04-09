import React from "react";
import Joi from "joi";
import { Navigate } from "react-router-dom";

import withRouter from "../utils/withRouter";
import Form from "./common/form";

import { getUser, saveUser } from "../services/userService";

class UserForm extends Form {
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
    id: Joi.number(),
    name: Joi.string().min(3).max(21).required(),
    phone: Joi.string()
      .length(10)
      .pattern(/^[0-9]+$/)
      .message("“phone” must be only numbers.")
      .required(),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
  });

  async populateUser() {
    try {
      const { id: userId } = this.props.router.params;
      console.log(userId);

      const { data: user } = await getUser(userId);
      console.log(user);
      this.setState({ data: user });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  async componentDidMount() {
    await this.populateUser();
  }

  doSubmit = async () => {
    const { navigate } = this.props.router;

    await saveUser(this.state.data);

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

export default withRouter(UserForm);
