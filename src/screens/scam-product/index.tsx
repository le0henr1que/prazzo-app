import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Audio } from "expo-av";
import {
  CameraView,
  useCameraPermissions,

  type CameraType,
  type BarcodeScanningResult,
} from "expo-camera";
import LottieView from "lottie-react-native";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import { Button } from "react-native-paper";
import BackIconcon from "../../../assets/icons/backIcon";
import animation from "../../../assets/lotload.json";
import { useDialogModal } from "../../hook/handle-modal/hooks/actions";
import loadScam from "../../../assets/load-scam.json";
import { requestCameraPermission } from "../../hook/use-media-setup";
import { useGetProductQuery } from "../../services/product";
import { ScreensType } from "../index.screens";
import EmptyProduct from "../../components/empty-product-action";
import CodInsert from "../../components/code-insert";
import ScannerWithAnimation from "../../components/animation-scam";
import ModalLoad from "../../components/modal-load";
import { Camera as CameraIcon, Barcode, Keyboard, Lightning } from "phosphor-react-native";
import Typography from "../../components/text";
import { typography } from "../../styles/typography";
import { colors } from "../../styles/colors";
import OverlayMask from "../../../assets/overlayMask";

type FlashMode = "off" | "on" | "auto";

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
  const [activeButton, setActiveButton] = useState<string | null>(null);
  const cameraRef = useRef<CameraView | null>(null);
  const [flashMode, setFlashMode] = useState<FlashMode>("off");
 /*  const [facing, setFacing] = useState<CameraType>("back"); */
  const [torchEnabled, setTorchEnabled] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);


  const navigation = useNavigation<NativeStackNavigationProp<ScreensType>>();
