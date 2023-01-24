/* Import helper functions */
import { format, parseISO } from "date-fns";
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
  const success = async (data) => {
    try {
      console.log(data);
      let forecastData = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=694366407429cf7a8a159e2e0e58bd8c`,
        { mode: "cors" }
      );
      forecastData = await forecastData.json();

      /* The data gets the forecast for every 3 hours, but we only
      want 1 a day, so sort out only the ones that are at 12:00 */
      forecastData = forecastData.list.filter((elem) =>
        /12:00:00/.test(elem.dt_txt)
      );
      console.log(forecastData);

      /* Update the 5-day forecast */
      for (let i = 0; i < 5; i++) {
        // Give each day the name of the weekday using date-fns
        document.querySelector(`.day-${i} > .name`).textContent = format(
          parseISO(forecastData[i].dt_txt),
          "eeee"
        );
        // Use a helper function from index.js and Math.trunc to cut decimals
        document.querySelector(`.day-${i} > .temp`).textContent = `${Math.trunc(
          tempConvert().farenheit(forecastData[i].main.temp_max) // We want the highs
        )}° F`;
        // Use the icons object to find the proper icon for each day
        document
          .querySelector(`.day-${i} > .icon`)
          .setAttribute("src", icons[`${forecastData[i].weather[0].main}`]);
      }
      // Now for the current weather:

      // Set the city name to the searched city:
      document.querySelector(".city-name").textContent = data.name;
      // Set the current icons to the proper weather icon:
      // TO-DO: Set the current icon to Night if it's after sunset
      document
        .querySelector(".icon")
        .setAttribute("src", icons[`${data.weather[0].main}`]);
      // Set the current temps to the proper temperature
      document.querySelector(".temp").textContent = `${Math.trunc(
        tempConvert().farenheit(data.main.temp).toString()
      )}° F`;

      // Unhide the images (we do this incase there was an error previously)
      document.querySelectorAll(".icon").forEach((elem) => {
        elem.style.display = "block";
      });
    } catch (err) {
      console.log(err);
    }
  };

  const failure = () => {
    document.querySelector(".city-name").textContent = "Could Not Find City";
    document.querySelectorAll(".temp").forEach((elem) => {
      elem.textContent = "";
    });
    document.querySelectorAll(".name").forEach((elem) => {
      elem.textContent = "";
    });
    // Hide the images, they show empty error if not hidden
    document.querySelectorAll(".icon").forEach((elem) => {
      elem.style.display = "none";
    });
  };

  return { success, failure };
}
