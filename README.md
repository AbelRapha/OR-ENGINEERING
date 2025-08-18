# Otimizador de Rotas para Engenharia de Transportes

Bem-vindo ao Otimizador de Rotas, uma ferramenta web projetada para simplificar o cálculo de matrizes de distância e tempo de viagem, atendendo especificamente às necessidades de engenheiros de transportes, planejadores logísticos e profissionais da área.

## Vantagens Principais para Engenheiros de Transportes

Esta aplicação foi desenvolvida para otimizar processos complexos e fornecer dados valiosos para a tomada de decisão estratégica.

-   **Eficiência e Agilidade:** Calcule rapidamente matrizes de distância e duração para múltiplos pontos de origem e destino de uma só vez, eliminando a necessidade de cálculos manuais ou consultas individuais em aplicativos de mapa.
-   **Redução de Custos Operacionais:** Ao fornecer dados precisos sobre as rotas mais eficientes, a ferramenta auxilia no planejamento logístico, contribuindo para a redução de custos com combustível, tempo de motorista e manutenção de veículos.
-   **Planejamento Baseado em Dados:** Utilize as matrizes geradas como base para estudos de viabilidade, planejamento de rotas de entrega, localização de centros de distribuição (CDs) e análise de redes de transporte.
-   **Acessibilidade e Facilidade de Uso:** Com uma interface web intuitiva, a ferramenta dispensa a instalação de softwares complexos. Basta ter acesso a um navegador para começar a otimizar suas rotas.
-   **Exportação de Dados Simplificada:** Exporte os resultados diretamente para formatos amplamente utilizados como **Excel (.xlsx)** e **CSV (.csv)**, permitindo análises mais aprofundadas, criação de relatórios e integração com outras ferramentas de BI ou planilhas.

## Como Utilizar a Ferramenta

O processo é simples e direto, dividido em poucas etapas:

1.  **Inserir Endereços:**
    *   No campo **Endereços de Origem**, insira um endereço completo por linha.
    *   No campo **Endereços de Destino**, faça o mesmo. Quanto mais específico o endereço (incluindo cidade e estado), mais preciso será o resultado.

2.  **Configurar Unidades:**
    *   Selecione a **unidade de medida para distância** (Quilômetros ou Metros).
    *   Selecione a **unidade de medida para tempo** (Horas, Minutos ou Segundos).

3.  **Calcular a Matriz:**
    *   Clique no botão **"Calcular Matriz"**. A aplicação irá primeiro converter cada endereço em coordenadas geográficas (geocodificação) e, em seguida, calcular as rotas entre cada par de origem-destino. Uma barra de progresso indicará o andamento.

4.  **Analisar e Exportar os Resultados:**
    *   Após o cálculo, duas tabelas serão exibidas: a **Matriz de Distâncias** e a **Matriz de Duração**.
    *   Utilize as opções de download para exportar os dados no formato desejado (Excel ou CSV) para uso externo.

## Tecnologias Utilizadas

-   **Geocodificação:** [Nominatim API](https://nominatim.org/) (baseada em dados do OpenStreetMap)
-   **Cálculo de Rotas:** [Project OSRM API](http://project-osrm.org/) (Open Source Routing Machine)
-   **Interface:** React, TypeScript, e shadcn/ui