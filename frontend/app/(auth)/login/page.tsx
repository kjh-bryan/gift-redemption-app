import { LoginForm } from "@/components/auth/login-form";
import { signIn } from "next-auth/react";
import React from "react";

const LoginPage = () => {
  return <LoginForm />;
};

export default LoginPage;
