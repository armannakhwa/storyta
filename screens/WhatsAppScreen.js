import React,{useState}  from 'react'
import { View, StyleSheet,Modal,TouchableOpacity,Pressable,Image,ScrollView,FlatList, Dimensions, Text,Button,StatusBar, Alert } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { WANavigationContainer } from '@react-navigation/native';
import { IconButton, Colors, Avatar, Card, Title, Paragraph } from 'react-native-paper';
import RNFetchBlob from 'rn-fetch-blob';
import WebView from 'react-native-webview';
import Video from "react-native-video";
import VideoPlayer from 'react-native-video-controls';
import Share from 'react-native-share';
import { InterstitialAd, RewardedAd, BannerAd,BannerAdSize,TestIds } from '@react-native-firebase/admob';

import admob, { MaxAdContentRating } from '@react-native-firebase/admob';


let whatsstorylocation='/Whatsapp/Media/.Statuses';
let whatsstorydownloadlocation='/Storyta/WhatsApp';
let whatsAppdownloadedlocation= 'file://'+RNFetchBlob.fs.dirs.SDCardDir+whatsstorydownloadlocation+'/';



 function whatsappstory({navigation}) {

    const [getfileplay, setfileplay] = useState('');

    var TRACK_FOLDER=RNFetchBlob.fs.dirs.SDCardDir+whatsstorylocation;
    const [getinstfiles, setinstfiles] = useState({result : {}});
  
  
  //for whatsapp
  //var TRACK_FOLDER=RNFetchBlob.fs.dirs.SDCardDir + '/Whatsapp/Media/.Statuses'
  //console.log(RNFetchBlob.fs.ls(TRACK_FOLDER))
  RNFetchBlob.fs.ls(TRACK_FOLDER)
      .then( (files) =>{ 
         setinstfiles(JSON.parse(JSON.stringify(files)));
        // Alert.alert("Files",files[1]+files[0])
        
      })
   
      function download(url,filename)
      {
        setfileplay(filename);
        console.log("file://"+RNFetchBlob.fs.dirs.SDCardDir+'/Storyta/WhatsApp/'+filename);
//Alert.alert(RNFetchBlob.fs.dirs.SDCardDir);
        RNFetchBlob.fs.cp(url,RNFetchBlob.fs.dirs.SDCardDir+'/Storyta/WhatsApp/'+filename)
       // file:///storage/emulated/0//Whatsapp/Media/.Statuses/2efd541aacce4229b2ace479be5660c6.jpg
       ///storage/emulated/0/Storyta/WhatsApp/2efd541aacce4229b2ace479be5660c6.jpg
     
.then(() => { 

  alert("Download Succesfully")
 })
.catch(() => { console.log("Some error in copy") })
      }

//console.log(getfileplay)
      function play(url)
      {
      setModalVisible(true);
      setfileplay(url);
      console.log(url)
      }


   //const bannerAdUnitId = __DEV__? TestIds.BANNER : "ca-app-pub-5834420626905144/6215366782";
   const bannerAdUnitId ="ca-app-pub-5834420626905144/4037324804";

    return (
      <View
      style={{
        width:'100%',
       height:'100%',
      }}
      
      >
        <StatusBar  hidden = {false} backgroundColor = "#0288d1" translucent = {true}/>
<IconButton
    icon="download"
    color={Colors.red500}
    size={50}
    onPress={()=>navigation.navigate('WhatsApp Downloaded')}
    style={{
    position:'absolute',
        right:0,
        bottom:2,
    zIndex:99,
   

        }}

  />



      <ScrollView>
<View style={{ 
  width:'100%',
height:'100%',
}}>

<BannerAd
        unitId={bannerAdUnitId}
        size={BannerAdSize.ADAPTIVE_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      />

<FlatList
    horizontal={false} 
    showsHorizontalScrollIndicator={true} 
    keyExtractor={(item, index) => index.toString()}
    data={getinstfiles}
    numColumns={3}
    style={{
      width:'100%',
      height:'100%',
    }}
    
    renderItem={ ({ item, index }) => (
      <View
      style={{
        flex:1,
        marginLeft:18,
        width:'100%',
        height:'100%',
      }}
      >

  <TouchableOpacity
        activeOpacity={1}

        onPress={() => console.log("Story Not View Until file download")
       
      }
      >
      <Image source={{uri:'file://'+RNFetchBlob.fs.dirs.SDCardDir+whatsstorylocation+'/'+item}}
      style={{
        width:100,
        height:100,
        borderRadius:20,
        marginTop:20,
      }}
      resizeMode={'contain'}
      />
</TouchableOpacity>


<View
      style={{
        marginTop:20,
        borderRadius:5,
        textAlign:'center',
        padding:5,
      }}    
     >
     
    
        <Button title="Download"
        color='rgb(37,211 ,102)'
        style={{
         backgroundColor:'rgb(225,48,108)',
         width:'100%',
         color:'white',
         alignSelf:'center',
      
      }}
        
      onPress={()=>download('file://'+RNFetchBlob.fs.dirs.SDCardDir+whatsstorylocation+'/'+item,item)
    
    }
      />
      </View>


      </View>

       
              
    )}
    
  />


  </View>
      </ScrollView>
      </View>

    );
  }
  function whatsappdownloads({navigation})  {

 
    const [modalVisible, setModalVisible] = useState(false);
    const [getfileplay, setfileplay] = useState('');

  var TRACK_FOLDER=RNFetchBlob.fs.dirs.SDCardDir+whatsstorydownloadlocation;
   // var TRACK_FOLDER=RNFetchBlob.fs.dirs.DownloadDir;
    const [getinstfiles, setinstfiles] = useState({result : {}});
    const [getsharefile, setsharefile ]= useState('');
  
   
  //for whatsapp
  //var TRACK_FOLDER=RNFetchBlob.fs.dirs.SDCardDir + '/Whatsapp/Media/.Statuses'
        

 // console.log(RNFetchBlob.fs.ls(JSON.parse(JSON.stringify(TRACK_FOLDER))));

       RNFetchBlob.fs.ls(TRACK_FOLDER)
      .then( (files) =>{ 
         setinstfiles(JSON.parse(JSON.stringify(files)));
         //console.log("Hii");
        
        // 
 
      })
   
      //data converting but i am not using
      var data = RNFetchBlob.fs.readFile( getfileplay, 'base64').then(res => {//console.log(res); 
        return res });
       
      
     

//share data to other app
function shareto(url)
  {

setsharefile(url);
sharefile();
console.log(url);

  }

  const shareOptions = {
      title: 'Share From Storyta',
      message: 'Downloaded From Storyta',
      url:getsharefile,
      filename: data.name , // only for base64 file in Android 
  };     

  function sharefile()
  {
    if(getsharefile=="")
    {
      Alert.alert("Retry","Something Went Wrong Try again");

    }
    else
    {
 Share.open(shareOptions).then(res=>{
    console.log('Share Success`enter code here`!')
    console.log(getsharefile)
  }).catch(err=>{
      console.log('err share', err);
  });
  }
}




//console.log(getfileplay)
      function play(url)
      {
      setModalVisible(true);
      setfileplay(url);
      console.log(url)
      }

    return (

      <View style={styles.centeredView}>
        <StatusBar  hidden = {false} backgroundColor = "#0288d1" translucent = {true}/>
<Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
  
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>

          <View style={styles.modalView}>

          {getfileplay.split('.').pop()== 'mp4'?
          
          <VideoPlayer
          fullscreen={true}
          controls={true}
          audioOnly={true}
          
          source={{ uri: getfileplay }}
          style={{
            flex:1,
            alignSelf:'center',
            alignContent:'center',
          width:'100%', 
          height:'100%',
          
          }}
          onPause={true}
          resizeMode="stretch"
          
          />
          
              : 
                
            <Image source={{uri:getfileplay}}
            
                  style={{
                    alignSelf: 'center',
                    height: '100%',
                    width: '100%',
                }}
                resizeMode="contain"
                />
                     }


            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>-</Text>
            </Pressable>
          </View>
        </View>
      </Modal>



        <View
       style={{ 
        width:'100%',
      height:'100%',
      }}
        
        >

          
<FlatList
    horizontal={false} 
    showsHorizontalScrollIndicator={true} 
    keyExtractor={(item, index) => index.toString()}
    data={getinstfiles}
    numColumns={3}
    style={{
      width:'100%',
      height:'100%',
    }}
    renderItem={ ({ item, index }) => (
      <View
      style={{
        flex:1,
        marginLeft:18,
        width:'100%',
        height:'100%',
      }}
      
      >

  <TouchableOpacity
        activeOpacity={1}
       // onPress={() => alert("file:///storage/emulated/0/"+whatsstorylocation+'/'+item)
        onPress={() => play(whatsAppdownloadedlocation+item)
       // console.log("file:///storage/emulated/0//Storyta/Instagram/file_1623500016488.jpg")
      //alert("file:///storage/emulated/0/"+whatsstorylocation+'/'+item)

      }
      >

      <Image source={{uri:whatsAppdownloadedlocation+item}}
      style={{
        width:100,
        height:100,
        borderRadius:20,
        marginTop:20,
      }}
      resizeMode={'contain'}
      />
</TouchableOpacity>

<View
      style={{
        marginTop:20,
        borderRadius:5,
        textAlign:'center',
        padding:5,
      }}    
     >
       <Button title="Share"
       color='rgb(18 ,140 ,126)'
       style={{
        width:'100%',
        color:'white',
        alignSelf:'center',
       }}
              //Linking.openURL('file:///storage/emulated/0/'+whatsstorylocation+'/'+item)
      onPress={()=>shareto(whatsAppdownloadedlocation+item)
        //alert("file:///storage/emulated/0/"+whatsstorylocation+'/'+item)
      //console.log("file:///storage/emulated/0/"+whatsstorylocation+'/'+item)
    }
      />
      </View>


      </View>

       
              
    )}
    
  />

</View>
  </View>
    )
  }



  

const Stack = createStackNavigator();

  
const WhatsAppScreen = () => {
    return (
        
    
       <Stack.Navigator
   
       screenOptions={{
         headerTintColor: 'white',
         headerStyle: { backgroundColor: '#0288d1' }
   }}
       
       >
      <Stack.Screen name="WhatsApp Status" component={whatsappstory}
      
      />
      <Stack.Screen name="WhatsApp Downloaded" component={whatsappdownloads}
     />


      

    </Stack.Navigator>
 


    )
}
const styles = StyleSheet.create({
cardbtn:{
  marginLeft:20,
  backgroundColor:'red'
},

centeredView: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
},
modalView: {
  backgroundColor: "white",
  alignItems: "center",
  shadowColor: "#000",
  width:'100%',
  height:'100%',
  shadowOffset: {
    width: 0,
    height: 2
  },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  elevation: 5
},
button: {
  borderRadius: 50,
  padding: 10,
  elevation: 2
},
buttonOpen: {
  backgroundColor: "#F194FF",
},
buttonClose: {
  backgroundColor: "#2196F3",
  position:'absolute',
  right:4,
},
textStyle: {
  color: "white",
  fontWeight: "bold",
  textAlign: "center"
},


});
export default WhatsAppScreen
