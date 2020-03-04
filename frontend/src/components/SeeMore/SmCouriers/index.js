import React, { useState } from 'react';
import { IoIosMore } from 'react-icons/io';
import { FaPen, FaTrash } from 'react-icons/fa';

import { Container, OptionList, Option } from './styles';

export default function SeeMore() {
  const [visible, setVisible] = useState(false);

  return (
    <Container id="seemore">
      <button
        onClick={() => setVisible(!visible)}
        type="button"
        style={{ background: 'none', border: 'none', position: 'relative' }}
      >
        <IoIosMore size={20} color="##C6C6C6" />
      </button>
      <OptionList visible={visible}>
        <Option>
          <FaPen color="#4D85EE" />
          <p>Editar</p>
        </Option>
        <Option>
          <FaTrash color="#DE3B3B" />
          <p>Excluir</p>
        </Option>
      </OptionList>
    </Container>
  );
}
