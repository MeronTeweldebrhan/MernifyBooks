import { useState, useEffect, useCallback } from 'react';

function useFetch(defaultUrl = '', defaultOptions = {}, autoFetch = true) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(autoFetch);
  const [error, setError] = useState(null);

  const fetchData = useCallback(
    async (url = defaultUrl, options = {}) => {
      setLoading(true);
      setError(null);

      try {
        const token = sessionStorage.getItem('token');

        const res = await fetch(url, {
          ...defaultOptions,
          ...options,
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...defaultOptions.headers,
            ...options.headers,
          },
        });

        const result = await res.json();

        if (!res.ok) {
          throw new Error(result.message || 'Request failed');
        }

        setData(result);
        return result;
      } catch (err) {
        setError(err);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [defaultUrl, JSON.stringify(defaultOptions)]
  );

  const refetch = () => fetchData();

  const request = async ({ url = defaultUrl, method = 'GET', body = null, headers = {} }) => {
    return await fetchData(url, {
      method,
      body: body ? JSON.stringify(body) : undefined,
      headers,
    });
  };

  useEffect(() => {
    if (autoFetch && defaultUrl) fetchData();
  }, [fetchData, autoFetch, defaultUrl]);

  return { data, loading, error, request, refetch };
}

export default useFetch;
