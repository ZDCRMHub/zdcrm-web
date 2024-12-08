"use client"

import React, { useState, useEffect } from "react"
import { useForm, Controller } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { Spinner } from "@/components/ui"
import { ShieldAlert } from 'lucide-react'
import { useSignUp, useVerifyInvite, useVerifyOTP } from "../misc/api"

const signUpSchema = z
  .object({
    name: z.string().min(1, "Full name is required"),
    phone: z
      .string()
      .min(10, "Phone number must be at least 10 digits")
      .regex(/^\d+$/, "Phone number must contain only numbers"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  })

const otpSchema = z.object({
  otp: z
    .string()
    .length(6, "OTP must be exactly 6 digits")
    .regex(/^\d+$/, "OTP must contain only numbers"),
})

type SignUpFormData = z.infer<typeof signUpSchema>
type OtpFormData = z.infer<typeof otpSchema>

export default function SignUpForm() {
  const router = useRouter()
  const [inviteToken, setInviteToken] = useState<string | null>(null)
  const [step, setStep] = useState<"form" | "otp">("form")
  const [email, setEmail] = useState<string | undefined>(undefined)

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    const token = searchParams.get("token")
    setInviteToken(token)
  }, [])

  const { data, isLoading: isVerifyingToken, isError, error } = useVerifyInvite(inviteToken!)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      phone: "",
      password: "",
      confirm_password: "",
    },
  })

  const {
    control: otpControl,
    handleSubmit: handleOtpSubmit,
    formState: { errors: otpErrors },
  } = useForm<OtpFormData>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: "" },
  })

  const { mutate: signup, isPending: isSigningup } = useSignUp()
  const handleSignUpSubmit = (formData: SignUpFormData) => {
    setEmail(data?.email)
    signup(
      {
        name: formData.name,
        password: formData.password,
        email: data?.email || "",
        phone: formData.phone,
        token: inviteToken || ""
      },
      {
        onSuccess() {
          setStep("otp")
        },
      }
    )
  }

  const { mutate: verifyOTP } = useVerifyOTP()
  const handleOtpVerification = async (otpData: OtpFormData) => {
    try {
      verifyOTP({ otp: otpData.otp, email: email || "" },
        {
          onSuccess() {
            router.push("/login")
          },
        }
      )
    } catch (error) {
      console.error("OTP Verification Failed:", error)
    }
  }

  const inputClassName = "h-[70px] p-6"

  if (isVerifyingToken) {
    return (
      <div className="w-full max-w-md flex items-center justify-center">
        <Spinner size={50} />
      </div>
    )
  }

  if ((isError && (error as any)?.response?.data?.error?.summary === "Invalid invitation token") || !inviteToken) {
    return (
      <div className="w-full max-w-md mx-auto flex flex-col items-center justify-center text-center">
        <ShieldAlert size={100} className="text-red-500" />
        <h3 className="text-red-500 text-2xl">
          {!inviteToken ? "No Invite Token" : "Invalid Token"}
        </h3>
        <p className="text-red-400">
          If you were sent an invite link, please check the link and try again.
          If you still encounter this problem, talk to your admin.
        </p>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md">
      <h1 className="text-2xl font-bold text-center mb-2">Get Started</h1>
      <p className="text-gray-500 text-center mb-6">
        {step === "form" ? "Enter your personal details to" : "Enter your OTP to"}
        {" "} complete signup on ZDCRM Hub
      </p>
      {step === "form" ? (
        <form onSubmit={handleSubmit(handleSignUpSubmit)} className="space-y-6">
          <p className="font-medium">PERSONAL INFORMATION</p>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Enter Full Name"
                className={inputClassName}
                hasError={!!errors.name}
                errorMessage={errors?.name?.message}
              />
            )}
          />
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="tel"
                placeholder="Enter Phone Number"
                className={inputClassName}
                hasError={!!errors.phone}
                errorMessage={errors?.phone?.message}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="password"
                placeholder="Enter Password"
                className={inputClassName}
                hasError={!!errors.password}
                errorMessage={errors?.password?.message}
              />
            )}
          />
          <Controller
            name="confirm_password"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="password"
                placeholder="Confirm Password"
                className={inputClassName}
                hasError={!!errors.confirm_password}
                errorMessage={errors?.confirm_password?.message}
              />
            )}
          />
          <Button type="submit" className="flex items-center gap-2 w-full h-[70px]">
            Continue
            {isSigningup && <Spinner/>}
          </Button>
        </form>
      ) : (
        <form onSubmit={handleOtpSubmit(handleOtpVerification)} className="space-y-6">
          <p className="font-medium">ENTER OTP</p>
          <Controller
            name="otp"
            control={otpControl}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Enter OTP"
                className={inputClassName}
                hasError={!!otpErrors.otp}
                errorMessage={otpErrors?.otp?.message}
              />
            )}
          />
          <Button type="submit" className="w-full h-[70px]">
            Verify OTP
          </Button>
        </form>
      )}
    </div>
  )
}

