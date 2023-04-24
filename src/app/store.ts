import { configureStore } from "@reduxjs/toolkit";
import loginFormReducer from "../features/Login/loginService";
import type { FormState } from "lib/types/loginForm";
import type { PostsView } from "lib/types/postsView";
import type { PostsCRUD } from "lib/types/postsCRUD";
import PostsCRUDReducer from "src/features/Posts/PostsCRUD";
import PostsViewReducer from "src/features/Posts/PostsView";
import PostValidatorReducer from "src/features/Posts/PostValidator";
import type { Post } from "lib/types/postValidator";

export interface RootState {
  loginForm: FormState;
  postsCRUD: PostsCRUD;
  postsView: PostsView;
  postValidator: Post;
}

// Configure the Redux store
const store = configureStore({
  reducer: {
    loginForm: loginFormReducer, // Add the login form reducer to the store
    postsCRUD: PostsCRUDReducer, // Add posts crud reducer to the store
    postsView: PostsViewReducer, // Add posts view reducer to the store
    postValidator: PostValidatorReducer, // Add post validator to the store
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
