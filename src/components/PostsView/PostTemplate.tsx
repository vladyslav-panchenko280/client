import { Tag } from "primereact/tag";
import type { Post } from "./PostsView";
import { HTMLParser } from "../../components/HTMLParser/HTMLParser";
import { Button } from "primereact/button";
import { deletePost } from "../../pages/api/crud/deletePost";
import { getToken } from "../../pages/api/getToken";
import { ModalUpdate } from "./ModalUpdate";
import { useState, useEffect } from "react";

// Template for customizing the layout of the PostsView component
const PostTemplate = (post: Post) => {
  return (
    <div className="col-12 my-4">
      <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
        <div className="flex flex-column justify-content-between align-items-center xl:align-items-start flex-1 gap-4 w-full">
          <div className="flex flex-column w-full align-items-between sm:align-items-start gap-3 max-w-full">
            <div className="flex gap-8 w-full md:flex-row flex-column justify-content-between">
              <div className="w-full flex gap-8 w-full">
                <div className="text-xl font-medium text-900">
                  <span>Creator: </span>
                  <br />
                  <span className="text-3xl font-bold">{post.creator}</span>
                </div>
                <div className="text-xl font-medium text-900">
                  <span>dc:creator: </span>
                  <br />
                  <span className="text-3xl font-bold">
                    {post["dc:creator"]}
                  </span>
                </div>
              </div>
              <div className="flex gap-4">
                <ModalUpdate data={post} />
                <Button
                  icon="pi pi-times"
                  className="p-button-danger"
                  onClick={async () => {
                    const token = getToken();
                    await deletePost(token, post.guid);
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

          <div className="flex w-full flex-column align-items-center gap-3">
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
              <span
                style={{ wordBreak: "break-all" }}
                className="w-full white-space-normal"
              >
                <HTMLParser
                  className="flex flex-column min-w-0 max-w-full"
                  tag={"div"}
                  data={post.content}
                />
              </span>
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
          <div className="text-xl font-medium text-900">
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
