import { AxiosError } from "axios";
import getAxiosErrorMessage from "./getAxiosErrorMessage";

const tryServerRequest = async (callback: () => Promise<void>): Promise<void> => {
    try {
        await callback();
    } catch (error) {
        if (error instanceof AxiosError) {
            alert(getAxiosErrorMessage(error));
        }
        else {
            alert(error);
        }
    }
}

export default tryServerRequest;