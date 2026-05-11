import { render } from '@testing-library/react-native';
import React from 'react';

jest.mock('@/store/useBoundStore', () => ({
  useBoundStore: jest.fn()
}));

jest.mock('@expo/vector-icons/Ionicons', () => {
  const React = require('react');
  return {
    __esModule: true,
    default: ({ name, size, color, ...rest }: any) => (
      <mock-ionicon name={name} size={size} color={color} {...rest} />
    )
  };
});

import { Icon } from '@/components/icons/Icon';
import { useBoundStore } from '@/store/useBoundStore';

describe('Icon component', () => {
  it('selects themed color and renders expected size', () => {
    (useBoundStore as jest.Mock).mockReturnValue({
      computedTheme: {
        colors: {
          primary: '#112233',
          text: '#000000'
        }
      }
    });

    const { toJSON } = render(<Icon name="heart" color="primary" size="md" />);

    expect(toJSON()).toMatchSnapshot();
  });

  it('falls back to string color when theme color is unavailable', () => {
    (useBoundStore as jest.Mock).mockReturnValue({
      computedTheme: {
        colors: {
          text: '#000000'
        }
      }
    });

    const { toJSON } = render(<Icon name="heart" color="#ff00ff" size="lg" />);

    expect(toJSON()).toMatchSnapshot();
  });
});
