export interface Fetcher<T> {
  type?: FetcherTypes;
  data: T;
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
