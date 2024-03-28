import {Text, View, Image, TouchableOpacity, StyleSheet} from 'react-native'
import { styles } from './styles/button';
import { styles_page } from './styles/start_page';
function App(){
    return(
    <View style={styles_page.container}>
        <View>
             <Text style={styles_page.welcomeText}>Welcome to our community!</Text>
        </View>
        <View >
             <Image
                    source={require('./photo/logo.jpg')}
                    style={styles_page.logo}
                  />
        </View>
        <View>
             <TouchableOpacity style={styles.button}>
                     <Text style={styles.buttonText}>LOGIN</Text>
                   </TouchableOpacity>
                   <TouchableOpacity style={styles.button}>
                     <Text style={styles.buttonText}>REGISTER</Text>
                   </TouchableOpacity>
                   <Text style={styles.footerText}>Let's change this world together!</Text>
        </View>
    </View>

    )
}
export default App;