import { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { BarChart, PieChart } from 'react-native-gifted-charts';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from 'react-native-reanimated';

import { Padding } from '@/components/layouts/Padding';
import { TabSafeAreaView } from '@/components/layouts/TabSafeAreaView';
import { Text } from '@/components/texts/Text';
import { spaces } from '@/config/typography';

const gray = '#27252a';
const lightGray = '#6e6c72';
const linkBlue = '#2387DC';

const incomes = ['$55,555.50', '$632,632.41', '$2,592,986.27'];
const invoices = ['$56,703.42', '$388,455.33', '$7,356,986.50'];

const d1 = [
  {
    value: 12,
    frontColor: '#0078F8',
    gradientColor: '#0EB2F8',
    color: '#0078F8'
  },
  {
    value: 6,
    frontColor: '#FF9704',
    gradientColor: '#FCC601',
    color: '#FF9704'
  },
  {
    value: 2,
    frontColor: '#B55AE2',
    gradientColor: '#D485E6',
    color: '#B55AE2'
  },
  {
    value: 5,
    frontColor: '#F22750',
    gradientColor: '#FA4880',
    color: '#F22750'
  },
  {
    value: 7,
    frontColor: '#33C83A',
    gradientColor: '#30E45A',
    color: '#33C83A'
  },
  {
    value: 6,
    frontColor: '#939393',
    gradientColor: '#BBBBBD',
    color: '#939393'
  },
  {
    value: 1,
    frontColor: '#F2CA02',
    gradientColor: '#F3E100',
    color: '#F2CA02'
  },
  {
    value: 5,
    frontColor: '#30CD33',
    gradientColor: '#33E059',
    color: '#30CD33'
  }
];

export default function HomeScreen() {
  const [index, setIndex] = useState(0);
  const [data, setData] = useState(d1);
  const activeTabX = useSharedValue(0);

  const handleTabPress = (newIndex: number) => () => {
    if (newIndex === index) return;
    activeTabX.value = withSpring(newIndex * 100, {
      mass: 1,
      damping: 100,
      stiffness: 200
    });
    setIndex(newIndex);
  };

  const Title = () => <Text type="subtitle">OverView</Text>;

  const backgroundStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: `${activeTabX.value}%` }]
    };
  });

  const TabView = () => (
    <View style={styles.tabContainer}>
      <Animated.View style={[styles.activeBackground, backgroundStyle]} />
      <View style={styles.tabContent}>
        <TouchableOpacity style={styles.tabButton} onPress={handleTabPress(0)}>
          <Text style={styles.tabText}>Today</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton} onPress={handleTabPress(1)}>
          <Text style={styles.tabText}>Last 7 days</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton} onPress={handleTabPress(2)}>
          <Text style={styles.tabText}>Last 30 days</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const Bars = () => (
    <View style={styles.card}>
      <Text style={styles.tabTextLink}>INCOME</Text>
      <Text style={styles.tabTextTitle}>{incomes[index]}</Text>
      <BarChart
        data={data}
        hideAxesAndRules
        hideYAxisText
        initialSpacing={0}
        barWidth={20}
        barBorderRadius={8}
        adjustToWidth
        isAnimated
        animationDuration={1200}
        showGradient
        highlightEnabled
        lowlightOpacity={0.2}
        showValuesAsTopLabel
        topLabelTextStyle={{ color: 'white' }}
      />
    </View>
  );

  const Pie = () => (
    <View style={styles.card}>
      <Text style={styles.tabTextLink}>INVOICES</Text>
      <View style={{ alignSelf: 'center' }}>
        <PieChart
          data={data}
          radius={130}
          innerRadius={90}
          strokeColor={gray}
          strokeWidth={8}
          donut
          innerCircleColor={gray}
          centerLabelComponent={() => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Text style={styles.tabTextLink}>UNPAID INVOICES</Text>
              <Text style={{ color: 'white', fontSize: 20 }}>
                {invoices[index]}
              </Text>
            </View>
          )}
        />
      </View>
    </View>
  );

  return (
    <TabSafeAreaView themed fullScreen tabPadding>
      <ScrollView>
        <Padding style={{ gap: spaces.md }}>
          <Title />
          <TabView />
          <ScrollView>
            <Bars />
            <Pie />
          </ScrollView>
        </Padding>
      </ScrollView>
    </TabSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 14,
    backgroundColor: '#000'
  },
  title: {
    fontSize: 26,
    color: 'white',
    marginBottom: 20
  },
  tabContainer: {
    width: '100%',
    height: 30,
    borderRadius: 10,
    backgroundColor: gray,
    overflow: 'hidden',
    position: 'relative'
  },
  activeBackground: {
    position: 'absolute',
    width: '33.333%',
    height: '100%',
    backgroundColor: lightGray,
    borderRadius: 10,
    zIndex: 1,
    left: 0
  },
  tabContent: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    zIndex: 2
  },
  tabButton: {
    width: '33%',
    height: '100%',
    borderRadius: 10,
    justifyContent: 'center'
  },
  tabText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  card: {
    width: '100%',
    height: 300,
    backgroundColor: gray,
    borderRadius: 10,
    marginTop: 20,
    padding: 14
  },
  tabTextLink: {
    color: linkBlue
  },
  tabTextTitle: {
    fontSize: 20,
    marginTop: 6,
    color: 'white'
  }
});
