class AbstractAPI {
    protected static authToken: string = "";

    protected static SetAuthToken(token: string): void {
        this.authToken = token;
    }
}

export default AbstractAPI;