let interval;

const Types = {
  DONE: "DONE",
  INIT_POPUP: "INIT_POPUP",
  COMPARE_VALUES: "COMPARE_VALUES",
  STORIES_BUTTON: "STORIES_BUTTON",
  UPDATE_STORIES_BUTTON: "UPDATE_STORIES_BUTTON",
  CHAT_STORIES_BUTTON: "CHAT_STORIES_BUTTON",
  CHANNELS_BUTTON: "CHANNELS_BUTTON",
  UPDATE_CHANNELS_BUTTON: "UPDATE_CHANNELS_BUTTON",
};

if (localStorage.getItem(Types.STORIES_BUTTON) === null) {
  localStorage.setItem(Types.STORIES_BUTTON, false);
}

if (localStorage.getItem(Types.CHANNELS_BUTTON) === null) {
  localStorage.setItem(Types.CHANNELS_BUTTON, false);
}

if (localStorage.getItem(Types.CHAT_STORIES_BUTTON) === null) {
  localStorage.setItem(Types.CHAT_STORIES_BUTTON, true);
}

const storiesId = 'stories-btn';
const channelsId = 'channels-btn'

function hasButtons() {
  let storiesBtn = document.querySelector(
      `#app > div > div > div._2Ts6i._3RGKj > header > div._604FD > div > span > div:nth-child(3)`,
  );
  let channelsBtn = document.querySelector(
      `#app > div > div > div._2Ts6i._3RGKj > header > div._604FD > div > span > div:nth-child(2)`,
  );
  return !!storiesBtn && !!channelsBtn;
}

function createIds(interval) {
  if (hasButtons()) {
    let storiesBtn = document.querySelector(
        `#app > div > div > div._2Ts6i._3RGKj > header > div._604FD > div > span > div:nth-child(3)`,
    );
    storiesBtn.id = storiesId;
    let channelsBtn = document.querySelector(
        `#app > div > div > div._2Ts6i._3RGKj > header > div._604FD > div > span > div:nth-child(2)`,
    );
    channelsBtn.id = channelsId;
    clearInterval(interval);
  }
}

function removeStoriesBtn(interval) {
  let storiesBtn = document.getElementById(storiesId);
  if (storiesBtn) {
    storiesBtn.style.display = "none";
    clearInterval(interval);
  }
}

function removeChannelsBtn(interval) {
  let channelsBtn = document.getElementById(channelsId)
  if (channelsBtn) {
    channelsBtn.style.display = "none";
    clearInterval(interval);
  }
}

function showStoriesBtn(interval) {
  let storiesBtn = document.getElementById(storiesId)
  if (storiesBtn) {
    storiesBtn.style.display = "unset";
    clearInterval(interval);
  }
}

function showChannelsBtn(interval) {
  let channelsBtn = document.getElementById(channelsId)
  if (channelsBtn) {
    channelsBtn.style.display = "unset";
    clearInterval(interval);
  }
}

function removeChatStoriesBtn(interval) {}

const updateStoriesButton = (request) => {
  if (request.payload.value === false) {
    localStorage.setItem(Types.STORIES_BUTTON, false);
    interval = setInterval(() => {
      removeStoriesBtn(interval);
    }, 100);
  } else {
    localStorage.setItem(Types.STORIES_BUTTON, true);
    interval = setInterval(() => {
      showStoriesBtn(interval);
    }, 100);
  }
};

const updateChannelsButton = (request) => {
  if (request.payload.value === false) {
    localStorage.setItem(Types.CHANNELS_BUTTON, false);
    interval = setInterval(() => {
      removeChannelsBtn(interval);
    }, 100);
  } else {
    localStorage.setItem(Types.CHANNELS_BUTTON, true);
    interval = setInterval(() => {
      showChannelsBtn(interval);
    }, 100);
  }
};

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  let response;
  switch (request.type) {
    case Types.INIT_POPUP:
      response = {
        type: Types.COMPARE_VALUES,
        payload: {
          [Types.STORIES_BUTTON]: localStorage.getItem(Types.STORIES_BUTTON),
          [Types.CHANNELS_BUTTON]: localStorage.getItem(Types.CHANNELS_BUTTON),
          [Types.CHAT_STORIES_BUTTON]: localStorage.getItem(
            Types.CHAT_STORIES_BUTTON,
          )
        },
      };
      sendResponse(response);
      break;

    case Types.UPDATE_STORIES_BUTTON:
      updateStoriesButton(request);
      response = {
        type: Types.DONE,
      };
      sendResponse(response);
      break;

    case Types.UPDATE_CHANNELS_BUTTON:
      updateChannelsButton(request);
      response = {
        type: Types.DONE,
      };
      sendResponse(response);
      break;

  }
});

(() => {
  window.addEventListener(
    "load",
    () => {
      if (!hasButtons()) {
        let interval0 = setInterval(() => {createIds(interval0)}, 100);
      }
      if (localStorage.getItem(Types.STORIES_BUTTON) === "false") {
        let interval1 = setInterval(() => {
          removeStoriesBtn(interval1);
        }, 500);
      }
      if (localStorage.getItem(Types.CHANNELS_BUTTON) === "false") {
        let interval2 = setInterval(() => {
          removeChannelsBtn(interval2);
        }, 500);
      }
      if (localStorage.getItem(Types.CHAT_STORIES_BUTTON) === "false") {
        let interval3 = setInterval(() => {
          removeChatStoriesBtn(interval3);
        }, 500);
      }
    },
    true,
  );
})();
