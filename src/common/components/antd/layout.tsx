import styled from 'styled-components';

export const VBox = styled.div`
  display: flex;
  flex-direction: column;
`;

export const HBox = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-end;
`;

export const Spacer = styled.div`
  flex-grow: 1;
`;
