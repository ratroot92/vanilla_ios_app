/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
// import { addDays, format } from 'date-fns';
import React from 'react';
import {View, Text, ScrollView, StyleSheet, Image} from 'react-native';
import {DayAgenda} from 'react-native-calendars';
import {Avatar, Card} from 'react-native-paper';
import {format} from 'date-fns';
import {en} from 'date-fns/locale';
import dayagenda from '../data/dayagenda.json';
import dateUtils from '../../../utils/date.utils';
import moment from 'moment';

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
  const current = new Date();
  var minDate = moment(new Date(current.getFullYear(), current.getMonth(), 1));
  var maxDate = moment(
    new Date(current.getFullYear(), current.getMonth() + 1, 0),
  );

  const [state, setState] = React.useState({
    items: dayagenda,
    loading: false,
    current: format(current, 'yyyy-MM-dd'),
    maxDate: moment(minDate).format('YYYY-MM-DD').toString(),
    minDate: moment(maxDate).format('YYYY-MM-DD').toString(),
    month,
    year: new Date().getFullYear(),
    dayName: format(current, 'EEEE'),
  });

  // React.useEffect(() => {
  //   const current = new Date();
  //   var minDate = moment(
  //     new Date(current.getFullYear(), current.getMonth(), 1),
  //   );
  //   var maxDate = moment(
  //     new Date(current.getFullYear(), current.getMonth() + 1, 0),
  //   );
  //   console.log('**************************************');
  //   console.log('minDate ==>', minDate);
  //   console.log('maxDate ==>', maxDate);
  //   console.log('**************************************');
  //   console.log('minDate ==>', moment(minDate).format('YYYY-MM-DD').toString());
  //   console.log('maxDate ==>', moment(maxDate).format('YYYY-MM-DD').toString());
  //   console.log('**************************************');

  //   console.log('**************************************');
  //   setState(() => ({
  //     ...state,
  //     current: moment(current).format('YYYY-MM-DD'),
  //     maxDate,
  //     minDate,
  //   }));
  // }, [state.month]);

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

  React.useEffect(() => {}, [state]);

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
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 2,
            backgroundColor: '#EBF7FD',
            padding: 10,
          }}>
          <Image
            style={{marginLeft: 5, marginRight: 5}}
            source={require('./../../../assets/icons/4.png')}
          />
          <View>
            <Text style={{fontSize: 12}}>H 80</Text>
            <Text style={{fontSize: 12}}>L 40*</Text>
          </View>
          <View>
            <Text style={{fontSize: 12, color: '#000', fontWeight: 'bold'}}>
              {state.month} {state.year}
            </Text>
            <Text style={{fontSize: 12, color: '#000'}}>{state.dayName}</Text>
          </View>

          <View style={{flexDirection: 'row'}}>
            <Image
              style={{marginLeft: 5, marginRight: 5}}
              source={require('./../../../assets/icons/1.png')}
            />
            <Image
              style={{marginLeft: 5, marginRight: 5}}
              source={require('./../../../assets/icons/2.png')}
            />
            <Image
              style={{marginLeft: 5, marginRight: 5}}
              source={require('./../../../assets/icons/3.png')}
            />
          </View>
        </View>
      </View>

      <DayAgenda
        // testID={testIDs.agenda.CONTAINER}
        items={state.items}
        selected={state.current}
        renderItem={renderItem}
        current={state.current}
        minDate={state.minDate}
        maxDate={state.maxDate}
        // loadItemsForMonth={month => {}}
        // onCalendarToggled={calendarOpened => {}}
        onDayPress={data => {
          // const {dateString, day, month, timestamp, year} = data;
          setState(prevState => ({
            ...prevState,
            // month: dateUtils.getMonthNameByNumber(month),
            current: data,
            dayName: dateUtils.getDayName(data),
          }));
        }}
        onDayChange={day => {}}
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
                No Events for {state.current}
              </Text>
            </View>
          );
        }}
        hideKnob={true}
        showClosingKnob={true}
        refreshing={state.loading}
      />
    </View>
  );
}
