import { AdminProfile } from "./admin/AdminProfile";
import { UserProfile } from "./user/UserProfile";

export const Profile = () => {
  const isAdmin = true;

  if (isAdmin) {
    return <AdminProfile />;
  }

  return <UserProfile />;
};
