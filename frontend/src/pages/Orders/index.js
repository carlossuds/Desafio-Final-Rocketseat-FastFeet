import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GoPlus } from 'react-icons/go';
import { IoIosMore } from 'react-icons/io';
import { Container, Top, TableHeaders, OrderList, OrderItem } from './styles';

import api from '../../services/api';

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function loadOrders() {
      const response = await api.get('/orders');

      setOrders(response.data);
    }
    loadOrders();
  }, []);

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
        {orders.map(order => (
          <OrderItem key={order.order.id}>
            <span>{`#${order.order.id}`}</span>
            <span>{order.recipient.name}</span>
            <span>{order.courier.name}</span>
            <span>{order.recipient.city}</span>
            <span>{order.recipient.state}</span>
            <span>Confirmado</span>
            <IoIosMore size={20} color="#666666" />
          </OrderItem>
        ))}
      </OrderList>
    </Container>
  );
}
