export interface AuthContextType {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  loading: boolean;
  setLoading: (value: boolean) => void;
}
