import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  GoogleSignin,
  isSuccessResponse,
} from "@react-native-google-signin/google-signin";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { apiSlice } from "../../services/http";
import { useMeQuery } from "../../services/me";
import {
  useLoginMutation,
  useRefetchTokenMutation,
  useRegisterMutation,
  useSocialLoginMutation,
} from "./slice/auth-api";
import {
  clearToken,
  setCurrentStore,
  setGoogleToken,
  setToken,
  setUser,
} from "./slice/auth-slice";

import { IOS_CLIENT_ID } from "@env";
import {
  useGetOneOrganizationQuery,
  useSwitchOrganizationMutation,
} from "../../services/organization";
import messaging from "@react-native-firebase/messaging";
import { useSaveFcmTokenMutation } from "../../services/notification";
import { Tags } from "../../utils/tags";

GoogleSignin.configure({
  iosClientId: IOS_CLIENT_ID,
});

interface AuthContextType {
  signIn: () => Promise<void>;
  signInWithGoogle: () => Promise<{ firstAccess: boolean } | undefined>;
  signOut: () => Promise<void>;
  isAuthenticated: boolean;
  user: any;
  isLoading: boolean;
  registerAndLogin: (data: {
    access_token: string;
    isNotification: boolean;
    notificationInterval: string;
    organization_name: string;
    notification_token: string;
  }) => Promise<void>;
  switchStore: (storeId: string) => Promise<void>;
  toGoOnboarding?: boolean;
  googleToken?: string;
  currentStore?: string;
  setAuthenticated?: (value: boolean) => void;
  isLoadingOnboarding?: boolean;
  isLoadingSwitchStore?: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const [isLoadingOnboarding, setIsLoadingOnboarding] = useState(false);
  const [isLoadingSwitchStore, setLoadingSwitchStore] = useState(false);
  const [socialLogin] = useSocialLoginMutation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [register, { isLoading: isLoadingRegister }] = useRegisterMutation();
  const [switchOrganization, { isLoading: isLoadingSwitch }] =
    useSwitchOrganizationMutation();
  const [saveFcmToken, { isLoading: isLoadingFcmToken }] =
    useSaveFcmTokenMutation();
  const {
    data: userDataBase,
    isError,
    error,
    refetch: refetchUserData,
  } = useMeQuery();
  const [load, setLoad] = useState(false);
  const [refetchToken] = useRefetchTokenMutation();
  const [toGoOnboarding, setToGoOnboarding] = useState(false);
  const {
    data: dataStore,
    isLoading: isLoadingStore,
    refetch: refetchUserDataStore,
  } = useGetOneOrganizationQuery({
    id: userDataBase?.currentOrganizationId || "",
  });

