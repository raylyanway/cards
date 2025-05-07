import { Switch as RNSwitch, SwitchProps } from 'react-native';

import { palette } from '@/config';

export const Switch = ({ value, ...switchProps }: SwitchProps) => {
  const iosBackgroundColor = value ? palette.green : palette.grayDark;

  return (
    <RNSwitch
      trackColor={{ false: palette.gray, true: palette.green }}
      thumbColor={palette.white}
      ios_backgroundColor={iosBackgroundColor}
      value={value}
      {...switchProps}
    />
  );
};
