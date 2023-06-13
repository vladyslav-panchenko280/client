import { Tag } from "primereact/tag";
import type { Post } from "lib/interfaces/postValidator";
import { HTMLParser } from "src/components/HTMLParser/HTMLParser";
import { Button } from "primereact/button";
import { deletePost } from "lib/posts/deletePost";
import { getToken } from "lib/utils/getToken";
import { useDispatch } from "react-redux";
import {
  setPost,
  setVisible,
  setSubmitFunc,
} from "src/features/Posts/ModalPost";
import { updatePost } from "lib/posts/updatePost";
import { toggleFlag } from "src/features/Posts/PostsCRUD";
import { validateToken } from "lib/validators/validateToken";
import { navigateToLogin } from "lib/utils/navigateToLogin";

// Template for customizing the layout of the PostsView component
const PostTemplate = (post: Post) => {
  const dispatch = useDispatch();

  const handleRemoveButton = async () => {
    const token = getToken();
    if (!(await validateToken(token))) {
      navigateToLogin();
    }
    await deletePost(token, post.guid);
    dispatch(toggleFlag(true));
  };

  const handleEditButton = async () => {
    dispatch(setPost(post));
    dispatch(setVisible(true));
    dispatch(setSubmitFunc(updatePost));
  };

  return (
    <div className="col-12 my-4">
      <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
        <div className="flex flex-column gap-4 justify-content-between align-items-center xl:align-items-start flex-1 gap-4 w-full">
          <div className="flex flex-column w-full align-items-between sm:align-items-start gap-3 max-w-full">
            <div className="flex gap-8 w-full md:flex-row flex-column justify-content-between">
              <div className="w-full flex gap-8 w-full">
                <div className="text-xl font-medium text-900">
                  <span>Creator: </span>
                  <br />
                  <span className="text-3xl font-bold">{post.creator}</span>
                </div>
                <div className="text-xl font-medium text-900">
                  <span>Document creator: </span>
                  <br />
                  <span className="text-3xl font-bold">
                    {post["dc:creator"]}
                  </span>
                </div>
              </div>
              <div className="flex gap-4">
                <Button
                  label=""
                  icon={"pi pi-pencil"}
                  className="mr-2"
                  onClick={handleEditButton}
                />
                <Button
                  icon="pi pi-times"
                  className="p-button-danger"
                  onDoubleClick={handleRemoveButton}
                  tooltip="Click twice to remove post"
                  tooltipOptions={{
                    position: "top",
                    mouseTrack: true,
                    mouseTrackTop: 10,
                  }}
                />
              </div>
            </div>
            <div className="text-xl font-medium text-900">
              <span>Title: </span>
              <br />
              <span className="text-3xl font-bold">{post.title}</span>
            </div>
          </div>

          <div className="flex w-full flex-column align-items-start gap-3">
            <div>
              <span className="text-xl font-medium text-900">Snippet: </span>
              <br />
              <span className="text-2xl font-semibold white-space-normal">
                {post.contentSnippet}
              </span>
            </div>
            <div className="text-xl font-medium text-900">
              <span>Content: </span>
              <br />
              <HTMLParser
                className="flex flex-column h-max min-w-0 max-w-full"
                tag={"div"}
                data={post.content}
              />
            </div>
          </div>

          <div className="flex align-items-center gap-3 w-full">
            <span className="flex align-items-center gap-2">
              <i className="pi pi-calendar"></i>
              <span className="font-semibold">{post.pubDate}</span>
            </span>
            <span className="flex align-items-center gap-2">
              <i className="pi pi-link"></i>
              <span className="font-regular text-base underline text-blue-500">
                {post.link}
              </span>
            </span>
          </div>
          <div className="text-xl font-medium text-900 align-self-start">
            <span>Categories: </span>
            <br />
            {post.categories.map((element, index) => {
              return (
                <Tag
                  key={`${element}_${index}`}
                  className="mr-2 m-1"
                  value={element}
                ></Tag>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export { PostTemplate };
