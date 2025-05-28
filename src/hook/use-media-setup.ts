import { useEffect } from "react";
import { Platform, PermissionsAndroid, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";

export async function requestCameraPermission() {
  if (Platform.OS === "android") {
    const cameraGranted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA
    );
    console.log("Camera permission:", cameraGranted);
    if (cameraGranted !== "granted") {
      Alert.alert("Permissão de câmera negada.");
    }
    return cameraGranted === "granted";
  } else {
    const { status: cameraStatus } =
      await ImagePicker.requestCameraPermissionsAsync();
    console.log("camera permission", cameraStatus);
    if (cameraStatus !== "granted") {
      Alert.alert("Permissão de câmera negada.");
    }
    return cameraStatus === "granted";
  }
}

export async function requestGalleryPermission() {
  if (Platform.OS === "android") {
    let storageGranted = "granted";
    if (Platform.Version >= 33) {
      const imagesGranted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
      );
      const videosGranted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO
      );
      console.log("Images permission:", imagesGranted);
      console.log("Videos permission:", videosGranted);
      if (imagesGranted !== "granted" && videosGranted !== "granted") {
        storageGranted = "denied";
      }
    } else {
      storageGranted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
      );
      console.log("Storage permission galeria:", storageGranted);
    }
    if (storageGranted !== "granted") {
      Alert.alert("Permissão de galeria negada.");
    }
    return storageGranted === "granted";
  } else {
    const { status: mediaStatus } =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    console.log("media permission", mediaStatus);
    if (mediaStatus !== "granted") {
      Alert.alert("Permissão de galeria negada.");
    }
    return mediaStatus === "granted";
  }
}

export function useMediaPermissions() {
  useEffect(() => {
    async function requestPermissions() {
      await requestCameraPermission();
      await requestGalleryPermission();
    }
    requestPermissions();
  }, []);
}