  useEffect(() => {
    const checkAuthentication = async () => {
      setLoad(true);
      setIsLoadingOnboarding(true);
      console.log("Checking authentication...");
      try {
        const token = await AsyncStorage.getItem("@vencify:token");
        console.log("Token from AsyncStorage:", token);
        const tokenFcm = await messaging().getToken();
        console.log("FCM Token gerado:", tokenFcm);
        if (token) {
          dispatch(setToken(token));
          setIsAuthenticated(true);
          await refetchUserData();
          dispatch(setUser(userDataBase));
          dispatch(setCurrentStore(dataStore));
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        setIsAuthenticated(false);
      } finally {
        setLoad(false);
        setIsLoadingOnboarding(false);
      }
    };
    checkAuthentication();
  }, [setToken]);

  useEffect(() => {
    if (userDataBase) {
      dispatch(setUser(userDataBase));
    }
  }, [userDataBase, dispatch, dataStore, setToken]);

  useEffect(() => {
    if (dataStore) {
      dispatch(setCurrentStore(dataStore));
    }
  }, [dataStore, dispatch, setToken]);

  const switchStore = useCallback(async (storeId: string) => {
    setLoad(true);
    setLoadingSwitchStore(true);
    try {
      await switchOrganization({ id: storeId }).unwrap();
      const rtk = await AsyncStorage.getItem("@vencify:refresh_token");
      console.log(
        "Refresh Token from AsyncStorage---------------------:",
        rtk ?? ""
      );
      const data = await refetchToken({ token: rtk ?? "" }).unwrap();
      const { accessToken, refreshToken } = data;
      await AsyncStorage.setItem("@vencify:token", accessToken);
      await AsyncStorage.setItem("@vencify:refresh_token", refreshToken);
      dispatch(setToken(accessToken));

      const user = await refetchUserData().unwrap();
      console.log("User after switching store:", user);
      dispatch(setUser(user));
      dispatch(apiSlice.util.invalidateTags([Tags.BATCH, Tags.PRODUCT]));

      // Busque a organização correta usando o novo currentOrganizationId
      const orgResponse = await refetchUserDataStore().unwrap();
      console.log("Organization after switching store:", orgResponse);
      dispatch(setCurrentStore(orgResponse));

      setIsAuthenticated(true);
    } catch (error) {
      console.error("Error switching store:", error);
    } finally {
      setLoad(false);
      setLoadingSwitchStore(false);
    }
  }, []);

  const signIn = useCallback(async () => {
    setLoad(true);
    try {
      setIsAuthenticated(true);
      console.log("Attempting to sign in...");
      const user = await refetchUserData().unwrap();
      dispatch(setUser(user));
      const orgResponse = await refetchUserDataStore().unwrap();
      const fcmToken = await messaging().getToken();
      await saveFcmToken({ fcmToken }).unwrap();
      dispatch(setCurrentStore(orgResponse));
    } catch (errro) {
      console.error("Error during sign-in:", errro);
      setIsAuthenticated(false);
      throw error;
    } finally {
      setLoad(false);
    }
  }, []);

  const registerAndLogin = useCallback(
    async (data: {
      access_token: string;
      isNotification: boolean;
      notificationInterval: string;
      organization_name: string;
      notification_token: string;
    }) => {
      setLoad(true);
      try {
        console.log("DATA DO HOOK", data);
        const dataRegister = await register(data).unwrap();
        const { accessToken, refreshToken } = dataRegister;
        await AsyncStorage.setItem("@vencify:token", accessToken);
        await AsyncStorage.setItem("@vencify:refresh_token", refreshToken);
        dispatch(setToken(accessToken));

        const user = await refetchUserData().unwrap();
        dispatch(setUser(user));
        const orgResponse = await refetchUserDataStore().unwrap();
        dispatch(setCurrentStore(orgResponse));

        const fcmToken = await messaging().getToken();
        console.log("FCM Token gerado no login com ogoo:", fcmToken);
        await saveFcmToken({ fcmToken }).unwrap();

        setIsAuthenticated(true);
      } finally {
        setLoad(false);
      }
    },
    [login, dispatch, refetchUserData]
  );

  const signInWithGoogle = useCallback(async () => {
    setLoad(true);
    try {
      const hasProvious = await GoogleSignin.hasPreviousSignIn();
      if (hasProvious) {
        console.log("User already signed in with Google");
        const token = await GoogleSignin.getTokens();
        const { accessToken } = token;
        console.log("User signed in silently:", accessToken);

        const response = await socialLogin({
          accessToken,
          provider: "google",
        }).unwrap();

        const { accessToken: accessTokenApi, refreshToken } = response;

        if (response.firstAccess) {
          setToGoOnboarding(true);
          dispatch(setGoogleToken(accessTokenApi));
        }

        if (!response.firstAccess) {
          await AsyncStorage.setItem("@vencify:token", accessTokenApi);
          await AsyncStorage.setItem("@vencify:refresh_token", refreshToken);
          dispatch(setToken(accessTokenApi));
          setToGoOnboarding(false);
          const user = await refetchUserData().unwrap();
          dispatch(setUser(user));
          const orgResponse = await refetchUserDataStore().unwrap();
          dispatch(setCurrentStore(orgResponse));
          setIsAuthenticated(true);
        }
        return {
          firstAccess: response.firstAccess,
          access_token: accessTokenApi,
        };
      }

      const response = await GoogleSignin.signIn();
      console.log("Google Sign-In response:", response);
      if (isSuccessResponse(response)) {
        const token = await GoogleSignin.getTokens();
        const { accessToken } = token;
        const response = await socialLogin({
          accessToken,
          provider: "google",
        }).unwrap();
        const { accessToken: accessTokenApi, refreshToken } = response;

        if (response.firstAccess) {
          setToGoOnboarding(true);
          dispatch(setGoogleToken(accessTokenApi));

          return {
            firstAccess: response.firstAccess,
            access_token: accessTokenApi,
          };
        }

        if (!response.firstAccess) {
          await AsyncStorage.setItem("@vencify:token", accessTokenApi);
          await AsyncStorage.setItem("@vencify:refresh_token", refreshToken);
          dispatch(setToken(accessTokenApi));
          setToGoOnboarding(false);
          const user = await refetchUserData().unwrap();
          dispatch(setUser(user));
          const orgResponse = await refetchUserDataStore().unwrap();
          dispatch(setCurrentStore(orgResponse));
          setIsAuthenticated(true);
          const fcmToken = await messaging().getToken();
          console.log("FCM Token gerado no login com ogoo:", fcmToken);
          await saveFcmToken({ fcmToken }).unwrap();
          return {
            firstAccess: response.firstAccess,
            access_token: accessTokenApi,
          };
        }
        return {
          firstAccess: response.firstAccess,
          access_token: accessTokenApi,
        };
      }
    } catch (error) {
      console.error("Error during Google Sign-In:", error);
      setIsAuthenticated(false);
    } finally {
      setLoad(false);
      console.log("Google Sign-In process completed.");
    }
  }, [refetchUserData]);

  const signOut = useCallback(async () => {
    setLoad(true);
    try {
      await AsyncStorage.removeItem("@vencify:token");
      await AsyncStorage.removeItem("@vencify:refresh_token");
      await GoogleSignin.signOut();
      dispatch(clearToken());
      dispatch(apiSlice.util.resetApiState());
      dispatch(setUser(null));
      dispatch(setCurrentStore(null));

      setToGoOnboarding(false);
      setIsAuthenticated(false);
    } finally {
      setLoad(false);
    }
  }, [dispatch]);

  const googleToken = useSelector((state: any) => state.auth.googleToken);
  const currentStore = useSelector((state: any) => state.auth.currentStore);
  const user = useSelector((state: any) => state.auth.user);

  const isLoadingMath =
    isLoading ||
    load ||
    isLoadingRegister ||
    isLoadingSwitch ||
    isLoadingStore ||
    isLoadingFcmToken;

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signInWithGoogle,
        // signInWithFacebook,
        setAuthenticated: setIsAuthenticated,
        googleToken,
        switchStore,
        signOut,
        registerAndLogin,
        currentStore,
        isAuthenticated,
        toGoOnboarding,
        user,
        isLoading: isLoadingMath,
        isLoadingOnboarding,
        isLoadingSwitchStore,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
