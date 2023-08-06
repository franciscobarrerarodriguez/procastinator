// chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
//   console.log(
//       sender.tab
//           ? "from a content script:" + sender.tab.url
//           : "from the extension",
//   );
//   if (request.greeting === "hello") sendResponse({ farewell: "goodbye" });
// });

// (async () => {
//   const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
//   const response = await chrome.tabs.sendMessage(tab.id, {greeting: "hello"});
//   // do something with response here, not outside the function
//   console.log(response);
// })();
//
// // (async () => {
// //   const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
// //   const response = await chrome.tabs.sendMessage(tab.id, {greeting: "hello"});
// //   // do something with response here, not outside the function
// //   console.log(response);
// // })();
//
// // chrome.tabs.onUpdated.addListener((tabId, tab) => {
// //   console.log("background.js", tabId, tab);
// // });
