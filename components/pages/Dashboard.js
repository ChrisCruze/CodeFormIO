import React, { Fragment } from "react";
import { StyleSheet, View } from "react-native";
import useAirTable from "../../hooks/useAirTable";
import { AirTableFormat } from "../../functions/AirTableFormat";
import { zapierPost } from "../../functions/zapierPost";
import { Container, Header, Content, List, ListItem, Text } from "native-base";

const codeAirTableJS = () => {
  return useAirTable({
    id: "applT0lSEVH6ADeKo",
    name: "Javascript",
    keys: ["Name", "Code", "Date Created", "Date Modified", "Category"]
  });
};

const CodeItem = ({ Name }) => {
  return (
    <ListItem>
      <Text>{Name}</Text>
    </ListItem>
  );
};

const CodeItemsSection = ({ array, name }) => {
  return (
    <Fragment>
      <ListItem itemDivider>
        <Text>{name}</Text>
      </ListItem>
      {array.map((item, item_number) => (
        <CodeItem {...item} />
      ))}
    </Fragment>
  );
};
const CodeListBasic = ({ array }) => {
  return (
    <List>
      {array.map((item, item_number) => (
        <CodeItem {...item} />
      ))}
    </List>
  );
};
const CodeList = ({ array }) => {
  return (
    <List>
      {array.map((item, item_number) => (
        <CodeItem {...item} />
      ))}
    </List>
  );
};

const Dashboard = () => {
  const code_airtable_js = codeAirTableJS();
  console.log({ code_airtable_js });

  return (
    <Container>
      <Header />
      <Content>
        <CodeList array={code_airtable_js.data} />
      </Content>
    </Container>
  );
};

export default Dashboard;
