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

export const Status = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 110px;
  height: 25px;
  padding: 5px;
  border-radius: 12px;

  background-color: ${props => {
    if (props.order.canceled_at) return '#FAB0B0';
    else if (props.order.end_date) return '#DFF0DF';
    else if (props.order.start_date) return '#BAD2FF';
    else return '#F0F0DF';
  }};

  div {
    height: 10px;
    width: 10px;
    border-radius: 50%;
    background-color: ${props => {
      if (props.order.canceled_at) return '#DE3B3B';
      else if (props.order.end_date) return '#2CA42B';
      else if (props.order.start_date) return '#4D85EE';
      else return '#C1BC35';
    }};
  }

  strong {
    color: ${props => {
      if (props.order.canceled_at) return '#DE3B3B';
      else if (props.order.end_date) return '#2CA42B';
      else if (props.order.start_date) return '#4D85EE';
      else return '#C1BC35';
    }};
  }
`;

export const ShowPlus = styled.div`
  position: absolute;
  width: 260px;
  left: calc(50% - 130px);
  top: calc(100% + 30px);
  background: rgba(0, 0, 0, 0.6);
  border-radius: 4px;
  padding: 15px 5px;
  border: 1px solid black;
  display: ${props => (props.visible ? 'block' : 'none')};
`;
