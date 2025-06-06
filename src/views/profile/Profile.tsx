import { AdminProfile } from "./admin/AdminProfile";
import { UserProfile } from "./user/UserProfile";

export const Profile = () => {
  const isAdmin = false;

  if (isAdmin) {
    return <AdminProfile />;
  }

  return <UserProfile />;
};
