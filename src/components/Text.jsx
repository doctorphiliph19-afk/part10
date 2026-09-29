import { Text as NativeText, StyleSheet } from 'react-native';
import theme from '../theme';

const Text = ({
  color = 'textPrimary',
  fontSize = 'body',
  fontWeight = 'normal',
  style,
  ...props
}) => {
  const textStyle = [
    styles.text,
    {
      color: theme.colors[color],
      fontSize: theme.fontSizes[fontSize],
      fontWeight: theme.fontWeights[fontWeight],
    },
    style,
  ];

  return <NativeText style={textStyle} {...props} />;
};

const styles = StyleSheet.create({
  text: {
    fontFamily: theme.fonts.main,
  },
});

export default Text;