# Projeto_Fokus

Esse projeto é inspirado na técnica Pomodoro, que visa a concentração em tarefas importantes. Dessa forma, concentramo-nos em uma atividade por 25 minutos, por exemplo, e após esse período, é possível pausar por 5 minutos ou optar por uma pausa mais longa de 15 minutos.

O projeto foi fornecido com o HTML e CSS já prontos, para que assim possamos focar apenas na lógica do Javascript. Eu deixei dois arquivos no formato Javascript:
- script.js (feito por mim)
- script_aula.js (feito pelo instrutor)

Assim é possível ver duas possíveis opções de resolução desse curso, além de mais material para futuro estudo e/ou comparação.

Melhorias que decidi emplementar:
 * Troca de modo
   
   Quando trocava de modo(tema) o próximo tema já começava com o cronometro correndo.
   1. Então fiz a lógica para perguntar se realmente quer trocar de tema;
   2. Se sim, a contagem para e o relógio do proximo tema só começa depois do 'click' em começar;
   3. Se sim, o botão para começar também muda de 'Pausar' para 'Começar';
   4. Se não, o relógio contina a contagem no tema atual;
