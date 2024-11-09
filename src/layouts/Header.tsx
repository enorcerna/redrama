import Respve from "@/components/global/Respve";
import Categories from "@/components/header/Categories";
import Logo from "@/components/header/Logo";
import Search from "@/components/header/Search";

function Header() {
  return (
    <header className="h-14 flex items-center sticky top-0 backdrop-blur-lg z-20 w-full">
      <Respve className="w-full">
        <Logo />
        <div className="flex-1"></div>
        <Search />
        <Categories />
      </Respve>
    </header>
  );
}

export default Header;
