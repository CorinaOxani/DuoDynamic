import {Text, View, Image, TouchableOpacity, StyleSheet} from 'react-native'
import { styles } from '../styles/button';
import { styles_page } from '../styles/start_page';
import { logoStyles} from '../styles/logo';
import { containerStyles} from '../styles/container';
import { footerStyles} from '../styles/FooterText';
function HomeScreen(props){
console.log(props);
    return(
    <View style={containerStyles.container}>
        <View>
             <Text style={styles_page.welcomeText}>Welcome to our community!</Text>
        </View>
        <View >
             <Image
                    source={require('../photo/logo.jpg')}
                    style={logoStyles.logo}
                  />
        </View>
        <View>
             <TouchableOpacity style={styles.button}>
                     <Text style={styles.buttonText}  onPress={()=>props.navigation.navigate("Login")}>LOGIN</Text>
                   </TouchableOpacity>
                   <TouchableOpacity style={styles.button}>
                     <Text style={styles.buttonText} onPress={()=>props.navigation.navigate("Register")}>REGISTER</Text>
                   </TouchableOpacity>
                   <Text style={footerStyles.footerText}>Let's change this world together!</Text>
        </View>
    </View>

    )
}
export default HomeScreen;