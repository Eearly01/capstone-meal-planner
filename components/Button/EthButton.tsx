import downArrow from "assets/icon-chevron-down.svg";
import ethLogo from "assets/icon-eth-logo.svg";
import Image from "next/image";
import { ButtonHTMLAttributes } from "react";
import styled from "styled-components";

const BorderWrap = styled.span`
  background: linear-gradient(to right, #88aaf1, #efccc1, #b8faf6, #c8b2f4);
  border-radius: .5em;
  display: inline-flex;
  padding: 2px;
`;

const InnerButton = styled.button`
	align-items: center;
	cursor: pointer;
	display: inline-flex;
	font-weight: 2;
	gap: 5px;
	background: #23c687;
  color: white;
  font-size: 20px;
	border: 0;
	border-radius: 0.5em;
	padding: 5px 10px 5px 10px;
`;

const PriceArea = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 80px;
`;

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  label: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export function EthButton({ text, label, ...props }: Props) {
  return (
    <BorderWrap>
      <InnerButton {...props} aria-label={label}>
        {text}
      </InnerButton>
    </BorderWrap>
  );
}
