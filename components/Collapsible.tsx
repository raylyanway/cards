import { useState } from 'react';
import { StyleSheet, TouchableOpacity, ViewProps } from 'react-native';

import { Icon } from '@/components/icons';
import { View } from '@/components/layouts';
import { Text } from '@/components/texts';

interface CollapsibleProps extends ViewProps {
  title: string;
}

export const Collapsible = ({ children, title }: CollapsibleProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View>
      <TouchableOpacity
        style={styles.heading}
        onPress={() => setIsOpen((value) => !value)}
        activeOpacity={0.8}
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
    gap: 6
  },
  content: {
    marginTop: 6,
    marginLeft: 24
  }
});
