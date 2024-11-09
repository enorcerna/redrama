import {cn} from "@/lib/utils";
import {ReactNode} from "react";

interface Props {
  children: ReactNode;
  className?: string;
}
function Respve({children, className}: Props) {
  return (
    <div
      className={cn(
        "flex items-center py-2 mx-3 lg:w-9/12  lg:mx-auto gap-2",
        className
      )}
    >
      {children}
    </div>
  );
}

export default Respve;
