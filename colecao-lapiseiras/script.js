 document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-lapiseira');
    const lista = document.getElementById('lista-lapiseiras');
    let lapiseiras = JSON.parse(localStorage.getItem('lapiseiras')) || [];

    // Adicionar nova lapiseira
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const marca = document.getElementById('marca').value;
        const cor = document.getElementById('cor').value;
        const material = document.getElementById('material').value;
        const grafite = parseFloat(document.getElementById('grafite').value);

        const nova = { marca, cor, material, grafite };
        lapiseiras.push(nova);
        localStorage.setItem('lapiseiras', JSON.stringify(lapiseiras));
        form.reset();
        renderizarLapiseiras();
    });

    // Renderizar lista de lapiseiras
    function renderizarLapiseiras(filtradas = lapiseiras) {
        lista.innerHTML = filtradas.map((lapiseira, index) => `
            <div class="lapiseira-card">
                <div>
                    <span class="cor-display" style="background: ${lapiseira.cor}"></span>
                    <strong>${lapiseira.marca}</strong>
                </div>
                <p>Material: ${lapiseira.material}</p>
                <p>Grafite: ${lapiseira.grafite}mm</p>
                <div class="acoes">
                    <button class="editar" onclick="editarLapiseira(${index})">✏️</button>
                    <button onclick="removerLapiseira(${index})">🗑️</button>
                </div>
            </div>
        `).join('');
    }

    // Filtros
    document.getElementById('filtro-marca').addEventListener('input', (e) => {
        const filtro = e.target.value.toLowerCase();
        const filtradas = lapiseiras.filter(l => l.marca.toLowerCase().includes(filtro));
        renderizarLapiseiras(filtradas);
    });

    document.getElementById('filtro-material').addEventListener('input', (e) => {
        const filtro = e.target.value.toLowerCase();
        const filtradas = lapiseiras.filter(l => l.material.toLowerCase().includes(filtro));
        renderizarLapiseiras(filtradas);
    });

    document.getElementById('filtro-grafite').addEventListener('input', (e) => {
        const filtro = parseFloat(e.target.value);
        const filtradas = lapiseiras.filter(l => l.grafite === filtro);
        renderizarLapiseiras(filtradas);
    });

    // Funções globais (para editar/remover)
    window.removerLapiseira = (index) => {
        lapiseiras.splice(index, 1);
        localStorage.setItem('lapiseiras', JSON.stringify(lapiseiras));
        renderizarLapiseiras();
    };

    window.editarLapiseira = (index) => {
        const lapiseira = lapiseiras[index];
        document.getElementById('marca').value = lapiseira.marca;
        document.getElementById('cor').value = lapiseira.cor;
        document.getElementById('material').value = lapiseira.material;
        document.getElementById('grafite').value = lapiseira.grafite;
        removerLapiseira(index); // Remove a antiga para edição
    };

    // Carrega as lapiseiras ao iniciar
    renderizarLapiseiras();
});