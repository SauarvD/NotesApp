import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Constants, SQLite } from 'expo';

const db = SQLite.openDatabase('todolist.db');

export default class Items extends React.Component {
    state = {
      items: null
    };
  
    componentDidMount() {
      this.update();
    }
  
    render() {
      const { done: doneHeading } = this.props;
      const { items } = this.state;
      const heading = doneHeading ? 'Congrats! you have completed' : 'You still have to';
  
      if (items === null || items.length === 0) {
        return null;
      }
  
      return (
        <View style={{ marginBottom: 16, marginHorizontal: 16 }}>
          <Text style={styles.sectionHeading}>{heading}</Text>
          {items.map(({ id, done, value }) => (
            <TouchableOpacity
              key={id}
              onPress={() => this.props.onPressItem && this.props.onPressItem(id)}
              style={{
                backgroundColor: done ? '#40bf40' : 'powderblue',
                borderColor: '#000',
                borderRadius: 20,
                borderWidth: 1,
                padding: 8,
                marginBottom: 5
              }}>
              <Text style={{ color: done ? '#fff' : '#000' }}>{value}</Text>
            </TouchableOpacity>
          ))}
        </View>
      );
    }
  
    update() {
      db.transaction(tx => {
        tx.executeSql(
          `select * from items where done = ?;`,
          [this.props.done ? 1 : 0],
          (_, { rows: { _array } }) => this.setState({ items: _array })
        );
      });
    }
  }

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  flexRow: {
    flexDirection: 'row'
  },
  input: {
    borderColor: '#4630eb',
    borderRadius: 4,
    borderWidth: 1,
    flex: 1,
    height: 48,
    margin: 16,
    padding: 5
  },
  listArea: {
    backgroundColor: '#f0f0f0',
    flex: 1,
    paddingTop: 16
  },
  sectionHeading: {
    fontSize: 18,
    marginBottom: 8
  },
});