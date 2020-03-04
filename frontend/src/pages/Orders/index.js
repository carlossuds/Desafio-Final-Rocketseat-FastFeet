import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GoPlus } from 'react-icons/go';
import SmOrders from '../../components/SeeMore/SmOrders';

import {
  Container,
  Top,
  TableHeaders,
  OrderList,
  OrderItem,
  Status,
  Avatar,
} from './styles';

import api from '../../services/api';

export default function Orders() {
  const [orders, setOrders] = useState([]);

  const [filter, setFilter] = useState('');

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
          onChange={e => setFilter(e.target.value)}
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
        {orders
          .filter(
            order =>
              filter === '' ||
              order.order.product.toLowerCase().match(filter.toLowerCase()),
          )
          .map(order => (
            <OrderItem key={order.order.id}>
              <span>{`#${order.order.id}`}</span>
              <span>{order.recipient.name}</span>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Avatar
                  src={
                    `https://media-exp1.licdn.com/dms/image/C4D03AQEFf9Qn9gz1Vg/profile-displayphoto-shrink_200_200/0?e=1588809600&v=beta&t=ss1l8g1UsbcJkLF6USIuwBTYSsEmg_ptfzJ0lqRnxUw` ||
                    'https://institutogoldenprana.com.br/wp-content/uploads/2015/08/no-avatar-25359d55aa3c93ab3466622fd2ce712d1.jpg'
                  }
                  alt={order.courier.name}
                />
                <span>{order.courier.name}</span>
              </div>
              <span>{order.recipient.city}</span>
              <span>{order.recipient.state}</span>
              <Status order={order.order}>
                <div />
                <strong>
                  {order.order.canceled_at
                    ? 'CANCELADA'
                    : order.order.end_date
                    ? 'ENTREGUE'
                    : order.order.start_date
                    ? 'RETIRADA'
                    : 'PENDENTE'}
                </strong>
              </Status>
              <SmOrders />
            </OrderItem>
          ))}
      </OrderList>
    </Container>
  );
}
