const conditionIcon: Record<string, string> = {
  clear_day: "☀️",
  clear_night: "🌙",
  cloud: "☁️",
  cloudly_day: "⛅",
  cloudly_night: "☁️",
  rain: "🌧️",
  storm: "⛈️",
  snow: "❄️",
  fog: "🌫️",
  hail: "🌨️",
};

interface Forecast {
  date: string;
  weekday: string;
  max: number;
  min: number;
  description: string;
  condition: string;
  rain_probability: number;
}

interface WeatherResults {
  temp: number;
  date: string;
  time: string;
  description: string;
  condition_slug: string;
  city: string;
  wind_speedy: string;
  wind_cardinal: string;
  forecast: Forecast[];
}

async function getWeather(cityName: string): Promise<WeatherResults> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000"}/api/weather?city_name=${encodeURIComponent(cityName)}`,
    { cache: "no-store" }
  );
  const data = await res.json();
  return data.results;
}

function CityCard({ results }: Readonly<{ results: WeatherResults }>) {
  return (
    <div className="flex flex-col gap-4 flex-1 min-w-0">
      <div className="bg-white/80 dark:bg-white/10 backdrop-blur rounded-2xl p-3 md:p-6 shadow-lg text-center">
        <p className="text-xs md:text-sm text-zinc-500 dark:text-zinc-400">{results.date} • {results.time}</p>
        <h1 className="text-lg md:text-2xl font-bold mt-1">{results.city}</h1>
        <div className="text-4xl md:text-7xl my-2 md:my-4">{conditionIcon[results.condition_slug] ?? "🌡️"}</div>
        <p className="text-4xl md:text-6xl font-light">{results.temp}°</p>
        <p className="text-zinc-600 dark:text-zinc-400 mt-1 text-sm md:text-base">{results.description}</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {[
          { label: "Chuva", value: `${results.forecast[0].rain_probability}%`, icon: "🌧️" },
          { label: "Vento", value: `${results.wind_speedy}`, icon: "💨" },
        ].map((item) => (
          <div key={item.label} className="bg-white/80 dark:bg-white/10 backdrop-blur rounded-xl p-4 shadow text-center">
            <span className="text-2xl">{item.icon}</span>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">{item.label}</p>
            <p className="font-semibold">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white/80 dark:bg-white/10 backdrop-blur rounded-2xl p-4 shadow-lg">
        <h2 className="font-semibold mb-3">Previsão</h2>
        <div className="flex flex-col gap-2">
          {results.forecast.map((day) => (
            <div key={day.date} className="flex items-center justify-between">
              <span className="w-12 text-sm font-medium">{day.weekday}</span>
              <span className="text-xl">{conditionIcon[day.condition] ?? "🌡️"}</span>
              <span className="text-sm text-zinc-500 dark:text-zinc-400">{day.description}</span>
              <span className="text-sm font-medium">{day.min}° / {day.max}°</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default async function Home() {
  const [barrinha, sertaozinho] = await Promise.all([
    getWeather("Barrinha,SP"),
    getWeather("Sertãozinho,SP"),
  ]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-sky-400 to-sky-200 dark:from-zinc-900 dark:to-zinc-800 pt-[70px] md:pt-6 pb-6 px-6 font-sans text-zinc-800 dark:text-zinc-100">
      <div className="w-full max-w-4xl flex flex-col md:flex-row gap-6">
        <CityCard results={barrinha} />
        <CityCard results={sertaozinho} />
      </div>
    </div>
  );
}
