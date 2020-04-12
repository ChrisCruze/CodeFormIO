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

function upload_file_content_base(name, code) {
  var formData = new FormData();
  formData.append("name", name);
  formData.append("code", code);
  var blob = new Blob([code], {
    type: "application/json"
  });
  formData.append("webmasterfile", blob);
  var request = new XMLHttpRequest();
  request.open("POST", "https://hooks.zapier.com/hooks/catch/229795/lmosoc/");
  console.log({ formData });
}

function test_push_implement(name, code) {
  var formData = new FormData();
  formData.append("name", name);
  formData.append("code", code);
  formData.append("html", code);
  formData.append("value", code);
  var blob = new Blob([code], { type: "application/json" });
  formData.append("webmasterfile", blob);
  var request = new XMLHttpRequest();
  request.onreadystatechange = e => {
    if (request.readyState !== 4) {
      return;
    }
    if (request.status === 200) {
      console.log("success", request.responseText);
    } else {
      console.warn("error");
    }
  };
  console.log({ formData });
  request.open("POST", "https://hooks.zapier.com/hooks/catch/229795/lmosoc/");
  request.send(formData);
}

function upload_file_content(name, code) {
  var formData = new FormData();
  formData.append("name", name);
  formData.append("code", code);
  var blob = new Blob([code], {
    type: "application/json"
  });
  formData.append("webmasterfile", blob);
  var request = new XMLHttpRequest();
  // request.open("POST", "https://hooks.zapier.com/hooks/catch/229795/0u0v92/");
  // request.open("POST", "https://hooks.zapier.com/hooks/catch/229795/csktj2/");
  request.open("POST", "https://hooks.zapier.com/hooks/catch/229795/lmosoc/");
  // console.log({ formData });
  request.send(formData);
}

function test_zapier_post() {
  const data = {
    code: `function test(){return 1}`,
    name: "test_function_two",
    folder: "/Apps/site44/chriscross.site44.com/js",
    extension: ".js"
  };
  // $.ajax({
  //   type: "POST",
  //   url: "https://hooks.zapier.com/hooks/catch/229795/o9jn84p/",
  //   data: data
  // });

  fetch("https://hooks.zapier.com/hooks/catch/229795/o9jn84p/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  //   fetch('https://mywebsite.com/endpoint/', {
  //   method: 'POST',
  //   headers: {
  //     Accept: 'application/json',
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     firstParam: 'yourValue',
  //     secondParam: 'yourOtherValue',
  //   }),
  // });
}

const ButtonClick = e => {
  e.preventDefault();
  // console.log("hi");
  test_zapier_post();
  // const code = `// JavaScript Editing with Firepad!
  // function go() {
  //   var message = "Hello, world.";
  //   console.log(message);
  // }`;
  // test_push_implement("eastertesttwo", code);
  // alert("hi");
};
const Dashboard = () => {
  const code_airtable = codeAirTable();
  // console.log({ code_airtable });
  return (
    <Container>
      <Header />
      <Content>
        <Button onPress={ButtonClick}>
          <Text>Click Me!</Text>
        </Button>
      </Content>
    </Container>
  );
};

export default Dashboard;
