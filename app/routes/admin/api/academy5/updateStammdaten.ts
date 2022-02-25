import { ActionFunction, json } from "remix";

export const action: ActionFunction = async ({ request }) => {
  // todo: handle sending formdata to academy 5
  return request.formData();
};