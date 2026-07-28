import { Link, useNavigate } from "react-router-dom";
import { LogIn, UserPlus } from "lucide-react";
import { Button } from "../ui/button";
import { privateRoutePath, publicRoutePath } from "@/routes/path";
import Logo from "@/assets/Images/Gemini_Generated_Image_elp71melp71melp7.png";

const DesktopHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between flex-wrap py-2">
      <Link to={privateRoutePath.base}>
        <img src={Logo} alt="Logo" className="w-12 h-10" />
      </Link>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          onClick={() => navigate(publicRoutePath.login)}
          className={`
            gap-2 border-2 border-primary/30 text-primary
            hover:border-primary hover:bg-primary/5 hover:text-primary
            dark:border-white/30 dark:text-white
            dark:hover:border-white dark:hover:bg-white/10
            transition-all duration-300
          `}
        >
          <LogIn className="size-4" />
          Log In
        </Button>

        <Button
          onClick={() => navigate(publicRoutePath.signup)}
          className={`
    gap-2 border-2 font-medium
    border-green-primary/20 dark:border-green-primary/30
    bg-gradient-to-r from-green-primary/10 to-green-secondary/10
    text-primary
    hover:border-transparent
    hover:from-green-primary hover:to-green-secondary
    hover:text-white
    dark:from-green-primary/20 dark:to-green-secondary/20
    dark:text-white
    dark:hover:from-green-primary dark:hover:to-green-secondary
    dark:hover:text-white
    transition-all duration-300
  `}
        >
          <UserPlus className="size-4" />
          Sign Up
        </Button>
      </div>
    </div>
  );
};

export default DesktopHeader;
