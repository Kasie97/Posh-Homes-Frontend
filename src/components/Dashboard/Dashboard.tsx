import React, { useEffect, useState } from 'react'
import { H1, GeneralWrap,Header,Panel, Panel1, Panels, Panels1, PayRiseContainer, Texted, TopWrap1, WrapSelect } from '../../dashboard/style';
import vector from "../../assets/Images/Vector.svg";
import group from "../../assets/Images/Group.svg"
import { TfiMenuAlt } from "react-icons/tfi";
import axiosInstance from '../../request/axiosInstance';
import { useNavigate} from 'react-router-dom';



const Dashboard = () => {



  return (
    <>
    <GeneralWrap>
  
      <WrapSelect>
      <TopWrap1 
      style={{display: "block"}}
      >
        <Texted style={{display: "block", paddingLeft:"10px"}}>Dashboard</Texted>
        <H1 style={{display: "block", paddingLeft:"10px"}}>Welcome to CloseStead Property Admin</H1>

      </TopWrap1> 
      </WrapSelect>
        <Panels1>
          <Panel1>           
            <img src={vector} alt="" /> 
            <div>
              <H1>Total Properties</H1>
              <p>30% increase from last month</p>
            </div>
          </Panel1> 
        </Panels1>

        <Panels>
          <Panel>
            <img src={group} alt="" />
            <div>
              <p>1000</p>
              <p>Short-lets Available</p>
            </div>
          </Panel>
          <Panel>
            <img src={group} alt="" />
            <div>
              <p>2590</p>
              <p>Short-lets Occupied</p>
            </div>
          </Panel>
        </Panels>
 
        <Header>
          <PayRiseContainer>

          </PayRiseContainer>

        </Header>

      <Header>
        <PayRiseContainer>
        
        </PayRiseContainer>
       
      </Header>
    </GeneralWrap>
  </>
  )
}

export default Dashboard