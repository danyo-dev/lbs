import { ActionFunction, json } from "remix";

export const action: ActionFunction = async ({ request }) => {
  // todo: handle sending formdata to brz
  return request.formData();
};