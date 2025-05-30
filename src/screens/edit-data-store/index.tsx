import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Alert,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Button from "../../components/button";
import { Input } from "../../components/input/input.style";
import { colors } from "../../styles/colors";
import * as ImagePicker from "expo-image-picker";

export default function EditDataStore() {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [file, setFile] = useState<any>(null);
  const [hasPermission, setHasPermission] = useState<boolean>(false);

  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  useEffect(() => {
    (async () => {
      const cameraPermission =
        await ImagePicker.requestCameraPermissionsAsync();
      const galleryPermission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (
        cameraPermission.status === "granted" &&
        galleryPermission.status === "granted"
      ) {
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

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
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

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <View style={styles.container}>
      {/* Banner e Avatar */}
      <View>
        <View style={styles.bannerContainer}>
          <ImageBackground
            source={{ uri: "https://via.placeholder.com/300x150" }}
            style={styles.banner}
          >
            <View style={styles.avatarWrapper}>
              <Image
                source={{ uri: "https://via.placeholder.com/100" }}
                style={styles.avatar}
              />
              <TouchableOpacity
                style={styles.cameraButton}
                onPress={handleCameraOrGallery}
              >
                <Image
                  source={{ uri: "https://via.placeholder.com/30" }}
                  style={styles.cameraIcon}
                />
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>

        {/* Formulário */}
        <View style={styles.form}>
          <View style={Input.inputView}>
            <Text style={Input.label}>Nome do estabelecimento</Text>
            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={errors.qtdItems ? Input.styleError : Input.style}
                  placeholder="Ex: 12"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="qtdItems"
            />
            {errors.name && (
              <Text style={Input.errorText}>
                Qauntidade de items é obrigatório.
              </Text>
            )}
          </View>
          <View style={Input.inputView}>
            <Text style={Input.label}>Endereço</Text>
            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={errors.qtdItems ? Input.styleError : Input.style}
                  placeholder="Ex: 12"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="qtdItems"
            />
            {errors.name && (
              <Text style={Input.errorText}>
                Qauntidade de items é obrigatório.
              </Text>
            )}
          </View>
          <View style={Input.inputView}>
            <Text style={Input.label}>Número de telefone</Text>
            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={errors.qtdItems ? Input.styleError : Input.style}
                  placeholder="Ex: 12"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="qtdItems"
            />
            {errors.name && (
              <Text style={Input.errorText}>
                Qauntidade de items é obrigatório.
              </Text>
            )}
          </View>
        </View>
      </View>

      <View style={styles.footerButtom}>
        <Button onPress={() => navigation.navigate("Home")}>Salvar</Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
  },
  bannerContainer: {
    height: 150,
    position: "relative",
  },
  banner: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  avatarWrapper: {
    position: "absolute",
    bottom: -40,
    left: 20,
    alignItems: "center",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: "#fff",
  },
  cameraButton: {
    position: "absolute",
    bottom: 0,
    right: -10,
    backgroundColor: colors.primary["500"],
    borderRadius: 20,
    padding: 5,
  },
  cameraIcon: {
    width: 20,
    height: 20,
  },
  footerButtom: {
    display: "flex",
    width: "100%",
    padding: 20,
    justifyContent: "center",
    gap: 16,
    backgroundColor: "#FFF",
    boxShadow: "0px -4px 12px 0px rgba(151, 151, 151, 0.15)",
  },
  form: {
    marginTop: 60,
    paddingHorizontal: 20,
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: colors.neutral["600"],
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: colors.neutral["300"],
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 14,
  },
  divider: {
    height: 1,
    backgroundColor: colors.neutral["300"],
    marginVertical: 20,
  },
  button: {
    marginHorizontal: 20,
    backgroundColor: colors.primary["500"],
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
});
