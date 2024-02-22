import { LoginForm } from "@/components/auth/login-form";
import { signIn } from "next-auth/react";
import React, { Suspense } from "react";

const LoginPage = () => {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
};

export default LoginPage;
