import { ActionFunction, json } from "remix";

export const action: ActionFunction = async ({ request }) => {
  console.log('hi there from action');
  const url = new URL(request.url);

  if (url.search === "") {
    throw Error("Bad Request");
  }
  // todo: handle sending formdata to academy 5
  return json(request.formData);
};