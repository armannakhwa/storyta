import React,{useState} from 'react'
import { View, StyleSheet,Model,Pressable, Dimensions, TextInput,Text,Button,StatusBar, Alert, Image } from 'react-native';
import { IconButton, Colors, Avatar, Card, Title, Paragraph } from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function devinfo({navigation})  {
  return (
    <View  style={{
      flex:1,
      width:'100%',
        height:'100%',
        backgroundColor:'#1DE9B6',
        alignSelf:'center',
        justifyContent: 'center',
        alignItems: 'center',
      }}>

<Image
        source={require('./assets/arman.jpg')}
        style={{
            alignItems:'center',
            width:'50%',
            height:'30%',
            alignSelf:'center',
            marginTop:20,
            borderRadius:10,
            resizeMode: 'stretch',
        }}
      />

<View
      style={{
  
  
      }}
      >
<Text></Text>
          <Text style={{fontSize:30,
           fontWeight: 'bold',
           color: 'blue',
           fontFamily: 'sans-serif-medium',
           textAlign:'center',
          }}>Arman Nakhwa</Text>
         
         <Text style={{fontSize:20}}>Branch:IT Engineering</Text>
          </View>

          

</View>
  )
}


function settings({navigation})  {
  return (

      <View  style={{
        height:'100%',
        backgroundColor:'#bbdefb',
      }}>



<View  style={{
alignSelf:'center',
padding:20,
width:'100%',
}}>

<Button title="WhatsApp Path:(Internal Storage/Storyta/WhatsApp)" 
color='red'
disabled
onPress={()=>Alert.alert("Info","Work in Progress")}

/>

<Text></Text>

<Button title="Instagram Path:(Internal Storage/Storyta/Instagram)" 
color='blue'
disabled
onPress={()=>Alert.alert("Info","Work in Progress")}

/>
<Text></Text>

<Button title="Developer Info" 
color='red'

onPress={()=>navigation.navigate('Developer')}

/>
</View>

</View>
  )
}




  
const SettingScreen = () => {
    return (
        
    
       <Stack.Navigator
       screenOptions={{
         headerTintColor: 'white',
         headerStyle: { backgroundColor: '#0288d1' }
   }}
       
       >
      <Stack.Screen name="Setting's" component={settings}
     />

<Stack.Screen name="Developer" component={devinfo}
     />
      

    </Stack.Navigator>
 


    )
}
const styles = StyleSheet.create({

});
export default  SettingScreen
