import LRU from "lru-cache";

const cacheOptions = {
  max: 500,
  // 1 day in seconds
  maxAge: 1000 * 60 * 60 * 24,
  // defines the length of the cache object
  length: function (n, key) {
    return n * 2 + key.length;
  },
  // Temporary remove dispose as it causes errors in development
  // dispose: function (key, n) { n.close() }
};

/**
 * LRU Cache, like any other cache is cleared on every request in dev mode,
 * to work around this, it's stored on globalThis in Development Mode
 *
 * WARNING: DO NOT DO THAT IN PRODUCTION as it could result in memory leaks
 * cache Duration is 10 minutes on dev mode
 */
const cache =
  process.env.NODE_ENV === "development"
    ? global.cache ??
      (global.cache = new LRU({ ...cacheOptions, maxAge: 1000 * 60 * 10 }))
    : new LRU(cacheOptions);

/**
 * helper function that takes in a cache key and a async function.
 * the function is only run when the key is not found in the cache
 */
export async function handleCache<
  FetcherFunction extends () => ReturnType<FetcherFunction>
>(cacheKey: string, fetchFn: FetcherFunction) {
  const cached = cache.get(cacheKey) as ReturnType<FetcherFunction> | undefined;

  if (cached) return cached;

  const result = await fetchFn();
  cache.set(cacheKey, result);

  return result;
}
