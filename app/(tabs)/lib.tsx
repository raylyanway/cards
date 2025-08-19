import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

import { BlockButton } from '@/components/buttons/BlockButton';
import { Button } from '@/components/buttons/Button';
import { IconButton } from '@/components/buttons/IconButton';
import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import { HorizontalLine } from '@/components/HorizontalLine';
import { HelloWave } from '@/components/icons/HelloWave';
import { Icon } from '@/components/icons/Icon';
import { Block } from '@/components/layouts/Block';
import { BlockList } from '@/components/layouts/BlockList';
import { Center } from '@/components/layouts/Center';
import { Padding } from '@/components/layouts/Padding';
import { ScrollView } from '@/components/layouts/ScrollView';
import { TabSafeAreaView } from '@/components/layouts/TabSafeAreaView';
import { View } from '@/components/layouts/View';
import { ProgressBar } from '@/components/ProgressBar';
import { AnimatedText } from '@/components/texts/AnimatedText';
import { HighlightedText } from '@/components/texts/HighlightedText';
import { Text } from '@/components/texts/Text';
import { palette, themedColors } from '@/config/typography';
import { useBoundStore } from '@/store/useBoundStore';
import { IPaletteColor, IThemedColor } from '@/types';

export default function LibScreen() {
  return (
    <TabSafeAreaView themed fullScreen tabPadding>
      <ScrollView>
        <View style={styles.mainContainer}>
          <CommonSectionPreview />
          <HorizontalLine />
          <ButtonSectionPreview />
          <HorizontalLine />
          <LayoutSectionPreview />
          <HorizontalLine />
          <TextSectionPreview />
          <HorizontalLine />
          <IconSectionPreview />
          <HorizontalLine />
          <ThemedColorsSectionPreview />
          <HorizontalLine />
          <PaletteColorsSectionPreview />
        </View>
      </ScrollView>
    </TabSafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    gap: 16
  },
  listContainer: {
    gap: 8
  },
  row: {
    gap: 8,
    flexDirection: 'row'
  },
  title: {
    justifyContent: 'center'
  },
  color: {
    height: 30,
    width: 30,
    borderWidth: 1
  }
});

function CommonSectionPreview() {
  return (
    <View style={styles.mainContainer}>
      <Text type="title" style={styles.title}>
        Common
      </Text>
      <View style={styles.listContainer}>
        <ProgressBar
          total={100}
          items={[
            { value: 20, color: palette.blue },
            { value: 10, color: palette.gold },
            { value: 30, color: palette.green }
          ]}
        />
        <Collapsible title="Collapsible">
          <Text>
            You can open this project on Android, iOS, and the web. To open the
            web version, press &ldquo;w&rdquo; in the terminal running this
            project.
          </Text>
        </Collapsible>
        <ExternalLink href="https://docs.expo.dev/router/introduction">
          <Text type="link">ExternalLink</Text>
        </ExternalLink>
      </View>
    </View>
  );
}

function ButtonSectionPreview() {
  return (
    <View style={styles.mainContainer}>
      <Text type="title" style={styles.title}>
        Button
      </Text>
      <View style={styles.listContainer}>
        <BlockButton>BlockButton</BlockButton>
        <Button>
          <Text>Button</Text>
        </Button>
        <IconButton name="airplane" />
      </View>
    </View>
  );
}

