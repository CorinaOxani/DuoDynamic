import { StyleSheet } from 'react-native';
export const footerStyles = StyleSheet.create({
  footer: {
     flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  backgroundColor: '#ededed',
    width: '100%',
  },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 10,
      backgroundColor: '#ededed',
      width:'100%',

    },

    headerTitle: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    searchBar: {
      margin: 10,
      padding: 10,
      backgroundColor: '#F0F0F0',
      borderRadius: 20,
      width:'90%',
    },
});