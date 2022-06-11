function changeGrades() {
  function changeGrades() {
    if (document.querySelector(".mark")) {
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
      let assignmentscores = document.querySelectorAll('td[aria-describedby="dx-col-17"]');
      assignmentscores.forEach(v => {
        let text = v.innerText.split("/")[1];
        v.innerText = text.substr(0, text.indexOf(".")+3) + "/" + text;
      });
    }
    requestAnimationFrame(changeGrades);
  }
  requestAnimationFrame(changeGrades);
}
function tabListener(tabId, changes, tab) {
  if (tab.url.includes(".edupoint.com/PXP2_Gradebook.aspx"))
    chrome.scripting.executeScript({target: {tabId: tabId}, func: changeGrades});
}
chrome.tabs.onUpdated.addListener(tabListener);