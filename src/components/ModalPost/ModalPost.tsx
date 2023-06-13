import type { FC } from "react";
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
import type {
  HandleCalendarChange,
  HandleHideModal,
  SubmitModalPost,
} from "lib/interfaces/ModalPost";
import { validateModalCategories } from "lib/validators/validateModalCategories";
import { validateModalDate } from "lib/validators/validateModalDate";
import { validateModalInput } from "lib/validators/validateModalInput";
import { toggleFlag } from "src/features/Posts/PostsCRUD";
import { validateToken } from "lib/validators/validateToken";
import { navigateToLogin } from "lib/utils/navigateToLogin";
import ErrorMessage from "src/components/ErrorMessage/ErrorMessage";
import { sanitizeDate } from "lib/utils/sanitizeDate";

const ModalPost: FC = () => {
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

  const submitModalPost: SubmitModalPost = async () => {
    if (!(await validateModalPost(postState))) {
      dispatch(
        setError(
          "Invalid post structure for inserting. All inputs should be filled"
        )
      );
      return;
    }
    const token = getToken();
    if (!(await validateToken(token))) {
      navigateToLogin();
    }
    const response = await submitFunc(token, postState, postState.guid);
    const result = await response.json();
    if (!response.ok) {
      dispatch(setError(result.message));
    } else {
      dispatch(toggleFlag(true));
      handleHideModal();
    }
  };

  const handleHideModal: HandleHideModal = () => {
    dispatch(setResetValues());
    dispatch(setError(""));
    dispatch(setVisible(false));
  };

  const handleCalendarChange: HandleCalendarChange = (value) => {
    const date = new Date(value);
    dispatch(setPubDate(sanitizeDate(date.toUTCString())));
    dispatch(setIsoDate(date.toISOString()));
  };

  const ModalPostOptions = (
    <div className="flex justify-content-end m-4">
      <ErrorMessage
        className="align-self-start"
        error={ModalError}
        errorText={ModalError}
      />
      <div>
        <Button
          label="No"
          icon="pi pi-times"
          onClick={handleHideModal}
          className="p-button-text"
        />
        <Button label="Yes" icon="pi pi-check" onClick={submitModalPost} />
      </div>
    </div>
  );

  return (
    <div className="card flex justify-content-center">
      <Dialog
        header="Header"
        visible={ModalVisible}
        style={{ width: "50vw", borderColor: ModalError ? "red" : "" }}
        onHide={handleHideModal}
        footer={ModalPostOptions}
      >
        <InputModal title={"Title of the post"} metaTitle="title">
          <InputText
            value={validateModalInput(postState.title)}
            id="title"
            onChange={(e: any) => dispatch(setTitle(e.target.value))}
            aria-describedby="title-help"
          />
        </InputModal>
        <InputModal title={"Creator's name"} metaTitle="creator">
          <InputText
            id="creator"
            value={validateModalInput(postState.creator)}
            aria-describedby="creator-help"
            onChange={(e: any) => dispatch(setCreator(e.target.value))}
          />
        </InputModal>
        <InputModal title="Document creator's name" metaTitle="dc:creator">
          <InputText
            value={validateModalInput(postState["dc:creator"])}
            id="dc:creator"
            aria-describedby="dc:cretor-help"
            onChange={(e: any) => dispatch(setDcCreator(e.target.value))}
          />
        </InputModal>
        <InputModal title="Content snippet" metaTitle="snippet">
          <InputTextarea
            id="snippet"
            value={validateModalInput(postState.contentSnippet)}
            aria-describedby="snippet-help"
            rows={5}
            cols={30}
            onChange={(e: any) => dispatch(setContentSnippet(e.target.value))}
          />
        </InputModal>
        <InputModal title="Content" metaTitle="content">
          <Editor
            id="content"
            value={validateModalInput(postState.content)}
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
            value={validateModalDate(postState.pubDate)}
            aria-describedby="pubDate-help"
            dateFormat="D, d M yy"
            hourFormat="24"
            onChange={(e: any) => handleCalendarChange(e.value)}
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
            value={validateModalCategories(postState.categories)}
            aria-describedby="categories-help"
            onChange={(e: any) =>
              dispatch(setCategories(e.target.value.split(",")))
            }
          />
        </InputModal>
        <InputModal title="Globally Unique Identifier" metaTitle="guid">
          <InputText
            id="guid"
            value={validateModalInput(postState.guid)}
            aria-describedby="guid-help"
            onChange={(e: any) => dispatch(setGuid(e.target.value))}
          />
        </InputModal>
      </Dialog>
    </div>
  );
};

export default ModalPost;
