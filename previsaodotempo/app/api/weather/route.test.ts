/**
 * @jest-environment node
 */
import { GET } from "./route";
import { NextRequest } from "next/server";

const mockResponse = {
  results: {
    temp: 31,
    city: "Barrinha, SP",
    description: "Tempo limpo",
  },
};

beforeEach(() => {
  jest.spyOn(global, "fetch").mockResolvedValue({
    json: async () => mockResponse,
  } as Response);
  process.env.chave_hgbrasil_weather = "fake-key";
});

afterEach(() => {
  jest.restoreAllMocks();
});

function createRequest(url: string) {
  return new NextRequest(new URL(url, "http://localhost:3000"));
}

describe("GET /api/weather", () => {
  it("retorna 400 quando city_name não é informado", async () => {
    const res = await GET(createRequest("/api/weather"));
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toBe("city_name é obrigatório");
  });

  it("retorna dados da API quando city_name é informado", async () => {
    const res = await GET(createRequest("/api/weather?city_name=Barrinha,SP"));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.results.city).toBe("Barrinha, SP");
  });

  it("chama a API HG Brasil com os parâmetros corretos", async () => {
    await GET(createRequest("/api/weather?city_name=Sertãozinho,SP"));
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("city_name=Sert%C3%A3ozinho%2CSP")
    );
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("key=fake-key")
    );
  });
});
