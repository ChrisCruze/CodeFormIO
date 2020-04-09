import React, { Fragment, useState, useEffect } from "react";
import airtable from "airtable";

function airtable_base_define({ id }) {
  airtable.configure({
    endpointUrl: "https://api.airtable.com",
    apiKey: "keyIffg4q9CmdItjv"
  });
  var base = airtable.base(id);
  return base;
}

function dict_from_record_keys(record, keys) {
  var D = {};
  keys.forEach(function(k) {
    D[k] = record.get(k);
  });
  return D;
}
function update_airtable_data({ base, name, updateAirtableData, keys }) {
  var l = [];
  base(name)
    .select({
      view: "Grid view"
    })
    .eachPage(
      function page(records, fetchNextPage) {
        records.forEach(function(record) {
          const response_dict = dict_from_record_keys(record, keys);
          l.push(response_dict);
        });
        fetchNextPage();
      },
      function done(err) {
        if (err) {
          console.error({ err });
          return;
        } else {
          // console.log({ base, name, l });
          updateAirtableData(l);
        }
      }
    );
}

function update_airtable_data_complete({ id, name, updateAirtableData, keys }) {
  var base = airtable_base_define({ id });
  update_airtable_data({ base, name, updateAirtableData, keys });
}

const useAirTable = ({ id, name, keys }) => {
  const [airtable_data, updateAirtableData] = useState([]);
  useEffect(() => {
    update_airtable_data_complete({ id, name, updateAirtableData, keys });
  }, [id, name]);
  function updateAirTable() {
    update_airtable_data_complete({ id, name, updateAirtableData, keys });
  }
  return { airtable_data, updateAirTable };
};

export default useAirTable;
