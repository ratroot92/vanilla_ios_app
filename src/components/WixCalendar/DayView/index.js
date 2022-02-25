/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
// import { addDays, format } from 'date-fns';
import React from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {DayAgenda} from 'react-native-calendars';
import {Avatar, Card} from 'react-native-paper';
import {format} from 'date-fns';
import {en} from 'date-fns/locale';
import dayagenda from '../data/dayagenda.json';
// import dateUtils from '../../../utils/date.utils';
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
  const month = format(new Date(), 'LLLL', {locale: en});
  let currentDay = new Date(); // get current date
  let monthFirstDay = currentDay.getDate() - currentDay.getDay(); // First day is the day of the month - the day of the week
  let monthLastDay = monthFirstDay + 6; // monthLastDay day is the monthFirstDay day + 6
  monthFirstDay = format(
    new Date(currentDay.setDate(monthFirstDay)),
    'yyyy-MM-dd',
  );
  monthLastDay = format(
    new Date(currentDay.setDate(monthLastDay)),
    'yyyy-MM-dd',
  );

  const [state, setState] = React.useState({
    items: dayagenda,
    loading: false,
    currentDay: format(currentDay, 'yyyy-MM-dd'),
    monthLastDay,
    monthFirstDay,
    month,
    year: new Date().getFullYear(),
    dayName: format(currentDay, 'EEEE'),
  });

  React.useEffect(() => {
    let currentDay = new Date(); // get current date
    let monthFirstDay = currentDay.getDate() - currentDay.getDay(); // First day is the day of the month - the day of the week
    let monthLastDay = monthFirstDay + 6; // monthLastDay day is the monthFirstDay day + 6
    monthFirstDay = format(
      new Date(currentDay.setDate(monthFirstDay)),
      'yyyy-MM-dd',
    );
    monthLastDay = format(
      new Date(currentDay.setDate(monthLastDay)),
      'yyyy-MM-dd',
    );
    currentDay = format(currentDay, 'yyyy-MM-dd');
    setState(() => ({...state, currentDay, monthLastDay, monthFirstDay}));
  }, [state.month]);

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

  React.useEffect(() => {
    console.log('**********************');
    console.log('state.currentDay', state.currentDay);
    console.log('**********************');
  }, [state]);

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
      <View>
        <Text style={{fontSize: 12, color: '#000', fontWeight: 'bold'}}>
          {state.month}
          {state.year}
        </Text>
        <Text style={{fontSize: 12, color: '#000', fontWeight: 'bold'}}>
          {state.dayName}
        </Text>
      </View>
      <DayAgenda
        // testID={testIDs.agenda.CONTAINER}
        items={state.items}
        selected={state.currentDay}
        renderItem={renderItem}
        current={state.currentDay}
        minDate={state.monthFirstDay}
        maxDate={state.monthLastDay}
        loadItemsForMonth={month => {
          console.log('trigger items loading', month);
        }}
        onCalendarToggled={calendarOpened => {
          console.log('calendarOpened', calendarOpened);
        }}
        onDayPress={data => {
          const {dateString, day, month, timestamp, year} = data;
          setState(prevState => ({
            ...prevState,
            // month: dateUtils.getMonthNameByNumber(month),
            day: dateString,
            dayName: format(dateString, 'EEEE'),
          }));
        }}
        onDayChange={day => {
          console.log('day changed');
        }}
        pastScrollRange={50}
        futureScrollRange={50}
        renderEmptyDate={() => {
          return (
            <View>
              <Text>Empty Date</Text>
            </View>
          );
        }}
        // Specify what should be rendered instead of ActivityIndicator
        renderEmptyData={() => {
          return (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{fontWeight: 'bold'}}>
                No Events for {state.currentDay}
              </Text>
            </View>
          );
        }}
        hideKnob={true}
        showClosingKnob={true}
        onRefresh={() => console.log('refreshing...')}
        refreshing={state.loading}
      />
    </View>
  );
}
