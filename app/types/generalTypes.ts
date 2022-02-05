export interface Fetcher<T> {
  type?: FetcherTypes;
  data: T;
  state?: "submitting" | "idle" | "loading";
}

export type FetcherTypes =
  | "done"
  | "init"
  | "actionSubmission"
  | "loaderSubmission"
  | "actionReload"
  | "normalLoad";
