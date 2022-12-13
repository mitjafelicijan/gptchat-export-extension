function downloadPage() {
    let filename = 'gpt-export.html';
    let text = document.querySelector('main').innerHTML;
    let styleLink = '<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/mitjafelicijan/gptchat-export-extension/style.css">';

    let element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(`${styleLink} ${text}`));
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
