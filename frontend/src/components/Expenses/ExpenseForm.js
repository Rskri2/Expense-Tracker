import React, {  useState } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useGlobalContext } from "../../contexts/GlobalContext";
import Button from "../Button/Button";
import { plus } from "../../utils/icons";
export default function ExpenseForm() {
  const { addExpense,getExpense} = useGlobalContext();
  
  const [inputState, setInputState] = useState({
    title: "",
    amount: "",
    date: "",
    category: "",
    description: "",
  });
  const { title, amount, description, date, category } = inputState;
  const handleInput = name => (e) => {
    
    setInputState({ ...inputState, [name]: e.target.value });
  };
  const handleSubmit = e => {
    e.preventDefault();
    addExpense(inputState);
    setInputState({
      title: "",
      amount: "",
      date: "",
      category: "",
      description: ""
    })
     getExpense();
  };
  return (
    <ExpenseFormStyled onSubmit={handleSubmit}>
      <div className="input-control" >
        <input
          type="text"
          value={title}
          name={"title"}
          placeholder="Expense Title"
          onChange={handleInput("title")}
        />
      </div>
      <div className="input-control">
        <input
          type="amount"
          value={amount}
          name={"amount"}
          placeholder="Expense Amount"
          onChange={handleInput("amount")}
        />
      </div>
      <div className="input-control">
        <DatePicker
          id="id"
          placeholderText="Enter A Date"
          selected={date}
          dateFormat="dd/MM/yyyy"
          onChange={(date) => {
            setInputState({ ...inputState, date: date });
          }}
        />
      </div>
      <div className="selects input-control">
        <select
          required
          value={category}
          name="category"
          id="category"
          onChange={handleInput("category")}
        >
          <option value="" disabled>
            Select option
          </option>
          <option value="education">Education</option>
          <option value="groceries">Groceries</option>
          <option value="health">Health</option>
          <option value="subscriptions">Subscriptions</option>
          <option value="takeaways">Takeaways</option>
          <option value="clothing">Clothing</option>
          <option value="travelling">Travelling</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div className="input-control">
        <textarea
          value={description}
          name="description"
          id="description"
          rows="4"
          cols="30"
          placeholder="Enter the description here"
          onChange={handleInput("description")}
        ></textarea>
      </div>
      <div className="submit-btn">
        <Button name={"Add Expense"} 
        icon={plus}
        bPad = {`.8rem 1.6rem`}
        bg={`color-accent:#F56692`}
        color={`#fff`}
        bRad={'30px'}
        hColor={'red'}
      
        />
      </div>
    </ExpenseFormStyled>
  );
}

const ExpenseFormStyled = styled.form`
  display:flex;
  flex-direction:column;
  gap:2rem;
  input, textarea, select{
    font-family:inherit;
    font-size:0.9rem;
    outline:none;
    border:none;
    padding:.5rem 1rem;
    border-radius:5px;
    border: 2px solid #fff;
    background:transparent;
    resize:none;
    box-shadow:0px 1px 15px rgba(0,0,0,0.06);
    color:rgba(34,34,96,0.9);
    &::placeholder{
      color:rgba(34,34,96,0.4);
    }
    .input-control{
      input{
        width:100%;
      }
    }
    .selects{
      display:flex;
      justify-content:flex-end;
      select{
        color:rgba(34, 34, 96, 0.4);
        &:focus, &:active{
          color: rgba(34,34,96,1)
        }
      }
      option{
         rgba(34,34,96,0.4);
      }
    }
  }
  .submit-btn{
    button{
      box-shadow:0px 1px 15px rgba(0,0,0,0.6);
       background-color:red;
      &:hover{
        background:#42AD00 !important;
      }
    }
    }
`;
