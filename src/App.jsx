/*
* CHALLENGE progresso do formulário

* INSTRUÇÕES
Neste desafio sua missão é criar um formulário e seus 4 campos (com controlled inputs),
juntamente com uma barra de progresso que altera-se conforme o usuário preenche os campos.
- Crie também validações para cada campo conforme instruções abaixo.

* BARRA DE PROGRESSO
Para aproveitar estilização já definida, crie:
1º comit
- a barra com um elemento pai chamado .bar-container e seu filho .bar 

* CAMPOS DO FORMULÁRIO:
input - nome completo - válido se digitar no mínimo dois nomes,
input - email - válido se digitar um e-mail,
select - estado civil,
radio - gênero

Para validação de e-mail use a seguinte RegEx: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

* FUNCIONAMENTO
Espera-se que o formulário tenha 4 campos ao todo. Portanto, quando o usuário preencher
o primeiro campo, a barra de progresso deve assumir 25% do tamanho total;
o segundo campo, 50% e assim por diante...

Caso o usuário não tenha definido valores para os elementos de select e radio,
os mesmos não devem ser considerados como preenchidos até então.

Se o usuário preencher um campo e apagar seu valor, este campo deve ser considerado como vazio,
fazendo com que a barra de progresso regrida novamente.

Desabilitar o botão de enviar caso todos os campos não estejam preenchidos/válidos.

Ao enviar, deve-se apresentar um alert javascript com sucesso, limpar todos os campos
do formulário e zerar a barra de progresso novamente.
*/

import { useEffect, useState } from "react";

function App() {
  const [progresso, setProgresso] = useState(0);
  const [habilitarBotaoEnviar, setHabilitarBotaoEnviar] = useState(true);
  const [data, setData] = useState({
    nome: "",
    email: "",
    estadoCivil: "",
    genero: "",
  });

  const validarFormulario = () => {
    const { nome, email, estadoCivil, genero } = data;

    const separarNome = nome.replace(/\s+/g, " ").split(" ");
    const validouNome = separarNome.length >= 2 && separarNome[1] !== "";
    const validouEmail =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      );
    const validouEstadoCivil = estadoCivil !== "";
    const validouGenero = genero !== "";

    const progressoCalculado =
      (validouNome + validouEmail + validouEstadoCivil + validouGenero) * 25;

    setProgresso(progressoCalculado);
    setHabilitarBotaoEnviar(progressoCalculado !== 100);
  };

  useEffect(() => {
    validarFormulario();
  }, [data]);

  const quandoUsuarioDigita = (valorDigitado, tipo) => {
    setData({ ...data, [tipo]: valorDigitado });
  };

  const enviarFormulario = (e) => {
    e.preventDefault();
    alert("Formulário enviado com sucesso!");
    setData({
      nome: "",
      email: "",
      estadoCivil: "",
      genero: "",
    });

    setProgresso(0);
  };

  useEffect(() => {
    validarFormulario();
  }, [data.nome, data.email, data.estadoCivil, data.genero]);

  return (
    <div className="App">
      <h3>desafio fernandev</h3>
      <h1>progresso do formulário</h1>

      <main>
        <div className="bar-container">
          <div className="bar" style={{ width: `${progresso}%` }}></div>
        </div>
        <form onSubmit={enviarFormulario}>
          <div className="form-group">
            <label htmlFor="">Nome Completo</label>
            <input
              placeholder="Digite seu nome!"
              onChange={(e) => quandoUsuarioDigita(e.target.value, "nome")}
            />
          </div>
          <div className="form-group">
            <label htmlFor="">E-mail</label>
            <input
              placeholder="Digite seu email!"
              onChange={(e) => quandoUsuarioDigita(e.target.value, "email")}
            />
          </div>
          <div className="form-group">
            <label htmlFor="">Estado Civil</label>
            <select
              onChange={(e) =>
                quandoUsuarioDigita(e.target.value, "estadoCivil")
              }
            >
              <option value="">- selecione...</option>
              <option value="solteiro">Solteiro</option>
              <option value="casado">Casado</option>
              <option value="divorciado">Divorciado</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="">Gênero</label>
            <div className="radios-container">
              <span>
                <input
                  name="genero"
                  type="radio"
                  value={"masculino"}
                  onChange={(e) =>
                    quandoUsuarioDigita(e.target.value, "genero")
                  }
                />
                Masculino
              </span>
              <span>
                <input
                  name="genero"
                  type="radio"
                  value={"feminino"}
                  onChange={(e) =>
                    quandoUsuarioDigita(e.target.value, "genero")
                  }
                />
                Feminino
              </span>
            </div>
          </div>
          <button disabled={habilitarBotaoEnviar}>Enviar Formulário</button>
        </form>
      </main>
    </div>
  );
}

export default App;
