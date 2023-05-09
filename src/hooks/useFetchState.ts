import { Dispatch, SetStateAction, useState } from "react";
import useFetch from "./useFetch";

function useFetchState<T>(fetchFunc: () => Promise<T>, initialValue: T): [T, Dispatch<SetStateAction<T>>, boolean];

function useFetchState<T = undefined>(fetchFunc: () => Promise<T>): [T | undefined, Dispatch<SetStateAction<T | undefined>>, boolean];

function useFetchState<T>(fetchFunc: () => Promise<T>, initialValue?: T): [T | undefined, Dispatch<SetStateAction<T>> | Dispatch<SetStateAction<T | undefined>>, boolean] {
    const [item, setItem] = useState<T | undefined>(initialValue);
    const isLoading = useFetch<T>(fetchFunc, setItem);

    return [
        item,
        setItem,
        isLoading
    ]
}

export default useFetchState;