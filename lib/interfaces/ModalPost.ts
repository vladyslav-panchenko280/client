import type { ReactNode } from "react";
import type { Post, PostGuid } from "lib/interfaces/postValidator";
import type { Token } from "lib/interfaces/Token";

export type submitFuncAdd = (token: Token, body: Post) => Promise<Response>;
export type submitFuncPut = (
  token: Token,
  body: Post,
  id: PostGuid
) => Promise<Response>;
export type ModalPostError = string;
export type ModalPostVisible = boolean;
export type InputModalChildren = ReactNode;
export type InputModalTitle = string;
export type InputModalMetaTitle = string;

export interface ModalPostProperties {
  error: ModalPostError;
  isVisible: ModalPostVisible;
  submitFunc: submitFuncAdd | submitFuncPut;
}

export interface ModalPostInterface {
  inputs: Post;
  properties: ModalPostProperties;
}

export interface InputModalInterface {
  children: InputModalChildren;
  title: InputModalTitle;
  metaTitle: InputModalMetaTitle;
}
