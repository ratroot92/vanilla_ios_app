/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import {addDays, format} from 'date-fns';
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Agenda} from 'react-native-calendars';
import {Avatar, Card} from 'react-native-paper';

export default function AgendaScreen() {
  const [items, setItems] = React.useState({
    '01': [
      {name: 'event 1 of 2022-02-21', cookies: true},
      {name: 'event 2 of 2022-02-21', cookies: false},
    ],
    '2022-02-22': [{name: 'event 1 of 2022-02-21', cookies: true}],
  });
  /**
   * {
    '2022-02-21': [
      {name: 'event 1 of 2022-02-21', cookies: true},
      {name: 'event 2 of 2022-02-21', cookies: false},
    ],
    '2022-02-22': [{name: 'event 1 of 2022-02-21', cookies: true}],
  }
   */

  // React.useEffect(() => {
  //   const getEvents = async () => {
  //     const response = await fetch(
  //       `https://jsonplaceholder.typicode.com/posts`,
  //     );

  //     let data = await response.json();
  //     data = data.slice(0, 5);
  //     const events = {};
  //     data.map((post, index) => {
  //       const date = addDays(new Date(), index + 1);
  //       events[`${format(date, 'yyyy-MM-dd')}`] = [
  //         {name: post.title, cookies: false, ...post},
  //         {name: post.title, cookies: false, ...post},
  //       ];
  //       return post;
  //     });
  //     console.log(events);
  //     setItems(events);
  //   };
  //   getEvents();
  // }, []);

  React.useEffect(() => {
    // console.log('itemsc hanged ==>', items);
  }, [items]);

  function timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }
  const loadItems = day => {
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);
        if (!items[strTime]) {
          items[strTime] = [];
          const numItems = Math.floor(Math.random() * 3 + 1);
          for (let j = 0; j < numItems; j++) {
            items[strTime].push({
              name: 'Item for ' + strTime + ' #' + j,
              height: Math.max(50, Math.floor(Math.random() * 150)),
            });
          }
        }
      }
      const newItems = {};
      Object.keys(items).forEach(key => {
        newItems[key] = items[key];
      });
      setItems(newItems);
    }, 1000);
  };

  const renderItem = item => {
    console.log('items render ===>', item);
    return (
      <TouchableOpacity style={{padding: 10, marginRight: 10, marginTop: 17}}>
        <Card>
          <Card.Content>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text>{item?.name}</Text>
              <Avatar.Text label="J😇" />
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1}}>
      <Agenda
        // testID={testIDs.agenda.CONTAINER}
        items={items}
        // loadItemsForMonth={loadItems}
        selected={'2022-02-22'}
        renderItem={renderItem}
      />
    </View>
  );
}
