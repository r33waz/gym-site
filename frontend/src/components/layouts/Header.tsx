import DesktopHeader from "./DesktopHeader";
import MobileViewHeader from "./MobileViewHeader";

const Header = () => {
  return (
    <div className="border px-4 md:px-6">
      <div className="hidden md:block">
        <DesktopHeader />
      </div>
      <div className="md:hidden">
        <MobileViewHeader />
      </div>
    </div>
  );
};

export default Header;
