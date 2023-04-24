import type { Post } from "lib/types/postValidator";
import type { ReactNode } from "react";

export interface ModalInterface {
  data: Post;
  submitFunc: any;
  triggerFunc?: any;
  icon: string;
  label?: string;
}

export interface InputModalInterface {
  children: ReactNode;
  title: string;
  metaTitle: string;
}
