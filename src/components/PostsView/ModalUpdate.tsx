import React, { useState } from "react";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Editor } from "primereact/editor";
import { Calendar } from "primereact/calendar";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import type { Post } from "./PostsView";
import { updatePost } from "../../pages/api/crud/updatePost";
import { RootState } from "../../store/store";
import {
  setTitle,
  setCreator,
  setDcCreator,
  setContentSnippet,
  setContent,
  setPubDate,
  setIsoDate,
  setLink,
  setCategories,
  setResetValues,
  setGuid,
} from "../../features/Posts/PostValidator";
import { getToken } from "../../pages/api/getToken";

export const ModalUpdate = ({ data }: { data: Post }) => {
  const [visible, setVisible] = useState(false);
  const [isError, setError] = useState("");
  const dispatch = useDispatch();
  const postState = useSelector(
    (state: RootState) => state.postValidator,
    shallowEqual
  );

  const closeHandle = () => {
    dispatch(setResetValues());
    setVisible(false);
    setError("");
  };

  const updatePostOptions = (
    <div>
      <Button
        label="No"
        icon="pi pi-times"
        onClick={closeHandle}
        className="p-button-text"
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        onClick={async () => {
          const token = getToken();
          const response = await updatePost(token, postState.guid, postState);
          if (!response.ok) {
            const result = await response.json();
            setError(result.err.message);
          } else {
            closeHandle();
          }
        }}
      />
    </div>
  );

  return (
    <div className="card flex justify-content-center">
      <Button
        label={""}
        icon={"pi pi-pencil"}
        className="mr-2"
        onClick={() => {
          setVisible(true);
          dispatch(setTitle(data.title));
          dispatch(setCreator(data.creator));
          dispatch(setDcCreator(data["dc:creator"]));
          dispatch(setLink(data.link));
          dispatch(setIsoDate(data.isoDate));
          dispatch(setPubDate(data.pubDate));
          dispatch(setCategories(data.categories));
          dispatch(setContent(data.content));
          dispatch(setContentSnippet(data.contentSnippet));
          dispatch(setGuid(data.guid));
        }}
      />
      <Dialog
        header="Header"
        visible={visible}
        style={{ width: "50vw", borderColor: isError ? "red" : "" }}
        onHide={() => {
          setVisible(false);
          dispatch(setResetValues());
        }}
        footer={updatePostOptions}
      >
        <div className="flex flex-column gap-2 mb-4">
          <label htmlFor="title">Title</label>
          <InputText
            value={postState.title}
            id="title"
            onChange={(e: any) => dispatch(setTitle(e.target.value))}
            aria-describedby="title-help"
          />
          <small id="title-help">Enter title for the new post.</small>
        </div>
        <div className="flex flex-column gap-2 mb-4">
          <label htmlFor="cretor">Creator&apos;s name</label>
          <InputText
            id="cretor"
            value={postState.creator}
            aria-describedby="cretor-help"
            onChange={(e: any) => dispatch(setCreator(e.target.value))}
          />
          <small id="creator-help">
            Enter creator&apos;s name for the new post.
          </small>
        </div>
        <div className="flex flex-column gap-2 mb-4">
          <label htmlFor="dc:cretor">Document creator&apos;s name</label>
          <InputText
            value={postState["dc:creator"]}
            id="dc:cretor"
            aria-describedby="dc:cretor-help"
            onChange={(e: any) => dispatch(setDcCreator(e.target.value))}
          />
          <small id="dc:creator-help">
            Enter document creator&apos;s name for the new post.
          </small>
        </div>
        <div className="flex flex-column gap-2 mb-4">
          <label htmlFor="snippet">Content Snippet</label>
          <InputTextarea
            id="snippet"
            value={postState.contentSnippet}
            aria-describedby="snippet-help"
            rows={5}
            cols={30}
            onChange={(e: any) => dispatch(setContentSnippet(e.target.value))}
          />
          <small id="snippet-help">
            Enter content snippet for the future post.
          </small>
        </div>
        <div className="flex flex-column gap-2 mb-4">
          <label htmlFor="content">Content</label>
          <Editor
            id="content"
            value={postState.content}
            onTextChange={(e: any) => dispatch(setContent(e.htmlValue))}
            aria-describedby="content-help"
            style={{ height: "320px" }}
          />
          <small id="content-help">Enter content for the future post.</small>
        </div>
        <div className="flex flex-column gap-2 mb-4">
          <label htmlFor="pubDate">Publish date</label>
          <Calendar
            className="flex"
            showTime
            id="pubDate"
            value={new Date(postState.pubDate)}
            aria-describedby="pubDate-help"
            dateFormat="D, d M yy"
            hourFormat="24"
            onChange={(e: any) => {
              const date = new Date(e.value);
              dispatch(setPubDate(date.toString()));
              dispatch(setIsoDate(date.toISOString()));
            }}
          />
          <small id="pubDate-help">
            Enter publish date of the future post.
          </small>
        </div>
        <div className="flex flex-column gap-2 mb-4">
          <label htmlFor="link">Link</label>
          <InputText
            id="link"
            value={postState.link}
            aria-describedby="link-help"
            onChange={(e: any) => dispatch(setLink(e.target.value))}
          />
          <small id="link-help">Enter the link for the post.</small>
        </div>
        <div className="flex flex-column gap-2 mb-4">
          <label htmlFor="categories">Categories</label>
          <InputText
            id="categories"
            value={postState.categories.join(",")}
            aria-describedby="categories-help"
            onChange={(e: any) => dispatch(setCategories(e.target.value))}
          />
          <small id="categories-help">
            Enter categories for the post according the example:
            finance,economy,bank
          </small>
        </div>
        <div className="flex flex-column gap-2 mb-4">
          <label htmlFor="guid">Guid</label>
          <InputText
            id="guid"
            value={postState.guid}
            aria-describedby="categories-help"
            onChange={(e: any) => dispatch(setGuid(e.target.value))}
          />
          <small id="categories-help">
            Enter Globally Unique Identifier for the post.
          </small>
        </div>
        {isError && (
          <div>
            <p style={{ color: "red" }}>{isError}</p>
          </div>
        )}
      </Dialog>
    </div>
  );
};
