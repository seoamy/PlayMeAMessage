import styled from "styled-components"
import React from "react"


const Emoji = props => (
  <span
    className="emoji"
    role="img"
    aria-label={props.label ? props.label : ""}
    aria-hidden={props.label ? "false" : "true"}
  >
    {props.symbol}
  </span>
);

const Button = styled("button")`
    border: none;
    background-color: #3E2D2D;
    width: 300px;
    height: 70px;
    border-radius: 50px;
    font-size: 25px;
    font-family: 'Karla', sans-serif;
    box-shadow: 5px 7px 10px #403D3D;
    transition: 0.25s all ease;
    &:hover {
      /* background-color: #; */
      font-size: 27px;
      cursor: pointer
    }
  `;

const Container = styled("div")`
    padding: 20px;
    width: 100%;
    color: black;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `;


const Title = styled("div")`
      font-weight: 1000;
      font-family: 'Karla', sans-serif;
      color: black;
      font-size: 48px;
      /* padding-top: 5px; */
      /* padding-top: 25px; */
      padding-bottom: 3vh;
  `;

const Text = styled("div")`
    font-family: "Open Sans";
    font-size: 16px;
    width: 35%;
    padding-bottom: 30px;
    text-align: center;
    color: white;
  `;

const InputTitle = styled("div")`
  font-family: "Karla", sans-serif;
  font-size: 18px;
  color: white;
  padding-bottom: 1vh;

`;

const Input = styled("input")`
  height: 25px;
  width: 100%;
  font-size: 18px;
  border-radius: 1vh;
  border: none;
  box-shadow: 2px 4px 10px #403D3D;
  margin-bottom: 2.5vh;
`;

export { Emoji, Button, Container, Title, Text, InputTitle, Input }