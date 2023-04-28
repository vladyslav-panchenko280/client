import { RefObject } from "react";

export type HTMLParserData = string;
export type HTMLParserTag = string;

export interface HTMLParserProps {
  data: HTMLParserData;
  className: string;
  tag: HTMLParserTag;
}
export interface ContainerProps {
  ref: RefObject<HTMLElement>;
  className: string;
}
