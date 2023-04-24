import { RefObject } from "react";

export interface HTMLParserProps {
  data: string;
  className: string;
  tag: string;
}
export interface ContainerProps {
  ref: RefObject<HTMLElement>;
  className: string;
}
