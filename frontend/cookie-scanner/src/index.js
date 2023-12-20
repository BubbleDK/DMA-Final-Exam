import * as puppeteer from 'puppeteer'
import axios from 'axios';
import yargs from 'yargs';
import https from 'https';
import * as process from 'process';

const args = yargs(process.argv.slice(2))
    .option('url', {
        alias: 'u',
        description: 'URL to navigate to',
        type: 'string',
        demandOption: true
    })
    .parse();

async function scanForCookies(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Navigate to the specified URL
    await page.goto(url);

    // Extract cookies from the page
    const cookies = await page.cookies();
    const modifiedCookies = [...cookies].map(cookie => {
        const timestamp = cookie.expires;
        const iso8601Date = new Date(timestamp * 1000).toISOString();
        return {
            name: cookie.name,
            value: cookie.value,
            expirationDate: iso8601Date,
            domainURL: args.url,
            category: "test",
        };
    });

    // Close the browser
    await browser.close();

    return modifiedCookies;
}

async function sendCookiesToServer(cookies) {
    const apiUrl = 'https://localhost:7163/api/Cookies';
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJsYXJzQGxhcnMuY29tIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9zZXJpYWxudW1iZXIiOiJjYWZlNGE4OS0wMjE4LTRiNjItODA5MC00NjA2MmI2ZmFmM2EiLCJleHAiOjIwMTg1OTYwNTR9.vMlBM98uD0gi8VKRRTgOK7ePQ4A5eQaRerGJjAYTp9I';

    const config = {
        httpsAgent: new https.Agent({
            rejectUnauthorized: false  // Disable SSL verification
        }),
        timeout: 5000,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    };

    try {
        // Perform Axios POST request with the collected cookies
        const response = await axios.post(apiUrl, cookies, config);
        console.log('Cookies sent to server:', response.data);
    } catch (error) {
        console.error('Error sending cookies to server:', error);
    }
}

(async (args) => {
    const targetUrl = args.url;

    try {
        // Step 1: Scan for cookies using Puppeteer
        const collectedCookies = await scanForCookies(targetUrl);

        // Step 2: Send the collected cookies to the server using Axios
        await sendCookiesToServer(collectedCookies);
    } catch (error) {
        console.error('Error sending cookies to server:', error.message);
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error('Server responded with:', error.response.data);
            console.error('Status code:', error.response.status);
        } else if (error.request) {
            // The request was made but no response was received
            console.error('No response received from server');
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error setting up the request:', error.message);
        }
    }
})(args);