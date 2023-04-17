import { ReactNode, FC } from "react";

interface MainInterface {
  children: ReactNode;
  className?: string;
}

// Standart main styling
const Main: FC<MainInterface> = ({ children, className }) => {
  return <main className={className}>{children}</main>;
};

export default Main;
