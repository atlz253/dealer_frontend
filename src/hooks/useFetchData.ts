import useFetchState from "./useFetchState";

function useFetchData<T>(fetchFunc: () => Promise<T>, initialValue: T): [T, boolean];

function useFetchData<T = undefined>(fetchFunc: () => Promise<T>): [T | undefined, boolean];

function useFetchData<T>(fetchFunc: () => Promise<T>, initialValue?: T): [T | undefined, boolean] {
    const [item, setItem, isLoading] = useFetchState(fetchFunc, initialValue);

    return [
        item,
        isLoading
    ]
}

export default useFetchData;