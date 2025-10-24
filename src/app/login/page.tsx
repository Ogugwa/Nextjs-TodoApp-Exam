"use client";

import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import FormFooter from "../../components/formFooter";
import { supabase } from "@/lib/supabaseClient";
import { useState } from "react";

type LoginFormInputs = {
  email: string;
  password: string;
};

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>({
    defaultValues: { email: "", password: "" },
  });

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Email/password login
  const onSubmit = async (data: LoginFormInputs) => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });
    setLoading(false);

    if (error) {
      alert(error.message);
    } else {
      router.push("/basetodo"); // Redirect after login
    }
  };

  // Google login
  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({ provider: "google" });
    if (error) alert(error.message);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between shadow-xl overflow-hidden w-full lg:w-[80%]">
        {/* Left side */}
        <div className="flex flex-col items-center p-2">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Welcome back</h1>
            <p className="mt-2 text-gray-600">Login to your Deborah&apos;s App Account</p>
          </div>

          {/* Form */}
          <form className="flex flex-col space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="block text-md font-medium mb-2">Email</label>
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-md"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && <span className="text-red-500">{errors.email.message}</span>}
            </div>

            <div>
              <label className="block text-md font-medium mb-2">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-gray-300 rounded-md"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 8, message: "Password must be at least 8 characters" },
                })}
              />
              {errors.password && <span className="text-red-500">{errors.password.message}</span>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-md font-medium text-white bg-blue-600 hover:bg-purple-500"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Divider + Google login */}
          <div className="mt-6 text-center">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white">Or</span>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-blue-50"
              >
                <FcGoogle className="h-5 w-5" />
                Login with Google
              </button>
            </div>

            <div className="mt-4 text-center text-sm text-gray-600">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="font-medium text-blue-600 hover:text-blue-500">
                Sign Up
              </Link>
            </div>
          </div>
        </div>

        {/* Right side image */}
        <div className="hidden lg:block">
          <img
            src="/images/login_img.jpg"
            alt="Login illustration"
            className="w-full max-w-md h-auto"
            loading="lazy"
          />
        </div>
      </div>

      <FormFooter />
    </div>
  );
}
