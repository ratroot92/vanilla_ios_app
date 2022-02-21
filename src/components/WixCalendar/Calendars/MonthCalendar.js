/* eslint-disable react-native/no-inline-styles */
import {format} from 'date-fns';
import React from 'react';
import {View, SafeAreaView} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {Text} from 'react-native-paper';
import {en} from 'date-fns/locale';

export default function MonthCalendar() {
  const currentMonthName = format(new Date(), 'LLLL', {locale: en});
  let currentMonthCurrentDate = new Date(); // get current date
  let currentMonthFirstDate =
    currentMonthCurrentDate.getDate() - currentMonthCurrentDate.getDay(); // First day is the day of the month - the day of the week
  let currentMonthLastDate = currentMonthFirstDate + 6; // currentMonthLastDate day is the currentMonthFirstDate day + 6

  currentMonthFirstDate = format(
    new Date(currentMonthCurrentDate.setDate(currentMonthFirstDate)),
    'yyyy-MM-dd',
  );
  currentMonthLastDate = format(
    new Date(currentMonthCurrentDate.setDate(currentMonthLastDate)),
    'yyyy-MM-dd',
  );
  currentMonthCurrentDate = format(currentMonthCurrentDate, 'yyyy-MM-dd');

  const vacation = {key: 'vacation', color: 'red', selectedDotColor: 'blue'};
  const massage = {key: 'massage', color: 'blue', selectedDotColor: 'blue'};
  const workout = {key: 'workout', color: 'green'};
  return (
    <SafeAreaView>
      <Calendar
        markingType={'multi-dot'}
        markedDates={{
          '2022-02-25': {
            dots: [vacation, massage, workout],
            selected: true,
            selectedColor: 'red',
          },
          '2022-02-26': {dots: [massage, workout], disabled: true},
        }}
        current={currentMonthCurrentDate}
        minDate={currentMonthFirstDate}
        maxDate={currentMonthLastDate}
        onDayPress={day => {
          console.log('selected day', day);
        }}
        onDayLongPress={day => {
          console.log('selected day', day);
        }}
        monthFormat={'yyyy MM'}
        onMonthChange={month => {
          console.log('month changed', month);
        }}
        hideArrows={false}
        // renderArrow={direction => '<>'}
        hideExtraDays={false}
        disableMonthChange={false}
        firstDay={1}
        hideDayNames={false}
        showWeekNumbers={true}
        onPressArrowLeft={subtractMonth => subtractMonth()}
        onPressArrowRight={addMonth => addMonth()}
        disableArrowLeft={false}
        disableArrowRight={false}
        disableAllTouchEventsForDisabledDays={true}
        renderHeader={date => {
          return (
            <View
              style={{
                backgroundColor: '#4537ee',
                padding: 10,
                borderRadius: 5,
                flex: 0.8,
                marginLeft: 'auto',
                marginRight: 'auto',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: 'white', fontWeight: 'bold'}}>
                Month Of {currentMonthName}
              </Text>
              {/* <View
                style={{
                  flex: 1,
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}> */}
              {/* <Text style={{color: 'white', fontWeight: 'bold'}}>
                {date.toDateString()}
              </Text> */}
              {/* </View> */}
            </View>
          );
        }}
        enableSwipeMonths={true}
      />
    </SafeAreaView>
  );
}
