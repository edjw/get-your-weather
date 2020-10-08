const getLocation = () => {
  document.querySelector("button#getMyWeather").style.display = "none";
  document.querySelector("p#status_text").innerText = "Getting your weather…";

  try {
    if (navigator.geolocation) {
      console.log("getting location");
      navigator.geolocation.getCurrentPosition(showWeather, handleError, {
        timeout: 5000,
      });
    } else {
      document.querySelector("p#status_text").innerText =
        "Geolocation is not supported by this browser.";
    }
  } catch (error) {
    console.log(error);
  }
};

const handleError = (error) => {
  console.log(error);

  if (error.code === 1) {
    document.querySelector("p#status_text").innerText =
      "This won't work until you allow the website to access your location.";
  }
};

const showWeather = (position) => {
  console.log("got location");

  window.location.href = `/${position.coords.latitude},${position.coords.longitude}`;
};
document
  .querySelector("button#getMyWeather")
  .addEventListener("click", getLocation);
