import React, { useEffect,useState } from "react";
import styled from "styled-components";
import {message} from "antd";
import { InnerLayout } from "../styles/Layouts";
import { useGlobalContext } from "./GlobalContext";
import Form from "./Form";
import IncomeItems from "./IncomeItems";
import { ruppes } from "../utils/icons";
export default function Incomes() {
  const [incomes, setIncomes] = useState([]);
  const [totInc, settotInc] = useState(0);
  const { getIncomes, totalIncome } = useGlobalContext();
  const Incitem = () => {
    return incomes.map((income) => {
      const { _id, title, amount, date, category, description, type } = income;
      return (
        <IncomeItems
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

  useEffect(() => {
    const fetchIncome = async () => {
    
      const res = await getIncomes();
      if (res.success) {
       setIncomes(res.incomes);
       settotInc(totalIncome(res.incomes)) 
      } else {
        message.error(res.error);
      }
    };
    fetchIncome();
  }, []);
  return (
    <IncomesStyled>
      <InnerLayout>
        <h1>Incomes</h1>
        <h2 className="total-income">
          Total Income:{" "}
          <span>
            {ruppes} {totInc}
          </span>
        </h2>
        <div className="income-content">
          <div className="form-container">
            <div className="incomes">
              <Form />
            </div>
            <div className="incomes">
           { Incitem()}
            </div>
          </div>
        </div>
      </InnerLayout>
    </IncomesStyled>
  );
}

const IncomesStyled = styled.div`
  display: flex;
  ovverflow: auto;
  h1 {
    font-size: 1.6rem;
    color: black;
    font-weight: 800;
  }
  .total-income {
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
  .income-content {
    display: flex;
    gap: 2rem;
  }
  .form-container {
    display: flex;
    gap: 2rem;
  }
`;
