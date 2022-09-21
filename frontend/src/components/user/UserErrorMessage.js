import React from 'react';
import styled from 'styled-components';

const message = {
  password1: '',
  password2: '비밀번호가 일치하지 않습니다 :(',
};

const UserErrorMessage = (props) => {
  const { password1, password2 } = props;
  return (
    <Wrapper>
      {password1 && <div>{message.password1}</div>}
      {password2 && <div>{message.password2}</div>}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-left: 20px;
  color: red;
  font-size: 0.9rem;
`;

export default UserErrorMessage;