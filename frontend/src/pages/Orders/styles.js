import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px 120px;
`;

export const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  input {
    background: rgba(255, 255, 255, 0.7);
    border: 1px solid lightgray;
    border-radius: 5px;
    height: 44px;
    width: 237px;
    padding: 0 15px;
    color: ${darken(0.35, 'darkgray')};
    margin: 20px 10px 10px 0;

    &::placeholder {
      color: darkgray;
    }
  }

  button {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 15px;
    height: 36px;
    width: 142px;
    background: #7d40e7;
    font-weight: bold;
    color: #fff;
    border: 0;
    border-radius: 4px;
    font-size: 14px;
    transition: 0.2s;
    margin-right: 15px;
    &:hover {
      background: ${darken(0.03, '#7d40e7')};
    }
  }
`;

export const TableHeaders = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 30px;

  strong {
    font-size: 16px;
  }
`;

export const OrderList = styled.ul`
  display: flex;
  flex-direction: column;
`;

export const OrderItem = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 20px 30px;
  background: white;
  border-radius: 4px;
  margin-bottom: 25px;

  span {
    color: #666666;
    font-size: 16px;
  }
`;
