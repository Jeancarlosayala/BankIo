import styled from "styled-components";

export const CardShadow = styled.div`
  background: white;
  width: 100%;
  height: fit-content;
  padding: ${props => props.padding ? props.padding : '0px'};
  color: #000;
  border-radius: 8px;
  box-shadow: 1px 3px 6px 1px rgba(0, 0, 0, 0.2);
`

export const CardNormal = styled.div`
  background: white;
  width: 100%;
  height: fit-content;
  padding: ${props => props.padding ? props.padding : '0px'};
  color: #000;
  border-radius: 8px;
`

export const HeaderOutline = styled.div`
  border-top: ${props => props.border_top ? props.border_top : 'none'};
  border-bottom: ${props => props.border_bottom ? props.border_bottom : 'none'};
  border-left: ${props => props.border_left ? props.border_left : 'none'};
  border-right: ${props => props.border_right ? props.border_right : 'none'};
  padding: ${props => props.padding ? props.padding : '0px'};
`