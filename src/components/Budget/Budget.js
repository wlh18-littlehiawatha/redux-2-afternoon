import React, { Component } from 'react';
import Background from './../shared/Background/Background'
import Chart1 from './../shared/Chart1';
import Chart2 from './../shared/Chart2';
import AddPurchase from './../shared/AddPurchase';
import DisplayPurchases from './../shared/DisplayPurchases';
import Loading from './../shared/Loading/Loading';
import Nav from './../shared/Nav';
import './Budget.css';
import { connect } from 'react-redux'

// IMPORT THE ACTION CREATOR FROM THE REDUCER FILE FOR USE BY THE CONNECT METHOD, WHICH THEN ADDS THE FUNCTION TO THE PROPS // OBJECT OF THIS COMPONENT
import {requestUserData} from './../../ducks/userReducer'
//IMPORT THE addPurchase AND removePurchase ACTION CREATORS
import {requestBudgetData, addPurchase, removePurchase} from './../../ducks/budgetReducer'


class Budget extends Component {

  componentDidMount(){
    this.props.requestUserData();
    this.props.requestBudgetData();
  }

  render() {
    // DESTRUCTURE THE LOADING PROPERTY FROM THE BUDGET OBJECT THAT WAS MAPPED TO PROPS THROUGH MAPSTATETOPROPS/CONNECT
    // DESTRUCTURING VALUES HERE IS OPTIONAL BUT RECOMMENDED FOR CLEANER JSX
    const {loading, purchases, budgetLimit } = this.props.budget;
    const {firstName, lastName} = this.props.user;
    return (
      <Background>
        {loading ? <Loading /> : null}
        <div className='budget-container'>
          <Nav firstName = {firstName} lastName = {lastName} />
          <div className='content-container'>
            <div className="purchases-container">
{/* USE PROPS TO PASS DOWN addPurchase AND removePurchase FUNCTIONS */}
              <AddPurchase addPurchase={this.props.addPurchase} />
              <DisplayPurchases purchase ={purchases} removePurchase={this.props.removePurchase} />
            </div>
            <div className='chart-container'>
              <Chart1 purchases={purchases} budgetLimit={budgetLimit} />
              <Chart2 purchases={purchases} />
            </div>
          </div>
        </div>
      </Background>
    )
  }
}

// THIS FUNCTION TAKES IN THE REDUX STORE STATE AND MAPS THE BUDGET REDUCER INFO 
// FROM THE REDUX STORE TO A BUDGET KEY ON THIS COMPONENT'S PROPS OBJECT

function mapStateToProps(state){
  return {
    budget: state.budget,
    user: state.user
  }
}


// IN ORDER TO ACCESS THE REQUESTUSERDATA ACTION CREATOR, YOU NEED TO CONNECT IT TO

// THE REDUCER FUNCTION THROUGH THE CONNECT METHOD. THE CONNECT METHOD ACCEPTS TWO ARGUMENTS, A MAPSTATETOPROPS OBJECT, AND A MAPDISPATCHTOPROPS OBJECT. OUR DISPATCHED ACTIONS GO INSIDE OF THE SECOND ARGUMENT OBJECT AS A KEY/VALUE PAIR. 


// THE CONNECT METHOD TAKES IN THE MAPSTATETOPROPS FUNCTION AND CONNECTS THIS COMPONENT TO THE REDUX STORE
export default connect(mapStateToProps, {requestUserData, requestBudgetData, addPurchase, removePurchase})(Budget);
