let action;

const Types = {
  DONE: "DONE",
  INIT_POPUP: "INIT_POPUP",
  COMPARE_VALUES: "COMPARE_VALUES",
  STORIES_BUTTON: "STORIES_BUTTON",
  UPDATE_STORIES_BUTTON: "UPDATE_STORIES_BUTTON",
  CHAT_STORIES_BUTTON: "CHAT_STORIES_BUTTON",
};

const compareValues = (response) => {
  const storiesBtnSwitch = document.getElementById("stories-btn-switch");
  storiesBtnSwitch.checked = response.payload[Types.STORIES_BUTTON] !== "false";
  const chatStoriesSwitch = document.getElementById("chat-stories-switch");
  chatStoriesSwitch.checked =
    response.payload[Types.CHAT_STORIES_BUTTON] !== "false";
};

const sendMessageToContentScript = (action) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, action, (response) => {
      switch (response.type) {
        case Types.COMPARE_VALUES:
          compareValues(response);
          break;
        case Types.DONE:
          break;
      }
    });
  });
};

action = {
  type: Types.INIT_POPUP,
};

sendMessageToContentScript(action);

const storiesBtnSwitch = document.getElementById("stories-btn-switch");

storiesBtnSwitch.addEventListener("change", (event) => {
  const value = event.target.checked;
  const action = {
    type: Types.UPDATE_STORIES_BUTTON,
    payload: {
      value,
    },
  };
  sendMessageToContentScript(action);
});