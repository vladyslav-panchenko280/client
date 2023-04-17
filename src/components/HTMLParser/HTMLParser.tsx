import React, { useEffect, useRef } from "react";

interface HTMLParserProps {
  data: string;
  className: string;
  tag: string;
}

interface ContainerProps {
  ref: React.RefObject<HTMLElement>;
  className: string;
}

const HTMLParser: React.FC<HTMLParserProps> = ({
  data,
  className,
  tag = "div",
}) => {
  const Container = tag;
  const aRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (aRef.current) aRef.current.innerHTML = data;
  }, [data]);
  //@ts-ignore
  const containerProps: ContainerProps = {
    ref: aRef,
    className: className,
  };
  //@ts-ignore
  return <Container {...containerProps} />;
};

export { HTMLParser };
