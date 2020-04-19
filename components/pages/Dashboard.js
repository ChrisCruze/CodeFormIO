import React, { Fragment, useState } from "react";
import { StyleSheet, View } from "react-native";
import useAirTable from "../../hooks/useAirTable";
import { AirTableFormat } from "../../functions/AirTableFormat";
import { zapierPost } from "../../functions/zapierPost";
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Text,
  Left,
  Right,
  Icon,
  Button,
  Body,
  Item,
  Input,
  Drawer,
  Card,
  CardItem
} from "native-base";
import _ from "lodash";
import PropsContext from "../../PropsContext";

const codeAirTableJS = () => {
  return useAirTable({
    id: "applT0lSEVH6ADeKo",
    name: "Javascript",
    keys: ["Name", "Code", "Date Created", "Date Modified", "Category", "Symbol", "Note", "Dependency"]
  });
};

const CodeItemButtonExpand = ({ Code, Name, Note }) => {
  return (
    <PropsContext.Consumer>
      {({ updateDrawerObject, drawerObject, drawerState }) => {
        return (
          <Button
            transparent
            onPress={() => {
              drawerState._root.open();
              updateDrawerObject({ Code, Name, Note });
            }}
          >
            <Icon name="arrow-forward" />
          </Button>
        );
      }}
    </PropsContext.Consumer>
  );
};
const CodeItem = ({ Name, Symbol, Note, Dependency, Code }) => {
  return (
    <ListItem icon>
      <Left>
        <Button style={{ backgroundColor: "#FF9501" }}>
          <Icon active name={Symbol || "flask"} />
        </Button>
      </Left>
      <Body>
        <Text>{Name}</Text>
        <Text note>{Note}</Text>
      </Body>
      <Right>
        <Text note>{Dependency}</Text>
        <CodeItemButtonExpand {...{ Code, Name, Note }} />
      </Right>
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

const CodeList = ({ array }) => {
  const category_dict = _.groupBy(array, "Category");
  const category_keys = Object.keys(category_dict);

  return (
    <List>
      {category_keys.map((key, num) => (
        <CodeItemsSection array={category_dict[key]} name={key} />
      ))}
    </List>
  );
};

const SearchBar = ({ searchText, updateSearchText }) => {
  return (
    <Header searchBar rounded>
      <Item>
        <Icon name="ios-search" />
        <Input placeholder="Search" onChangeText={updateSearchText} value={searchText} />
        <Icon name="ios-people" />
      </Item>
      <Button
        transparent
        onPress={() => {
          updateSearchText(searchText);
        }}
      >
        <Text>Search</Text>
      </Button>
    </Header>
  );
};

function searchArrayFromTextDict(D, search_text) {
  const name_formatted = String(D["Name"]).toLowerCase() + String(D["Note"]).toLowerCase() + String(D["Code"]).toLowerCase();
  const search_text_formatted = String(search_text).toLowerCase();
  return name_formatted.indexOf(search_text_formatted) > -1;
}
function searchArrayFromTextArray(array, search_text) {
  return array.filter(function(D) {
    return searchArrayFromTextDict(D, search_text);
  });
}
const Sidebar = ({ Code, Name, Note }) => {
  return (
    <Content>
      <Card style={{ flex: 0 }}>
        <CardItem>
          <Body>
            <Text>{Name || ""}</Text>
            <Text>{Note || ""}</Text>
            <Text>{Code || ""}</Text>
          </Body>
        </CardItem>
      </Card>
    </Content>
  );
};

const DrawerContainer = ({ children, drawerState, updateDrawerState, content }) => {
  return (
    <Drawer
      content={content}
      onClose={() => drawerState._root.close()}
      ref={ref => {
        updateDrawerState(ref);
      }}
    >
      {children}
    </Drawer>
  );
};

const Dashboard = () => {
  const code_airtable_js = codeAirTableJS();
  const code_array = code_airtable_js.data;
  const code_list_filtered = searchArrayFromTextArray(code_array, searchText);

  const [searchText, updateSearchText] = useState("");
  const [drawerState, updateDrawerState] = useState();
  const [drawerObject, updateDrawerObject] = useState();

  return (
    <PropsContext.Provider value={{ updateDrawerObject, drawerObject, drawerState, code_array }}>
      <Container>
        <SearchBar searchText={searchText} updateSearchText={updateSearchText} />

        <DrawerContainer content={<Sidebar {...drawerObject} />} drawerState={drawerState} updateDrawerState={updateDrawerState}>
          <Content>
            <CodeList array={code_list_filtered} />
          </Content>
        </DrawerContainer>
      </Container>
    </PropsContext.Provider>
  );
};

export default Dashboard;
