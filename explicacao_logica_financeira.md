# Estrutura e Lógica Financeira do FluxoMEI

Este documento descreve a fundamentação contábil e a lógica algorítmica utilizada no motor de cálculo do **FluxoMEI** (Painel de Sobrevivência para Microempreendedores Individuais). O objetivo é apresentar ao professor de contabilidade a viabilidade técnica e a aderência teórica da solução ao modelo de **Custeio Variável (Enfoque de Contribuição)** e à legislação do MEI.

---

## 1. O Modelo Contábil: Custeio Variável vs. Absorção

Embora a Demonstração do Resultado do Exercício (DRE) tradicional por *absorção* (formato funcional) seja obrigatória para fins de divulgação externa e fiscal para médias/grandes empresas, ela possui limitações severas para a **tomada de decisões gerenciais internas**.

O FluxoMEI adota o **Custeio Variável (Enfoque de Contribuição)** por duas razões principais:
1. **Comportamento dos Custos:** Separa rigorosamente os gastos em fixos e variáveis, permitindo planejar o faturamento futuro necessário para cobrir a estrutura da empresa.
2. **Apoio à Decisão:** Evita a distorção do lucro operacional causada pela variação de estoques (comum no custeio por absorção) e destaca a **Margem de Contribuição** como indicador principal de saúde financeira.

---

## 2. A Equação Fundamental do Comportamento de Custos

A classificação e acumulação de gastos no sistema baseia-se na regressão linear do comportamento dos custos:

$$Y = a + bX$$

Onde:
*   **$Y$ (Custo Total):** Somatório de todos os gastos da empresa no período.
*   **$a$ (Custo Fixo Total):** Custo de estrutura que não varia de acordo com o nível de atividade. No sistema, é alimentado por categorias como *Aluguel, Contador, Internet, Energia, Pró-labore* e a *Guia DAS*.
*   **$b$ (Custo Variável Unitário / Taxa de Gasto Variável):** Gasto diretamente associado à ocorrência de cada venda. Alimentado por *Mercadoria, Embalagem, Frete, Taxa de Cartão*.
*   **$X$ (Nível de Atividade):** Volume físico de vendas ou faturamento obtido.
*   **$bX$ (Custo Variável Total):** O impacto total dos gastos que sobem e descem junto com as vendas.

---

## 3. O Tratamento Tributário do MEI (Simplificação do ICMS/ISS)

Um dos grandes diferenciais do FluxoMEI é a adequação à realidade tributária do Microempreendedor Individual (MEI) sob o regime do **SIMEI**:

1. **Sem Imposto Proporcional sobre a Venda:** O MEI não paga ICMS ou ISS com base em uma alíquota percentual incidente sobre cada venda (como 12% ou 18% comuns em empresas do Simples Nacional de outras faixas).
2. **Tributação de Valor Fixo (Guia DAS):** O imposto é quitado mensalmente por meio de uma taxa fixa unificada no DAS (Documento de Arrecadação do Simples Nacional). A composição da Guia DAS é:
   *   **INSS (Previdência):** 5% sobre o salário mínimo vigente.
   *   **ICMS (Imposto Estadual - Comércio/Indústria):** R$ 5,00 fixos.
   *   **ISS (Imposto Municipal - Serviços):** R$ 1,00 fixo.
3. **Classificação como Custo Fixo:** Como o valor do ICMS e do ISS do MEI é fixado em lei e pago mensalmente de forma independente de o empreendedor ter faturado R$ 0,00 ou R$ 5.000,00 no mês, **esses impostos são classificados no sistema como Custos Fixos**, integrando a Guia DAS.
4. **Valor de Referência:** O sistema utiliza o valor base da Guia DAS unificada de **R$ 76,60** (referente ao INSS de R$ 70,60 [5% do salário mínimo de R$ 1.412,00] + R$ 5,00 de ICMS + R$ 1,00 de ISS), adicionando-o automaticamente ao ponto de partida dos Custos Fixos mensais.

---

## 4. Estrutura da DRE (Enfoque de Contribuição) no Sistema

A interface do aplicativo renderiza a DRE de forma invisível para o usuário, estruturada na seguinte ordem lógica:

$$\begin{aligned}
& \text{( + ) Faturamento Bruto (Receita Total)} \\
\text{ ( - ) } & \text{Custos Variáveis (Mercadoria + Embalagem + Frete + Taxas)} \\
\hline
\mathbf{(=)\ } & \mathbf{Margem\ de\ Contribui\text{çã}o\ ("Troco\ Real")} \\
\text{ ( - ) } & \text{Custos Fixos Operacionais (Aluguel, Contador, Pr\text{ó}-labore, etc.)} \\
\text{ ( - ) } & \text{Guia DAS MEI (INSS + ICMS Fixo + ISS Fixo)} \\
\hline
\mathbf{(=)\ } & \mathbf{Resultado\ do\ Per\text{í}odo\ (Lucro/Preju\text{í}zo\ Operacional)}
\end{aligned}$$

*   **A Margem de Contribuição ("Troco Real")** indica o quanto as vendas geram de sobra financeira para cobrir a estrutura fixa ($a$) e gerar o lucro operacional líquido.

---

## 5. Dinâmica do Ponto de Equilíbrio (PE) e Indicador de Progresso

O **Ponto de Equilíbrio** é o ponto onde o lucro operacional é igual a zero ($\text{Margem de Contribuição} = \text{Custos Fixos}$). 

Para traduzir esse conceito em uma interface de fácil compreensão para o empreendedor com fadiga cognitiva, o FluxoMEI implementa o **Termômetro do Ponto de Equilíbrio** usando a seguinte lógica matemática de estado:

### A. Cálculo do Valor Restante para o Equilíbrio (Sobrevivência):
O sistema calcula continuamente em tempo real:

$$\text{Falta para Pagar as Contas} = \text{Custos Fixos Totais} - \text{Margem de Contribuição Acumulada}$$

*   Se $\text{Falta} > 0$: O card principal fica em tom cinza/escuro, indicando em reais quanto de Margem de Contribuição ainda é necessária para pagar os custos de estrutura.
*   Se $\text{Falta} \le 0$: A empresa atingiu o ponto de equilíbrio e entrou na zona de lucro. O card principal muda para a cor **Verde Esmeralda** com a mensagem de "Operação no Lucro".

### B. Barra de Progresso do Ponto de Equilíbrio (%):
A barra de progresso visual no relatório DRE não reflete a porcentagem de despesa gasta, mas sim **o quanto o empreendedor caminhou para cobrir seus custos fixos**:

$$\text{Progresso (\%)} = \min\left(100\%, \frac{\text{Margem de Contribuição Acumulada}}{\text{Custos Fixos Totais}} \times 100\right)$$

*   **0% a 99%:** Representa a cobertura parcial da estrutura fixa. O empreendedor sabe exatamente quanto falta (ex: 75% dos custos fixos cobertos).
*   **100%:** Significa que a Margem de Contribuição se igualou ou superou os custos fixos totais (ponto de equilíbrio atingido). A barra de progresso é preenchida por completo e ganha coloração verde.
