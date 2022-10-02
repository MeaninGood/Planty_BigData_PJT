import styled from 'styled-components';

export const DictionaryTagWrapper = styled.div`
  margin-top: 50px;
  & button + button {
    margin-left: 8px;
  }
`;

export const DictionaryTagButtonWrapper = styled.button`
  background-color: transparent;
  padding: 6px 16px;
  border: 1px solid #a0a0a0;
  border-radius: 24px;
  font-size: 16px;
  letter-spacing: -1px;
  color: #6d6d6d;
`;