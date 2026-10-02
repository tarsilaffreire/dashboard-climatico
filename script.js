const inputCidade = document.querySelector("#cidade");
const botaoBuscar = document.querySelector("#buscar");

async function buscarClima() {

    const cidadeDigitada = inputCidade.value.trim();

    if (cidadeDigitada === "") {
        alert("Digite uma cidade.");
        return;
    }

    const respostaCidade = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cidadeDigitada)}&count=1&language=pt&format=json`
    );

    const dadosCidade = await respostaCidade.json();

    if (!dadosCidade.results || dadosCidade.results.length === 0) {
        alert("Cidade não encontrada.");
        return;
    }

    const cidade = dadosCidade.results[0];

    const latitude = cidade.latitude;
    const longitude = cidade.longitude;

    const respostaClima = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m&timezone=auto`
    );

    const dadosClima = await respostaClima.json();

    const temperatura = dadosClima.current.temperature_2m;
    const umidade = dadosClima.current.relative_humidity_2m;
    const vento = dadosClima.current.wind_speed_10m;

    document.querySelector("#nome-cidade").textContent = cidade.name;
    document.querySelector("#temperatura").textContent = temperatura;
    document.querySelector("#umidade").textContent = umidade + "%";
    document.querySelector("#vento").textContent = vento + " km/h";
}

botaoBuscar.addEventListener("click", buscarClima);