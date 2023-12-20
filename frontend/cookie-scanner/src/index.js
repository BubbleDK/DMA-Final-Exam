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

const config = {
    headers: {
        "Content-Type": "application/json",
        Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJsYXJzQGxhcnMuY29tIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9zZXJpYWxudW1iZXIiOiJjYWZlNGE4OS0wMjE4LTRiNjItODA5MC00NjA2MmI2ZmFmM2EiLCJleHAiOjIwMTg1OTYwNTR9.vMlBM98uD0gi8VKRRTgOK7ePQ4A5eQaRerGJjAYTp9I",
    },
};
const cookies = new Set();
const cookieValues = new Set();
const storage = new Set();

async function _store(type, change) {
    return new Promise((resolve, reject) => {
        if (type === 'cookie') {
            // Check if the cookie value already exists
            if (!cookieValues.has(change.value)) {
                cookies.add(change);
                cookieValues.add(change.value);
            }
            resolve();
        } else if (type === 'storage') {
            storage.add(change);
            resolve();
        } else {
            reject();
        }
    });
}

const inject = () => {
    if (cookieStore) {
        cookieStore.addEventListener(
            'change',
            async (event) => {
                if (event.changed) {
                    for (let idx in event.changed) {
                        let change = event.changed[idx];
                        change.host = window.location.host;
                        await window._store('cookie', change)
                    }
                }
                else if (event.deleted) {
                    for (let idx in event.deleted) {
                        let change = event.changed[idx];
                        await window._store('cookie', change)
                    }
                }
            }
        )
    }
    if (window.localStorage) {
        window.addEventListener('storage', async (event) => {
            await window._store('storage', event)
        })
    }
}

(async (args) => {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null
    });
    browser.on('disconnected', () => {
        console.log('Browser disconnected');
    });

    const page = await browser.newPage();

    page.on('response', async () => {
        const cookies = await page.cookies();
        for (let idx in cookies) {
            let cookie = cookies[idx];
            if (cookie.domain.startsWith('.')) {
                cookie.domain = cookie.domain.slice(1);
            }
            await _store('cookie', cookie);
        }
    });

    await page.exposeFunction('_store', _store);
    await page.evaluateOnNewDocument(inject);
    await page.goto(args.url);

    const modifiedCookies = [...cookies].map(cookie => {
        return {
            name: cookie.name,
            value: cookie.value,
            expirationDate: cookie.expires,
            domainURL: args.url,
            category: "",
        };
    });
    // console.log(modifiedCookies);
    axios.post('https://localhost:7163/api/Cookies', modifiedCookies, config)
        .then((response) => {
            console.log("Cookies created:", response.data);
        })
        .catch((error) => {
            console.error("Error sending cookies:", error);
        });

    if (process.env.CI === 'true') {
        await page.waitForNetworkIdle({
            idleTime: 1000,
            timeout: 10000
        });
        await browser.close();
        process.exit(fs.existsSync(args.output) ? 0 : 1);
    }
})(args);