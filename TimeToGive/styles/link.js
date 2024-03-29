  import { Dimensions, StyleSheet } from 'react-native';
  const screenWidth = Dimensions.get('window').width;

  export const linkStyles = StyleSheet.create({
  signUpText: {
    marginRight: 5,
    fontSize: 16,
  },
  signUpButtonText: {
    fontSize: 16,
    color: '#3a6238',
    fontWeight: 'bold',
  },

  signUpContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20,
    },
  });