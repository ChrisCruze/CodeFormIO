import React from "react";
import _ from "lodash";

function append_text_from_list(l) {
  var text_blob = "";
  l.forEach(function(item) {
    var text_blob = text_blob + item;
  });
  return text_blob;
}

export const AirTableFormat = ({ data }) => {
  const extra_line = `
  `;
  const code_list = _.map(data, "Code");
  const code_text = _.reduce(
    code_list,
    function(memo, num) {
      r = memo + extra_line + num;
      return r;
    },
    ""
  );

  // const code_text = append_text_from_list(code_list);
  // console.log({ data, code_text, code_list });
  return code_text;
};
