import React from "react";
import Nav from "../components/Nav";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "./Contact.css";
import Heading from "../components/Heading";

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Please enter your name")
    .min(4, "Name must be at least 4 characters"),
  age: yup
    .number()
    .required()
    .positive()
    .integer()
    .min(10, "Must be older than 10")
    .max(20, "Must be younger than 20"),
  website: yup
    .string()
    .required("Please enter url")
    .url("Must start with: http:// or https://"),
});

function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function onSubmit(data) {
    console.log(data);
  }

  console.log(errors);
  return (
    <>
      <Nav />
      <Heading title="Contact" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-container">
          <label for="name">Your name</label>
          <input {...register("name")} />
          {errors.name && <span>{errors.name.message}</span>}
        </div>
        <div className="input-container">
          <label for="number">Your age</label>
          <input type="number" {...register("age", { min: 10, max: 20 })} />
          {errors.age && <span>{"Must be between 10 and 20"}</span>}
        </div>
        <div className="input-container">
          <label>Website</label>
          <input
            {...register("website", {
              pattern:
                /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi,
            })}
          />
          {errors.website && <span>{errors.website.message}</span>}
        </div>

        <button>Submit</button>
      </form>
    </>
  );
}

export default Contact;
