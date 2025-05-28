import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import { TouchableOpacity, View, Alert } from "react-native";

interface CameraPermissionProps {
  children: React.ReactNode;
  onImageSelected: (uri: string | null) => void;
}

export function CameraPermission({
  children,
  onImageSelected,
}: CameraPermissionProps) {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [hasPermission, setHasPermission] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const cameraPermission =
        await ImagePicker.requestCameraPermissionsAsync();
      const galleryPermission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (cameraPermission.granted && galleryPermission.granted) {
        setHasPermission(true);
      } else {
        Alert.alert(
          "Permissões necessárias",
          "Precisamos de permissões para acessar a câmera e galeria."
        );
      }
    })();
  }, []);

  const handleCameraOrGallery = () => {
    Alert.alert("Selecionar imagem", "Escolha uma opção:", [
      {
        text: "Tirar Foto",
        onPress: () => openCamera(),
      },
      {
        text: "Selecionar da Galeria",
        onPress: () => openGallery(),
      },
      {
        text: "Cancelar",
        style: "cancel",
      },
    ]);
  };

  const openCamera = async () => {
    if (!hasPermission) {
      Alert.alert("Erro", "Permissões não concedidas.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      setImageUri(uri);
      onImageSelected(uri);
    }
  };

  const openGallery = async () => {
    if (!hasPermission) {
      Alert.alert("Erro", "Permissões não concedidas.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      setImageUri(uri);
      onImageSelected(uri);
    }
  };

  return (
    <TouchableOpacity onPress={handleCameraOrGallery}>
      {children}
    </TouchableOpacity>
  );
}
