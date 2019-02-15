/*
 *
 * Created by Stone
 * https://github.com/bolan9999
 * Email: shanshang130@gmail.com
 * Date: 2018/7/22
 *
 */

import React from "react";
import {
  View,
  Image,
  Text,
  Platform,
  TouchableOpacity,
  StyleSheet,
  TextInput
} from "react-native";
import { LargeList, NativeLargeList } from "../src";
import { contacts } from "./DataSource";

export class ContactExample extends React.Component {
  largeList;

  constructor(props) {
    super(props);
    this.state = { data: contacts };
  }

  render() {
    const List = this.props.native ? NativeLargeList : LargeList;
    return (
      <List
        style={styles.container}
        heightForSection={() => 40}
        renderSection={this._renderSection}
        heightForIndexPath={() => 60}
        renderIndexPath={this._renderItem}
        data={this.state.data}
        renderHeader={this._renderHeader}
        renderFooter={this._renderFooter}
      />
    );
  }

  _renderHeader = () => {
    return (
      <TextInput
        style={styles.search}
        placeholder="Please type first letter to search"
        onSubmitEditing={this._search}
        returnKeyType="done"
      />
    );
  };

  _renderFooter = () => {
    return (
      <Text style={{ marginVertical: 20, alignSelf: "center" }}>
        This is the footer
      </Text>
    );
  };

  _renderSection = (section: number) => {
    const contact = this.state.data[section];
    return (
      <TouchableOpacity style={styles.section}>
        <Text style={styles.sectionText}>
          {contact.header}
        </Text>
      </TouchableOpacity>
    );
  };

  _renderItem = ({ section: section, row: row }) => {
    const contact = this.state.data[section].items[row];
    return (
      <TouchableOpacity style={styles.row}>
        <Image source={contact.icon} style={styles.image} />
        <View style={styles.rContainer}>
          <Text style={styles.title}>
            {contact.name}
          </Text>
          <Text style={styles.subtitle}>
            {contact.phone}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  _search = ({ nativeEvent: { text: text } }) => {
    const notFound = contacts.every(contract => {
      if (contract.header === text) {
        this.setState({ data: [contract] });
        return false;
      }
      return true;
    });
    if (notFound) {
      this.setState({ data: [] });
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  search: {
    marginTop: Platform.OS === "ios" ? 20 : 0,
    fontSize: 18
  },
  section: {
    flex: 1,
    backgroundColor: "#EEE",
    justifyContent: "center"
  },
  sectionText: {
    fontSize: 20,
    marginLeft: 10
  },
  row: { flex: 1, flexDirection: "row", alignItems: "center" },
  image: { marginLeft: 16, width: 44, height: 44 },
  rContainer: { marginLeft: 20 },
  title: { fontSize: 18 },
  subtitle: { fontSize: 14, marginTop: 8 }
});
