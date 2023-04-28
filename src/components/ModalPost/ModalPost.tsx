import React from "react";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Editor } from "primereact/editor";
import { Calendar } from "primereact/calendar";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { RootState } from "src/app/store";
import {
  setTitle,
  setCreator,
  setDcCreator,
  setContentSnippet,
  setContent,
  setPubDate,
  setIsoDate,
  modalClose,
  setLink,
  setCategories,
  setResetValues,
  setGuid,
  setError,
  setVisible,
} from "src/features/Posts/ModalPost";
import InputModal from "src/components/ModalPost/InputModal";
import { validateModalPost } from "lib/validators/validateModalPost";
import { getToken } from "lib/utils/getToken";

const ModalPost: React.FC = () => {
  const dispatch = useDispatch();
  const postState = useSelector(
    (state: RootState) => state.modalPost.inputs,
    shallowEqual
  );
  const ModalError = useSelector(
    (state: RootState) => state.modalPost.properties.error,
    shallowEqual
  );
  const ModalVisible = useSelector(
    (state: RootState) => state.modalPost.properties.isVisible,
    shallowEqual
  );

  const submitFunc = useSelector(
    (state: RootState) => state.modalPost.properties.submitFunc,
    shallowEqual
  );

  const ModalPostOptions = (
    <div>
      <Button
        label="No"
        icon="pi pi-times"
        onClick={() => dispatch(modalClose())}
        className="p-button-text"
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        onClick={async () => {
          const token = getToken();
          const response = await submitFunc(token, postState, postState.guid);
          const result = await response.json();

          if (!(await validateModalPost(result))) {
            dispatch(setError("Invalid form data"));
            return;
          }

          if (!response.ok) {
            dispatch(setError(result.message));
          } else {
            dispatch(modalClose());
          }
        }}
      />
    </div>
  );

  return (
    <div className="card flex justify-content-center">
      <Dialog
        header="Header"
        visible={ModalVisible}
        style={{ width: "50vw", borderColor: ModalError ? "red" : "" }}
        onHide={() => {
          dispatch(setVisible(false));
          dispatch(setResetValues());
        }}
        footer={ModalPostOptions}
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
        {ModalError && (
          <div>
            <p style={{ color: "red" }}>{ModalError}</p>
          </div>
        )}
      </Dialog>
    </div>
  );
};

export default ModalPost;
