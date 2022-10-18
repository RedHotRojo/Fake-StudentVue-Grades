let changeGrades =`
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
    let gradesDivs = [...document.querySelectorAll(".gb-student-assignments-grid table div")].filter(v => v.innerText.includes("out of"));
    let grades = gradesDivs.map(v => Number(v.innerText.slice(v.innerText.lastIndexOf(" ")+1)));
    gradesDivs.forEach((v, i) => {
      v.innerText = "Score: " + grades[i] + v.innerText.slice(v.innerText.indexOf(" o"));
    });
  }
  requestAnimationFrame(changeGrades);
}
requestAnimationFrame(changeGrades);`;
function tabListener(tabId) {
  browser.tabs.executeScript(tabId, {code: changeGrades});
}
browser.tabs.onUpdated.addListener(tabListener);
function tabListener(tabId, changes, tab) {
  if (tab.url.includes(".edupoint.com/PXP2_Gradebook.aspx"))
    browser.tabs.executeScript(tabId, {code: changeGrades});
}