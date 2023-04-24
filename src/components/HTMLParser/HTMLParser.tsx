import { useEffect, useRef, FC } from "react";
import type { ContainerProps, HTMLParserProps } from "lib/types/HTMLParser";

const HTMLParser: FC<HTMLParserProps> = ({ data, className, tag = "div" }) => {
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
