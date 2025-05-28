import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Audio } from "expo-av";
import { CameraView } from "expo-camera";
import LottieView from "lottie-react-native";
import { useEffect, useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Button } from "react-native-paper";
import BackIconcon from "../../../assets/icons/backIcon";
import animation from "../../../assets/lotload.json";
import { useDialogModal } from "../../hook/handle-modal/hooks/actions";
// import { RootStackParamList } from "../HomeScreen";
// import ScannerWithAnimation from "../components/AnimationScam";
// import CodInsert from "../components/FormCodeInsert";
import loadScam from "../../../assets/load-scam.json";
import { requestCameraPermission } from "../../hook/use-media-setup";
import { useGetProductQuery } from "../../services/product";
import { ScreensType } from "../index.screens";
import EmptyProduct from "../../components/empty-product-action";
// import EmptyProduct from "../components/emptProductAction";
// import { navigate } from "../../navigation/navigationService";

const ScamProduct = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [cameraReady, setCameraReady] = useState(false);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [productCode, setProductCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { handleModal } = useDialogModal();
  const route = useRoute();
  const { isSearch } = route.params as any;

  const navigation = useNavigation<NativeStackNavigationProp<ScreensType>>();
  const { navigate } = useNavigation<NativeStackNavigationProp<ScreensType>>();
  const {
    data: productInformation,
    error,
    isFetching,
  } = useGetProductQuery(
    { barCode: productCode as any },
    { skip: !productCode }
  );

  useEffect(() => {
    (async () => {
      const status = await requestCameraPermission();
      setHasPermission(status);
    })();

    const loadSound = async () => {
      const { sound } = await Audio.Sound.createAsync(
        require("../../../assets/144418__zerolagtime__store-scanner-beep.mp3")
      );
      setSound(sound);
    };

    loadSound();

    return () => {
      sound?.unloadAsync();
    };
  }, []);

  const playSound = async () => {
    if (sound) {
      await sound.replayAsync();
    }
  };

  const handleBarCodeScanned = ({
    type,
    data,
  }: {
    type: string;
    data: any;
  }) => {
    if (!scanned) {
      setScanned(true);
      playSound();
      setProductCode(data);
      setLoading(true);
    }
    console.log(`Barcode type: ${type}, data: ${data}`);
  };

  const navigateTo = ({ isSearch, productInformation }: any) => {
    isSearch
      ? navigate("Home", {
          screen: "Vencimentos",
          params: {
            screen: "Expirations",
            params: { productInformation },
          },
        })
      : navigate("AddProduct", { productInformation });
  };
  useEffect(() => {
    if (error && !isSearch) {
      console.log("Ocorreu um erro ao buscar o produto", error);
      handleModal({
        isOpen: true,
        element: <EmptyProduct navigation={navigation} code={productCode} />,
      });
      return;
    }
    if (!isFetching && productInformation) {
      setLoading(false);
      const redirectTo = isSearch ? "Home" : "AddProduct";
      console.log(productInformation, "productInformation");

      navigateTo({ isSearch, productInformation });
    }
  }, [isFetching, productInformation, isSearch, navigation]);

  if (hasPermission === null) {
    return (
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: "100%",
          alignItems: "center",
        }}
      >
        <LottieView
          source={animation}
          autoPlay
          loop
          style={{ width: 200, height: 200 }}
        />
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <Text>Sem acesso à câmera. Por favor, habilite nas configurações.</Text>
    );
  }
  const handleOpenModal = () => {
    handleModal({
      isOpen: true,
      title: "Insira o número do código de barras",
      element: <CodInsert navigation={navigation} />,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.cameraContainer}>
        <View style={styles.overlayTop}>
          <View style={{ display: "flex", flexDirection: "row", gap: 16 }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <BackIconcon size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Digitalizar código de barras</Text>
          </View>
          {!isSearch && (
            <TouchableOpacity onPress={() => console.log("Manual")}>
              <Text style={styles.headerTitle}>MANUAL</Text>
            </TouchableOpacity>
          )}
        </View>

        <CameraView
          barcodeScannerSettings={{
            barcodeTypes: !scanned ? ["code128", "upc_a", "ean13"] : [],
          }}
          style={styles.camera}
          onBarcodeScanned={(barcodeData) => handleBarCodeScanned(barcodeData)}
          onCameraReady={() => setCameraReady(true)}
        />
        {loading && !error && (
          <View style={styles.loadView}>
            <LottieView
              source={loadScam}
              autoPlay
              loop
              style={{
                width: 200,
                height: 200,
                margin: 0,
                marginTop: -60,
                marginBottom: -40,
                marginLeft: 0,
                marginRight: 0,
              }}
            />
            <Text style={styles.textLoadView}>Escaneando produto...</Text>
          </View>
        )}
        <View style={styles.animationScam}>
          <ScannerWithAnimation />
        </View>
        <View style={styles.overlayBottom}>
          {!isSearch && (
            <View>
              <Button style={styles.button} onPress={() => handleOpenModal()}>
                <Text style={styles.textButton}>
                  Adicionar sem código de barras
                </Text>
              </Button>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ScamProduct;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight || 0,
    backgroundColor: "#FFFF",
  },
  button: {
    borderWidth: 1,
    borderColor: "#fff",
    color: "#fff",
    width: "100%",
    height: 40,
  },
  textLoadView: {
    color: "#111827",
    fontSize: 18,
    fontWeight: 600,
    lineHeight: 28,
  },
  loadView: {
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    width: "80%",
    height: 200,
    backgroundColor: "#FFF",
    zIndex: 999,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    left: "10%",
    top: "50%",
    transform: [{ translateY: -100 }],
  },
  textButton: { color: "#fff", fontSize: 16, fontWeight: 500, lineHeight: 20 },
  animationScam: {
    position: "absolute",
    width: "100%",
    height: "100%",
    display: "flex",
    zIndex: 0,
  },
  headerTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: 500,
    lineHeight: 24,
  },
  overlayBottom: {
    width: "100%",
    height: 60,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    position: "absolute",
    bottom: 0,
    zIndex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  camera: {
    flex: 1,
    width: "100%",
  },
  cameraContainer: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 0,
  },
  overlayTop: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    width: "100%",
    display: "flex",
    gap: 16,
    position: "absolute",
    zIndex: 2,
    paddingVertical: 16,
    paddingHorizontal: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  loading: {
    position: "absolute",
    top: 50,
    left: 0,
    right: 0,
    zIndex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "transparent",
  },
});
