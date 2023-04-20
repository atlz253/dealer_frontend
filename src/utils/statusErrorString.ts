interface IStatusErrorString {
    [key: number]: string
}

const statusErrorString: IStatusErrorString = {
    401: "Ошибка авторизации"
}

Object.freeze(statusErrorString);

export default statusErrorString;