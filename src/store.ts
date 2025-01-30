import { create } from "zustand";

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
// const registerFormSchema = z.object({
//     organizaitionName: z.string(),
//     organizaitionNameEnglish: z.string(),
//     orgazineationType: z.enum(["Company", "Ministry"]),
//     numberOfEmployees: z.number().min(1),
//     numberOfBranches: z.number().min(1),
//     location: z.string(),
//     email: z.string().email(),
//     password: z.string().min(8),
//     phoneNumber: z.string().min(10),
//     identifationFile: z.instanceof(File),

// numberOfEmployees: z.number().min(1),
// numberOfBranches: z.number().min(1),
// email: z.string().email(),
// password: z.string().min(8),
// phoneNumber: z.string().min(10),
// identifationFile: z.instanceof(File),
//   });
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
