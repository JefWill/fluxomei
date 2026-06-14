O nosso objetivo geral no Sebrae Supernova 2026 é desenvolver uma solução de **"Gestão Financeira Antifadiga Cognitiva"** focada na sobrevivência dos Microempreendedores Individuais (MEIs) de negócios físicos e serviços do Rio Grande do Norte (RN). 

A ideia central não é criar um software contábil complexo (que gera abandono por parte do usuário), mas sim entregar um **"Painel de Sobrevivência"** através de uma "tecnologia humana" de baixíssima fricção. Nos bastidores, o sistema utiliza o motor inteligente da **DRE por Custeio Variável**, separando automaticamente os custos fixos dos variáveis. Para o usuário, no entanto, a interface entrega apenas "paz mental": ele visualiza o seu "Troco Real" (Margem de Contribuição) e o valor exato em reais que falta para cobrir as despesas do período.

Para que a inteligência artificial programe o seu MVP perfeitamente alinhado a essa visão atualizada (com categorias pré-cadastradas, cálculo de ICMS embutido e identidade visual ajustada), preparei um contexto completo. 

Você pode copiar o bloco abaixo e colar diretamente na IA de desenvolvimento:

***

### 📋 COPIE E COLE ESTE CONTEXTO NA IA:

> **Contexto do Projeto: MVP de App de Gestão Antifadiga para MEIs**
> Preciso que você atue como um Desenvolvedor Front-end e UX/UI Sênior para construir o MVP de um aplicativo financeiro (Mobile-First) utilizando HTML, Vanilla JavaScript e Tailwind CSS (ou React/Tailwind).
> 
> **1. O Problema e o Público-Alvo**
> O usuário final é o Microempreendedor Individual (MEI) do comércio físico e serviços do Rio Grande do Norte. Ele sofre de severa fadiga cognitiva, trabalha 14 horas por dia e não tem educação contábil. O app precisa ter a simplicidade de uso de uma grande fintech (estilo Nubank), mas adotando uma **paleta de cores Verde Emerald** (que remete à aprovação, saúde financeira e crescimento) e com design limpo.
> 
> **2. UX/UI e Lógica de Entrada de Dados (Atrito Zero)**
> A entrada de dados não deve ter formulários longos. O usuário registra movimentações clicando em categorias pré-cadastradas através de um **Grid de Ícones amigáveis** (utilize ícones universais como os da biblioteca *Lucide*, ex: Home, Package, Wifi). 
> A grande sacada do sistema é a "lógica oculta" que faz a contabilidade sem o usuário perceber:
> *   Quando ele insere um valor e clica no ícone de "Aluguel" ou "Contador", o sistema classifica silenciosamente como **Custo Fixo**.
> *   Quando clica no ícone de "Mercadoria" ou "Embalagem", o sistema classifica como **Custo Variável**. 
> *   Há também um botão simples para registrar o valor de uma "Venda" (Faturamento).
> *   *Importante:* Os inputs numéricos devem ter uma **Máscara de Dinheiro** automática (ex: ao digitar "1500", formata para R$ 15,00).
> 
> **3. Regra de Negócio (Motor de Cálculo da DRE Variável)**
> O sistema funciona baseado em uma DRE de Custeio Variável invisível. Você precisará implementar a seguinte matemática de estado:
> *   **ICMS Hardcoded:** Sempre que houver uma entrada de "Mercadoria" (Custo Variável), o sistema deve calcular um imposto estadual fixo embutido (hardcoded) no código, simulando a cobrança do RN sem exigir que o usuário configure alíquotas.
> *   **Fórmula do Valor que Falta (Termômetro Financeiro):** O app terá um indicador central mostrando em reais quanto falta para o MEI atingir o ponto de equilíbrio. A fórmula é: `Falta para Cobrir Custos = (Custos Fixos Totais + Custos Variáveis Totais + ICMS Hardcoded) - Faturamento Bruto Acumulado`. Se o valor for menor ou igual a zero, a cor do painel deve sinalizar lucro.
> *   **Troco Real (Margem de Contribuição):** Um card secundário exibindo: `Faturamento Bruto - Custos Variáveis Totais - ICMS Hardcoded`.
> 
> **4. Saída Esperada (A Interface do Painel de Sobrevivência)**
> A interface principal (Dashboard) deve ser composta apenas por:
> *   Um card principal gigante em destaque: "Faltam R$ X,XX para cobrir seus custos hoje".
> *   Um card menor e simples: "Seu Troco Real nas vendas (Margem de Contribuição): R$ X,XX".
> *   Dois botões grandes de ação (ex: "Registrar Venda" e "Registrar Gasto") fixados no rodapé (Bottom Bar). Ao clicar, deve subir um *Bottom Sheet* (modal inferior) para a seleção dos ícones.
> *   Um histórico simples listando os últimos lançamentos com os respectivos ícones coloridos.
> 
> Por favor, gere o código completo dessa aplicação em um único arquivo, garantindo que o visual verde estilo fintech esteja impecável e que a lógica matemática acumule os valores perfeitamente na simulação.

