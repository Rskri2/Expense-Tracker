import React, { useMemo,useState, useEffect} from "react";
import styled from "styled-components";
 import Orb from "../../components/Orb/Orb";
 import Navigation from "../../components/Navigation/Navigation";
 import Dashboard from "../../components/Dashboard/Dashboard";
 import Incomes from "../../components/Incomes/Incomes";
 import Expenses from "../../components/Expenses/Expenses";
import { MainLayout } from "../../styles/Layouts";

export default function UserPage() {
 
    const orbMemo = useMemo(() => {
        return <Orb />
      },[])
      const [active,setActive] = useState(1);
      
      const displayData = () =>{
        switch(active){
          case 1:
            return <Dashboard/>
          case 2:
            return <Dashboard/>
          case 3:
            return <Incomes/>
          case 4:
            return <Expenses/>
          default:
            return <Dashboard/>
        }
      }
  return (
       <AppStyled className="App">
        {orbMemo}
        <MainLayout>
             <Navigation active = {active} setActive={setActive}/>
            <main>
            {displayData()}
            </main>
    </MainLayout>
    </AppStyled>
  
  )
}

const AppStyled = styled.div`
  height: 100vh;
  background-color: black;
  position:relative;
  main{
    height:100%;
    flex:1;
    background-color:white;
    border: 3px solid #FFFFFF;
     background-filter:blur(4.5px);
    border-radius: 32px;
    overflow:auto;
    overflow-x:hidden;
    &::-webkit-scrollbar{
      width:0;
    }
  }
`;