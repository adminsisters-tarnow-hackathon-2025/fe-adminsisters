import { useSelector, useDispatch } from "react-redux";
import { AdminProfile } from "./admin/AdminProfile";
import { UserProfile } from "./user/UserProfile";
import {
  selectUser,
  selectIsLoggedIn,
  checkAuthAndPromptLogin,
} from "@/store/userSlice";
import { useEffect } from "react";

export const Profile = () => {
  const user = useSelector(selectUser);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoggedIn) {
      dispatch(checkAuthAndPromptLogin());
    }
  }, [isLoggedIn, dispatch]);

  if (!isLoggedIn) {
    return null; // Don't render anything while login dialog is open
  }

  if (user.user?.data.isAdmin) {
    return <AdminProfile />;
  }

  return <UserProfile />;
};
