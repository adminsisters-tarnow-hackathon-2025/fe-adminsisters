import { RouterUrlEnum } from "@/types/enums/RouterUrlEnum";
import { Link } from "react-router";
import { ModeToggle } from "./ModeToggle";
import { Button } from "./ui/button";

export const Header = () => {
  return (
    <>
      <nav className="border-b px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to={RouterUrlEnum.HOME} className="text-lg font-semibold">
              Admin Sisters
            </Link>
            <div className="flex space-x-2">
              <Button variant="ghost" asChild>
                <Link to={RouterUrlEnum.TEMP}>Temp</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link to={RouterUrlEnum.MAP}>Map</Link>
              </Button>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <ModeToggle />
          </div>
        </div>
      </nav>
    </>
  );
};
