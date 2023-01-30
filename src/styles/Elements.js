import { Link } from "react-router-dom";
import styled from "styled-components";

export const CustomInput = styled.input`
  border: none;
  padding: 10px;
  width: 100%;
  border-radius: 5px;

  &:focus{
    outline: 0;
  }
`

export const LinkButton = styled(Link)`
  background: #bfddff;
  color: #4299fd;
  text-decoration: none;
  padding: 8px;
  width: auto;
  text-align: center;
  border-radius: ${props => props.rounded ? props.rounded : '0px'};
  transition: all ease .2s;

  &:hover{
    background: #4299fd;
    color: #fff;
  }
`

export const LinkText = styled(Link)`
  width: 100%;
  color: ${props => props.color ? props.color : '#000'};
  text-decoration: none;
`

export const SearchButton = styled.button`
  background: none;
  border: none;
  font-size: ${props => props.font_size ? props.font_size : '12px'};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`