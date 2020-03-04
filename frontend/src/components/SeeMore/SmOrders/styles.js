import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
`;

export const OptionList = styled.div`
  display: ${props => (props.visible ? 'block' : 'none')};

  position: absolute;
  width: 150px;
  z-index: 5;

  left: calc(50% - 75px);
  top: 30px;

  background: #ffffff 0% 0% no-repeat padding-box;
  border: 1px solid #999999;
  border-radius: 4px;
`;

export const Option = styled.div`
  display: flex;
  flex-direction: row;
  color: #999999;
  padding: 10px;

  p {
    margin-left: 5px;
    font-size: 16px;
  }

  &::after {
    content: '';
    position: absolute;
    margin-top: 30px;
    width: 80%;
    border-bottom: 1px solid #ddd;
  }
`;
