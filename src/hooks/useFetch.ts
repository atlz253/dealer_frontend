import { Dispatch, SetStateAction, useEffect, useState } from "react";
import tryServerRequest from "../utils/tryServerRequest";

function useFetch<T>(fetchFunc: () => Promise<T>, setData: Dispatch<SetStateAction<T>> | Dispatch<SetStateAction<T | undefined>>): boolean {
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        tryServerRequest(async () => {
            const data = await fetchFunc();

            setIsLoading(false);
            setData(data);
        });
    }, []);

    return isLoading;
}

export default useFetch;