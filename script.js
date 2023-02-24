let addMatch = document.querySelector(".add");
let newMatch = document.querySelector(".match");
let all_matches = document.querySelector(".all-matches");
let lws_matchName = document.querySelector(".lws-matchName");
let lws_increment = document.querySelector(".lws-increment");
let lws_decrement = document.querySelector(".lws-decrement");
let reset_button = document.querySelector(".lws-reset");
let b = document.querySelector("#b");

let matchHtml = (increaseNumber) => `
<div class="match">
<div class="wrapper">
    <button class="lws-delete">
        <img src="./image/delete.svg" alt="" />
    </button>
    <h3 class="lws-matchName">Match ${increaseNumber}</h3>
</div>
<div class="inc-dec">
    <form onsubmit="return false" class="incrementForm">
        <h4>Increment</h4>
        <input
            type="number"
            name="increment"
            class="lws-increment"
            data-id="${increaseNumber}"
        />
    </form>
    <form onsubmit="return false" class="decrementForm">
        <h4>Decrement</h4>
        <input
            type="number"
            name="decrement"
            class="lws-decrement"
            data-id="${increaseNumber}"
           
        />
    </form>
</div>
<div class="numbers">
    <h2 class="lws-singleResult" data-id="${increaseNumber}">0</h2>
</div>
</div>
`;

const initialState = {
  value1: 0,
};

let increaseNumber = 1;

function scoreReducer(state = initialState, action) {
  if (action.type === "addValue") {
    return {
      ...state,
      [`value${action.payload.id}`]:
        state[`value${action.payload.id}`] + action.payload.value,
    };
  } else if (action.type === "removeValue") {
    const result = state[`value${action.payload.id}`] - action.payload.value;
    return {
      ...state,
      [`value${action.payload.id}`]: result > 0 ? result : 0,
    };
  } else if (action.type === "reset") {
    const st = {};
    Object.keys(state).map((key) => {
      console.log(key);
      st[key] = 0;
    });
    return st;
  } else if (action.type === "addMatch") {
    return {
      ...state,
      [action.payload]: 0,
    };
  }
}

const store = Redux.createStore(scoreReducer);

const render = () => {
  const state = store.getState();
  const lws_single_results = document.querySelectorAll(".lws-singleResult");
  lws_single_results.forEach((single_result) => {
    single_result.innerText = state[`value${single_result.dataset.id}`];
  });
};
const st = store.subscribe(render);

lws_increment.addEventListener("keypress", (e) => {
  if (e.keyCode == 13 || e.key == "Enter") {
    console.log(lws_decrement.dataset);
    store.dispatch({
      type: "addValue",
      payload: {
        value: Math.abs(Number(lws_increment.value || 0)),
        id: lws_increment.dataset.id,
      },
    });
  }
  return;
});

lws_decrement.addEventListener("keypress", (e) => {
  if (e.keyCode == 13 || e.key == "Enter") {
    store.dispatch({
      type: "removeValue",
      payload: {
        value: Math.abs(Number(lws_decrement.value || 0)),
        id: lws_decrement.dataset.id,
      },
    });
  }
  return;
});

addMatch.addEventListener("click", () => {
  store.dispatch({
    type: "addMatch",
    payload: `value${++increaseNumber}`,
  });
  all_matches.innerHTML += matchHtml(increaseNumber);

  let lws_increments = document.querySelectorAll(".lws-increment");
  let lws_decrements = document.querySelectorAll(".lws-decrement");

  lws_increments.forEach((lws_increment) => {
    lws_increment.addEventListener("keypress", (e) => {
      if (e.keyCode == 13 || e.key == "Enter") {
        store.dispatch({
          type: "addValue",
          payload: {
            value: Math.abs(Number(lws_increment.value)),
            id: lws_increment.dataset.id,
          },
        });
      }
      return;
    });
  });

  lws_decrements.forEach((lws_decrement) => {
    lws_decrement.addEventListener("keypress", (e) => {
      if (e.keyCode == 13 || e.key == "Enter") {
        store.dispatch({
          type: "removeValue",
          payload: {
            id: lws_decrement.dataset.id,
            value: Math.abs(Number(lws_decrement.value)),
          },
        });
      }
      return;
    });
  });
});

reset_button.addEventListener("click", () => {
  let lws_increments = document.querySelectorAll(".lws-increment");

  lws_increments.forEach((lws_increment) => {
    lws_increment.value = "";
  });

  let lws_decrements = document.querySelectorAll(".lws-decrement");
  lws_decrements.forEach((lws_decrement) => {
    lws_decrement.value = "";
  });

  store.dispatch({
    type: "reset",
  });
});
