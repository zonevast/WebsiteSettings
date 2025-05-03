export function getTokenFromCookie(cookieName) {
    try {
        const cookies = document.cookie.split(";").map((cookie) => cookie.trim());
        for (const cookie of cookies) {
            const [name, value] = cookie.split("=");
            if (name === cookieName) {
                return value;
            }
        }
    } catch (e) {
    }
    return null;
}
