const Types = {
  DONE: "DONE",
  INIT_POPUP: "INIT_POPUP",
  COMPARE_VALUES: "COMPARE_VALUES",
  STORIES_BUTTON: "STORIES_BUTTON",
  UPDATE_STORIES_BUTTON: "UPDATE_STORIES_BUTTON",
  CHAT_STORIES_BUTTON: "CHAT_STORIES_BUTTON",
  CHANNELS_BUTTON: "CHANNELS_BUTTON",
  UPDATE_CHANNELS_BUTTON: "UPDATE_CHANNELS_BUTTON",
  COMMUNITIES_BUTTON: "COMMUNITIES_BUTTON",
  UPDATE_COMMUNITIES_BUTTON: "UPDATE_COMMUNITIES_BUTTON",
};

if (localStorage.getItem(Types.COMMUNITIES_BUTTON) === null) {
  localStorage.setItem(Types.COMMUNITIES_BUTTON, false.toString());
}

if (localStorage.getItem(Types.STORIES_BUTTON) === null) {
  localStorage.setItem(Types.STORIES_BUTTON, false.toString());
}

if (localStorage.getItem(Types.CHANNELS_BUTTON) === null) {
  localStorage.setItem(Types.CHANNELS_BUTTON, false.toString());
}

if (localStorage.getItem(Types.CHAT_STORIES_BUTTON) === null) {
  localStorage.setItem(Types.CHAT_STORIES_BUTTON, true.toString());
}

const communitiesId = "communities-btn";
const storiesId = "stories-btn";
const channelsId = "channels-btn";
const messagesId = "messages-btn";
const settingsId = "settings-btn";

const ids = [messagesId, storiesId, channelsId, communitiesId];

function hasButtons() {
  const optionsList = document.querySelector(
    "#app > div > div.x78zum5.xdt5ytf.x5yr21d > div > header > div > div > div > div > span > div > div:nth-child(1)",
  );

  if (!optionsList) {
    return false;
  }

  const children = optionsList.querySelectorAll("._ajv7");

  return children.length === 4;
}

function createIds(interval) {
  if (hasButtons()) {
    let optionsList = document.querySelector(
      "#app > div > div.x78zum5.xdt5ytf.x5yr21d > div > header > div > div > div > div > span > div > div:nth-child(1)",
    );
    const children = optionsList.querySelectorAll("._ajv7");
    children.forEach((element, index) => {
      if (ids[index]) {
        element.id = ids[index];
      }
    });
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
  let channelsBtn = document.getElementById(channelsId);
  if (channelsBtn) {
    channelsBtn.style.display = "none";
    clearInterval(interval);
  }
}

function removeCommunitiesBtn(interval) {
  let communitiesBtn = document.getElementById(communitiesId);
  if (communitiesBtn) {
    communitiesBtn.style.display = "none";
    clearInterval(interval);
  }
}

function showStoriesBtn(interval) {
  let storiesBtn = document.getElementById(storiesId);
  if (storiesBtn) {
    storiesBtn.style.display = "unset";
    clearInterval(interval);
  }
}

function showChannelsBtn(interval) {
  let channelsBtn = document.getElementById(channelsId);
  if (channelsBtn) {
    channelsBtn.style.display = "unset";
    clearInterval(interval);
  }
}

function showCommunitiesBtn(interval) {
  let communitiesBtn = document.getElementById(communitiesId);
  if (communitiesBtn) {
    communitiesBtn.style.display = "unset";
    clearInterval(interval);
  }
}

function removeChatStoriesBtn(interval) {}

const updateStoriesButton = (request) => {
  if (request.payload.value === false) {
    localStorage.setItem(Types.STORIES_BUTTON, false);
    const interval = setInterval(() => {
      removeStoriesBtn(interval);
    }, 100);
  } else {
    localStorage.setItem(Types.STORIES_BUTTON, true);
    const interval = setInterval(() => {
      showStoriesBtn(interval);
    }, 100);
  }
};

const updateChannelsButton = (request) => {
  if (request.payload.value === false) {
    localStorage.setItem(Types.CHANNELS_BUTTON, false);
    const interval = setInterval(() => {
      removeChannelsBtn(interval);
    }, 100);
  } else {
    localStorage.setItem(Types.CHANNELS_BUTTON, true);
    const interval = setInterval(() => {
      showChannelsBtn(interval);
    }, 100);
  }
};

const updateCommunitiesButton = (request) => {
  if (request.payload.value === false) {
    localStorage.setItem(Types.COMMUNITIES_BUTTON, false);
    const interval = setInterval(() => {
      removeCommunitiesBtn(interval);
    }, 100);
  } else {
    localStorage.setItem(Types.COMMUNITIES_BUTTON, true);
    const interval = setInterval(() => {
      showCommunitiesBtn(interval);
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
          [Types.COMMUNITIES_BUTTON]: localStorage.getItem(
            Types.COMMUNITIES_BUTTON,
          ),
          [Types.CHAT_STORIES_BUTTON]: localStorage.getItem(
            Types.CHAT_STORIES_BUTTON,
          ),
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

    case Types.UPDATE_COMMUNITIES_BUTTON:
      updateCommunitiesButton(request);
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
        let interval0 = setInterval(() => {
          createIds(interval0);
        }, 100);
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
      if (localStorage.getItem(Types.COMMUNITIES_BUTTON) === "false") {
        let interval3 = setInterval(() => {
          removeCommunitiesBtn(interval3);
        }, 500);
      }
      if (localStorage.getItem(Types.CHAT_STORIES_BUTTON) === "false") {
        let interval4 = setInterval(() => {
          removeChatStoriesBtn(interval4);
        }, 500);
      }
    },
    true,
  );
})();
