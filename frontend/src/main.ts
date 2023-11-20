import axios from 'axios';

// Function to set a cookie
async function setCookie(url: string): Promise<void> {
    try {
        await axios.get(url);
        console.log('Cookie set successfully');
    } catch (error) {
        console.error('Error setting cookie:', error);
    }
}

// Function to get cookies
async function getCookies(url: string): Promise<string[]> {
    try {
        const response = await axios.get(url);
        return response.headers['set-cookie'] || [];
    } catch (error) {
        console.error('Error fetching cookies:', error);
        return [];
    }
}

// Set a cookie and then get it
const setCookieUrl = 'https://httpbin.org/cookies/set?name=value';
const getCookiesUrl = 'https://httpbin.org/cookies';

setCookie(setCookieUrl).then(() => {
    getCookies(getCookiesUrl).then(cookies => {
        console.log('Cookies:', cookies);
    });
});