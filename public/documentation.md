# Documentação Técnica: OR Engineering

## 1. Introdução ao Otimizador de Rotas

O OR Engineering é uma ferramenta web especializada no cálculo de matrizes de distância e duração (tempo de viagem) entre múltiplos pontos de origem e destino. Desenvolvida com foco em Pesquisa Operacional (PO) e Engenharia de Transportes, ela utiliza APIs de roteamento de código aberto para fornecer dados precisos e estruturados, essenciais para a tomada de decisão logística.

## 2. Metodologia de Cálculo

A precisão dos resultados é garantida pela combinação de geocodificação robusta e algoritmos de roteamento de rede.

### 2.1. Geocodificação (Nominatim API)

A conversão de endereços textuais em coordenadas geográficas (Latitude e Longitude) é realizada pela API Nominatim, baseada no OpenStreetMap.

*   **Entrada:** Endereço completo (ex: "Av. Paulista, 1578, São Paulo, SP").
*   **Saída:** Coordenadas WGS 84.

### 2.2. Roteamento e Matriz (OSRM API)

O cálculo das rotas e a geração das matrizes de custo (distância e duração) são feitos pelo Project OSRM (Open Source Routing Machine). O OSRM utiliza o algoritmo de Dijkstra, otimizado para redes de transporte, para encontrar o caminho mais rápido entre os nós.

*   **Distância:** Retornada em metros (m).
*   **Duração:** Retornada em segundos (s).
*   **Modo de Transporte:** Dirigindo (Driving).

## 3. Funcionalidades do Motor OR

O sistema oferece duas principais formas de entrada de dados:

### 3.1. Geocodificação de Endereços

Permite que o usuário insira listas de endereços de origem e destino. O sistema realiza a geocodificação em lote antes de calcular a matriz.

### 3.2. Lote de Coordenadas

Ideal para usuários que já possuem dados geográficos. Esta funcionalidade suporta:

*   **Sistemas de Coordenadas (Datums):** WGS 84, SIRGAS 2000, SAD 69, Córrego Alegre.
*   **Formatos de Entrada:** Graus Decimais (DD), Graus, Minutos, Segundos (DMS) e Radianos.

O sistema converte automaticamente todos os datums de entrada para WGS 84 antes de enviar as requisições de roteamento.

## 4. Exportação de Dados

Os resultados são exibidos em tabelas claras e podem ser exportados para análise externa:

*   **Excel (.xlsx):** Formato ideal para relatórios e integração com planilhas.
*   **CSV (.csv):** Formato universal para importação em softwares de análise de dados e GIS.

## 5. Aplicações em Engenharia de Transportes

As matrizes geradas são cruciais para:

1.  **Planejamento de Rotas:** Otimização de frotas e sequenciamento de entregas (Problema do Caixeiro Viajante - TSP).
2.  **Localização de Instalações:** Determinação do melhor local para centros de distribuição (CDs) ou armazéns, minimizando custos de transporte.
3.  **Análise de Acessibilidade:** Estudos de tempo de viagem e distância para avaliar a cobertura de serviços.