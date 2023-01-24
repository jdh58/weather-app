/* Import images I'm going to use */
import Search from "./icons/search_FILL0_wght400_GRAD0_opsz48.svg";

/* Set up variables for commonly used elements to reduce typing */
const div = document.createElement("div");
const img = document.createElement("img");
const span = document.createElement("span");
const p = document.createElement("p");

function makeAttribute(query, attributeName, value) {
  document.querySelector(query).setAttribute(attributeName, value);
}

export default function load() {
  /* Start with header */
  document.querySelector("body").appendChild(document.createElement("header"));
  document
    .querySelector("header")
    .appendChild(div.cloneNode(true))
    .classList.add("head-container");
  document
    .querySelector(".head-container")
    .appendChild(document.createElement("h1"))
    .classList.add("title");
  document.querySelector("h1").textContent = "Weather App";
  document
    .querySelector(".head-container")
    .appendChild(span.cloneNode(true))
    .classList.add("search-bar");
  document
    .querySelector(".search-bar")
    .appendChild(document.createElement("form"))
    .setAttribute("id", "search-form");
  document
    .querySelector("#search-form")
    .appendChild(document.createElement("button"));

  document
    .querySelector("#search-form")
    .appendChild(document.createElement("input"));

  makeAttribute("form > input", "type", "text");
  makeAttribute("form > input", "name", "search");
  makeAttribute("form > input", "id", "search");

  document
    .querySelector("button")
    .appendChild(img.cloneNode(true))
    .setAttribute("src", Search);

  document
    .querySelector("header")
    .appendChild(span.cloneNode(true))
    .classList.add("divider");

  // End header and now do main

  document.querySelector("body").appendChild(document.createElement("main"));
  document.querySelector("main").appendChild(document.createElement("h2"));
  document.querySelector("h2").classList.add("city-name");
  document
    .querySelector("main")
    .appendChild(div.cloneNode(true))
    .classList.add("main-container");
  document
    .querySelector(".main-container")
    .appendChild(div.cloneNode(true))
    .classList.add("current-container");
  document
    .querySelector(".current-container")
    .appendChild(img.cloneNode(true))
    .classList.add("icon");
  document
    .querySelector(".current-container")
    .appendChild(p.cloneNode(true))
    .classList.add("temp");

  document
    .querySelector(".main-container")
    .appendChild(div.cloneNode(true))
    .classList.add("daily-container");

  for (let i = 0; i < 5; i++) {
    document
      .querySelector(".daily-container")
      .appendChild(div.cloneNode(true))
      .classList.add("day", `day-${i}`);
    document
      .querySelector(`.day-${i}`)
      .appendChild(p.cloneNode(true))
      .classList.add("name");
    document
      .querySelector(`.day-${i}`)
      .appendChild(img.cloneNode(true))
      .classList.add("icon");
    document
      .querySelector(`.day-${i}`)
      .appendChild(p.cloneNode(true))
      .classList.add("temp");
  }

  // Now for footer
  document.querySelector("body").appendChild(document.createElement("footer"));
  document
    .querySelector("footer")
    .appendChild(p.cloneNode(true))
    .classList.add("info");
  document.querySelector(".info").textContent =
    "Created by github.com/jdh58 January 2023";
}
