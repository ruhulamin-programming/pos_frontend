"use client";

import { useUpdateUserMutation, useUserQuery } from "@/lib/services/userApi";
import {
  MdPerson,
  MdEmail,
  MdPhone,
  MdLocationOn,
  MdEdit,
  MdSave,
  MdArrowBack,
} from "react-icons/md";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface UserFormValue {
  fullName: string;
  email: string;
  address: string;
  phoneNumber: string;
  profileImage: string;
}

const UserProfile = () => {
  const params = useParams();
  const router = useRouter();
  const userId = params.id as string;
  const [isEditing, setIsEditing] = useState(false);

  const { data: userResponse, isLoading } = useUserQuery(userId);
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  const user = userResponse?.data;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserFormValue>({
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      address: "",
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        fullName: user.fullName || "",
        email: user.email || "",
        address: user.address || "",
        phoneNumber: user.phoneNumber || "",
      });
    }
  }, [user, reset]);

  const onSubmit = async (data: UserFormValue) => {
    try {
      const response = await updateUser({ data, userId }).unwrap();
      toast.success(response.message || "Profile updated successfully!");
      setIsEditing(false);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update profile");
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-100 space-y-4">
        <div className="h-12 w-12 rounded-full border-4 border-indigo-50 border-t-indigo-600 animate-spin"></div>
        <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">
          Loading Profile...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-500 hover:text-indigo-600 font-bold text-sm transition-colors group"
        >
          <MdArrowBack
            className="group-hover:-translate-x-1 transition-transform"
            size={20}
          />
          Back to Users
        </button>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all font-bold text-sm"
          >
            <MdEdit size={18} />
            Edit Profile
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/20 p-8 text-center relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-24 bg-linear-to-br from-indigo-500 to-purple-600 opacity-10"></div>

            <div className="relative mt-4">
              <div className="h-32 w-32 mx-auto rounded-3xl overflow-hidden border-4 border-white shadow-xl relative transition-transform group-hover:scale-105 group-hover:rotate-2 duration-300">
                <Image
                  src={user?.profileImage || "/placeholder-user.png"}
                  alt={user?.fullName || "User"}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute bottom-0 right-1/2 translate-x-16 translate-y-2">
                <span
                  className={`h-5 w-5 rounded-full border-4 border-white shadow-sm block ${user?.activePlan ? "bg-emerald-500" : "bg-gray-300"}`}
                ></span>
              </div>
            </div>

            <div className="mt-6 space-y-1">
              <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight">
                {user?.fullName}
              </h3>
              <p className="text-xs font-mono font-bold text-indigo-500 bg-indigo-50 px-3 py-1 rounded-full inline-block">
                ID: {user?.id?.slice(-8).toUpperCase()}
              </p>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-50 grid grid-cols-2 gap-4 text-left">
              <div className="space-y-1">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Role
                </p>
                <p className="text-xs font-bold text-gray-700">{user?.role}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Plan
                </p>
                <p className="text-xs font-bold text-indigo-600">Standard</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/20 overflow-hidden h-full">
            <div className="px-8 py-6 border-b border-gray-50 bg-gray-50/30 flex items-center justify-between">
              <h3 className="font-black text-gray-800 uppercase tracking-widest text-xs flex items-center gap-2">
                <span className="p-1.5 bg-indigo-100 text-indigo-600 rounded-lg">
                  <MdPerson size={16} />
                </span>
                Account Details
              </h3>
              {isEditing && (
                <button
                  onClick={() => {
                    setIsEditing(false);
                    reset();
                  }}
                  className="text-[10px] font-black text-rose-500 uppercase tracking-widest hover:underline"
                >
                  Cancel Changes
                </button>
              )}
            </div>

            <div className="p-8">
              {!isEditing ? (
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <DetailItem
                      icon={<MdEmail className="text-indigo-400" />}
                      label="Email Address"
                      value={user?.email}
                    />
                    <DetailItem
                      icon={<MdPhone className="text-emerald-400" />}
                      label="Phone Number"
                      value={user?.phoneNumber}
                    />
                    <DetailItem
                      icon={<MdLocationOn className="text-rose-400" />}
                      label="Home Address"
                      value={user?.address}
                      isFullWidth
                    />
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField
                      label="Full Name"
                      register={register("fullName", {
                        required: "Name is required",
                      })}
                      error={errors.fullName}
                    />
                    <InputField
                      label="Email Address"
                      register={register("email", {
                        required: "Email is required",
                      })}
                      error={errors.email}
                      disabled={true}
                    />
                    <InputField
                      label="Phone Number"
                      register={register("phoneNumber", {
                        required: "Phone is required",
                      })}
                      error={errors.phoneNumber}
                    />
                    <InputField
                      label="Address"
                      register={register("address")}
                    />
                  </div>
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isUpdating}
                      className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 disabled:opacity-50"
                    >
                      {isUpdating ? (
                        "Updating..."
                      ) : (
                        <>
                          <MdSave size={18} />
                          Save Profile Changes
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DetailItem = ({ icon, label, value, isFullWidth = false }: any) => (
  <div className={`space-y-2 ${isFullWidth ? "md:col-span-2" : ""} group`}>
    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
      {label}
    </p>
    <div className="flex items-center gap-3 p-4 bg-gray-50/50 rounded-2xl border border-gray-100 group-hover:border-indigo-100 group-hover:bg-indigo-50/20 transition-all">
      <div className="p-2.5 bg-white rounded-xl shadow-sm text-indigo-500">
        {icon}
      </div>
      <p className="text-sm font-bold text-gray-800">
        {value || "Not provided"}
      </p>
    </div>
  </div>
);

const InputField = ({ label, register, error, disabled }: any) => (
  <div className="space-y-1.5">
    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
      {label}
    </label>
    <input
      {...register}
      disabled={disabled}
      className={`w-full px-4 py-3.5 rounded-2xl bg-gray-50 border transition-all text-sm font-bold focus:ring-4 focus:ring-indigo-500/10 focus:bg-white outline-none ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${
        error
          ? "border-rose-300 focus:border-rose-500"
          : "border-gray-200 focus:border-indigo-500"
      }`}
    />
    {error && (
      <p className="text-[10px] font-bold text-rose-500 ml-1">
        {error.message}
      </p>
    )}
  </div>
);

export default UserProfile;
