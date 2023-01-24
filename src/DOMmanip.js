/* Import helper functions */
import { format, parse, parseISO } from "date-fns";
import tempConvert from "./index";

/* Import the weather image icons */
import Clouds from "./icons/cloudy_FILL0_wght400_GRAD0_opsz48.svg";
import Snow from "./icons/ac_unit_FILL0_wght400_GRAD0_opsz48.svg";
import Windy from "./icons/air_FILL0_wght400_GRAD0_opsz48.svg";
import Night from "./icons/clear_night_FILL0_wght400_GRAD0_opsz48.svg";
import Rain from "./icons/rainy_FILL0_wght400_GRAD0_opsz48.svg";
import PartlyCloudy from "./icons/partly_cloudy_day_FILL0_wght400_GRAD0_opsz48.svg";
import Clear from "./icons/sunny.png";

const icons = { Clouds, Snow, Windy, Night, Rain, PartlyCloudy, Clear };

export default function search() {
  const success = (data) => {
    console.log(data);

    (async function getForecast() {
      try {
        let forecastData = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=694366407429cf7a8a159e2e0e58bd8c`,
          { mode: "cors" }
        );
        forecastData = await forecastData.json();

        forecastData = forecastData.list.filter((elem) =>
          /12:00:00/.test(elem.dt_txt)
        );
        console.log(forecastData);

        for (let i = 0; i < 5; i++) {
          document.querySelector(`.day-${i} > .name`).textContent = format(
            parseISO(forecastData[i].dt_txt),
            "eeee"
          );
          document.querySelector(
            `.day-${i} > .temp`
          ).textContent = `${Math.trunc(
            tempConvert().farenheit(forecastData[i].main.temp_max)
          )}° F`;
          document
            .querySelector(`.day-${i} > .icon`)
            .setAttribute("src", icons[`${forecastData[i].weather[0].main}`]);
          // Set the city name to the searched city:
          document.querySelector(".city-name").textContent = data.name;
          // Set the current icons to the proper weather icon:
          document
            .querySelector(".icon")
            .setAttribute("src", icons[`${data.weather[0].main}`]);
          // Set the current temps to the proper temperature
          document.querySelector(".temp").textContent = `${Math.trunc(
            tempConvert().farenheit(data.main.temp).toString()
          )}° F`;
        }
      } catch (err) {
        console.log(err);
      }
    })();
  };

  const failure = (data) => {};

  return { success, failure };
}
