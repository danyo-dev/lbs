export interface Fetcher<DataType> {
  type?: FetcherTypes;
  data: DataType;
  state?: StateTypes;
}

export type FetcherTypes =
  | "done"
  | "init"
  | "actionSubmission"
  | "loaderSubmission"
  | "actionReload"
  | "normalLoad";

export type StateTypes = "idle" | "submitting" | "loading";
