import { StyleSheet } from 'react-native';
export const userProfileStyles = StyleSheet.create({
    imageAvatar: {
      width: 200, 
      height: 200,
      borderRadius: 100, 
      resizeMode: 'cover',
      alignSelf: 'center',
      backgroundColor: '#fff',
      marginBottom: 20,
    },
    avatarStyle: {
      width: 150,  
      height: 150,
      borderRadius: 75,  
      alignSelf: 'flex-start',
      marginTop: 10,
      marginLeft: 10,
      borderWidth: 3,
      borderColor: 'white',
      position: 'absolute',  
      zIndex: 2 , 
    },
   });