import { NextRequest, NextResponse } from "next/server";

const HG_WEATHER_URL = "https://api.hgbrasil.com/weather";

export async function GET(request: NextRequest) {
  const cityName = request.nextUrl.searchParams.get("city_name");
  if (!cityName) {
    return NextResponse.json({ error: "city_name é obrigatório" }, { status: 400 });
  }

  const key = process.env.chave_hgbrasil_weather;
  const url = `${HG_WEATHER_URL}?city_name=${encodeURIComponent(cityName)}&key=${key}`;
  const res = await fetch(url);
  const data = await res.json();

  return NextResponse.json(data);
}
