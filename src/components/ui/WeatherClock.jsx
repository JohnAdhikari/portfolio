import { useEffect, useState } from 'react';
import { FiSun, FiCloud, FiCloudRain, FiCloudSnow, FiCloudLightning, FiCloudDrizzle, FiMoon } from 'react-icons/fi';

// Default: Kathmandu, Nepal (fallback if geolocation is denied/unavailable)
const DEFAULT = { lat: 27.7172, lon: 85.324, name: 'Kathmandu' };

// Open-Meteo WMO weather codes -> icon + label
function describe(code, isDay) {
  if (code === 0) return { icon: isDay ? FiSun : FiMoon, label: isDay ? 'Clear' : 'Clear night' };
  if (code === 1 || code === 2) return { icon: FiCloud, label: 'Partly cloudy' };
  if (code === 3) return { icon: FiCloud, label: 'Overcast' };
  if (code === 45 || code === 48) return { icon: FiCloud, label: 'Fog' };
  if (code >= 51 && code <= 57) return { icon: FiCloudDrizzle, label: 'Drizzle' };
  if (code >= 61 && code <= 67) return { icon: FiCloudRain, label: 'Rain' };
  if (code >= 71 && code <= 77) return { icon: FiCloudSnow, label: 'Snow' };
  if (code >= 80 && code <= 82) return { icon: FiCloudRain, label: 'Showers' };
  if (code >= 85 && code <= 86) return { icon: FiCloudSnow, label: 'Snow showers' };
  if (code >= 95) return { icon: FiCloudLightning, label: 'Thunderstorm' };
  return { icon: FiCloud, label: 'Cloudy' };
}

function formatTime(d) {
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export default function WeatherClock() {
  const [time, setTime] = useState(() => formatTime(new Date()));
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const tick = setInterval(() => setTime(formatTime(new Date())), 1000);
    return () => clearInterval(tick);
  }, []);

  useEffect(() => {
    let cancelled = false;
    const coords = { lat: DEFAULT.lat, lon: DEFAULT.lon };

    const load = async (lat, lon) => {
      try {
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code,is_day,wind_speed_10m&timezone=auto`,
        );
        if (!res.ok) throw new Error('weather fetch failed');
        const data = await res.json();
        if (!cancelled) {
          setWeather({
            temp: Math.round(data.current.temperature_2m),
            code: data.current.weather_code,
            isDay: data.current.is_day === 1,
            wind: Math.round(data.current.wind_speed_10m),
          });
        }
      } catch {
        /* keep null -> render fallback */
      }
    };

    // Try geolocation first, fall back to default location
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          coords.lat = pos.coords.latitude;
          coords.lon = pos.coords.longitude;
          load(coords.lat, coords.lon);
        },
        () => load(coords.lat, coords.lon),
        { timeout: 5000 },
      );
    } else {
      load(coords.lat, coords.lon);
    }

    const refresh = setInterval(() => load(coords.lat, coords.lon), 10 * 60 * 1000);
    return () => {
      cancelled = true;
      clearInterval(refresh);
    };
  }, []);

  const desc = weather ? describe(weather.code, weather.isDay) : null;
  const WeatherIcon = desc?.icon || FiCloud;

  return (
    <div
      className="inline-flex items-center gap-3 rounded-full border border-line bg-panel px-4 py-1.5 text-xs font-medium text-ink-dim"
      aria-label={`Local time ${time}. ${weather ? `${desc.label}, ${weather.temp} degrees Celsius` : 'Weather loading'}`}
    >
      <span className="flex items-center gap-1.5 tabular-nums">
        <FiSun className="text-accent-hi" size={13} aria-hidden="true" />
        {time}
      </span>
      <span className="h-3 w-px bg-line" aria-hidden="true" />
      <span className="flex items-center gap-1.5">
        <WeatherIcon className="text-accent-hi" size={14} aria-hidden="true" />
        {weather ? (
          <span>
            {weather.temp}&deg;C <span className="text-ink-soft">{desc.label}</span>
          </span>
        ) : (
          <span className="text-ink-soft">Weather&hellip;</span>
        )}
      </span>
    </div>
  );
}
