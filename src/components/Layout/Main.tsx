import { FC } from "react";
import type { MainInterface } from "lib/types/Main";

// Standart main styling
const Main: FC<MainInterface> = ({ children, className }) => {
  return <main className={className}>{children}</main>;
};

export default Main;
