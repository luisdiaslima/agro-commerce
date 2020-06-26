import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Form, FieldGroup, Field, ItemsGrid } from './style';
import Modal from '../Modal';
import Logo from '../../img/passaro.svg';
import api from '../../config/api';
import mel from '../../img/mel.svg';
import alface from '../../img/alface.svg';
import cenoura from '../../img/cenoura.svg';
import banana from '../../img/banana.svg';
import ervilha from '../../img/ervilha.svg';
import abacate from '../../img/abacate.svg';

export default function Shop(props) {
  const [states, setState] = React.useState([]);
  const [cities, setCity] = React.useState([]);
  const [items, setItem] = React.useState([]);
  const [check, setCheck] = React.useState(false);
  React.useEffect(() => {
    async function getData() {
      const response = await api.get('/api/v1/localidades/estados/');
      setState(response.data);
    }

    getData();
  }, []);

  async function getCities(e) {
    e.persist();
    const event = e.target.value;

    const response = await api.get(
      `/api/v1/localidades/estados/${event}/municipios`
    );
    setCity(response.data);
  }

  const handleClick = (event) => {
    let itensCopy = Array.from(items);
    const itemLi = event.target;
    itemLi.classList.toggle('selected');
    const itemId = itemLi.dataset.id;

    const alredySelected = itensCopy.findIndex((item) => {
      const itemFound = item === itemId;
      return itemFound;
    });

    if (alredySelected >= 0) {
      const filteredItems = itensCopy.filter((item) => {
        const itemIsDifferent = item !== itemId;
        return itemIsDifferent;
      });

      itensCopy = [...filteredItems];
    } else {
      itensCopy.push(itemId);
    }
    setItem(itensCopy);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCheck(true);
    setTimeout(() => {
      window.location = '/';
    }, 3000);
  };

  return (
    <Container>
      <Modal check={check} />
      <header>
        <img src={Logo} />
        <Link to="/">
          <span />
          Voltar
        </Link>
      </header>
      <Form>
        <h1>Montar minha cesta</h1>

        <fieldset>
          <legend>
            <h2>Dados pessoas</h2>
          </legend>

          <FieldGroup>
            <Field>
              <label>Nome</label>
              <input />
            </Field>
            <Field>
              <label>Endereço</label>
              <input />
            </Field>
          </FieldGroup>

          <FieldGroup>
            <Field>
              <label htmlFor="state">State</label>
              <select name="uf" onChange={getCities}>
                <option value="">Selecione um estado</option>
                {states.map((state, index) => (
                  <option value={state.id} key={state.id}>
                    {state.nome}
                  </option>
                ))}
              </select>
              <input type="hidden" name="state" />
            </Field>
            <Field>
              <label>Cidade</label>
              <select name="city">
                <option value="">Selecione uma cidade</option>
                {cities.map((city, index) => (
                  <option value={city.id} key={city.id}>
                    {city.nome}
                  </option>
                ))}
              </select>
              <input type="hidden" name="state" />
            </Field>
          </FieldGroup>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Produtos orgânicos</h2>
            <span>Selecione um ou mais itens abaixo</span>
          </legend>

          <ItemsGrid>
            <li onClick={handleClick} data-id="1">
              <img src={mel} />
              <span>Mel 500g</span>
            </li>
            <li onClick={handleClick} data-id="2">
              <img src={alface} />
              <span>Alface</span>
            </li>
            <li onClick={handleClick} data-id="3">
              <img src={banana} />
              <span>Banana</span>
            </li>
            <li onClick={handleClick} data-id="4">
              <img src={ervilha} />
              <span>Ervilha grão</span>
            </li>
            <li onClick={handleClick} data-id="5">
              <img src={cenoura} />
              <span>Cenoura</span>
            </li>
            <li onClick={handleClick} data-id="6">
              <img src={abacate} />
              <span>Abacate</span>
            </li>

            <input type="hidden" value="" />
          </ItemsGrid>
        </fieldset>

        <button onClick={handleSubmit}>Map</button>
      </Form>
    </Container>
  );
}
