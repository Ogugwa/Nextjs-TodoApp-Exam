"use client";

import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { supabase } from "@/lib/supabaseClient";
import FormFooter from "../../components/formFooter";
import { useState } from "react";

type SignupFormInputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function Signup() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<SignupFormInputs>();

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: SignupFormInputs) => {
    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
    });
    setLoading(false);

    if (error) {
      alert(error.message);
    } else {
      alert("Signup successful! Please check your email to confirm.");
      router.push("/login"); // Redirect to login after signup
    }
  };

  const handleGoogleSignup = async () => {
    const { error } = await supabase.auth.signInWithOAuth({ provider: "google" });
    if (error) alert(error.message);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between shadow-xl overflow-hidden w-full lg:w-[80%]">
        {/* Left section */}
        <div className="flex flex-col items-center p-2">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Join Deborah&apos;s App</h1>
            <p className="mt-2 text-gray-600">Signup to enjoy the best of Deborah&apos;s App</p>
          </div>

          {/* Form */}
          <form className="flex flex-col space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="block text-md font-medium mb-2">Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full px-4 py-3 border border-gray-300 rounded-md"
                {...register("name", {
                  required: "Name is required",
                  minLength: { value: 3, message: "Name must be at least 3 characters" },
                })}
              />
              {errors.name && <span className="text-red-500">{errors.name.message}</span>}
            </div>

            <div>
              <label className="block text-md font-medium mb-2">Email</label>
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-md"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email address",
                  },
                })}
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

            <div>
              <label className="block text-md font-medium mb-2">Confirm Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-gray-300 rounded-md"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                })}
              />
              {errors.confirmPassword && (
                <span className="text-red-500">{errors.confirmPassword.message}</span>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-md font-medium text-white bg-blue-600 hover:bg-purple-500"
            >
              {loading ? "Signing up..." : "Signup"}
            </button>
          </form>

          {/* Divider + Google Signup */}
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
                onClick={handleGoogleSignup}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-blue-50"
              >
                <FcGoogle className="h-5 w-5" />
                Signup with Google
              </button>
            </div>

            <div className="mt-4 text-center text-sm text-gray-600">
              Already have a user?{" "}
              <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
                Login
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

      {/* Footer */}
      <FormFooter />
    </div>
  );
}
