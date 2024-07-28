import React, { useState, useContext } from "react";
import axios from "axios";
import {redirect } from "react-router-dom";
const BASEURL = "http://127.0.0.1:5000/api/v1";
const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState('');
  const [loggedIn,setLoggedIn] = useState(null)
  const [registered,setRegistered] = useState(null)
  const [logOut,setLoggedOut] = useState(null)

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
      let name =res.data.data.user.firstname + " " + res.data.data.user.lastname;
      setUsername(name);
      setLoggedIn('Logged in successfully');
      window.localStorage.setItem('authenticated', 'true'); 

    } catch (err) {
      setLoggedIn(err.response.data.message);
    }
  };
  const myAccount = async ()=>{
    try{
       const res = await axios.get(`${BASEURL}/users/me`,{
        withCredentials:true
      })

      let frname = (res.data.user.firstname[0].toUpperCase())+(res.data.user.firstname.substr(1).toLowerCase());
      let lsname = (res.data.user.lastname[0].toUpperCase())+(res.data.user.lastname.substr(1).toLowerCase());
      frname = frname.concat(" ",lsname)
      setUsername(frname);
    } catch(err){
      setError(err.response.data.message);
    }
  }

  const logout = async () => {
    try {
       await axios.get(`${BASEURL}/users/logout`, {
        withCredentials: true,
      });
      setLoggedOut('logged out sucessfully')
      window.localStorage.removeItem("authenticated") 

    } catch (err) {
      setLoggedOut(err.response.data.message);
    }
  };

  const register = async ({ email, password, firstname, lastname }) => {
    try {
      await axios.post(
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

      setRegistered('Registered Sucessfully!!')
      window.localStorage.setItem('authenticated', 'true'); 

    } catch (err) {
      setRegistered(err.response.data.message)
    }
  };

  const addIncome = async (income) => {
    try {
       await axios.post(
        `${BASEURL}/income/my-incomes`,
        { income },
        {
          withCredentials: true,
        }
      );
      getIncomes();
    } catch (err) {
      setError(err.response.data.message)
    }
  };

const totalIncome = () => {
        let totalIncome = 0;
        if(incomes.size === 0 )return 0;
        incomes.forEach((income) =>{
            totalIncome = totalIncome + income.amount
        })
        
        return totalIncome;
    }
  const getIncomes = async () => {
    try {
      const res = await axios.get(`${BASEURL}/income/my-incomes`, {
        withCredentials: true,
      });
        setIncomes(res.data.data);
      
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  const deleteIncome = async (id) => {
    try{
       await axios.delete(`${BASEURL}/income/my-incomes/${id}`, {
        withCredentials: true,
      });
      getIncomes();
    } catch(err){
      setError(err.response.data.message)
    }
  };
  const addExpense = async (expense) => {
    try {
       await axios.post(
        `${BASEURL}/expenses/my-expenses`,
        { expense },
        {
          withCredentials: true,
        }
      );
      getExpense();
    } catch (err) {
      setError(err.response.data.message);
      
    }
  };
  const totalExpense =  () => {
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
    try {
      const res = await axios.get(`${BASEURL}/expenses/my-expenses`, {
        withCredentials: true,
      });
      setExpenses(res.data.data);
    } catch (err) {
      setError(err.response.data.message);
    }
  };
  const totalBalance = ()=>{
    return totalIncome()-totalExpense();
  }
  const deleteExpense = async (id) => {
    try{

      await axios.delete(`${BASEURL}/expenses/my-expenses/${id}`, {
        withCredentials: true,
      });
      getExpense();
    } catch(err){
      setError(err.response.data.message)
    }
  };
  const transactionHistory = ()=>{
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
        incomes,
        login,
        logout,
        register,
        username,
        deleteIncome,
        totalIncome,
        getExpense,
        deleteExpense,
        totalExpense,
        addExpense,
        expenses,
        myAccount,
        totalBalance,
        transactionHistory,
        error,
        logOut,
        loggedIn,
        registered
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
