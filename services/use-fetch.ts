import { useCallback, useEffect, useState } from "react";

export function useFetch<T>(fetchFunc: () => Promise<T>, autoFetch = true) {

    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const res = await fetchFunc();

            setData(res)
        } catch (err) {
            setError(err instanceof Error ? err : new Error('An error occured'));
        } finally {
            setLoading(false);
        }
    }, [fetchFunc]);

    const reset = () => {
        setData(null);
        setLoading(false);
        setError(null);
    };

    useEffect(() => {
        if (autoFetch) {
            fetchData();
        }
    }, [autoFetch, fetchData])

    return { data, error, loading, refetch: fetchData, reset };
};

export default useFetch;    