import React from 'react';
import { TextInput } from 'react-native';

const UselessTextInput = (props, ref) => {
  const [value, onChangeText] = React.useState(0);

  return (
    <TextInput
      style={{ height: 40, width: 80, borderColor: 'gray', borderWidth: 1 }}
      onChangeText={text => onChangeText(text)}
      value={value}
      forwardedRef={ref}
      {...props}
    />
  );
}

export default React.forwardRef(UselessTextInput);