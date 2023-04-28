import { FC } from "react";
import { InputModalInterface } from "lib/interfaces/ModalPost";

const InputModal: FC<InputModalInterface> = ({
  children,
  title,
  metaTitle,
}) => {
  return (
    <div className="flex flex-column gap-2 mb-4">
      <label htmlFor={metaTitle}>{title}</label>
      {children}
      <small id={`${metaTitle}-help`}>
        Enter {title.toLowerCase()} for the post.
      </small>
    </div>
  );
};

export default InputModal;
