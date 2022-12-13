function downloadPage() {
    let styles = `body {
        background-color: #fff;
        color: #000;
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
        font-size: 14px;
        line-height: 1.25em;
        max-width: 700px;
        margin: 0 auto;
    }

    body>div [class*="react-scroll-to-bottom"]>.flex>div:nth-child(odd) {
        font-size: 200%;
        margin-bottom: 30px;
        font-weight: 600;
    }

    body button {
        display: none;
    }

    body svg {
        display: none;
    }

    body textarea {
        display: none;
    }

    body pre {
        border: 1px solid #ccc;
        padding: 5px;
    }

    body code {
        background-color: #eee;
    }

    body pre code {
        border: 0;
        background-color: transparent;
    }
    `;

    let filename = 'gpt-export.html';
    let text = document.querySelector('main').innerHTML;

    let element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(`<style>${styles}</style> ${text}`));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();

    document.body.removeChild(element);
}

chrome.action.onClicked.addListener((tab) => {
    if (!tab.url.includes("chrome://")) {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: downloadPage
        });
    }
});
