function changeGrades() {
  let marks = document.querySelectorAll(".mark");
  marks.forEach(element => {
    if (element.innerText !== "N/A") {
      if (isNaN(parseInt(element.innerText, 10))) {
        element.innerText = "A+";
      } else {
        element.innerText = "100";
      }
      element.nextElementSibling.innerText = "100.0%";
    }
  });
}
function webRequestListener(details) {
  chrome.scripting.executeScript({target: {tabId: details.tabId}, func: changeGrades});
  return {};
}
function tabListener(tabId, changes, tab) {
  if (tab.url.includes(".edupoint.com/PXP2_Gradebook.aspx"))
    chrome.scripting.executeScript({target: {tabId: tabId}, func: changeGrades});
}
chrome.tabs.onUpdated.addListener(tabListener);
chrome.webRequest.onCompleted.addListener(
  webRequestListener,
  {urls: ["https://*.edupoint.com/service/PXP2Communication.asmx/LoadControl"], types: ["xmlhttprequest"]}
);