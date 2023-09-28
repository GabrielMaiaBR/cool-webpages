document.addEventListener("DOMContentLoaded", function () {
    const loadDataButton = document.getElementById("loadData");
    const jsonDataParagraph = document.getElementById("jsonData");

    // Event listener para o botão de carregar dados JSON
    loadDataButton.addEventListener("click", function () {
        // Realizar uma solicitação AJAX
        fetch("/data.json") // Rota para dados JSON
            .then((response) => response.json())
            .then((data) => {
                // Atualizar o conteúdo do parágrafo com os dados JSON
                jsonDataParagraph.textContent = `Dados recebidos: ${data.message}`;
            })
            .catch((error) => {
                console.error("Erro na solicitação AJAX:", error);
            });
    });
});
