import { Switch } from '@/components/Switch';
import { render } from '@testing-library/react-native';

describe('Switch component', () => {
  it('renders correctly and updates value', () => {
    const { getByTestId, toJSON } = render(
      <Switch value={true} testID="switch-component" />
    );

    const switchElement = getByTestId('switch-component');
    expect(switchElement.props.value).toBe(true);
    expect(toJSON()).toMatchSnapshot();
  });
});
