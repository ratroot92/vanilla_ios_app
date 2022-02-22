/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import DailyEventCalendar from './src/components/Calendar/DailyEventCalendar';
import AgendaScreen from './src/components/WixCalendar/AgendaScreen';
import ExpandableCalendarScreen from './src/components/WixCalendar/ExpandableCalendar';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import MonthCalendar from './src/components/WixCalendar/Calendars/MonthCalendar';
import MonthCalendarMarked from './src/components/WixCalendar/Calendars/MonthCalendarMarked';
import CustomMarking from './src/components/WixCalendar/Calendars/CustomMarking';
// const Section = ({children, title}): Node => {
//   const isDarkMode = useColorScheme() === 'dark';
//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             color: isDarkMode ? Colors.#fff : Colors.black,
//           },
//         ]}>
//         {title}
//       </Text>
//       <Text
//         style={[
//           styles.sectionDescription,
//           {
//             color: isDarkMode ? Colors.light : Colors.dark,
//           },
//         ]}>
//         {children}
//       </Text>
//     </View>
//   );
// };

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [state, setState] = React.useState({
    viewType: 'weekly',
  });
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <>
      <SafeAreaView>
        <View
          style={{
            // flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            backgroundColor: '#5467fe',
            padding: 5,
          }}>
          <TouchableOpacity
            style={{
              backgroundColor: '#68a0cf',
              padding: 10,
              borderRadius: 3,
              borderWidth: 1,
              borderColor: state.viewType === 'schedule' ? 'white' : 'blue',
            }}
            onPress={() => setState({...state, viewType: 'schedule'})}>
            <Text style={{color: '#fff', fontWeight: 'bold'}}>Schedule</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              backgroundColor: '#68a0cf',
              padding: 10,
              borderRadius: 3,
              borderWidth: 1,
              borderColor: state.viewType === 'weekly' ? 'white' : 'blue',
            }}
            onPress={() => setState({...state, viewType: 'weekly'})}>
            <Text style={{color: '#fff', fontWeight: 'bold'}}>Week</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              backgroundColor: '#68a0cf',
              padding: 10,
              borderRadius: 3,
              borderWidth: 1,
              borderColor: state.viewType === 'monthly' ? 'white' : 'blue',
            }}
            onPress={() => setState({...state, viewType: 'monthly'})}>
            <Text style={{color: '#fff', fontWeight: 'bold'}}>Month</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              backgroundColor: '#68a0cf',
              padding: 10,
              borderRadius: 3,
              borderWidth: 1,
              borderColor: state.viewType === 'yearly' ? 'white' : 'blue',
            }}
            onPress={() => setState({...state, viewType: 'yearly'})}>
            <Text style={{color: '#fff', fontWeight: 'bold'}}>Year</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      {/* <MonthCalendar /> */}

      {/* <CustomMarking /> */}
      <>
        {state.viewType === 'weekly' ? <AgendaScreen /> : <></>}
        {state.viewType === 'monthly' ? <MonthCalendar /> : <></>}
        {state.viewType === 'schedule' ? <CustomMarking /> : <></>}
        {state.viewType === 'yearly' ? <ExpandableCalendarScreen /> : <></>}
      </>
    </>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
