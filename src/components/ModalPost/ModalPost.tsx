import React, { useState } from "react";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Editor } from "primereact/editor";
import { Calendar } from "primereact/calendar";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
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
} from "src/features/Posts/PostValidator";
import type { ModalInterface } from "lib/types/ModalPost";
import InputModal from "src/components/ModalPost/InputModal";
import { validateModalPost } from "lib/validators/validateModalPost";

const ModalPost: React.FC<ModalInterface> = ({
  data,
  submitFunc,
  triggerFunc,
  icon,
  label,
}) => {
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
          const response = await submitFunc();
          const result = await response.json();

          if (!(await validateModalPost(result))) {
            setError("Invalid form data");
            return;
          }

          if (!response.ok) {
            setError(result.message);
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
        label={label && label}
        icon={icon}
        className="mr-2"
        onClick={() => {
          setVisible(true);
          triggerFunc && triggerFunc(data);
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
        <InputModal title={"Title of the post"} metaTitle="title">
          <InputText
            value={postState.title}
            id="title"
            onChange={(e: any) => dispatch(setTitle(e.target.value))}
            aria-describedby="title-help"
          />
        </InputModal>
        <InputModal title={"Creator's name"} metaTitle="creator">
          <InputText
            id="creator"
            value={postState.creator}
            aria-describedby="creator-help"
            onChange={(e: any) => dispatch(setCreator(e.target.value))}
          />
        </InputModal>
        <InputModal title="Document creator's name" metaTitle="dc:creator">
          <InputText
            value={postState["dc:creator"]}
            id="dc:creator"
            aria-describedby="dc:cretor-help"
            onChange={(e: any) => dispatch(setDcCreator(e.target.value))}
          />
        </InputModal>
        <InputModal title="Content snippet" metaTitle="snippet">
          <InputTextarea
            id="snippet"
            value={postState.contentSnippet}
            aria-describedby="snippet-help"
            rows={5}
            cols={30}
            onChange={(e: any) => dispatch(setContentSnippet(e.target.value))}
          />
        </InputModal>
        <InputModal title="Content" metaTitle="content">
          <Editor
            id="content"
            value={postState.content}
            onTextChange={(e: any) => dispatch(setContent(e.htmlValue))}
            aria-describedby="content-help"
            style={{ height: "320px" }}
          />
        </InputModal>
        <InputModal title="Publish date" metaTitle="pubDate">
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
        </InputModal>
        <InputModal title="Link" metaTitle="link">
          <InputText
            id="link"
            value={postState.link}
            aria-describedby="link-help"
            onChange={(e: any) => dispatch(setLink(e.target.value))}
          />
        </InputModal>
        <InputModal title="Categories" metaTitle="categories">
          <InputText
            id="categories"
            value={postState.categories.join(",")}
            aria-describedby="categories-help"
            onChange={(e: any) => dispatch(setCategories(e.target.value))}
          />
        </InputModal>
        <InputModal title="Globally Unique Identifier" metaTitle="guid">
          <InputText
            id="guid"
            value={postState.guid}
            aria-describedby="guid-help"
            onChange={(e: any) => dispatch(setGuid(e.target.value))}
          />
        </InputModal>
        {isError && (
          <div>
            <p style={{ color: "red" }}>{isError}</p>
          </div>
        )}
      </Dialog>
    </div>
  );
};

export default ModalPost;
