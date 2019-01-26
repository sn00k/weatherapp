import CelciusIcon from './assets/weather_icons/temperature-celsius.svg';
import ClearDayIcon from './assets/weather_icons/clear-day.svg';
import ClearNightIcon from './assets/weather_icons/clear-night.svg';
import ThunderStormIcon from './assets/weather_icons/thunder.svg';
import RainIcon from './assets/weather_icons/rainy.svg';
import SnowIcon from './assets/weather_icons/snowy.svg';
import CloudsIcon from './assets/weather_icons/cloudy.svg';
import FoggyIcon from './assets/weather_icons/foggy.svg';

export function weatherIcon(weatherId, timeNow, timeSunrise, timeSunset) {
  if (weatherId <= 232) {
    return ThunderStormIcon;
  } else if (weatherId >= 300 && weatherId <= 531) {
    return RainIcon;
  } else if (weatherId >= 600 && weatherId <= 622) {
    return SnowIcon;
  } else if (weatherId >= 701 && weatherId <= 781) {
    return FoggyIcon;
  } else if (weatherId === 800) {
    return clearDayOrNight(timeNow, timeSunrise, timeSunset)
  } else if (weatherId >= 801 && weatherId <= 804) {
    return CloudsIcon;
  }
}

export function tempUnitIcon(unit = 1) {
  if (unit === 1) {
    return CelciusIcon;
  }
  return; //Fahrenheit
}

function clearDayOrNight(timeNow, timeSunrise, timeSunset) {
  if (timeNow === timeSunrise 
    || (timeNow > timeSunrise
    && timeNow < timeSunset)) {
      return ClearDayIcon;
    }
    return ClearNightIcon;
}

function formatUnixTime(timeNowUnix) {
  var timeNowHuman = new Date(timeNowUnix*1000);
  var hours = timeNowHuman.getHours();
  var minutes = "0" + timeNowHuman.getMinutes();
  var seconds = "0" + timeNowHuman.getSeconds();

  return hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
}