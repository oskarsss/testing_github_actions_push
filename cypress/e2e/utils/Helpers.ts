class Helpers {
    public static randomize(length: number): string {
        const alphanumericChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let random = '';

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * alphanumericChars.length);
            random += alphanumericChars.charAt(randomIndex);
        }

        return random;
    }
}

export default Helpers;
