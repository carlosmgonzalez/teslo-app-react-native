import ThemedButton from "@/presentation/theme/components/ThemedButton";
import { ThemedText } from "@/presentation/theme/components/ThemedText";
import { useThemeColor } from "@/presentation/theme/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { router } from "expo-router";
import { useRef, useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";
import { useCameraStore } from "@/presentation/camera/store/useCameraStore";

const CameraScreen = () => {
  const { addSelectedImage } = useCameraStore();
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    undefined
  );

  const [facing, setFacing] = useState<CameraType>("back");
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [mediaPermission, requestMediaPermission] =
    MediaLibrary.usePermissions();

  const cameraRef = useRef<CameraView>(null);

  const onRequestPermission = async () => {
    try {
      const { status: cameraPermissionStatus } =
        await requestCameraPermission();
      if (cameraPermissionStatus !== MediaLibrary.PermissionStatus.GRANTED) {
        Alert.alert("Sorry", "We need permissions to access the camera");
      }

      const { status: mediaPermissionStatus } = await requestMediaPermission();
      if (mediaPermissionStatus !== MediaLibrary.PermissionStatus.GRANTED) {
        Alert.alert("Sorry", "We need permissions to access the media library");
      }

      requestMediaPermission();
    } catch (error) {
      Alert.alert("Error", "Something went wrong");
    }
  };

  const onPickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      aspect: [1, 1],
      quality: 0.5,
      allowsMultipleSelection: true,
      selectionLimit: 5,
    });

    if (!result.canceled) {
      result.assets.forEach((assets) => addSelectedImage(assets.uri));
      router.dismiss();
    }
  };

  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  const onShutterButtonPress = async () => {
    if (!cameraRef.current) return;

    const picture = await cameraRef.current.takePictureAsync({
      quality: 0.7,
    });

    if (!picture?.uri) return;

    setSelectedImage(picture.uri);
  };

  const onReturnCancel = () => {
    router.dismiss();
  };

  const onConfirmImage = async () => {
    if (!selectedImage) return;
    await MediaLibrary.createAssetAsync(selectedImage);

    addSelectedImage(selectedImage);

    router.dismiss();
  };

  const onRetakeImage = () => {
    setSelectedImage(undefined);
  };

  if (!cameraPermission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!cameraPermission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 10,
        }}
      >
        <ThemedText style={styles.message}>
          We need your permission to show the camera and galery
        </ThemedText>
        <ThemedButton onPress={onRequestPermission}>
          Grant permission
        </ThemedButton>
      </View>
    );
  }

  if (selectedImage) {
    return (
      <View style={styles.container}>
        <Image source={{ uri: selectedImage }} style={styles.camera} />
        <ReturnCancelButton onPress={onReturnCancel} />
        <ConfirmImageButton onPress={onConfirmImage} />
        <RetakeImageButton onPress={onRetakeImage} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
        <ShutterButton onPress={onShutterButtonPress} />
        <FlipCameraButton onPress={toggleCameraFacing} />
        <GalleryButton onPress={onPickImage} />
        <ReturnCancelButton onPress={onReturnCancel} />
      </CameraView>
    </View>
  );
};

const ShutterButton = ({ onPress }: { onPress: () => void }) => {
  const primaryColor = useThemeColor({}, "primary");
  return (
    <TouchableOpacity
      style={[
        styles.shutterButton,
        {
          position: "absolute",
          bottom: 30,
          left: "50%",
          zIndex: 10,
          transform: [
            {
              translateX: -32,
            },
          ],
          borderColor: primaryColor,
        },
      ]}
      onPress={onPress}
    ></TouchableOpacity>
  );
};

const ConfirmImageButton = ({ onPress }: { onPress: () => void }) => {
  const primaryColor = useThemeColor({}, "primary");
  return (
    <TouchableOpacity
      style={[
        styles.shutterButton,
        {
          position: "absolute",
          bottom: 30,
          left: "50%",
          zIndex: 10,
          transform: [
            {
              translateX: -32,
            },
          ],
          borderColor: primaryColor,
        },
      ]}
      onPress={onPress}
    >
      <Ionicons name="checkmark-outline" size={30} color={primaryColor} />
    </TouchableOpacity>
  );
};

const FlipCameraButton = ({ onPress }: { onPress: () => void }) => {
  return (
    <TouchableOpacity style={styles.flipCameraButton} onPress={onPress}>
      <Ionicons
        name="camera-reverse-outline"
        size={30}
        color="rgba(255,255,255,0.8)"
      />
    </TouchableOpacity>
  );
};

const GalleryButton = ({ onPress }: { onPress: () => void }) => {
  return (
    <TouchableOpacity style={styles.galleryButton} onPress={onPress}>
      <Ionicons name="images-outline" size={30} color="rgba(255,255,255,0.8)" />
    </TouchableOpacity>
  );
};

const ReturnCancelButton = ({ onPress }: { onPress: () => void }) => {
  return (
    <TouchableOpacity style={styles.returnCancelButton} onPress={onPress}>
      <Ionicons
        name="arrow-back-outline"
        size={30}
        color="rgba(255,255,255,0.8)"
      />
    </TouchableOpacity>
  );
};

const RetakeImageButton = ({ onPress }: { onPress: () => void }) => {
  return (
    <TouchableOpacity style={styles.flipCameraButton} onPress={onPress}>
      <Ionicons name="close-outline" size={30} color="rgba(255,255,255,0.8)" />
    </TouchableOpacity>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },

  shutterButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "white",
    borderWidth: 4,
    justifyContent: "center",
    alignItems: "center",
  },

  flipCameraButton: {
    width: 50,
    height: 50,
    borderRadius: 32,
    backgroundColor: "#17202A",
    position: "absolute",
    bottom: 40,
    right: 32,
    justifyContent: "center",
    alignItems: "center",
  },

  galleryButton: {
    width: 50,
    height: 50,
    borderRadius: 32,
    backgroundColor: "#17202A",
    position: "absolute",
    bottom: 40,
    left: 32,
    justifyContent: "center",
    alignItems: "center",
  },

  returnCancelButton: {
    width: 50,
    height: 50,
    borderRadius: 32,
    backgroundColor: "#17202A",
    position: "absolute",
    top: 40,
    left: 32,
    justifyContent: "center",
    alignItems: "center",
  },
});