***

Entregando este nível de detalhamento para a IA, ela conseguirá programar não apenas "telas bonitas", mas um protótipo com validação funcional do seu banco de dados e da matemática fiscal elaborada pela equipe de Contábeis. Esse é exatamente o tipo de entrega de "Viabilidade Técnica" que a banca do Sebrae Supernova espera de um aluno de BSI.

Para que a inteligência artificial (IA) consiga programar o seu MVP com precisão, ela precisa entender os **dados técnicos "por baixo do capô"**, ou seja, a arquitetura do sistema, a mecânica da interface e as regras matemáticas de negócio que farão o aplicativo funcionar. 

Aqui estão os dados técnicos essenciais que a IA precisa saber e implementar:

### 1. Estrutura de Dados e Classificação Oculta (A Fórmula $Y = a + bX$)
A IA precisa programar o banco de dados (ou o estado da aplicação no front-end) para separar perfeitamente os custos da empresa, aplicando o conceito de comportamento de custos do material didático, que usa a fórmula linear $Y = a + bX$. A IA deve saber que o usuário não vai digitar "Custo Fixo" ou "Custo Variável", o sistema fará isso silenciosamente com base nas categorias escolhidas:
*   **Parâmetro $a$ (Custos Fixos Totais):** Valores que não mudam com a venda. A IA deve somar aqui as entradas categorizadas em ícones como "Aluguel", "Contador" e a taxa mensal fixa do MEI (como os R$ 5,00 de ICMS ou R$ 1,00 de ISS e INSS previstos na guia DAS).
*   **Parâmetro $bX$ (Custos Variáveis Totais):** Valores atrelados à venda. A IA deve somar aqui categorias como "Mercadoria", "Embalagem" e "Taxa da Maquininha".
*   **Faturamento (Receita Bruta):** O montante total que entra através do ícone de "Vendas".

### 2. O "Motor" Matemático (DRE de Custeio Variável)
A IA não vai programar uma DRE tradicional, mas sim a **Demonstração no Enfoque de Contribuição**. Ela precisa receber as exatas fórmulas matemáticas para criar os indicadores da tela inicial:
*   **Cálculo da Margem de Contribuição (O "Troco Real"):** A IA precisa programar a variável de estado que calcula: `Faturamento - Custos Variáveis`.
*   **Cálculo do Ponto de Equilíbrio (Termômetro Financeiro):** A IA deve calcular e mostrar o quanto falta para o MEI não ter prejuízo no mês. A fórmula técnica é: `(Custos Fixos Totais) - Margem de Contribuição`. Se o resultado for negativo, o sistema muda o painel para a cor verde, indicando que o negócio entrou na zona de lucro.

