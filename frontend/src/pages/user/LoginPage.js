import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../../features/user/userActions';
import { confirmError } from '../../features/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import {
  Wrapper,
  UserWrapper,
  UserForm,
  SubmitButton,
  LabelContainer,
} from '../../styles/user/UserStyle';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, userInfo, error } = useSelector((state) => state.user);
  useEffect(() => {
    if (userInfo) {
      navigate('/index', { replace: true });
    }
  }, [navigate, userInfo]);
  useEffect(() => {
    if (error) {
      alert(JSON.stringify(error));
      dispatch(confirmError());
    }
  }, [error]);
  const [loginInputs, setLoginInputs] = useState({
    email: '',
    password: '',
  });
  const inputChangeHandler = (e) => {
    setLoginInputs({
      ...loginInputs,
      [e.target.id]: e.target.value,
    });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(userLogin(loginInputs));
  };
  return (
    <Wrapper>
      <img
        src="https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1602174804-bloomscape_money-tree_stone.jpg"
        alt="login-img"
      />
      <UserWrapper>
        <div className="logo">
          <img src="/assets/img/plant.png" alt="logo-img" />
          Planty
        </div>
        <UserForm onSubmit={submitHandler}>
          <LabelContainer>
            <label htmlFor="email">이메일</label>
          </LabelContainer>
          <input
            type="text"
            id="email"
            onChange={inputChangeHandler}
            placeholder="ex) user@example.com"
          />
          <LabelContainer>
            <label htmlFor="password">비밀번호</label>
          </LabelContainer>
          <input
            type="password"
            id="password"
            onChange={inputChangeHandler}
            placeholder="비밀번호를 입력해주세요. (8자 이상 문자+숫자+특수기호)"
          />
          <div className="checkbox-div">
            <input type="checkbox" id="remember" />
            <label htmlFor="remember">아이디 기억하기</label>
          </div>
          <SubmitButton disabled={loading}>로그인</SubmitButton>
          <div className="option-div">
            <Link to="">비밀번호 찾기</Link>
            <Link to="/register">회원가입</Link>
            <Link to={-1}>뒤로가기</Link>
          </div>
        </UserForm>
      </UserWrapper>
    </Wrapper>
  );
};

export default LoginPage;