function LayoutSectionPreview() {
  const oppositeColors = useBoundStore(
    (state) => state.computedTheme.oppositeColors
  );

  return (
    <View style={styles.mainContainer}>
      <Text type="title" style={styles.title}>
        Layout
      </Text>
      <View style={styles.listContainer}>
        <Block>
          <Text>Block</Text>
        </Block>
        <Block fullWidth>
          <Text>Block (fullWidth)</Text>
        </Block>
        <BlockList
          list={[
            {
              secondaryText: 'secondaryText',
              text: 'BlockList'
            },
            {
              secondaryText: 'secondaryText 2',
              text: 'BlockList 2'
            }
          ]}
        />
        <Center
          style={{ borderColor: oppositeColors.background, borderWidth: 1 }}
        >
          <Text>Center</Text>
        </Center>
        <Padding
          style={{ borderColor: oppositeColors.background, borderWidth: 1 }}
        >
          <Text>Padding</Text>
        </Padding>
        <View
          style={{ borderColor: oppositeColors.background, borderWidth: 1 }}
        >
          <Text>View</Text>
        </View>
        <ScrollView
          style={{
            borderColor: oppositeColors.background,
            borderWidth: 1,
            height: 50
          }}
        >
          <Text>ScrollView</Text>
          <Text>ScrollView</Text>
          <Text>ScrollView</Text>
          <Text>ScrollView</Text>
        </ScrollView>
        <TabSafeAreaView
          style={{
            borderColor: oppositeColors.background,
            borderWidth: 1,
            height: 50
          }}
        >
          <Text>TabSafeAreaView</Text>
        </TabSafeAreaView>
      </View>
    </View>
  );
}

function TextSectionPreview() {
  return (
    <View style={styles.mainContainer}>
      <Text type="title" style={styles.title}>
        Text
      </Text>
      <View style={styles.listContainer}>
        <Text type="title">title</Text>
        <Text type="subtitle">subtitle</Text>
        <Text type="default">default</Text>
        <Text type="defaultSecondary">defaultSecondary</Text>
        <Text type="defaultSemiBold">defaultSemiBold</Text>
        <Text type="link">link</Text>
        <HighlightedText text="HighlightedText ~here~" />
        <AnimatedTextPreview />
      </View>
    </View>
  );
}

function IconSectionPreview() {
  return (
    <View style={styles.mainContainer}>
      <Text type="title" style={styles.title}>
        Icons
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.row}>
          <HelloWave />
          <Text>moved 4 times</Text>
        </View>
        <Icon name="airplane" size="md" color="tomato" />
      </View>
    </View>
  );
}

function ThemedColorsSectionPreview() {
  const oppositeColors = useBoundStore(
    (state) => state.computedTheme.oppositeColors
  );
  const colorList = Object.keys(themedColors.dark) as IThemedColor[];

  const ColorComponent: React.FC<{ color: IThemedColor }> = ({ color }) => {
    return (
      <View style={styles.row}>
        <View
          style={[
            styles.color,
            {
              backgroundColor: themedColors.light[color],
              borderColor: oppositeColors.background
            }
          ]}
        />
        <View
          style={[
            styles.color,
            {
              backgroundColor: themedColors.dark[color],
              borderColor: oppositeColors.background
            }
          ]}
        />
        <Text>{color}</Text>
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <Text type="title" style={styles.title}>
        Colors (light / dark)
      </Text>
      <View style={styles.listContainer}>
        {colorList.map((color) => (
          <ColorComponent key={color} color={color} />
        ))}
      </View>
    </View>
  );
}

function PaletteColorsSectionPreview() {
  const oppositeColors = useBoundStore(
    (state) => state.computedTheme.oppositeColors
  );
  const colorList = Object.keys(palette) as IPaletteColor[];

  const ColorComponent: React.FC<{ color: IPaletteColor }> = ({ color }) => {
    return (
      <View style={styles.row}>
        <View
          style={[
            styles.color,
            {
              backgroundColor: palette[color],
              borderColor: oppositeColors.background
            }
          ]}
        />
        <Text>{color}</Text>
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <Text type="title" style={styles.title}>
        Colors (palette)
      </Text>
      <View style={styles.listContainer}>
        {colorList.map((color) => (
          <ColorComponent key={color} color={color} />
        ))}
      </View>
    </View>
  );
}

function AnimatedTextPreview() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShow((prev) => !prev);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <AnimatedText show={show}>AnimatedText</AnimatedText>;
}
