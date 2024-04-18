import { StyleSheet } from 'react-native';
export const containerStyles = StyleSheet.create({
 container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  containerAdd: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
    },
  successContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#daf7dc',  // a light green background to indicate success
    },
  successText: {
      color: '#285943',  // a dark green color for text
      fontSize: 18,
      fontWeight: 'bold',
      paddingHorizontal: 20,
      textAlign: 'center',
    },
});