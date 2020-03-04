import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GoPlus } from 'react-icons/go';
import SmCouriers from '../../components/SeeMore/SmCouriers';

import {
  Container,
  Top,
  TableHeaders,
  CourierList,
  CourierItem,
  Avatar,
} from './styles';

import api from '../../services/api';

export default function Couriers() {
  const [couriers, setCouriers] = useState([]);

  const [filter, setFilter] = useState('');

  useEffect(() => {
    async function loadCouriers() {
      const response = await api.get('/couriers');

      setCouriers(response.data);
    }
    loadCouriers();
  }, []);

  return (
    <Container>
      <h1>Gerenciando entregadores</h1>
      <Top>
        <input
          name="busca"
          onChange={e => setFilter(e.target.value)}
          type="text"
          placeholder="Buscar entregador"
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
        <strong>Foto</strong>
        <strong>Nome</strong>
        <strong>Email</strong>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <strong>Ações</strong>
        </div>
      </TableHeaders>

      <CourierList>
        {couriers
          .filter(
            courier =>
              filter === '' ||
              courier.courier.name.toLowerCase().match(filter.toLowerCase()),
          )
          .map(courier => (
            <CourierItem key={courier.courier.id}>
              <span>{`#${courier.courier.id}`}</span>
              <Avatar
                src={
                  `https://media-exp1.licdn.com/dms/image/C4D03AQEFf9Qn9gz1Vg/profile-displayphoto-shrink_200_200/0?e=1588809600&v=beta&t=ss1l8g1UsbcJkLF6USIuwBTYSsEmg_ptfzJ0lqRnxUw` ||
                  'https://institutogoldenprana.com.br/wp-content/uploads/2015/08/no-avatar-25359d55aa3c93ab3466622fd2ce712d1.jpg'
                }
                alt={courier.courier.name}
              />
              <span>{courier.courier.name}</span>
              <span>{courier.courier.email}</span>
              <SmCouriers />
            </CourierItem>
          ))}
      </CourierList>
    </Container>
  );
}
