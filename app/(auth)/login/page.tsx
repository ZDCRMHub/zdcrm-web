"use client";

import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/auth";
import { Spinner } from "@/components/ui";
import useErrorModalState from "@/hooks/useErrorModalState";
import ErrorModal from "@/components/ui/modal-error";
import { formatAxiosErrorMessage } from "@/utils/errors";
import Wave from "@/public/img/wave.gif";
import Image from "next/image";

// ----------------- Validation Schema -----------------

const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters")
});

type LoginFormData = z.infer<typeof LoginSchema>;

// ----------------- Component -----------------

const LoginPage = () => {
  const router = useRouter();
  const { useSignIn: useLogin } = useAuth();
  const { mutate: handleLogin, isPending: isLoggingIn } = useLogin();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema)
  });

  // Watch values for button disabled state
  const email = watch("email");
  const password = watch("password");

  const isButtonDisabled =
    isLoggingIn || !email || !password || email === "" || password === "";

  const {
    isErrorModalOpen,
    errorModalMessage,
    openErrorModalWithMessage,
    closeErrorModal,
    setErrorModalState
  } = useErrorModalState();

  // ---------------- Handle Submit ----------------

  const onSubmit = (data: LoginFormData) => {
    handleLogin(
      {
        email: data.email,
        password: data.password
      },
      {
        onSuccess: () => router.push("/order-timeline"),
        onError: (error: unknown) => {
          const errorMessage = formatAxiosErrorMessage(error as any);
          openErrorModalWithMessage(errorMessage);
        }
      }
    );
  };

  return (
    <div className="min-h-screen bg-white flex justify-center items-center p-4">
      <div className="w-full max-w-[480px]">
        <h1 className="text-5xl font-semibold font-dm-sans text-center mb-2">
          Welcome Back <span className="inline-block">
            <Image src={Wave} alt="Loading…"
              width={40}
              height={40}
              unoptimized />
          </span>
        </h1>

        <p className="text-gray-500 text-[14.5px] text-center mb-12">
          Kindly login with necessary credentials and access to your dashboard
        </p>

        {/* ----------- Form ----------- */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-6">
          <p>LOGIN</p>

          <Input
            type="email"
            placeholder="Enter Email"
            {...register("email")}
            hasError={!!errors.email}
            errorMessage={errors?.email?.message}
            className="!border-[#31a6f980] placeholder:text-[#4F4F4F]"
          />

          <div>
            <Input
              type="password"
              placeholder="Enter Password"
              {...register("password")}
              hasError={!!errors.password}
              errorMessage={errors?.password?.message}
              className="!border-[#31a6f980] placeholder:text-[#4F4F4F]"
            />
            <div className="flex justify-end">
              <Link href="/reset-password" className="text-sm block mt-3 hover:underline">
                Forgot Password? <span className="text-red-500 font-medium"> Reset</span>
              </Link>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isButtonDisabled}
            className="bg-[#17181C] w-full h-[70px] mt-8 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#17181C]"
          >
            Continue
            {isLoggingIn && <Spinner className="ml-2" />}
          </Button>
        </form>
      </div>

      {/* ------------ Error Modal ------------ */}
      <ErrorModal
        heading="An error Occured"
        subheading={errorModalMessage || "Check your inputs"}
        isErrorModalOpen={isErrorModalOpen}
        setErrorModalState={setErrorModalState}
      >
        <div className="p-5 rounded-t-2xl rounded-b-3xl bg-red-200">
          <Button variant="destructive" className="w-full" onClick={closeErrorModal}>
            Okay
          </Button>
        </div>
      </ErrorModal>
    </div>
  );
};

export default LoginPage;
