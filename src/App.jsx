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

import { useState } from "react";

function App() {
  const [progresso, setProgresso] = useState(0);
  const [data, setData] = useState({
    nome: "",
    email: "",
    estadoCivil: "",
    genero: "",
  });

  const quandoUsuarioDigita = (valorDigitado, tipo) => {
    if (tipo == "nome") {
      setData({ ...data, nome: valorDigitado });
    }
    if (tipo == "email") {
      setData({ ...data, email: valorDigitado });
    }
    if (tipo == "estadoCivil") {
      setData({ ...data, estadoCivil: valorDigitado });
    }
    if (tipo == "genero") {
      setData({ ...data, genero: valorDigitado });
    }
  };

  const enviarFormuladio = (e) => {
    e.preventDefault();
    console.log(data);
  };

  return (
    <div className="App">
      <h3>desafio fernandev</h3>
      <h1>progresso do formulário</h1>

      <main>
        <div className="bar-container">
          <div className="bar" style={{ width: `${progresso}%` }}></div>
        </div>
        <form onSubmit={enviarFormuladio}>
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
          <button>Enviar Formulário</button>
        </form>
      </main>
    </div>
  );
}

export default App;
