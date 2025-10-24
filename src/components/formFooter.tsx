"use client";

import Link from "next/link";

function FormFooter() {
  return (
    <div className="w-full text-center p-4 mt-2">
      <p className="text-sm text-gray-600">
        By clicking continue, you agree to our{" "}
        <Link
          href="/terms"
          className="font-medium text-blue-600 hover:text-blue-500"
        >
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link
          href="/privacy"
          className="font-medium text-blue-600 hover:text-blue-500"
        >
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );
}

export default FormFooter;
