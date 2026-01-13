interface WeatherData {
    location: string;
    temperature: number;
    condition: string;
    humidity: number;
}

interface WeatherCardProps {
    output: WeatherData;
}

export function WeatherCard({ output }: WeatherCardProps) {
    const data = output;

    const getWeatherIcon = (condition: string) => {
        switch (condition?.toLowerCase()) {
            case "sunny":
            case "clear":
                return "☀️";
            case "cloudy":
            case "partly cloudy":
                return "☁️";
            case "rainy":
            case "rain":
                return "🌧️";
            case "snowy":
            case "snow":
                return "❄️";
            case "windy":
                return "💨";
            default:
                return "⛅";
        }
    };

    return (
        <div className="inline-block bg-blue-600 backdrop-blur-sm rounded-2xl p-5 text-white shadow-lg border border-blue-500 hover:border-blue-400 transition-all">
            <div className="flex items-center justify-between mb-3">
                <div>
                    <h3 className="text-lg font-bold">{data.location}</h3>
                    <p className="text-xs text-blue-100 capitalize">{data.condition}</p>
                </div>
                <span className="text-4xl">{getWeatherIcon(data.condition)}</span>
            </div>

            <div className="flex items-baseline gap-1 mb-4">
                <span className="text-5xl font-bold">{Math.round(data.temperature)}°</span>
                <span className="text-lg opacity-80">C</span>
            </div>

            <div className="flex items-center gap-2 text-sm opacity-90 bg-blue-500 px-3 py-2 rounded-lg w-fit">
                <span>💧</span>
                <span>Độ ẩm:</span>
                <span className="font-semibold">{data.humidity}%</span>
            </div>
        </div>
    );
}