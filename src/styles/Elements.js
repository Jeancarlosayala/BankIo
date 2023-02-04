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

export const Input = styled.input`
  border: ${props => props.border ? props.border : 'none'};
  padding: ${props => props.padding ? props.padding : '0px'};
  width: ${props => props.width ? props.width : '100%'};
  font-size: ${props => props.font_size ? props.font_size : '12px'};
  border-radius: ${props => props.rounded ? props.rounded : '0px'};
  margin: ${props => props.margin ? props.margin : '0px'};

  &::-webkit-inner-spin-button, 
  &::-webkit-outer-spin-button { 
      -webkit-appearance: none;
      appearance: none; 
  }

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
  font-family: 'Avenir';

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

export const CustomButton = styled.button`
  background: ${props => props.background ? props.background : '#bfddff'};
  color: ${props => props.color ? props.color : '#4299fd'};
  text-decoration: none;
  padding: ${props => props.padding ? props.padding : '8px'};
  width: ${props => props.width ? props.width : 'auto'};
  text-align: center;
  border-radius: ${props => props.rounded ? props.rounded : '0px'};
  border: ${props => props.border ? props.border : 'none'};
  transition: all ease .2s;
  font-family: 'Avenir';
  margin: ${props => props.margin ? props.margin : '0px'};
  cursor: pointer;
  z-index: 1;

  &:hover{
    background: ${props => props.background_hover ? props.background_hover : '#4299fd'};
    color: ${props => props.color_hover ? props.color_hover : '#fff'};
  }
`