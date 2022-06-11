const encoder = new TextEncoder();
const decoder = new TextDecoder("utf-8");

function listener(details) {
  if (details.url === "https://va-chesterfield-psv.edupoint.com/service/PXP2Communication.asmx/LoadControl") {
    let filter = browser.webRequest.filterResponseData(details.requestId);

    filter.ondata = event => {
      let data = decoder.decode(event.data, {stream: true});
      data.replace("\u003e8", "\u003e9");
      filter.write(encoder.encode(data));
      filter.disconnect();
    }
  } else {
    console.log(details.url);
  }

  return {};
}

browser.webRequest.onBeforeRequest.addListener(
  listener,
  {urls: ["https://va-chesterfield-psv.edupoint.com/*"], types: ["xmlhttprequest"]},
  ["blocking"]
);
