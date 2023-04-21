class AbstractAPI {
    protected static authToken: string = "";

    protected static SetAuthToken(token: string): void {
        this.authToken = token;
    }

    public static get AuthToken() {
        return this.authToken;
    }
}

export default AbstractAPI;