/*   const { navigate } = useNavigation<NativeStackNavigationProp<ScreensType>>(); */
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

  const toggleFlashMode = () => {
    const next: FlashMode = flashMode === "off" ? "on" : "off";
    setFlashMode(next);
  };

  const capturePhoto = async () => {
    if (!cameraReady) {
      console.warn("⏳ câmera não pronta ainda!");
      return;
    }
    console.log("pinto [ScamProduct] capturePhoto start, cameraRef:", cameraRef.current, "isCapturing:", isCapturing);
  if (!cameraRef.current) return console.warn("caralho cameraRef é nulo");
  
    try {
      await cameraRef.current.resumePreview();
      console.log("xoxota [ScamProduct] calling takePictureAsync...");
      setIsCapturing(true);
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.7,
        skipProcessing: true,
      });
      console.log("nudes [ScamProduct] picture taken, uri=", photo.uri);
      navigation.push("AddProduct", {
        productInformation: null,
        photoUri: photo.uri,
      });
      console.log("[ScamProduct] navigation.navigate disparado");
    } catch (err) {
      console.error("Erro ao tirar foto pipi:", err);
      setIsCapturing(false); 
    }  finally {

      setIsCapturing(false);
      console.log("[ScamProduct] isCapturing resetado");
    }
  };
  


  const playSound = async () => {
    if (sound) {
      await sound.replayAsync();
    }
  };

  useFocusEffect(
    useCallback(() => {
      setIsCapturing(false)
      if (activeButton === "camera") {

        setScanned(false);
        cameraRef.current?.resumePreview();
      } else {
        setActiveButton("scanner");
      }
    }, [activeButton])
  );
  
  const toggleTorch = () => setTorchEnabled((v) => !v);

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
      ? navigation.navigate("Home", {
          screen: "Vencimentos",
          params: {
            screen: "Expirations",
            params: { productInformation },
          },
        })
      : navigation.navigate("AddProduct", { productInformation });
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
    return <ModalLoad visible={true} text="Habilitando câmera..." />;
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
        <CameraView
          ref={cameraRef}
          barcodeScannerSettings={{
            barcodeTypes:
              activeButton === "scanner" && !scanned
                ? ["code128", "upc_a", "ean13"]
                : [],
          }}
          onBarcodeScanned={
            activeButton === "scanner" ? handleBarCodeScanned : undefined
          }
          style={styles.cameraAbsolute}
          onCameraReady={() => {
            setCameraReady(true);
            console.log("📸 câmera pronta!");
          }}
          enableTorch={torchEnabled}
        />
        {activeButton === "scanner" && (
          <View style={styles.overlayContainer}>
            <OverlayMask offsetY={40} />

            <Typography
            variant="SM"
            family="regular"
              style={[
                styles.overlayLabel,
                {
                  top: (Dimensions.get("window").height - 290) / 2 + 40 - 24,
                },
              ]}
            >
              Posicione o código de barras abaixo e aguarde. {"\n"}A leitura é
              automática.
            </Typography>
          </View>
        )}
        <View style={styles.overlayTop}>
          <View style={{ display: "flex", flexDirection: "row", gap: 16 }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <BackIconcon size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>
              {activeButton == "scanner"
                ? "Escanear código de barras"
                : "Tirar foto"}
            </Text>
          </View>
          <TouchableOpacity onPress={toggleTorch}>
            <Lightning
              size={24}
              color="white"
              weight={torchEnabled ? "fill" : "regular"}
            />
          </TouchableOpacity>
          {/*  {!isSearch && (
            <TouchableOpacity onPress={() => console.log("Manual")}>
              <Text style={styles.headerTitle}>MANUAL</Text>
            </TouchableOpacity>
          )} */}
        </View>
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
        {activeButton === "scanner" && (
          <View style={styles.animationScam}>
            <ScannerWithAnimation />
          </View>
        )}

        <View
          style={[
            styles.overlayBottom,
            activeButton === "camera" && styles.overlayBottomCamera,
          ]}
        >
          {!isSearch && (
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[
                  styles.button,
                  activeButton === "scanner" && styles.buttonActive,
                ]}
                onPress={() => setActiveButton("scanner")}
              >
                <View style={styles.buttonContent}>
                  <Barcode
                    size={24}
                    color={activeButton === "scanner" ? "white" : "black"}
                  />
                  <Text
                    style={[
                      styles.label,
                      activeButton === "scanner" && styles.labelActive,
                    ]}
                  >
                    Scanner
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.button,
                  activeButton === "manual" && styles.buttonActive,
                ]}
                onPress={() => {
                  setActiveButton("manual");
                  handleModal({
                    isOpen: true,
                    title: "Insira o número do código de barras",
                    element: <CodInsert navigation={navigation} />,
                  });
                }}
              >
                <View style={styles.buttonContent}>
                  <Keyboard
                    size={24}
                    color={activeButton === "manual" ? "white" : "black"}
                  />
                  <Text
                    style={[
                      styles.label,
                      activeButton === "manual" && styles.labelActive,
                    ]}
                  >
                    Manual
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.button,
                  activeButton === "camera" && styles.buttonActive,
                ]}
                onPress={() => setActiveButton("camera")}
              >
                <View style={styles.buttonContent}>
                  <CameraIcon
                    size={24}
                    color={activeButton === "camera" ? "white" : "black"}
                  />
                  <Text
                    style={[
                      styles.label,
                      activeButton === "camera" && styles.labelActive,
                    ]}
                  >
                    Câmera
                  </Text>
                </View>
              </TouchableOpacity>
              {activeButton === "camera" && (
                <TouchableOpacity
                  style={styles.captureButton}
                  onPress={capturePhoto}
                  disabled={isCapturing}
                >
                  <View style={styles.innerCapture} />
                </TouchableOpacity>
              )}
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
    backgroundColor: "rgb(0, 0, 0)",
  },
  button: {
    flex: 1,
    height: 66,
    borderRadius: 8,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    fontSize: typography.size.small,
    fontFamily: typography.fontFamily.regular,
    color: "#000",
  },
  buttonContent: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
    paddingHorizontal: 0,
    marginRight: 18,
    left: 7,
    gap: 6,
  },
  label: {
    fontSize: typography.size.small,
    fontFamily: typography.fontFamily.medium,
    color: "#000",
    margin: 0,
  },
  buttonActive: {
    backgroundColor: colors.brand.default,
  },
  labelActive: {
    color: "#FFF",
  },
  captureButton: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 3,
    width: 64,
    height: 64,
    borderRadius: 32,
    top: 80,
    backgroundColor: "#fff",
  },
  innerCapture: {
    width: 56,
    height: 56,
    borderRadius: 26,
    backgroundColor: "#fff",
    borderWidth: 4,
    borderColor: "#000",
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
    height: 170,
    backgroundColor: "#121212",
    position: "absolute",
    bottom: 0,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    zIndex: 1,
  },
  overlayBottomCamera: {
    height: 240,
  },
  camera: {
    flex: 1,
    width: "100%",
  },
  cameraAbsolute: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  },
  cameraContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
    position: "relative",
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
    alignItems: "center",
    padding: 10,
    backgroundColor: "transparent",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    gap: 10,
  },
  overlayContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  },
  overlayLabel: {
    position: "absolute",
    width: "80%",
    textAlign: "center",
    color: "#fff",
    alignSelf: "center",
  },
});
