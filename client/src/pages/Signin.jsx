import React from "react";
import FieldInput from "../components/form/FieldInput";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "../components/Button";
import { toast } from "sonner";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth-context";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const Signin = () => {
  const navigate = useNavigate();
  const { setCurrentUser } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid, isSubmitting, errors },
  } = useForm({
    mode: "onchange",
    resolver: yupResolver(schema),
    defaultValues: {
      password: "",
      email: "",
    },
  });

  const onSubmit = async (values) => {
    if (!isValid) return;

    try {
      const res = await axios.post("/api/auth/signin", values);
      const data = await res.data;
      if (!data) return;

      setCurrentUser(data);
      localStorage.setItem("User", JSON.stringify(data));

      reset({
        password: "",
        email: "",
      });
      toast.success("Welcome to chat app!");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data);
    }
  };

  return (
    <section className="flex items-center justify-center h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-darkGraphite p-5 w-full max-w-md rounded-md"
      >
        <h1 className="text-3xl font-bold">Sign in</h1>

        <div className="flex flex-col gap-3 mt-5">
          <FieldInput
            name="email"
            register={register}
            placeholder="Enter email..."
            error={errors.email?.message}
          />
          <FieldInput
            name="password"
            register={register}
            placeholder="Enter password..."
            error={errors.password?.message}
          />

          <div className="text-sm font-medium">
            Not have an account?{" "}
            <Link className="hover:underline text-blue-500" to="/sign-up">
              Sign up
            </Link>
          </div>

          <Button type="submit" isLoading={isSubmitting}>
            Submit
          </Button>
        </div>
      </form>
    </section>
  );
};

export default Signin;
