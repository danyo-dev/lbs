export default function getCleanQueryString(url: URL) {
  const params = new URLSearchParams(url.search);

  [...params.entries()].forEach(([key, value]) => {
    if (!value) {
      params.delete(key);
    }
  });
  const cleanedQueryString = String(params);

  return { cleanedQueryString };
}
