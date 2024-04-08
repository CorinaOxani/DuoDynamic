import { StyleSheet } from 'react-native';
export const proiecteStyles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#3A6238',

  },
    AvailableContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',

    },
      content: {
        flex: 1,
        padding: 10,

      },
      image: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        borderRadius: 10,
      },
        eventTitle: {
          fontSize: 24,
          fontWeight: 'bold',
          marginTop: 10,
        },
          descriptionText: {
            fontSize: 16,
          },
          infoContainer: {
            marginBottom:10,
          },

          applayText:{
            fontSize: 20,
            fontWeight: 'bold',
            color: '#FFFFFF',
          },
      infoText:{
          fontSize: 15,
          fontWeight: 'bold',
          color: '#83B67F',
               },

      footerText: {
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 15,
      fontWeight: 'bold',
      color: '#3A6238',

                  },
      row: {

         flexDirection: 'column',
         alignItems: 'center',
         justifyContent: 'center',
       },

       action:{
       flexDirection: 'row',
       paddingTop:14,
       paddingBottom:3,
       marginTop:15,
       paddingHorizontal:15,
       borderWidth:1,
       borderRadius:50,

       },

       textInput:{
       flex: 1,
       marginTop: -12,
       width: '90%',
       },
});