import { create } from "zustand";
import { signInWithCustomToken } from "firebase/auth";
import { app, auth } from "./api/firebase-config";
type RegisterFormStore = {
  // organization Details
  organizaitionName: string;
  organizaitionNameEnglish: string;
  orgazineationType: "Company" | "Ministry";
  mainLocation: string;
  setOrganiztionDetails: (payload: OrganizaitionDetails) => void;

  // user Details
  email: string;
  password: string;
  phoneNumber: string;
  setUserDetails: (payload: UserDetails) => void;

  // extra organztion Details
  numberOfEmployees: number;
  numberOfBranches: number;
  identifationFile: File;
  setExtraOrganizationDetails: (payload: extraOrganizationDetails) => void;

  // for testing only
  setState: (payload: Partial<RegisterFormStore>) => void;
};

type OrganizaitionDetails = Partial<
  Pick<
    RegisterFormStore,
    | "organizaitionName"
    | "organizaitionNameEnglish"
    | "orgazineationType"
    | "mainLocation"
  >
>;

type UserDetails = Partial<
  Pick<RegisterFormStore, "email" | "password" | "phoneNumber">
>;

type extraOrganizationDetails = Partial<
  Pick<
    RegisterFormStore,
    "numberOfEmployees" | "numberOfBranches" | "identifationFile"
  >
>;
export const useRegisterFormStore = create<RegisterFormStore>((set) => ({
  organizaitionName: "",
  organizaitionNameEnglish: "",
  orgazineationType: "Company",
  numberOfEmployees: 0,
  numberOfBranches: 0,
  mainLocation: "",
  email: "",
  password: "",
  phoneNumber: "",
  identifationFile: new File([], ""),
  setState: (payload: any) => set((state) => ({ ...state, ...payload })),
  setOrganiztionDetails: (payload: OrganizaitionDetails) =>
    set((state) => ({
      ...state,
      ...payload,
    })),

  setUserDetails: (payload: UserDetails) =>
    set((state) => ({
      ...state,
      ...payload,
    })),

  setExtraOrganizationDetails: (payload: extraOrganizationDetails) =>
    set((state) => ({
      ...state,
      ...payload,
    })),
}));

interface AuthStore {
  customToken: string | null;
  idToken: string | null;
  details: any | null | string;
  setTokens: (customToken: string) => void;
  logout: () => void;
  setDetails: (details: any) => void;
  setIdToken: (idToken: any) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  customToken: localStorage.getItem("customToken"),
  idToken: localStorage.getItem("idToken"),
  details: localStorage.getItem("userDetails"),

  setTokens: async (customToken: string) => {
    try {
      localStorage.setItem("customToken", customToken);
      const userCredential = await signInWithCustomToken(auth, customToken);
      const idToken = await userCredential.user.getIdToken();
      localStorage.setItem("idToken", idToken);
      set({ customToken, idToken });
    } catch (error) {
      console.error("Error exchanging custom token:", error);
      throw error;
    }
  },

  setIdToken: (token) => {
    localStorage.setItem("idToken", token);
    console.log("idToken", token);
    set({ idToken: token });
  },
  setDetails: (details) => {
    set({ details });
  },

  logout: () => {
    localStorage.removeItem("customToken");
    localStorage.removeItem("idToken");
    set({
      customToken: null,
      idToken: null,
      details: null,
    });
  },
}));
