import React, { useState } from "react";
import axios from "axios";

export default function AlibabaScraperDashboard() {
  const [input, setInput] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const analizar = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:8000/analizar?input=${input}`);
      setData(res.data);
    } catch (err) {
      console.error("Error al analizar:", err);
      alert("Error al analizar el producto.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Alibaba Product Analyzer</h1>
      <div className="flex gap-2 mb-6">
        <input
          className="border p-2 flex-1"
          placeholder="Ingresa un ASIN o URL de Alibaba"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={analizar}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {loading ? "Analizando..." : "Analizar"}
        </button>
      </div>

      {data && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-white rounded shadow p-4 font-bold">ASIN: {data.asin}</div>
          <div className="bg-white rounded shadow p-4 font-bold">BSR: {data.bsr}</div>
          <div className="bg-white rounded shadow p-4 font-bold">Categoría: {data.categoria}</div>
          <div className="bg-white rounded shadow p-4 font-bold">Precio: {data.precio_actual}</div>
          <div className="bg-white rounded shadow p-4 font-bold">Ventas estimadas: {data.ventas_estimadas}</div>
          <div className="bg-white rounded shadow p-4 font-bold">Tus ventas: {data.tus_ventas_mensuales}</div>
          <div className="bg-white rounded shadow p-4 font-bold">Ofertas FBA: {data.ofertas_fba}</div>
          <div className="bg-white rounded shadow p-4 font-bold">Competencia FBA: {data.ofertas_fba_competitivas}</div>
        </div>
      )}

      {data?.vendedores && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Vendedores</h2>
          <div className="space-y-2">
            {data.vendedores.map((v, i) => (
              <div key={i} className="bg-white rounded shadow p-4">
                <div className="font-bold">{v.vendedor}</div>
                <div>{v.precio} - {v.condicion}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}