let interval;

const Types = {
  DONE: "DONE",
  INIT_POPUP: "INIT_POPUP",
  COMPARE_VALUES: "COMPARE_VALUES",
  STORIES_BUTTON: "STORIES_BUTTON",
  UPDATE_STORIES_BUTTON: "UPDATE_STORIES_BUTTON",
  CHAT_STORIES_BUTTON: "CHAT_STORIES_BUTTON",
};

if (localStorage.getItem(Types.STORIES_BUTTON) === null) {
  localStorage.setItem(Types.STORIES_BUTTON, true);
}

if (localStorage.getItem(Types.CHAT_STORIES_BUTTON) === null) {
  localStorage.setItem(Types.CHAT_STORIES_BUTTON, true);
}

function removeStoriesBtn(interval) {
  let storiesBtn = document.querySelector('[data-testid="menu-bar-status"]');
  if (storiesBtn) {
    storiesBtn.style.display = "none";
    clearInterval(interval);
  }
}

function showStoriesBtn(interval) {
  let storiesBtn = document.querySelector('[data-testid="menu-bar-status"]');
  if (storiesBtn) {
    storiesBtn.style.display = "unset";
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

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  let response;
  switch (request.type) {
    case Types.INIT_POPUP: {
      response = {
        type: Types.COMPARE_VALUES,
        payload: {
          [Types.STORIES_BUTTON]: localStorage.getItem(Types.STORIES_BUTTON),
          [Types.CHAT_STORIES_BUTTON]: localStorage.getItem(
            Types.CHAT_STORIES_BUTTON,
          ),
        },
      };
      sendResponse(response);
      break;
    }
    case Types.UPDATE_STORIES_BUTTON: {
      updateStoriesButton(request);
      response = {
        type: Types.DONE,
      };
      sendResponse(response);
      break;
    }
  }
});

(() => {
  window.addEventListener(
    "load",
    () => {
      if (localStorage.getItem(Types.STORIES_BUTTON) === "false") {
        interval = setInterval(() => {
          removeStoriesBtn(interval);
        }, 500);
      }
      if (localStorage.getItem(Types.CHAT_STORIES_BUTTON) === "false") {
        interval = setInterval(() => {
          removeChatStoriesBtn(interval);
        }, 500);
      }
    },
    true,
  );
})();
