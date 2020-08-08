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
    background-color: #FF6D90;
    width: 300px;
    height: 70px;
    border-radius: 50px;
    font-size: 25px;
    box-shadow: 5px 7px 3px #8888;
    transition: 0.25s all ease;
    &:hover {
      background-color: #FF4A76;
      font-size: 27px;
      cursor: pointer
    }
  `;

const Container = styled("div")`
    padding: 20px;
    width: 50%;
    color: black;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `;


const Title = styled("div")`
      font-weight: 800;
      font-family: 'Poppins', sans-serif;
      color: black;
      font-size: 40px;
      padding: 20px;
  `;

const Text = styled("div")`
    font-family: "Open Sans";
    font-size: 16px;
    width: 70%;
    padding-bottom: 30px;
    text-align: center;
  `;


const Input = styled("input")`
  height: 25px;
  width: 100%;
  font-size: 20px;
`;

export { Emoji, Button, Container, Title, Text, Input }