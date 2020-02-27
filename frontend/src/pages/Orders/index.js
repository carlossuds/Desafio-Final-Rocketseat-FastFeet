import React from 'react';
import { Link } from 'react-router-dom';
import { GoPlus } from 'react-icons/go';
import { IoIosMore } from 'react-icons/io';
import { Container, Top, TableHeaders, OrderList, OrderItem } from './styles';

export default function Orders() {
  return (
    <Container>
      <h1>Gerenciando encomendas</h1>
      <Top>
        <input
          name="busca"
          onChange={e => e.target.value}
          type="text"
          placeholder="Buscar encomenda"
        />

        <Link to="/cadastro">
          <button type="submit">
            <GoPlus size={20} />
            CADASTRAR
          </button>
        </Link>
      </Top>

      <TableHeaders>
        <strong>ID</strong>
        <strong>Destinatário</strong>
        <strong>Entregador</strong>
        <strong>Cidade</strong>
        <strong>Estado</strong>
        <strong>Status</strong>
        <strong>Ações</strong>
      </TableHeaders>

      <OrderList>
        <OrderItem>
          <span>#01</span>
          <span>Laura Caetano</span>
          <span>Carlos Suds</span>
          <span>Recife</span>
          <span>Pernambuco</span>
          <span>Confirmado</span>
          <IoIosMore size={20} color="#666666" />
        </OrderItem>
        <OrderItem>
          <span>#01</span>
          <span>Laura Caetano</span>
          <span>Carlos Suds</span>
          <span>Recife</span>
          <span>Pernambuco</span>
          <span>Confirmado</span>
          <IoIosMore size={20} color="#666666" />
        </OrderItem>
        <OrderItem>
          <span>#01</span>
          <span>Laura Caetano</span>
          <span>Carlos Suds</span>
          <span>Recife</span>
          <span>Pernambuco</span>
          <span>Confirmado</span>
          <IoIosMore size={20} color="#666666" />
        </OrderItem>
        <OrderItem>
          <span>#01</span>
          <span>Laura Caetano</span>
          <span>Carlos Suds</span>
          <span>Recife</span>
          <span>Pernambuco</span>
          <span>Confirmado</span>
          <IoIosMore size={20} color="#666666" />
        </OrderItem>
      </OrderList>
    </Container>
  );
}
