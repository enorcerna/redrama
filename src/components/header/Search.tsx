"use client";
import {SearchIcon} from "lucide-react";
import {Button} from "../ui/button";
import {useState} from "react";
import SearchForm from "./SearchForm";

function Search() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };
  return (
    <>
      <Button
        className="w-52 flex justify-between "
        onClick={handleOpen}
        variant="secondary"
      >
        <SearchIcon className="text-primary/25" />
        <span className=" flex gap-1 bg-white/5 py-1 px-2 rounded-sm text-xs ">
          <kbd>Ctrl</kbd>
          <kbd>K</kbd>
        </span>
        <SearchForm open={open} />
      </Button>
    </>
  );
}

export default Search;
