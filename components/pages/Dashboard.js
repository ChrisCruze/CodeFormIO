import React, { Fragment, useState } from "react";
import { StyleSheet, View } from "react-native";
import useAirTable from "../../hooks/useAirTable";
import { AirTableFormat } from "../../functions/AirTableFormat";
import { zapierPost } from "../../functions/zapierPost";
import { Container, Header, Content, List, ListItem, Text, Left, Right, Icon, Button, Body, Item, Input } from "native-base";
import _ from "lodash";

const codeAirTableJS = () => {
  return useAirTable({
    id: "applT0lSEVH6ADeKo",
    name: "Javascript",
    keys: ["Name", "Code", "Date Created", "Date Modified", "Category", "Symbol", "Note", "Dependency"]
  });
};

const CodeItem = ({ Name, Symbol, Note, Dependency }) => {
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
        <Icon name="arrow-forward" />
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
const Dashboard = () => {
  const [searchText, updateSearchText] = useState("");
  const code_airtable_js = codeAirTableJS();
  const code_list_filtered = searchArrayFromTextArray(code_airtable_js.data, searchText);

  console.log({ code_airtable_js });

  return (
    <Container>
      <SearchBar searchText={searchText} updateSearchText={updateSearchText} />
      <Content>
        <CodeList array={code_list_filtered} />
      </Content>
    </Container>
  );
};

export default Dashboard;
