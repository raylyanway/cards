import { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { Icon } from '@/components/icons/Icon';
import { View, ViewProps } from '@/components/layouts/View';
import { Text } from '@/components/texts/Text';
import { opacities, spaces } from '@/config/typography';

interface CollapsibleProps extends ViewProps {
  title: string;
}

export const Collapsible = ({
  children,
  title,
  ...viewProps
}: CollapsibleProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View {...viewProps}>
      <TouchableOpacity
        style={styles.heading}
        onPress={() => setIsOpen((value) => !value)}
        activeOpacity={opacities.lg}
      >
        <Icon
          name="chevron-forward"
          style={{ transform: [{ rotate: isOpen ? '90deg' : '0deg' }] }}
        />

        <Text type="defaultSemiBold">{title}</Text>
      </TouchableOpacity>
      {isOpen && <View style={styles.content}>{children}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spaces.sm
  },
  content: {
    marginTop: spaces.sm,
    marginLeft: spaces.xl
  }
});
