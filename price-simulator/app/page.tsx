"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function PriceSimulator() {
  const [produto, setProduto] = useState("");
  const [precoCalculado, setPrecoCalculado] = useState<number | null>(null);
  const [anoCompra, setAnoCompra] = useState("");
  const [estado, setEstado] = useState("bom");
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");
  const [showPrice, setShowPrice] = useState(false);

  useEffect(() => {
    if (precoCalculado !== null) {
      setShowPrice(true);
    }
  }, [precoCalculado]);

  const handleCalcular = async () => {
    setErro("");
    setPrecoCalculado(null);
    setShowPrice(false);
    if (!produto || !anoCompra) {
      setErro("Todos os campos são obrigatórios.");
      return;
    }

    setCarregando(true);
    try {
      const response = await axios.get(
        `http://127.0.0.1:5000/price?query=${encodeURIComponent(
          produto
        )}&anoCompra=${encodeURIComponent(anoCompra)}&estado=${encodeURIComponent(
          estado
        )}`
      );
      // Agora, o frontend verifica a chave "average_price"
      if (response.data.average_price) {
        setPrecoCalculado(response.data.average_price);
      } else {
        setErro("Erro ao obter preço. Tente novamente.");
      }
    } catch (error) {
      setErro("Erro ao calcular preço. Verifique se a API está rodando.");
    }
    setCarregando(false);
  };

  return (
    <>
      {/* Container com fundo azul para header, hero e formulário */}
      <div className="min-h-screen bg-gradient-to-r from-blue-300 to-blue-500">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-10 bg-white bg-opacity-80 backdrop-blur-lg">
          <div className="container mx-auto flex justify-between items-center py-4 px-6">
            <div className="flex items-center space-x-3">
              <img src="/logo.png" alt="Logo" className="h-10" />
              <h1 className="text-2xl font-bold text-blue-800">QuantoVale</h1>
            </div>
            <nav className="space-x-4">
              <a
                href="#sobre"
                className="text-blue-800 hover:text-blue-600 transition-all duration-300 font-medium"
              >
                Sobre
              </a>
              <a
                href="#como-funciona"
                className="text-blue-800 hover:text-blue-600 transition-all duration-300 font-medium"
              >
                Como Funciona
              </a>
              <a
                href="#por-que-usar"
                className="text-blue-800 hover:text-blue-600 transition-all duration-300 font-medium"
              >
                Por que Usar
              </a>
              <a
                href="#contato"
                className="text-blue-800 hover:text-blue-600 transition-all duration-300 font-medium"
              >
                Contato
              </a>
            </nav>
          </div>
        </header>

        {/* Conteúdo Principal (Hero e Formulário) */}
        <main className="pt-20 container mx-auto px-4 pb-32">
          {/* Hero Section */}
          <section className="text-center py-12">
            <h2 className="text-5xl font-extrabold text-white mb-6">
              Descubra o valor do seu produto usado
            </h2>
            <p className="text-xl text-white mb-8">
              Venda de forma consciente e informada
            </p>
          </section>

          {/* Card do Formulário */}
          <section className="max-w-lg mx-auto bg-white bg-opacity-90 p-8 rounded-lg shadow-md transition-all duration-300 mb-12">
            {erro && (
              <p className="text-red-500 text-center mb-4 text-lg">{erro}</p>
            )}

            <div className="mb-6">
              <label className="block text-gray-800 font-semibold text-lg mb-2">
                Produto e Modelo:
              </label>
              <input
                type="text"
                value={produto}
                onChange={(e) => setProduto(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 text-gray-900 text-base transition-all duration-300"
                placeholder="Ex: PlayStation 5"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-800 font-semibold text-lg mb-2">
                Ano de Compra:
              </label>
              <input
                type="number"
                value={anoCompra}
                onChange={(e) => setAnoCompra(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 text-gray-900 text-base transition-all duration-300"
                placeholder="Ex: 2020"
              />
            </div>

            <div className="mb-8">
              <label className="block text-gray-800 font-semibold text-lg mb-2">
                Estado:
              </label>
              <select
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 text-gray-900 text-base transition-all duration-300"
              >
                <option value="novo">Novo</option>
                <option value="bom">Bom</option>
                <option value="aceitável">Aceitável</option>
              </select>
            </div>

            <button
              onClick={handleCalcular}
              disabled={carregando}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 mb-6"
            >
              {carregando && (
                <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
              )}
              <span>
                {carregando ? "Processando..." : "Calcular Preço"}
              </span>
            </button>

            {precoCalculado !== null && !carregando && (
              <p className="text-2xl font-semibold text-center text-green-600 transition-opacity duration-700">
                💵 Preço Estimado: €{Math.round(precoCalculado)}
              </p>
            )}
          </section>
        </main>
      </div>

      {/* Seção Sobre */}
      <div id="sobre" className="bg-white py-12">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-blue-800 mb-4 text-center">
            Sobre
          </h3>
          <p className="text-lg text-gray-800 italic text-center">
            "Antes de venderes, informa-te. O QuantoVale dá-te uma estimativa justa do valor dos teus produtos usados, para que não fiques a perder."
          </p>
        </div>
      </div>

      {/* Seção Como Funciona - Step by Step */}
      <div id="como-funciona" className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-blue-800 mb-8 text-center">
            Como Funciona
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                1
              </div>
              <h4 className="text-xl font-bold text-blue-800 mb-2">
                Insira os Dados
              </h4>
              <p className="text-gray-700">
                Informe as características do seu produto, como modelo, ano de compra e estado.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                2
              </div>
              <h4 className="text-xl font-bold text-blue-800 mb-2">
                Análise de Mercado
              </h4>
              <p className="text-gray-700">
                Coletamos dados de anúncios online e calculamos uma estimativa com base em preços reais.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                3
              </div>
              <h4 className="text-xl font-bold text-blue-800 mb-2">
                Receba a Estimativa
              </h4>
              <p className="text-gray-700">
                Veja o valor estimado e um range de preços para negociar com confiança.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Seção Por que Usar */}
      <div id="por-que-usar" className="bg-white py-12">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-blue-800 mb-4 text-center">
            Por que Usar o QuantoVale?
          </h3>
          <ul className="text-lg text-gray-800 space-y-4 max-w-3xl mx-auto">
            <li>
              <strong>Transparência:</strong> Obtenha uma estimativa baseada em dados reais do mercado.
            </li>
            <li>
              <strong>Confiabilidade:</strong> Nossa análise considera diversos fatores, garantindo um valor justo para o seu produto.
            </li>
            <li>
              <strong>Facilidade:</strong> Em apenas alguns passos, você descobre quanto vale o seu produto e pode negociar com confiança.
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Completo */}
      <footer id="contato" className="bg-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            {/* Coluna 1: Sobre o QuantoVale */}
            <div>
              <h4 className="text-xl font-bold text-blue-800 mb-2">
                QuantoVale
              </h4>
              <p className="text-gray-700">
                Uma ferramenta para ajudar você a descobrir o valor justo dos seus produtos usados.
              </p>
            </div>
            {/* Coluna 2: Navegação */}
            <div>
              <h4 className="text-xl font-bold text-blue-800 mb-2">
                Navegação
              </h4>
              <ul className="text-gray-700">
                <li>
                  <a href="#sobre" className="hover:text-blue-600">Sobre</a>
                </li>
                <li>
                  <a href="#como-funciona" className="hover:text-blue-600">Como Funciona</a>
                </li>
                <li>
                  <a href="#por-que-usar" className="hover:text-blue-600">Por que Usar</a>
                </li>
                <li>
                  <a href="#contato" className="hover:text-blue-600">Contato</a>
                </li>
              </ul>
            </div>
            {/* Coluna 3: Contato */}
            <div>
              <h4 className="text-xl font-bold text-blue-800 mb-2">
                Contato
              </h4>
              <ul className="text-gray-700">
                <li>
                  Email: <a href="mailto:contato@quantovali.pt" className="hover:text-blue-600">contato@quantovali.pt</a>
                </li>
                <li>Telefone: (00) 0000-0000</li>
              </ul>
            </div>
          </div>
          <div className="text-center text-gray-600">
            © 2025 QuantoVale. Todos os direitos reservados.
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap');
        body {
          font-family: 'Poppins', sans-serif;
        }
      `}</style>
    </>
  );
}