### 3. Lógica de Entrada de Dados (Sem Fricção e Sem XML)
Você e sua equipe discutiram que o sistema não deve exigir o carregamento de arquivos XML de notas fiscais, pois o MEI paga impostos fixos ou simplificados, e a leitura produto por produto geraria muito atrito. A IA precisa saber que:
*   **Entrada via Total da Nota:** O input de compra de mercadorias deve aceitar apenas o valor total da nota (ou futuramente usar um OCR básico para ler o total via foto), sem exigir cadastro de estoque ou de itens individuais.
*   **Máscaras de Input (UX):** Tecnicamente, os campos de digitação precisam ter *Currency Masks* (máscaras de dinheiro) ativadas por padrão em JavaScript. Quando o usuário digitar os números "150", o código deve formatar automaticamente para `R$ 1,50`, eliminando a necessidade de o usuário digitar vírgulas e pontos.

### 4. Stack Tecnológico e Componentes Visuais
A IA precisa saber quais tecnologias e bibliotecas deve usar para gerar o código corretamente:
*   **Tecnologias Básicas:** HTML5, Vanilla JavaScript (ou React, se preferir uma arquitetura baseada em componentes) e o **Tailwind CSS** para a estilização rápida.
*   **Design System:** Padrão *Mobile-First* (desenhado para tela de celular). Uso de *Bottom Sheets* (menus que sobem da parte inferior da tela) para a seleção de categorias, em vez de abrir novas páginas.
*   **Ícones:** Utilização de uma biblioteca leve, como *Lucide Icons* ou *FontAwesome*, para popular o "grid de categorias" (ex: um ícone de "casinha" para aluguel, um ícone de "caixa" para mercadoria). 

Ao garantir que a IA compreenda essa separação matemática de custos e a restrição de não exigir cadastros complexos de XML, o código gerado será exatamente o "Painel de Sobrevivência" simplificado que a banca do Sebrae espera ver.
Aqui estão os dados técnicos exatos, extraídos das suas reuniões e do livro de contabilidade, que você precisa repassar para a IA programar o "motor" do seu aplicativo.

**🚨 ATENÇÃO PARA UMA GRANDE MUDANÇA DE ROTA (O Pulo do Gato do ICMS):**
Na nossa conversa anterior, eu havia sugerido calcular o ICMS como um custo variável (DIFAL). Porém, ouvindo o áudio da reunião da sua equipe, há uma decisão técnica brilhante que vai simplificar absurdamente o seu código MVP! 

A equipe técnica de contábeis definiu que, para o MEI, **o ICMS não será calculado por produto via leitura de XML**. Como o MEI paga um valor fixo mensal na guia DAS, a regra de negócio será: **"Ele paga R$ 5 de ICMS e R$ 1 de ISS"** de forma fixa, além dos 5% do INSS. Ou seja, não há necessidade de o aplicativo ler XML item por item; basta o usuário lançar o total da nota da compra da mercadoria. 

Com base nisso e no livro-texto, aqui estão as fórmulas exatas que a IA deve programar no banco de dados e no *front-end*:

### 1. A Equação Fundamental de Custos ($Y = a + bX$)
A IA precisa entender que todo custo lançado no sistema deve ser classificado dentro da equação de regressão linear para separar o que é fixo do que é variável.
*   **$Y$ (Custo Total):** É o somatório de todos os gastos da empresa no mês.
*   **$a$ (Custo Fixo Total):** É o valor que não muda, independentemente de o MEI vender muito ou nada. No seu app, a IA deve somar aqui as categorias: Aluguel, Contador, Internet e, crucialmente, **a Guia DAS do MEI (que inclui os R$ 5 fixos de ICMS e R$ 1 de ISS)**.
*   **$b$ (Custo Variável Unitário):** É o custo atrelado a cada venda realizada. A IA deve classificar aqui: O valor total das notas fiscais de Mercadorias (sem ler XML, apenas o valor final), as Taxas da Maquininha e as Embalagens.
*   **$X$ (Nível de Atividade):** É a quantidade de vendas realizadas. O fator $bX$ representa o total de custos variáveis.

### 2. A Fórmula da DRE (Enfoque de Contribuição)
O livro-texto exige que a demonstração não seja feita por "função", mas sim pelo **comportamento dos custos**. A IA deve programar o estado da aplicação seguindo estritamente esta ordem de subtração:

