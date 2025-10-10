import { useEffect, useState } from "react";

//useFetch will get a movie details function
const useFetch = (fetchFunction, autoFetch = true) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchFunction();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : newError("An Error Occurred"));
    } finally {
      setLoading(false);
    }
  };
  const reset = () => {
    setData(null);
    setLoading(false);
    setError(null);
  };

  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
    return { data, loading, error, refetch: fetchData, reset }; // refetch: fetchData matlab usko iss naam se use krna hai baaki jagah
  }, []);
};

export default useFetch;
