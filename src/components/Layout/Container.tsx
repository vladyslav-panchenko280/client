import { ReactNode, FC } from "react";

interface ContainerInterface {
  children: ReactNode;
  className?: string;
}

// Container which provide 8/10 width for item
const Container: FC<ContainerInterface> = ({ children, className }) => {
  return <div className={`w-10 flex ${className}`}>{children}</div>;
};

export default Container;
