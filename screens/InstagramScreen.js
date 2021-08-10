import React, { useState, useEffect } from 'react'
import {
  View, StyleSheet,
  Modal,
  Pressable,
  PermissionsAndroid,
  Linking,
  FlatList,
  TouchableOpacity,
  Dimensions, Image, TextInput, Text, Button, StatusBar, Alert
} from 'react-native';
import { IconButton, Colors, Avatar, Card, Title, Paragraph } from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';
import RNFetchBlob from 'rn-fetch-blob';
import WebView from 'react-native-webview';
import Video from "react-native-video";
import VideoPlayer from 'react-native-video-controls';
import Share from 'react-native-share';
import { InterstitialAd, RewardedAd, BannerAd, BannerAdSize, TestIds } from '@react-native-firebase/admob';

import admob, { MaxAdContentRating } from '@react-native-firebase/admob';




const Stack = createStackNavigator();


let instastorylocation = '/Storyta/Instagram';

let instagramdownloadlocation = 'file://' + RNFetchBlob.fs.dirs.SDCardDir + instastorylocation + '/';
//let instagramdownloadlocation='file://'+RNFetchBlob.fs.dirs.DownloadDir+'/';


function instagramdownloads({ navigation }) {
  var TRACK_FOLDER = RNFetchBlob.fs.dirs.SDCardDir + instastorylocation;

  //tmp
  //var TRACK_FOLDER=RNFetchBlob.fs.dirs.DownloadDir;

  const [getinstfiles, setinstfiles] = useState({ result: {} });
  const [modalVisible, setModalVisible] = useState(false);
  const [getfileplay, setfileplay] = useState('');
  const [getsharefile, setsharefile] = useState('');
  const [getinstagramdownloadableurl, setinstagramdownloadableurl] = useState('');

  console.log(RNFetchBlob.fs.dirs.SDCardDir);


  //for whatsapp
  //var TRACK_FOLDER=RNFetchBlob.fs.dirs.SDCardDir + '/Whatsapp/Media/.Statuses';



  RNFetchBlob.fs.ls(TRACK_FOLDER)
    .then((files) => {
      setinstfiles(JSON.parse(JSON.stringify(files)));
    })

  //file:///storage/emulated/0//Storyta/Instagram/file_1623500016488.jpg
  //file:///storage/emulated/0//Storyta/Instagram/VID-20200116-WA0007.mp4

  //i am not use in my project
  var data = RNFetchBlob.fs.readFile(getfileplay, 'base64').then(res => {//console.log(res); 
    return res
  });

  async function shareto(url) {

    setsharefile(url);
    await sharefile();
    console.log(url);

  }

  const shareOptions = {
    title: 'Share From Storyta',
    message: 'Downloaded From Storyta',
    url: getsharefile,
    filename: data.name, // only for base64 file in Android 
  };

  function sharefile() {
    if (getsharefile == "") {
      Alert.alert("Retry", "Something Went Wrong Try again");

    }
    else {
      Share.open(shareOptions).then(res => {
        console.log('Share Success`enter code here`!')
        console.log(getsharefile)
      }).catch(err => {
        console.log('err share', err);
      });
    }
  }


  function play(url) {
    setModalVisible(true);
    setfileplay(url);
    console.log(url)
  }


  return (


    <View
      style={{
        width: '100%',
        height: '100%',

      }}
    >
      <StatusBar hidden={false} backgroundColor="#0288d1" translucent={true} />
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            // Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>

            <View style={styles.modalView}>

              {getfileplay.split('.').pop() == 'mp4' ?

                <VideoPlayer
                  fullscreen={true}
                  controls={true}
                  audioOnly={true}

                  source={{ uri: getfileplay }}
                  style={{
                    flex: 1,
                    alignSelf: 'center',
                    alignContent: 'center',
                    width: '100%',
                    height: '100%',

                  }}
                  onPause={true}
                  resizeMode="stretch"

                />

                :

                <Image source={{ uri: getfileplay }}

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
      </View>



      <FlatList
        horizontal={false}
        showsHorizontalScrollIndicator={true}
        keyExtractor={(item, index) => index.toString()}
        data={getinstfiles}
        numColumns={3}
        style={{
          width: '100%',
          height: '100%',
        }}
        renderItem={({ item, index }) => (
          <View
            style={{
              flex: 1,
              marginLeft: 18,
              width: '100%',
              height: '100%',
            }}
          >

            <TouchableOpacity
              activeOpacity={1}
              // onPress={() => alert("file:///storage/emulated/0/"+instastorylocation+'/'+item)
              onPress={() => play(instagramdownloadlocation + item)
                // console.log("file:///storage/emulated/0//Storyta/Instagram/file_1623500016488.jpg")
                //alert("file:///storage/emulated/0/"+instastorylocation+'/'+item)

              }
            >

              <Image source={{ uri: instagramdownloadlocation + item }}
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 20,
                  marginTop: 20,
                }}
              />
            </TouchableOpacity>


            <View
              style={{
                marginTop: 20,
                borderRadius: 5,
                textAlign: 'center',
                padding: 5,
              }}
            >
              <Button title="Share"
                color='rgb(225,48,108)'
                style={{
                  backgroundColor: 'rgb(225,48,108)',
                  width: '100%',
                  color: 'white',
                  alignSelf: 'center',
                }}
                //Linking.openURL('file:///storage/emulated/0/'+instastorylocation+'/'+item)
                onPress={() => shareto(instagramdownloadlocation + item)
                }
              />
            </View>

          </View>




        )}

      />
    </View>



  )
}



