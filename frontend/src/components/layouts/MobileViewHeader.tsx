import { Link, useNavigate } from "react-router-dom";
import { Menu, LogIn, UserPlus } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { privateRoutePath, publicRoutePath } from "@/routes/path";
import Logo from "@/assets/Images/Gemini_Generated_Image_elp71melp71melp7.png";
import LanguageTrans from "../common/LanguageTrans";

const MobileViewHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between py-2">
      <Link to={privateRoutePath.base}>
        <img src={Logo} alt="Logo" className="w-12 h-12" />
      </Link>
      <div className="flex gap-2 items-center">
        <LanguageTrans />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="border-2 border-primary/30 dark:border-white/30"
            >
              <Menu className="size-5" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            sideOffset={8}
            className="w-44 border-primary/20"
          >
            <DropdownMenuItem
              onClick={() => navigate(publicRoutePath.login)}
              className="cursor-pointer gap-2 py-2.5"
            >
              <LogIn className="size-4 text-primary" />
              Log In
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={() => navigate(publicRoutePath.signup)}
              className={`
              cursor-pointer gap-2 py-2.5 font-medium
              bg-linear-to-r from-green-primary/10 to-green-secondary/10
              text-primary
              focus:bg-linear-to-r focus:from-green-primary/20 focus:to-green-secondary/20
              focus:text-primary
            `}
            >
              <UserPlus className="size-4" />
              Sign Up
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default MobileViewHeader;
