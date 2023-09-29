document.addEventListener("DOMContentLoaded", function () {
    const loadDataButton = document.getElementById("loadData");
    const jsonDataParagraph = document.getElementById("jsonData");

    loadDataButton.addEventListener("click", function () {
        fetch("/data.json")
            .then((response) => response.json())
            .then((data) => {
                jsonDataParagraph.textContent = `Dados recebidos: ${data.message}`;
            })
            .catch((error) => {
                console.error("Erro na solicitação AJAX:", error);
            });
    });
});