function instagramstory({ navigation }) {


  const [downloadops, setdownloadops] = useState(false);
  const [fileUrl, setfileUrl] = useState('');
  const [getdownloadableinstaurl, setdownloadableinstaurl] = useState('');
  const [getdownloadableinstaurlext, setdownloadableinstaurlext] = useState('');


  function setText(url) {
    // let newurl=url.substring(0, url.lastIndexOf('/'));

    //var url2 = "http://domain.com?lala=lala&utm=test&utm_source=teszt&utm_lala=lala&bibi=bibi";
    var newurl = url.replace(/(\?)utm([_a-z0-9=]+)/g, "");

    console.log(newurl);
    setfileUrl(url);
    setdownloadableinstaurl(newurl);
  }

  const checkPermission = async () => {

    // Function to check the platform
    // If Platform is Android then check for permissions.

    if (Platform.OS === 'ios') {
      //downloadFile();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message:
              'Application needs access to your storage to download and view Files',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Start downloading
          //downloadFile();
          console.log('Storage Permission Granted.');

          //Create folder inside download folder
          // var CREATE_FOLDER= RNFetchBlob.fs.dirs.DownloadDir+'/Storyta/';
          var CREATE_FOLDER = RNFetchBlob.fs.dirs.SDCardDir + '/Storyta';
          RNFetchBlob.fs.mkdir(CREATE_FOLDER)
            .then(() => {
              RNFetchBlob.fs.mkdir(CREATE_FOLDER + '/Instagram');

              console.log("Download/Storyta folder created");

            })
            .catch((err) => {
              console.log("Error in Storyta folder Creation");

            })

          RNFetchBlob.fs.mkdir(CREATE_FOLDER + '/WhatsApp');

        } else {
          // If permission denied then show alert
          Alert.alert('Error', 'Storage Permission Not Granted');
        }
      } catch (err) {
        // To handle permission related exception
        console.log("++++" + err);
      }
    }
  };


  //*******************************Instagram url testing *********************/

  async function getFileDatafrominsta() {
    console.log(getdownloadableinstaurl)
    //getdownloadableinstaurl+'?__a=1'
    await fetch(getdownloadableinstaurl + '?__a=1'
      , {
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'User-Agent': 'Mozilla',
          //'User-Agent': 'Mozilla Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36'
        }
      }
    )
      .then(function (response) {
        //console.log(response)
        return response.json();
      })
      .then(function (myJson) {
        console.warn(myJson);
        const fileData = myJson.graphql.shortcode_media;

        let fileInfo = {};
        if (fileData.__typename === 'GraphImage') {
          let imageUrl = fileData.display_url;
          console.log("Yess this is image");
          fileInfo.type = 'GraphImage';
          fileInfo.data = imageUrl;
          fileInfo.error = false;
          setdownloadableinstaurl(fileInfo.data);
          setdownloadableinstaurlext('.jpg');


        } else if (fileData.__typename === 'GraphVideo') {
          let videoUrl = fileData.video_url;
          fileInfo.type = 'GraphVideo';
          fileInfo.data = videoUrl;
          fileInfo.error = false;
          console.log("Yess this is Video");
          setdownloadableinstaurl(fileInfo.data);
          setdownloadableinstaurlext('.mp4');

        } else {
          fileInfo.error = true;
          fileInfo.type = null;
          fileInfo.data = null;
        }

        const ext = sourceType === 'GraphVideo' ? '.mp4' : '.jpg';
        console.log(fileInfo.sourceType);
        //setfileUrl(fileInfo.data+ext);
        console.log(fileInfo.data);
        console.log(getdownloadableinstaurl);
        //Alert.alert(getdownloadableinstaurl);


      });
  }


  /** 
  const  getData=()=>{
    fetch('https://armannakhwa.cf/My%20website/insta.json'
    ,{
      headers : { 
        'Access-Control-Allow-Origin':'*',
        'User-Agent': 'Mozilla',
       }
    }
    )
      .then(function(response){
        console.log(response)
        return response.json();
      })
      .then(function(myJson) {
        console.log(myJson.graphql.shortcode_media);
      });
  }
  getData();
  
   */


  //https://www.instagram.com/p/CQBgp7ptJD3/?__a=1


  //*******************************Instagram url testing *********************/





  const downloadFile = () => {
    getFileDatafrominsta();

    // Get today's date to add the time suffix in filename
    let date = new Date();
    // File URL which we want to download
    console.log(getdownloadableinstaurl);
    let FILE_URL = getdownloadableinstaurl;

    if (fileUrl == '') {
      Alert.alert("Empty", "Please Enter Link");
    }
    else {

      if (getdownloadableinstaurlext == '') {
        // Alert.alert(':(',"still if it is not downloading we will solve this bug in next update");
        Alert.alert('Something went Wrong', "Try After Sometime");
      }

      else {

        //Alert.alert(fileUrl);
        // Alert.alert(getdownloadableinstaurl);


        //ENABLE FOR NORMAL FILE DOWNLOAD
        //file_ext = '.' + file_ext[0];


        // config: To get response by passing the downloading related options
        // fs: Root directory path to download
        const { config, fs } = RNFetchBlob;

        //Download location
        let RootDir = fs.dirs.SDCardDir + instastorylocation;

        let options = {
          fileCache: true,
          addAndroidDownloads: {

            //ENABLE FOR NORMAL FILE DOWNLOAD without instagram
            //path:RootDir+'/Storyta_' + Math.floor(date.getTime() + date.getSeconds() / 2) +file_ext,

            path: RootDir + '/Storyta_' + Math.floor(date.getTime() + date.getSeconds() / 2) + getdownloadableinstaurlext,
            description: 'downloading file...',
            notification: true,
            // useDownloadManager works with Android only
            useDownloadManager: true,
          },
        };
        config(options)
          .fetch('GET', FILE_URL)
          .then(res => {
            // Alert after successful downloading
            console.log('res -> ', JSON.stringify(res));
            Alert.alert("File", "File Downloaded Successfully.");
            setdownloadops(true);
          });


      }

    }
  };

  //for normal file download without instagram
  const getFileExtention = fileUrl => {
    // To get the file extension
    return /[.]/.exec(fileUrl) ?
      /[^.]+$/.exec(fileUrl) : undefined;
  };



  //get Permission when app is loaded
  useEffect(() => {

    checkPermission();


  });


  //const bannerAdUnitId = __DEV__? TestIds.BANNER : "ca-app-pub-5834420626905144/6215366782";
  const bannerAdUnitId = "ca-app-pub-5834420626905144/4037324804";
  //const bannerAdUnitId="ca-app-pub-5834420626905144/6215366782";
  return (


    <View style={{
      height: '100%',
      backgroundColor: '#bbdefb',
    }}>
      <StatusBar hidden={false} backgroundColor="#0288d1" translucent={true} />


      <IconButton
        icon="download"
        color={Colors.red500}
        size={50}
        onPress={() => navigation.navigate('Instagram Downloaded')}

        style={{
          marginBottom: 0,
          position: 'absolute',
          zIndex: 22,
          right: 0,
          bottom: 0,
          backgroundColor: '#c1f5cf',
          justifyContent: 'space-around',

        }}
      />
      <View
        style={{
          backgroundColor: '#0261d1',
          borderRadius: 5,
          height: 150,
          borderBottomLeftRadius: 60,
          borderBottomRightRadius: 60,
        }}
      >

        <TextInput
          style={styles.input}
          placeholder="eg:https://www.instagram.com/p/ABCdh"
          style={{
            borderBottomColor: 'red',
            borderBottomWidth: 2,
            marginBottom: 30,
            backgroundColor: 'white',
            borderRadius: 9,
            width: '80%',
            alignSelf: 'center',
            textAlign: 'center',
            position: 'absolute',
            top: 100,
          }}
          onChangeText={text => setText(text)}
          value={fileUrl}
        />

      </View>
      <View style={{
        width: '50%',
        alignSelf: 'center',
        padding: 20,

      }}>

        <View>
          <Button title="Download"
            color='rgba(229,9,20,2)'

            onPress={() => downloadFile()}
          />
        </View>
      </View>

      {downloadops ? (
        <Image
          source={{
            uri: fileUrl,
          }}
          style={{
            flex: 1,
            alignSelf: 'center',
            width: '50%',
            height: 200,
            resizeMode: 'contain',
            margin: 5
          }}
        />

      ) : null}





      <Text style={{
        color: 'red',
        fontWeight: 'bold',
      }}>Note:if file is not download
        open <Text style={{ color: 'blue' }}
          onPress={() => navigation.navigate('Instagram Story v2')}

        >Next Page</Text>
      </Text>
      <BannerAd

        unitId={bannerAdUnitId}
        //unitId="ca-app-pub-5834420626905144/4037324804"
        size={BannerAdSize.FULL_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      />
      <BannerAd
        unitId={bannerAdUnitId}
        size={BannerAdSize.ADAPTIVE_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      />
    </View>
  )
}


function instagramstoryv2({ navigation }) {


  const bannerAdUnitId = __DEV__ ? TestIds.BANNER : "ca-app-pub-5834420626905144/4037324804";
  return (


    <View
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      <WebView
        originWhitelist={['*']}
        source={{ uri: 'https://downloadgram.com/' }}
        startInLoadingState={true}
        allowUniversalAccessFromFileURLs={true}
        javaScriptEnabled={true}

      />

      <BannerAd
        unitId={bannerAdUnitId}
        size={BannerAdSize.ADAPTIVE_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      />

    </View>

  )
}

const InstagramScreen = () => {
  return (


    <Stack.Navigator

      screenOptions={{
        headerTintColor: 'white',
        headerStyle: { backgroundColor: '#0288d1' }
      }}

    >
      <Stack.Screen name="Instagram Story" component={instagramstory}
      />

      <Stack.Screen name="Instagram Story v2" component={instagramstoryv2} />

      <Stack.Screen name="Instagram Downloaded" component={instagramdownloads}
      />


    </Stack.Navigator>



  )
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "white",
    alignItems: "center",
    shadowColor: "#000",
    width: '100%',
    height: '100%',
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
    position: 'absolute',
    right: 4,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },


});
export default InstagramScreen
