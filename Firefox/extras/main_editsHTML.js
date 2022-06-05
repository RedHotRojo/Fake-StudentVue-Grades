const encoder = new TextEncoder();
const decoder = new TextDecoder("utf-8");

function listener(details) {
  if (details.url.includes("PXP2_Gradebook")) {
    let filter = browser.webRequest.filterResponseData(details.requestId);

    filter.ondata = event => {
      let data = decoder.decode(event.data, {stream: true});
      console.log(data.indexOf("86"));
      console.log(data.indexOf("88"));
      console.log(data.indexOf("87"));
      data.replace("86", "98");
      data.replace("88", "98");
      data.replace("87", "97");
      filter.write(encoder.encode("ASD"));
      filter.disconnect();
    }
    console.log("sadf");
  }

  return {};
}

  console.log("sadf");
browser.webRequest.onBeforeRequest.addListener(
  listener,
  {urls: ["https://va-chesterfield-psv.edupoint.com/*"], types: ["main_frame"]},
  ["blocking"]
);
