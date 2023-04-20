import { AxiosError } from "axios";

const getAxiosErrorMessage = (error: AxiosError): string => {
    if (error.response === undefined) {
        return "Не был получен ответ от сервера";
    }

    const status = error.response.status;

    switch (status) {
        case 400:
            return "Некорректный запрос";
        case 401:
            return "Ошибка авторизации";
        default:
            return `Неизвестная ошибка. Код ответа: ${status}`;
    }
}

export default getAxiosErrorMessage;