import { selectUser } from "@/store/userSlice";
import { RouterUrlEnum } from "@/types/enums/RouterUrlEnum";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import { ModeToggle } from "./ModeToggle";
import { Badge } from "./ui/badge";

export const Header = () => {
  const userCoins = useSelector(selectUser).user?.data.coinAmount;
  console.log(userCoins);

  return (
    <>
      <nav className="border-b px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to={RouterUrlEnum.HOME} className="text-lg font-semibold p-2">
              <img src="/public/LOGO 1.svg" className="w-40" />
            </Link>
          </div>
          <div className="flex items-center space-x-2">
            <Link to={RouterUrlEnum.PROFILE}>
              <Badge variant={"outline"} className=" py-1 bg-background">
                {userCoins || 0} <img src="/public/Tarnowiak.svg" alt="" />
              </Badge>
            </Link>
            <ModeToggle />
          </div>
        </div>
      </nav>
    </>
  );
};
