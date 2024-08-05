export default interface IAbstractClient {
  get: (config: any) => any;
  post: (config: any) => any;
  put: (config: any) => any;
  delete: (config: any) => any;
  setAccessToken: (token: string) => void;
  clearAccessToken: () => void;
}
