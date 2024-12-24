import { useState, useEffect } from "react";

const useSingleLocation = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getSingleLocation = () => {
      if (!navigator.geolocation) {
        setError("Geolocation is not supported by your browser.");
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
          // console.log("Location fetched:", { lat: latitude, lng: longitude });
        },
        (err) => {
          // console.error(`Error (${err.code}): ${err.message}`);
          setError(`Error (${err.code}): ${err.message}`);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    };

    getSingleLocation();
  }, []);

  return { location, error };
};

export default useSingleLocation;