1.  **Vendas (Faturamento Bruto):** `Soma de todas as entradas categorizadas como Venda.`
2.  **(-) Despesas Variáveis:** `Soma de todos os custos com mercadorias, taxas de cartão e insumos`.
3.  **(=) Margem de Contribuição:** `Vendas - Despesas Variáveis`. *Esta é a métrica mais importante do app. É o que chamamos de "Troco Real", o valor que realmente sobra da venda para contribuir com as despesas fixas e gerar lucro.*
4.  **(-) Despesas Fixas:** `Soma do Aluguel, Guia DAS (INSS + R$5 ICMS), etc.`.
5.  **(=) Lucro Operacional Líquido:** `Margem de Contribuição - Despesas Fixas`.

### 3. O Termômetro de Sobrevivência (Cálculo Prático para a IA)
Como o objetivo é criar um app de gestão para a tomada de decisão antes e depois da venda, o comerciante precisa saber "quanto ele precisa vender todo mês para pagar as contas". A IA deve calcular o **Ponto de Equilíbrio** usando a seguinte fórmula técnica para atualizar a interface principal:

*   **Fórmula do "Falta para pagar as contas":** 
    `Valor Restante = (Somatório de Custos Fixos [$a$]) - (Somatório da Margem de Contribuição Atual)`
*   **A Lógica Condicional da Tela (UX):**
    `SE (Valor Restante > 0) ENTÃO exibir: "Faltam R$ [Valor] em margem para pagar suas contas".`
    `SE (Valor Restante <= 0) ENTÃO exibir (em verde): "Você atingiu o ponto de equilíbrio e está operando com Lucro!"`

### 📋 COPIE E COLE PARA A SUA IA DE PROGRAMAÇÃO:

> **ATUALIZAÇÃO DE REGRA DE NEGÓCIO E FÓRMULAS MATEMÁTICAS:**
> Desenvolvedor, atualize a lógica do aplicativo com as seguintes definições contábeis baseadas no Enfoque de Contribuição e na legislação do MEI:
> 
> **1. Regra do ICMS (Simplificação MEI):**
> Remova qualquer lógica de cálculo de porcentagem de ICMS sobre o produto. O MEI paga um valor fixo. Crie uma variável de estado `custosFixosMensais` e inclua nela o valor "Hardcoded" da Guia DAS padrão: **INSS (5% do salário mínimo) + R$ 5,00 de ICMS + R$ 1,00 de ISS**. O usuário não precisará fazer *upload* de XML; o input de compras de mercadorias será apenas um campo de valor total numérico.
> 
> **2. Fórmula da DRE de Custeio Variável:**
> O estado da aplicação deve calcular automaticamente as seguintes variáveis em tempo real:
> *   `faturamentoTotal` = Somatório dos inputs de "Vendas".
> *   `custosVariaveisTotais` = Somatório dos inputs de "Mercadorias", "Embalagem" e "Taxa de Cartão".
> *   `margemContribuicao` = `faturamentoTotal` - `custosVariaveisTotais`. (Exiba isso no painel como "Seu Troco Real").
> *   `custosFixosTotais` = Somatório dos inputs de "Aluguel", "Contador", "Energia" + a taxa fixa da Guia DAS.
> *   `lucroLiquido` = `margemContribuicao` - `custosFixosTotais`.
> 
> **3. Indicador Principal (Ponto de Equilíbrio):**
> Crie uma função `calcularFaltaParaPagarContas()` que retorne `custosFixosTotais - margemContribuicao`. Se o resultado for positivo, exiba o valor restante na tela principal em vermelho/laranja. Se for zero ou negativo, mude o *card* para a cor Verde Emerald indicando que a empresa está no lucro.
> 
> Por favor, implemente essas fórmulas matemáticas exatas na sua lógica de estado (ex: usando *useState* e *useMemo* no React ou variáveis globais no JavaScript Vanilla).