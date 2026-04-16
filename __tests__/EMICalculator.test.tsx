import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import { Text, TextInput } from 'react-native';
import { Provider } from 'react-redux';

import EMICalculatorScreen from '../modules/EMICalculatorStack/src/EMICalculatorScreen';
import { clearLastCalculatedResult } from '../modules/EMICalculatorStack/src/store/emiSlice';
import { store } from '../modules/EMICalculatorStack/src/store/store';

describe('EMI Calculator', () => {
  beforeEach(() => {
    store.dispatch(clearLastCalculatedResult());
  });

  test('calculates EMI correctly for known inputs', async () => {
    let renderer: ReactTestRenderer.ReactTestRenderer;

    await ReactTestRenderer.act(() => {
      renderer = ReactTestRenderer.create(
        <Provider store={store}>
          <EMICalculatorScreen />
        </Provider>,
      );
    });

    const inputs = renderer!.root.findAllByType(TextInput);
    expect(inputs).toHaveLength(3);

    await ReactTestRenderer.act(() => {
      inputs[0].props.onChangeText('100000');
      inputs[1].props.onChangeText('12');
      inputs[2].props.onChangeText('12');
    });

    const calculateButton = renderer!.root.find(
      node =>
        typeof node.props.onPress === 'function' &&
        node.findAllByType(Text).some(textNode => textNode.props.children === 'Calculate'),
    );
    await ReactTestRenderer.act(() => {
      calculateButton.props.onPress();
    });

    const renderedText = renderer!.root
      .findAllByType(Text)
      .map(node => (Array.isArray(node.props.children) ? node.props.children.join('') : String(node.props.children)));

    expect(renderedText).toContain('INR 8884.88');
    expect(renderedText).toContain('INR 6618.55');
    expect(renderedText).toContain('INR 106618.55');
  });
});
