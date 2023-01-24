/* Import helper functions */
import { format } from "date-fns";
import tempConvert from "./index";

/* Import the weather image icons */
import Clouds from "./icons/cloudy_FILL0_wght400_GRAD0_opsz48.svg";
import Snow from "./icons/ac_unit_FILL0_wght400_GRAD0_opsz48.svg";
import Windy from "./icons/air_FILL0_wght400_GRAD0_opsz48.svg";
import Night from "./icons/clear_night_FILL0_wght400_GRAD0_opsz48.svg";
import Rainy from "./icons/rainy_FILL0_wght400_GRAD0_opsz48.svg";
import PartlyCloudy from "./icons/partly_cloudy_day_FILL0_wght400_GRAD0_opsz48.svg";
import Clear from "./icons/sunny.png";

const icons = { Clouds, Snow, Windy, Night, Rainy, PartlyCloudy, Clear };

export default function search() {
  const success = (data) => {
    Promise.resolve(data);
    console.log(data);

    // Set the city name to the searched city:
    document.querySelector(".city-name").textContent = data.name;
    // Set all the icons to the proper weather icon:
    document.querySelectorAll(".icon").forEach((element) => {
      element.setAttribute("src", icons[`${data.weather[0].main}`]);
    });
    // Set all the temps to the proper temperature
    document.querySelectorAll(".temp").forEach((element) => {
      element.textContent = `${Math.trunc(
        tempConvert().farenheit(data.main.temp).toString()
      )} F°`;
    });
    // Set the day of the week names for the forecast
    function bnaja() {}
  };

  const failure = (data) => {};

  return { success, failure };
}
