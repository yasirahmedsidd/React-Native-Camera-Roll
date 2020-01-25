import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import CameraRoll from '@react-native-community/cameraroll';
const App = () => {
  useEffect(() => {
    permissionForStorage();
  }, []);
  const [toggleCamera, setToggleCamera] = useState(false);
  const [zoom, setZoom] = useState(0.0);
  const barCodeRecognised = barcode => {
    console.log(barcode);
  };
  const saveImage = async data => {
    console.log(data);
    await CameraRoll.saveToCameraRoll(`${data}`, 'photo');
  };
  const takePicture = async camera => {
    const options = {quality: 0.5, base64: true};
    const data = await camera.takePictureAsync(options);
    // console.log(data.uri);
    saveImage(data.uri);
    // CameraRoll.saveToCameraRoll(data, ['photo']);
    //  eslint-disable-next-line
    // console.log(data.uri);
  };
  const PendingView = () => (
    <View
      style={{
        flex: 1,
        backgroundColor: 'lightgreen',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>Waiting</Text>
    </View>
  );
  const permissionForStorage = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        'android.permission.WRITE_EXTERNAL_STORAGE',
        {
          title: 'storage permission',
          message: 'permission dedo',
          buttonPositive: 'ok',
          buttonNegative: 'cancel',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Storage access mil gya');
      } else {
        console.log('Storage access nahn mila');
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <RNCamera
        style={{flex: 1, width: '100%'}}
        // onBarCodeRead={barCodeRecognised}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.on}
        autoFocus={RNCamera.Constants.AutoFocus.on}
        zoom={zoom}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}>
        {({camera, status}) => {
          if (status !== 'READY') return <PendingView />;
          return (
            <View
              style={{flex: 0, flexDirection: 'row', justifyContent: 'center'}}>
              <TouchableOpacity
                onPress={() => takePicture(camera)}
                style={styles.capture}>
                <Text style={{fontSize: 14}}> SNAP </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setZoom(zoom + 0.1)}>
                <Text style={{color: 'white', fontSize: 32, margin: 20}}>
                  +
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setZoom(zoom - 0.1)}>
                <Text style={{color: 'white', fontSize: 32, margin: 20}}>
                  -
                </Text>
              </TouchableOpacity>
            </View>
          );
        }}
      </RNCamera>
    </>
  );
};

const styles = StyleSheet.create({});

export default App;
