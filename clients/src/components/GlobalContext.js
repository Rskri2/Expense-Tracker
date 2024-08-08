import React, {  useContext } from "react";
import axios from "axios";
const BASEURL = "https://expense-tracker-k4z7.vercel.app/api/v1";

const GlobalContext = React.createContext();
export const GlobalProvider = ({ children }) => {

  const setData = (res)=>{

    window.localStorage.setItem("token", res.token);
    window.localStorage.setItem("firstname", res.data.user.firstname);
    window.localStorage.setItem("lastname", res.data.user.lastname);
    window.localStorage.setItem("email", res.data.user.email);
  }
  const login = async ({ email, password }) => {
    try {
      const res = await axios.post(
        `${BASEURL}/users/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      setData(res.data);
      
      return {success:true};
    } catch (error) {
       const err = error?.response?.data?.message
      ? error.response.data.message
      : error.message;

    return { success: false, error: err };
    }
  };
  const myAccount = async ()=>{
    const token = window.localStorage.getItem("token");
    try{
       const res = await axios.get(`${BASEURL}/users/me`,{
        withCredentials:true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      console.log(res);
      // setData(res);
      return {success:true};
    } catch(error){
      const err = error?.response?.data?.message
      ? error.response.data.message
      : error.message;

    return { success: false, error: err };
    }
  }
  const register = async ({ email, password, firstname, lastname }) => {
    try {
     const res =  await axios.post(
        `${BASEURL}/users/register`,
        {
          email,
          password,
          firstname,
          lastname,
        },
        {
          withCredentials: true,
        }
      );
      console.log(res);
      setData(res.data);
      
      return {success:true};
    } catch (error) {
      console.log(error)
      const err = error?.response?.data?.message
      ? error.response.data.message
      : error.message;
      
    return { success: false, error: err };
    }
  };

  const addIncome = async (income) => {
    const token = window.localStorage.getItem("token");
    try {
    await axios.post(
        `${BASEURL}/income/my-incomes`,
         income ,{
         withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },}
         
        );
        return {success:true};
      } catch (error) {
      const err = error?.response?.data?.message
      ? error.response.data.message
      : error.message;

    return { success: false, error: err };
    }
  };

const totalIncome = (incomes) => {
  let totalIncome = 0;
  if(incomes.size === 0 )return 0;
  incomes.forEach((income) =>{
            totalIncome = totalIncome + income.amount
        })
        
        return totalIncome;
      
    }
    const getIncomes = async () => {
      const token = window.localStorage.getItem("token");
    try {
      const res = await axios.get(`${BASEURL}/income/my-incomes`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
        return { success: true, incomes:res.data.data};
      } catch (error) {
        const err = error?.response?.data?.message
      ? error.response.data.message
      : error.message;

    return { success: false, error: err };
  }
  };

  const deleteIncome = async (id) => {
    const token = window.localStorage.getItem("token");
    try{
      await axios.delete(`${BASEURL}/income/my-incomes/${id}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return { success: true};
    } catch(error){
      const err = error?.response?.data?.message
      ? error.response.data.message
      : error.message;
      
      return { success: false, error: err };
    }
  };
  const addExpense = async (expense) => {
    const token = window.localStorage.getItem("token");
    try {
      await axios.post(
        `${BASEURL}/expenses/my-expenses`,
        { expense },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return { success: true};
    } catch (error) {
      const err = error?.response?.data?.message
      ? error.response.data.message
      : error.message;
      
    return { success: false, error: err };
      
    }
  };
  const totalExpense =  (expenses) => {
    let totalExpense = 0;
    try{
  
      expenses.forEach((expense) => {
        totalExpense += expense.amount;
      });
      return totalExpense;

    } catch(err){
      return 0;
    }
  };
  const getExpense = async () => {
    const token = window.localStorage.getItem("token");
    try {
      const res = await axios.get(`${BASEURL}/expenses/my-expenses`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    
      // setExpenses(res.data.data);
      return { success: true, expenses:res.data.data};
    } catch (error) {
      const err = error?.response?.data?.message
      ? error.response.data.message
      : error.message;
    return { success: false, error: err };
    }
  };
  const totalBalance = (totalInc, totalExp)=>{
    return totalInc-totalExp;
  }
  const deleteExpense = async (id) => {
    const token = window.localStorage.getItem("token");
    try{

      await axios.delete(`${BASEURL}/expenses/my-expenses/${id}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return {success: true}
    } catch(error){
      const err = error?.response?.data?.message
      ? error.response.data.message
      : error.message;

    return { success: false, error: err };
    }
  };
  const transactionHistory = (incomes, expenses)=>{
    let history;
    if(!incomes && !expenses ){
      return [];
    }
    else if(!incomes){
      history = [...expenses]
    }
    else if(!expenses){
      return [...incomes]
    }
    else
     history = [...incomes,...expenses];
    
    history.sort((a,b)=>{
      return new Date(b.createdAt) - new Date(a.createdAt);
    })
    const arr = history.slice(0,4);
    return arr;
  }
  return (
    <GlobalContext.Provider
      value={{
        addIncome,
        getIncomes,
        login,
        register,
        deleteIncome,
        totalIncome,
        getExpense,
        deleteExpense,
        totalExpense,
        addExpense,
        myAccount,
        totalBalance,
        transactionHistory,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
