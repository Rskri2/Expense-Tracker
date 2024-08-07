import React, { useEffect,useState } from "react";
import styled from "styled-components";
import {message}from "antd"
import { InnerLayout } from "../styles/Layouts";
import Chart from "./Chart";
import { useGlobalContext } from "./GlobalContext";
import { ruppes } from "../utils/icons";
import History from './History'
export default function Dashboard() {
  const {
    totalIncome,
    totalExpense,
    totalBalance,
    getIncomes,
    getExpense,
  } = useGlobalContext();
  message.config({
    duration:2
  })
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [totInc, settotInc] = useState(0);
  const [totExp, settotExp] = useState(0);
  const [totBal, settotBal] = useState(0);
  useEffect(() => {
    const fetchIncome = async () => {
    
      const res = await getIncomes();
      const res2 = await getExpense();
      if (res.success && res2.success) {
       setIncomes(res.incomes);
       setExpenses(res2.expenses);
       settotInc(totalIncome(res.incomes)) 
       settotExp(totalExpense(res.expenses)) 
       settotBal(totalBalance(totInc, totExp))
      } else {
        message.error(res.error);
      }
    };
    fetchIncome();
  }, []);
  return (
    <DashboardStyled>
      <InnerLayout>
        <h1>All Transactions</h1>
        <div className="stats-con">
          <div className="chart-con">
            <Chart incomes={incomes} expenses={expenses}/>
            <div className="amount-con">
              <div className="income">
                <h2>Total Income</h2>
                <p>
                  {ruppes}
                  {totInc}
                </p>
              </div>
              <div className="expense">
                <h2>Total Expense</h2>
                <p>
                  {ruppes}
                  {totExp}
                </p>
              </div>
              <div className="balance_box">
                <div className="balance">
                  <h2>Total Balance</h2>
                  <p>
                    {ruppes}
                    {totBal}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="history-con">
            <History incomes={incomes} expenses={expenses} />
            <div className="h2 salary-title">
              Min<span className="heading">Salary</span>Max
            </div>
            <div className="salary-item">
              <p>
                {incomes.length > 0
                  ? Math.min(...incomes.map((item) => item.amount))
                  : 0}
              </p>
              <p>
                {incomes.length > 0
                  ? Math.max(...incomes.map((item) => item.amount))
                  : 0}
              </p>
            </div>
            <div className="h2 salary-title">
              Min<span className="heading">Expense</span>Max
            </div>
            <div className="salary-item">
              <p>
                {expenses.length > 0
                  ? Math.min(...expenses.map((item) => item.amount))
                  : 0}
              </p>
              <p>
                {expenses.length > 0
                  ? Math.max(...expenses.map((item) => item.amount))
                  : 0}
              </p>
            </div>
          </div>
        </div>
      </InnerLayout>
    </DashboardStyled>
  );
}

const DashboardStyled = styled.div`
  h1 {
    font-size: 2rem;
    font-weight: 800;
    color: black;
  }
  .history-item{
    height:7vh;
    display:flex;
    align-items:center;
  }
  .history-con{
    grid-column: 4/span 2;
    flex:1;
  }
  h2,.h2 {
    font-weight: 800;
    color: black;
    font-size: 1rem;
  }
  .balance_box{
    grid-column:1/4;
    display:grid;
    grid-template-columns: repeat(5,1fr);
  }
  .stats-con{
    display:grid;
    grid-template-columns:repeat(5,1fr);
    gap:2rem;
    .chart-con{
      grid-column: 1 / 4;
      gap: 2rem;
      margin-top: 2rem;
      .income, .expense, .balance{
        grid-column:span 2;
      }
      .income{
      grid-column:1/2;
      }
      .balance{
        grid-column: 2/4;
      }
      .amount-con{
        margin-top:2rem;
        display:grid;
        grid-template-columns: 4; 
        gap:2rem;
      }
      .balance{
        display:flex;
        flex-direction:column;
        justify-content: center;
        align-items: center;
      }
      .expense{
        grid-column:3/2;
      }
      .income, .expense, .balance{
        background: #FCF6F9;
        border: 2px solid #FFFFFF;
        box-shadow: 0px 1px 15px rgba(0,0,0,0.06);
        border-radius:20px;
        padding: 1rem;
        p{
          font-size: 2.5rem;
          font-weight: 700;
        }
    }

    .stats-con{
    }
  }
  .salary-title, .salary-item{
    display:flex;
    flex-direction:row;
    justify-content:space-between;
    margin-top:0.7rem;
  }
  .salary-item{
    display:flex;
    flex-direction:row;
  }
  .heading{
    font-size:1.3rem;
  }
  .box{
    background-color:black;
    color:white;
  }
`;
