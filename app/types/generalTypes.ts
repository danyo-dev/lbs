export interface Fetcher<T> {
  data: T;
  type:
    | "done"
    | "init"
    | "actionSubmission"
    | "loaderSubmission"
    | "actionReload"
    | "normalLoad";
  state: "submitting" | "idle" | "loading";
}
