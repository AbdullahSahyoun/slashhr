// components/ui/OtpView.tsx
import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';

interface OtpViewProps {
  length: number;
  value: string;
  onChange: (value: string) => void;
  style?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
}

const OtpView: React.FC<OtpViewProps> = ({
  length,
  value,
  onChange,
  style,
  inputStyle,
}) => {
  // Helper to handle input change per box
  const onChangeText = (text: string, index: number) => {
    let newValue = value.split('');
    // Accept only first char (or empty)
    newValue[index] = text.charAt(0) || '';
    onChange(newValue.join(''));
  };

  return (
    <View style={[styles.container, style]}>
      {Array.from({ length }).map((_, i) => (
        <TextInput
          key={i}
          value={value[i] || ''}
          onChangeText={(text) => onChangeText(text, i)}
          style={[styles.input, inputStyle]}
          keyboardType="number-pad"
          maxLength={1}
          returnKeyType="done"
          textContentType="oneTimeCode"
          importantForAutofill="yes"
          autoFocus={i === 0}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  input: {
    width: 48,
    height: 56,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    marginHorizontal: 4,
    textAlign: 'center',
    fontSize: 18,
    color: '#000',
  },
});

export default OtpView;
