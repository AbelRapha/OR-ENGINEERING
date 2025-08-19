# 🚚 Otimizador de Rotas para Engenharia de Transportes

Bem-vindo ao **OR Engineering**, uma ferramenta web projetada para simplificar o cálculo de matrizes de distância e tempo de viagem, atendendo especificamente às necessidades de engenheiros de transportes, planejadores logísticos e profissionais da área.

## ✨ Vantagens Principais

Esta aplicação foi desenvolvida para otimizar processos complexos e fornecer dados valiosos para a tomada de decisão estratégica.

-   **🚀 Eficiência e Agilidade:** Calcule rapidamente matrizes de distância e duração para múltiplos pontos de origem e destino de uma só vez, eliminando a necessidade de cálculos manuais.
-   **💰 Redução de Custos Operacionais:** Planeje rotas mais eficientes e contribua para a redução de custos com combustível, tempo de motorista e manutenção de veículos.
-   **📊 Planejamento Baseado em Dados:** Utilize as matrizes geradas como base para estudos de viabilidade, planejamento de rotas de entrega, localização de centros de distribuição (CDs) e análise de redes de transporte.
-   **🌐 Acessibilidade e Facilidade de Uso:** Com uma interface web intuitiva, a ferramenta dispensa a instalação de softwares complexos. Basta um navegador para começar.
-   **📄 Exportação Simplificada:** Exporte os resultados diretamente para **Excel (.xlsx)** e **CSV (.csv)**, permitindo análises aprofundadas e integração com outras ferramentas.

## 🛠️ Como Utilizar a Ferramenta

O processo é simples e direto:

1.  **📍 Inserir Endereços:**
    *   Nos campos de **Origem** e **Destino**, insira um endereço completo por linha.
    *   _Dica:_ Quanto mais específico o endereço (incluindo cidade e estado), mais preciso será o resultado.

2.  **⚙️ Configurar Unidades:**
    *   Selecione a unidade de medida para **distância** (km/m).
    *   Selecione a unidade de medida para **tempo** (h/min/s).

3.  **🧮 Calcular a Matriz:**
    *   Clique em **"Calcular Matriz"**. A aplicação irá geocodificar os endereços e, em seguida, calcular as rotas. Uma barra de progresso indicará o andamento.

4.  **📥 Analisar e Exportar:**
    *   Após o cálculo, as matrizes de **Distância** e **Duração** serão exibidas.
    *   Use as opções de download para exportar os dados no formato desejado.

## 🚀 Rodando Localmente

Para executar este projeto em seu ambiente de desenvolvimento, siga os passos abaixo:

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git
    cd SEU_REPOSITORIO
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```
    _ou, se preferir usar o Yarn:_
    ```bash
    yarn install
    ```

3.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

4.  **Abra no navegador:**
    Acesse `http://localhost:5173` (ou a porta indicada no seu terminal) para ver a aplicação rodando.

## ☁️ Deploy na Vercel

Fazer o deploy desta aplicação na Vercel é um processo rápido e gratuito.

1.  **Crie uma conta na Vercel:**
    Acesse [vercel.com](https://vercel.com) e crie uma conta (você pode usar sua conta do GitHub, GitLab ou Bitbucket).

2.  **Importe o Projeto:**
    *   No seu dashboard da Vercel, clique em **"Add New..."** e selecione **"Project"**.
    *   Importe o repositório do Git onde você hospedou o projeto.

3.  **Configure o Deploy:**
    *   A Vercel detectará automaticamente que é um projeto Vite e preencherá as configurações de build.
    *   **Framework Preset:** `Vite`
    *   **Build Command:** `npm run build`
    *   **Output Directory:** `dist`
    *   Nenhuma variável de ambiente é necessária para este projeto.

4.  **Clique em "Deploy":**
    Aguarde alguns instantes e sua aplicação estará online, pronta para ser compartilhada!

## 💻 Tecnologias Utilizadas

-   **Geocodificação:** [Nominatim API](https://nominatim.org/) (OpenStreetMap)
-   **Cálculo de Rotas:** [Project OSRM API](http://project-osrm.org/)
-   **Interface:** React, TypeScript, Vite, Tailwind CSS e shadcn/ui