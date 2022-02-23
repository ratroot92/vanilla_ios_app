/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
// import { addDays, format } from 'date-fns';
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {DayAgenda} from 'react-native-calendars';
import {Avatar, Card} from 'react-native-paper';
import globalStyles from '../../../styles/global.style';

import dayagenda from '../data/dayagenda.json';

const renderItemStyles = StyleSheet.create({
  cardWrapper: {
    height: 70,
    width: 120,
    padding: 0,
    backgroundColor: 'white',
    marginLeft: 4,
    marginRight: 4,
    marginTop: 4,
    marginBottom: 4,
  },
  scrollWrapper: {
    centerContent: true,
    flex: 1,
  },
  cardContentWrapper: {
    flex: 1,
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderLeftWidth: 3,
  },
  eventTypeText: {fontSize: 8, fontWeight: 'bold'},
  eventNameText: {fontSize: 11, color: 'black', fontWeight: 'bold'},
  eventDescriptionText: {
    fontSize: 11,
    color: 'black',
    fontWeight: 'bold',
  },
  cardContentFooterWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  eventTimeText: {fontSize: 9, fontWeight: 'bold'},
  eventParticipantWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function DayView() {
  const [items, setItems] = React.useState(dayagenda);
  /**
      {
      '2022-02-21': [
        {name: 'event 1 of 2022-02-21', cookies: true},
        {name: 'event 2 of 2022-02-21', cookies: false},
      ],
      '2022-02-23': [{name: 'event 1 of 2022-02-21', cookies: true}],
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
  //     setItems(events);
  //   };
  //   getEvents();
  // }, []);

  React.useEffect(() => {}, [items]);

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

  const renderItem = events => {
    return events?.map((el, index) => (
      <Card key={index} style={renderItemStyles.cardWrapper}>
        <ScrollView
          contentContainerStyle={renderItemStyles.scrollWrapper}
          horizontal={true}>
          <Card.Content
            style={[
              renderItemStyles.cardContentWrapper,
              {
                borderLeftColor: el.eventColor,
              },
            ]}>
            <View style={{flex: 1, padding: 0}}>
              <Text
                style={[
                  renderItemStyles.eventTypeText,
                  {color: el.eventColor},
                ]}>
                {el.type}
              </Text>
              <Text style={renderItemStyles.eventNameText}>
                {el.description}
              </Text>
              <Text style={renderItemStyles.eventDescriptionText}>
                {el.name}
              </Text>
            </View>
            <View style={renderItemStyles.cardContentFooterWrapper}>
              <Text style={renderItemStyles.eventTimeText}>
                {el.startTime} - {el.endTime}
              </Text>
              <View style={renderItemStyles.eventParticipantWrapper}>
                <Avatar.Image
                  size={13}
                  source={require('../../../assets/images/avatar_1.jpeg')}
                  style={{marginRight: -2}}
                />
                <Avatar.Image
                  size={13}
                  source={require('../../../assets/images/avatar_1.jpeg')}
                  style={{marginLeft: -2}}
                />
              </View>
            </View>
          </Card.Content>
        </ScrollView>
      </Card>
    ));
  };

  return (
    <View style={{flex: 1}}>
      <DayAgenda
        // testID={testIDs.agenda.CONTAINER}
        items={items}
        // loadItemsForMonth={loadItems}
        selected={'2022-02-21'}
        renderItem={renderItem}
      />
    </View>
  );
}
