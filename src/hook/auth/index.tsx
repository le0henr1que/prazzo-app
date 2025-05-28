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
import { useDispatch } from "react-redux";
import { apiSlice } from "../../services/http";
import { useMeQuery } from "../../services/me";
import {
  useLoginMutation,
  useRegisterMutation,
  useSocialLoginMutation,
} from "./slice/auth-api";
import { clearToken, setToken } from "./slice/auth-slice";

import { IOS_CLIENT_ID } from "@env";

GoogleSignin.configure({
  iosClientId: IOS_CLIENT_ID,
});

interface AuthContextType {
  signIn: (data: { email: string; password: string }) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  isAuthenticated: boolean;
  user: any;
  isLoading: boolean;
  registerAndLogin: (data: {
    access_token: string;
    isNotification: boolean;
    notificationInterval: string;
    organization_name: string;
  }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const [socialLogin] = useSocialLoginMutation();
  const [user, setUser] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [register, { isLoading: isLoadingRegister }] = useRegisterMutation();

  const { data: userDataBase } = useMeQuery();
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      setLoad(true);
      try {
        const token = await AsyncStorage.getItem("@vencify:token");
        if (token) {
          dispatch(setToken(token));
          setIsAuthenticated(true);
          if (userDataBase) {
            setUser(userDataBase);
          }
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        setIsAuthenticated(false);
      } finally {
        setLoad(false);
      }
    };
    checkAuthentication();
  }, [dispatch, userDataBase]);

  // useEffect(() => {
  //   const checkGoogleSignInStatus = async () => {
  //     setLoad(true);
  //     try {
  //       const response = await GoogleSignin.hasPreviousSignIn();
  //       console.log("Google Sign-In status:", response);
  //       if (response) {
  //         const userInfo = await GoogleSignin.signInSilently();
  //         console.log("User signed in silently:", userInfo);
  //         setIsAuthenticated(true);
  //       } else {
  //         setIsAuthenticated(false);
  //       }
  //     } catch (error) {
  //       setIsAuthenticated(false);
  //     } finally {
  //       setLoad(false);
  //     }
  //   };

  //   checkGoogleSignInStatus();
  // }, []);

  const signIn = useCallback(
    async ({ email, password }: { email: string; password: string }) => {
      setLoad(true);
      try {
        const response = await login({ email, password }).unwrap();
        const { accessToken, refreshToken, user } = response;
        await AsyncStorage.setItem("@vencify:token", accessToken);
        await AsyncStorage.setItem("@vencify:refresh_token", refreshToken);
        dispatch(setToken(accessToken));
        setIsAuthenticated(true);
      } finally {
        setLoad(false);
      }
    },
    [login, dispatch]
  );

  const registerAndLogin = useCallback(
    async (data: {
      access_token: string;
      isNotification: boolean;
      notificationInterval: string;
      organization_name: string;
    }) => {
      setLoad(true);
      try {
        const dataRegister = await register(data).unwrap();
        const { accessToken, refreshToken } = dataRegister;
        await AsyncStorage.setItem("@vencify:token", accessToken);
        await AsyncStorage.setItem("@vencify:refresh_token", refreshToken);
        dispatch(setToken(accessToken));
        setIsAuthenticated(true);
      } finally {
        setLoad(false);
      }
    },
    [login, dispatch]
  );

  const signInWithGoogle = useCallback(async () => {
    setLoad(true);
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      if (isSuccessResponse(response)) {
        setIsAuthenticated(true);
        console.log("User signed in:", response.data);
      }
    } catch (error) {
      console.error("Error during Google Sign-In:", error);
      setIsAuthenticated(false);
    } finally {
      setLoad(false);
      console.log("Google Sign-In process completed.");
    }
  }, [dispatch]);

  const signOut = useCallback(async () => {
    setLoad(true);
    try {
      await AsyncStorage.removeItem("@vencify:token");
      await AsyncStorage.removeItem("@vencify:refresh_token");
      dispatch(clearToken());
      dispatch(apiSlice.util.resetApiState());
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoad(false);
    }
  }, [dispatch]);

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signInWithGoogle,
        // signInWithFacebook,
        signOut,
        registerAndLogin,
        isAuthenticated,
        user,
        isLoading: isLoading || load || isLoadingRegister,
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
