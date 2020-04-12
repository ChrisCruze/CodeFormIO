import React from "react";
import { StyleSheet, View } from "react-native";
import useAirTable from "../../hooks/useAirTable";
import { Container, Header, Content, Button, Text } from "native-base";
import { AirTableFormat } from "../../functions/AirTableFormat";
import { zapierPost } from "../../functions/zapierPost";

const codeAirTableJS = () => {
  return useAirTable({
    id: "applT0lSEVH6ADeKo",
    name: "Javascript",
    keys: ["Name", "Code", "Date Created", "Date Modified"]
  });
};

const codeAirTablePy = () => {
  return useAirTable({
    id: "applT0lSEVH6ADeKo",
    name: "Python",
    keys: ["Name", "Code", "Date Created", "Date Modified"]
  });
};
const codeAirTableCSS = () => {
  return useAirTable({
    id: "applT0lSEVH6ADeKo",
    name: "CSS",
    keys: ["Name", "Code", "Date Created", "Date Modified"]
  });
};

const Dashboard = () => {
  const code_airtable_js = codeAirTableJS();
  const code_airtable_py = codeAirTablePy();
  const code_airtable_css = codeAirTableCSS();

  const JavaScriptSave = e => {
    e.preventDefault();
    const code = AirTableFormat({ data: code_airtable_js.data });
    // console.log({ code });
    zapierPost({ code, name: "supporting_functions", folder: "/Apps/site44/chriscross.site44.com/js", extension: ".js" });
  };

  const PythonSave = e => {
    e.preventDefault();
    const code = AirTableFormat({ data: code_airtable_py.data });
    zapierPost({ code, name: "supporting_functions", folder: "/Apps/site44/chriscross.site44.com/py", extension: ".py" });
  };

  const CSSSave = e => {
    e.preventDefault();
    const code = AirTableFormat({ data: code_airtable_css.data });
    zapierPost({ code, name: "supporting_functions", folder: "/Apps/site44/chriscross.site44.com/css", extension: ".css" });
  };
  return (
    <Container>
      <Header />
      <Content>
        <Button onPress={JavaScriptSave}>
          <Text>Save Javascript</Text>
        </Button>

        <Button onPress={PythonSave}>
          <Text>Save Python</Text>
        </Button>

        <Button onPress={CSSSave}>
          <Text>Save CSS</Text>
        </Button>
      </Content>
    </Container>
  );
};

export default Dashboard;
