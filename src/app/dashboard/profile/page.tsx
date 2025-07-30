import UpdateProfileForm from "@/features/dashboard/profile/Form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "アカウント編集",
  description: "アカウント情報を編集します"
};

const Profile = () => {
  return (
    <div className="p-6 bg-white rounded-6 shadow-sm space-y-8">
      <UpdateProfileForm />
    </div>
  );
};

export default Profile;
