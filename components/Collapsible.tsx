import { useState } from 'react';
import { StyleSheet, TouchableOpacity, ViewProps } from 'react-native';

import { View } from '@/components/layouts';
import { Text } from '@/components/texts';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useGlobalStore } from '@/store/useGlobalStore';

interface CollapsibleProps extends ViewProps {
  title: string;
}

export const Collapsible = ({ children, title }: CollapsibleProps) => {
  const colors = useGlobalStore((s) => s.computed.colors);

  const [isOpen, setIsOpen] = useState(false);

  return (
    <View>
      <TouchableOpacity
        style={styles.heading}
        onPress={() => setIsOpen((value) => !value)}
        activeOpacity={0.8}
      >
        <IconSymbol
          name="chevron.right"
          size={18}
          weight="medium"
          color={colors.text}
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
