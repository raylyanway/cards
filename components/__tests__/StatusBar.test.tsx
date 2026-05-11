import { render } from '@testing-library/react-native';
import React from 'react';

jest.mock('expo-status-bar', () => {
  const React = require('react');
  return {
    __esModule: true,
    StatusBar: ({ style }: { style: string }) => (
      <mock-status-bar style={style} />
    )
  };
});

jest.mock('@/store/useBoundStore', () => ({
  useBoundStore: jest.fn()
}));

import { StatusBar } from '@/components/StatusBar';
import { useBoundStore } from '@/store/useBoundStore';

describe('StatusBar component', () => {
  it('renders dark style on light theme', () => {
    (useBoundStore as jest.Mock).mockReturnValue({
      computedTheme: { isLightTheme: true }
    });

    const { toJSON } = render(<StatusBar />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders light style on dark theme', () => {
    (useBoundStore as jest.Mock).mockReturnValue({
      computedTheme: { isLightTheme: false }
    });

    const { toJSON } = render(<StatusBar />);
    expect(toJSON()).toMatchSnapshot();
  });
});
