import React, { useEffect,useState } from "react";
import styled from "styled-components";
import { InnerLayout } from "../styles/Layouts";
import {message} from "antd"
import { useGlobalContext } from "./GlobalContext";
import ExpenseForm from "./ExpenseForm";
import ExpenseItems from "./IncomeItems";
import { ruppes } from "../utils/icons";
export default function Expenses() {
  const {  getExpense, totalExpense } = useGlobalContext();
  const ExpenseItem = () => {
    return expenses.map((expense) => {
      const { _id, title, amount, date, category, description, type } = expense;
      return (
        <ExpenseItems
          key={_id}
          id={_id}
          amount={amount}
          date={date}
          type={type}
          category={category}
          description={description}
          indicatorColor={"#42AD00"}
          title={title}
        />
      );
    });
  };
  const [expenses, setExpenses] = useState([]);
  const [totExp, settotExp] = useState(0);
  useEffect(() => {
    const fetchIncome = async () => {
    
      const res= await getExpense();
      if (res.success) {
       setExpenses(res.expenses);
       settotExp(totalExpense(res.expenses)) 
      } else {
        message.error(res.error);
      }
    };
    fetchIncome();
  }, []);
  return (
    <ExpensesStyled>
      <InnerLayout>
        <h1>Expenses</h1>
        <h2 className="total-Expense">
          Total Expense:{" "}
          <span>
            {ruppes}
            {totExp}{" "}
          </span>
        </h2>
        <div className="Expense-content">
          <div className="form-container">
            <div className="Expenses">
              <ExpenseForm />
            </div>
            <div className="Expenses">
              { ExpenseItem()}
            </div>
          </div>
        </div>
      </InnerLayout>
    </ExpensesStyled>
  );
}

const ExpensesStyled = styled.div`
  display: flex;
  ovverflow: auto;
  h1 {
    font-size: 1.6rem;
    color: black;
    font-weight: 800;
  }
  .total-Expense {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fcf6f9;
    border: 2px solid #ffffff;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    border-radius: 20px;
    padding: 1rem;
    margin: 1rme 0;
    font-size: 1.2rem;
    color: black;
    font-weight: 800;
    gap: 0.5rem;
    span {
      font-size: 1.5rem;
      color: #42ad00;
      font-weight: 800;
    }
  }
  .Expense-content {
    display: flex;
    gap: 2rem;
  }
  .form-container {
    display: flex;
    gap: 2rem;
  }
`;
