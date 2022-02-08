export default function useQueryString(request: Request) {
  const url = new URL(request.url);

  if (url.search === "") {
    throw Error("Bad Request");
  }

  const params = new URLSearchParams(url.search);

  [...params.entries()].forEach(([key, value]) => {
    if (!value) {
      params.delete(key);
    }
  });
  const cleanedQueryString = String(params);

  return { cleanedQueryString };
}
