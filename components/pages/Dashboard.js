import React from "react";
import { StyleSheet, View } from "react-native";
import useAirTable from "../../hooks/useAirTable";
import { Container, Header, Content, Button, Text } from "native-base";

const codeAirTable = () => {
  return useAirTable({
    id: "applT0lSEVH6ADeKo",
    name: "Javascript",
    keys: ["Name", "Code", "Date Created", "Date Modified"]
  });
};

function upload_file_content(name, code) {
  var formData = new FormData();
  formData.append("name", name);
  formData.append("code", code);
  var content = code;
  var blob = new Blob([content], {
    type: "application/json"
  });
  formData.append("webmasterfile", blob);
  var request = new XMLHttpRequest();
  request.open("POST", "https://hooks.zapier.com/hooks/catch/229795/0u0v92/");
  request.send(formData);
}

const Dashboard = () => {
  const code_airtable = codeAirTable();
  console.log({ code_airtable });
  return (
    <Container>
      <Header />
      <Content>
        <Button>
          <Text>Click Me!</Text>
        </Button>
      </Content>
    </Container>
  );
};

export default Dashboard;
