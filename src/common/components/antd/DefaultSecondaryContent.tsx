import styled from 'styled-components';

export default styled.div`
  flex: 1;
  width: 100%;
  min-height: 0; // important to not overflow flex container when browser height is reduced
  padding: ${p => p.theme.layout.main.margin / 2}px;
  overflow: auto;
`;
