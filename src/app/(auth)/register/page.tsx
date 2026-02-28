"use client";

import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useCreateUserMutation } from "@/lib/services/userApi";
import Link from "next/link";

interface IFormInput {
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
  address: string;
}

const RegisterPage = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const [registerFn, { isLoading }] = useCreateUserMutation();

  const userRegisterSubmit = async (data: IFormInput) => {
    try {
      const response = await registerFn(data).unwrap();
      console.log(response);
      toast.success("Registration Successful");
      if (response?.data?.role === "ADMIN") {
        router.push("/admin/overview");
      } else {
        router.push("/cashier");
      }
      Cookies.set("accessToken", response?.data?.accessToken);
    } catch (error: any) {
      toast.error(error?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8 space-y-6">
        <div className="text-center">
          <p className="text-2xl font-bold">
            Easy <span className="text-purple-600">POS</span>
          </p>
          <p className="text-gray-500">Register to your account</p>
        </div>

        <form onSubmit={handleSubmit(userRegisterSubmit)} className="space-y-4">
          <div>
            <input
              type="text"
              {...register("fullName", {
                required: "Full name is required",
              })}
              placeholder="Full Name"
              className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-50 ${
                errors.fullName ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.fullName.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
              placeholder="Email"
              className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-50 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="text"
              {...register("phoneNumber", {
                required: "Phone number is required",
              })}
              placeholder="Phone Number"
              className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-50 ${
                errors.phoneNumber ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
              })}
              placeholder="Password"
              className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-50 ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="text"
              {...register("address", {
                required: "Address is required",
              })}
              placeholder="Address"
              className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-50 ${
                errors.address ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">
                {errors.address.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition duration-300"
            disabled={isLoading}
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-center text-gray-500 text-sm mt-4">
          Don't have an account?{" "}
          <Link href="/" className="text-purple-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
