import { useSelector } from "react-redux";
import { AdminProfile } from "./admin/AdminProfile";
import { UserProfile } from "./user/UserProfile";
import { selectUser } from "@/store/userSlice";
export const Profile = () => {
  const user = useSelector(selectUser);

  if (user.user?.data.isAdmin) {
    return <AdminProfile />;
  }

  return <UserProfile />;
};
