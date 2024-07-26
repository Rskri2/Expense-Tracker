import React,{useEffect} from 'react'
import styled from 'styled-components'
import { InnerLayout } from '../../styles/Layouts'
import { useGlobalContext } from '../../contexts/GlobalContext'
import ExpenseForm from '../Expenses/ExpenseForm'
import ExpenseItems from '../Incomes/IncomeItems'
import { ruppes } from '../../utils/icons'
export default function Expenses() {
const  {expenses,getExpense,totalExpense } = useGlobalContext();;
const ExpenseItem=()=>{
  return expenses.map((expense) => {
  const{_id, title,amount, date, category, description,type} = expense;
  return <ExpenseItems
  key={_id}
  id={_id}
  amount={amount}
  date={date}
  type={type}
  category={category}
  description={description}
  indicatorColor={'#42AD00'}
  title={title}
  />
})}
  useEffect(()=>{
    
     getExpense();
  },[])
  return (
   
    <ExpensesStyled>
      <InnerLayout>
        <h1>Expenses</h1>
        <h2 className="total-Expense">Total Expense: <span>{ruppes}{totalExpense()} </span></h2>
        <div className="Expense-content">
          <div className="form-container">
            <div className="Expenses">
            <ExpenseForm/>
            </div>
            <div className="Expenses">
              {
              expenses.length>=0?  ExpenseItem() : ' '
              }
            </div>
          </div>
        </div>
      </InnerLayout>
    </ExpensesStyled>
  )
}

const ExpensesStyled = styled.div`
  display:flex;
  ovverflow:auto;
  h1{
    font-size:1.6rem;
    color:black;
    font-weight:800;
  }
  .total-Expense{
    display:flex;
    align-items:center;
    justify-content:center;
    background:#FCF6F9;
    border: 2px solid #FFFFFF;
    box-shadow:0px 1px 15px rgba(0,0,0,0.06);
    border-radius:20px;
    padding:1rem;
    margin:1rme 0;
    font-size:1.2rem;
    color:black;
    font-weight:800;
    gap:.5rem;
    span{
      font-size:1.5rem;
      color:#42AD00;
      font-weight:800;
    }
  }
  .Expense-content{
    display:flex;
    gap:2rem;
   
  }
  .form-container{
    display:flex;
    gap:2rem;
  }
`
