chrome.action.onClicked.addListener((tab) => {
    if (tab.url.startsWith("https://docs.google.com/document/")) {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: showWordCount
        })
    }
})

function showWordCount() {
    if (document.getElementById("counter-extension-popup")) return;

    const popup = document.createElement("div");
    popup.id = "counter-extension-popup";
    popup.innerHTML = `
        <div class="border" id="menu" style="display: none;">
            <button id="settings-bttn" class="transition">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M8.68637 4.00008L11.293 1.39348C11.6835 1.00295 12.3167 1.00295 12.7072 1.39348L15.3138 4.00008H19.0001C19.5524 4.00008 20.0001 4.4478 20.0001 5.00008V8.68637L22.6067 11.293C22.9972 11.6835 22.9972 12.3167 22.6067 12.7072L20.0001 15.3138V19.0001C20.0001 19.5524 19.5524 20.0001 19.0001 20.0001H15.3138L12.7072 22.6067C12.3167 22.9972 11.6835 22.9972 11.293 22.6067L8.68637 20.0001H5.00008C4.4478 20.0001 4.00008 19.5524 4.00008 19.0001V15.3138L1.39348 12.7072C1.00295 12.3167 1.00295 11.6835 1.39348 11.293L4.00008 8.68637V5.00008C4.00008 4.4478 4.4478 4.00008 5.00008 4.00008H8.68637ZM6.00008 6.00008V9.5148L3.5148 12.0001L6.00008 14.4854V18.0001H9.5148L12.0001 20.4854L14.4854 18.0001H18.0001V14.4854L20.4854 12.0001L18.0001 9.5148V6.00008H14.4854L12.0001 3.5148L9.5148 6.00008H6.00008ZM12.0001 16.0001C9.79094 16.0001 8.00008 14.2092 8.00008 12.0001C8.00008 9.79094 9.79094 8.00008 12.0001 8.00008C14.2092 8.00008 16.0001 9.79094 16.0001 12.0001C16.0001 14.2092 14.2092 16.0001 12.0001 16.0001ZM12.0001 14.0001C13.1047 14.0001 14.0001 13.1047 14.0001 12.0001C14.0001 10.8955 13.1047 10.0001 12.0001 10.0001C10.8955 10.0001 10.0001 10.8955 10.0001 12.0001C10.0001 13.1047 10.8955 14.0001 12.0001 14.0001Z"></path></svg>
            </button>
            <div class="menu-text">
                <p>Total words:</p>
                <p>Total characters:</p>
                <p>Section characters:</p>
                <p>Section sentences:</p>
                <div style="display: flex; align-items: baseline; white-space: nowrap; overflow: hidden;">
                    <p>Words left until</p>
                    <input type="number" inputmode="numeric" style="margin: 0 0.1rem 0 0.3rem;" min="0" pattern=" 0+\.[0-9]*[1-9][0-9]*$" oninput="getInputWidth(this)" onkeypress="return event.charCode >= 48 && event.charCode <= 57">
                    <canvas id="canvas" style="display: none;"></canvas>
                    <p>: </p>
                </div>
            </div>
        </div>
        <div class="border minimized">
            <p>Section words:</p>
            <button id="dropdown-bttn" class="transition"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 16L6 10H18L12 16Z"></path></svg></button>
        </div>
    `;
    document.body.appendChild(popup);
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = chrome.runtime.getURL("styles.css");
    document.head.appendChild(link);

    // have input element width grow with text
    function getInputWidth(input) {
        const canvas = document.getElementById('canvas');
        const context = canvas.getContext('2d');
        const font = window.getComputedStyle(input).font;
        context.font = font;
        const textWidth = context.measureText(" " + input.value).width;
        input.style.width = `${textWidth + 8}px`;
    }

    // UI event listeners
    let dropdownRotated = 0;
    document.getElementById("dropdown-bttn").addEventListener("click", function () {
        dropdownRotated -= 180;
        this.style.transform = `rotate(${dropdownRotated}deg)`;

        document.getElementById("menu").style.display = dropdownRotated % 360 === 0 ? "none" : "block";
    })

    let settingsRotated = 0;
    document.getElementById("settings-bttn").addEventListener("click", function () {
        settingsRotated -= 180;
        this.style.transform = `rotate(${settingsRotated}deg)`;
    });
}
