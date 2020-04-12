import React from "react";

export const zapierPost = ({ code, name, folder, extension }) => {
  // const data = {
  //   code: `function test(){return 1}`,
  //   name: "test_function_two",
  //   folder: "/Apps/site44/chriscross.site44.com/js",
  //   extension: ".js"
  // };
  const data = {
    code,
    name,
    folder,
    extension
  };
  fetch("https://hooks.zapier.com/hooks/catch/229795/o9jn84p/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
};
