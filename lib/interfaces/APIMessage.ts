import { RefObject } from "react";

export type APIMessageRef = RefObject<any> | null;

export interface APIMessageState {
  ref: APIMessageRef;
}
