import { configureStore } from "@reduxjs/toolkit";
import loginFormReducer from "../features/Login/loginService";
import { FormState } from "../features/Login/loginService";
import { PostsView } from "../features/Posts/PostsView";
import { PostsCRUD } from "../features/Posts/PostsCRUD";
import PostsCRUDReducer from "../features/Posts/PostsCRUD";
import PostsViewReducer from "../features/Posts/PostsView";
import PostValidatorReducer from "../features/Posts/PostValidator";
import { Post } from "../features/Posts/PostValidator";

// Define the RootState interface
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
});

export default store;
