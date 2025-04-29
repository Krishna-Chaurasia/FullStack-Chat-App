import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User, Pencil } from "lucide-react"; 
import toast from "react-hot-toast";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);
  const [editFullName, setEditFullName] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [fullName, setFullName] = useState(authUser?.fullName || "");
  const [email, setEmail] = useState(authUser?.email || "");

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      try {
      await updateProfile({ profilePic: base64Image });
      toast.success("Profile picture updated successfully!");
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to update profile picture");
      }
    };
  };
  
  

  const handleUpdateFullName = async () => {
    if (fullName.trim() === "") {
      toast.error("Full Name cannot be empty");
      return;
    }
    try {
      await updateProfile({ fullName });
      toast.success("Full Name updated successfully!");
      setEditFullName(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update Full Name");
    }
  };

  const handleUpdateEmail = async () => {
    if (email.trim() === "") {
      toast.error("Email cannot be empty");
      return;
    }
    try {
      await updateProfile({ email });
      toast.success("Email updated successfully!");
      setEditEmail(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update Email");
    }
  };

  return (
    <div className="h-screen pt-20">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-base-300 rounded-xl p-6 space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold ">Profile</h1>
            <p className="mt-2">Your profile information</p>
          </div>

          {/* Avatar upload section */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={selectedImg || authUser.profilePic || "/avatar.png"}
                alt="Profile"
                className="size-32 rounded-full object-cover border-4"
              />
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0
                  bg-base-content hover:scale-105
                  p-2 rounded-full cursor-pointer
                  transition-all duration-200
                  ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                `}
              >
                <Camera className="w-5 h-5 text-base-200" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-sm text-zinc-400">
              {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
            </p>
          </div>

          {/* Editable fields */}
          <div className="space-y-6">
            {/* Full Name */}
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
                <button onClick={() => setEditFullName(true)} className="ml-auto text-primary">
                  <Pencil className="w-4 h-4" />
                </button>
              </div>

              {editFullName ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="input input-bordered w-full"
                  />
                  <button onClick={handleUpdateFullName} className="btn btn-primary btn-sm">
                    Save
                  </button>
                </div>
              ) : (
                <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{authUser?.fullName}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
                <button onClick={() => setEditEmail(true)} className="ml-auto text-primary">
                  <Pencil className="w-4 h-4" />
                </button>
              </div>

              {editEmail ? (
                <div className="flex items-center gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input input-bordered w-full"
                  />
                  <button onClick={handleUpdateEmail} className="btn btn-primary btn-sm">
                    Save
                  </button>
                </div>
              ) : (
                <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{authUser?.email}</p>
              )}
            </div>
          </div>

          {/* Account Information */}
          <div className="mt-6 bg-base-300 rounded-xl p-6">
            <h2 className="text-lg font-medium mb-4">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                <span>Member Since</span>
                <span>{authUser.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className="text-green-500">Active</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
