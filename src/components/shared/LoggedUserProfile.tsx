"use client";
import {
  useMyProfileQuery,
  useProfileUpdateMutation,
} from "@/lib/services/userApi";
import { Info } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

// Define the type for the form data
interface ProfileFormValues {
  fullName: string;
  email: string;
  address: string;
  phoneNumber: string;
}

const LoggedUserProfile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<ProfileFormValues>({
    defaultValues: {
      fullName: "",
      email: "",
      address: "",
      phoneNumber: "",
    },
  });

  const { data: profileInfo, isLoading } = useMyProfileQuery("");
  const [updateProfile, { isLoading: isUpdating }] = useProfileUpdateMutation();

  useEffect(() => {
    if (profileInfo?.data) {
      reset({
        fullName: profileInfo.data.fullName || "",
        email: profileInfo.data.email || "",
        address: profileInfo.data.address || "",
        phoneNumber: profileInfo.data.phoneNumber || "",
      });
    }
  }, [profileInfo, reset, setValue]);

  if (isLoading) return <p>Loading...</p>;

  const onSubmit = async (data: ProfileFormValues) => {
    try {
      const response = await updateProfile(data).unwrap();
      toast.success(response.message);
    } catch (error: any) {
      toast.error(error.message || "Failed to update profile.");
    }
  };

  return (
    <div className="flex justify-start">
      <div className="lg:w-2/3 w-full lg:px-20 p-2 lg:py-8 bg-white rounded-lg shadow-md">
        <h2 className="flex items-center gap-2 text-2xl font-semibold text-gray-800 mb-6">
          Profile Information <Info />
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex gap-4">
            <div className="w-1/2">
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <div className="mt-1">
                <input
                  id="fullName"
                  type="text"
                  placeholder="Full Name"
                  {...register("fullName", {
                    required: "Full name is required",
                  })}
                  className={`w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.fullName ? "border-red-500 focus:ring-red-500" : ""
                  }`}
                />
              </div>
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            <div className="w-1/2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <div className="mt-1">
                <input
                  disabled
                  id="email"
                  type="email"
                  placeholder="Email"
                  {...register("email")}
                  className={`w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.email ? "border-red-500 focus:ring-red-500" : ""
                  }`}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-1/2">
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Phone No
              </label>
              <div className="mt-1">
                <input
                  id="phoneNumber"
                  type="tel"
                  placeholder="Phone No"
                  {...register("phoneNumber")}
                  className={`w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.phoneNumber
                      ? "border-red-500 focus:ring-red-500"
                      : ""
                  }`}
                />
              </div>
              {errors.phoneNumber && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>
            <div className="w-1/2">
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
                Address
              </label>
              <div className="mt-1">
                <input
                  id="address"
                  type="text"
                  placeholder="Address"
                  {...register("address", {
                    required: "Address is required",
                  })}
                  className={`w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.address ? "border-red-500 focus:ring-red-500" : ""
                  }`}
                />
              </div>
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.address.message}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="cursor-pointer lg:w-1/6 w-full py-2.5 rounded-md bg-green-500 text-white font-semibold hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            {isUpdating ? "Saving..." : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoggedUserProfile;
