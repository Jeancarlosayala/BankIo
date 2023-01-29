import styled from "styled-components";

export const FlexCenter = styled.div`
  display: flex;
  justify-content: ${props => props.content ? props.content : 'initial'};
  align-items: ${props => props.items ? props.items : 'initial'};
  flex-direction: ${props => props.direction ? props.direction : 'column'};
  margin-bottom: ${props => props.margin_bottom ? props.margin_bottom : '0'};
  margin-top: ${props => props.margin_top ? props.margin_top : '0'};
  gap: ${props => props.gap ? props.gap : '0'};
  width: 100%;
  border-bottom: ${props => props.border_bottom ? props.border_bottom : 'none'};
  border-radius: ${props => props.rounded ? props.rounded : '0px'};
  padding: ${props => props.padding ? props.padding : '0px'};

  &:nth-last-child(1){
    border: none;
  }
`