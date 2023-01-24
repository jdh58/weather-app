import "./styles.css";
import load from "./buildPage";
import DOMsearch from "./DOMmanip";

load();

const searchSubmit = async (e) => {
  e.preventDefault();

  try {
    const input = document.querySelector("input").value;

    let data = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${input}&APPID=694366407429cf7a8a159e2e0e58bd8c`,
      { mode: "cors" }
    );

    /* data.json returns another promise, which we await for
    then set data equal to it once it returns  */
    data = await data.json();

    DOMsearch().success(data);
  } catch (err) {
    console.log(err);
  }
};

export default function tempConvert() {
  const farenheit = (temp) => ((temp - 273.15) * 9) / 5 + 32;
  const celsius = (temp) => temp - 273.15;

  return { farenheit, celsius };
}

document.querySelector("#search-form").addEventListener("submit", searchSubmit);
