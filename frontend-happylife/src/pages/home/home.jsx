import Header from '../../components/header.jsx';
// //Test REDUX
// import { configureStore, combineReducers } from "@reduxjs/toolkit";
 
// //1. Action creator
// //Submiting the form
// const newBooking = (name, amount) => {
//   return {
//     type: "NEW_BOOKING",
//     payload: {
//       name,
//       amount,
//     }
//   };
// };

// // Cancel form
// const cancelBooking = (name, refundAmount) => {
//   return {
//     type: "CANCEL_BOOKING",
//     payload: {
//       name,
//       refundAmount,
//     }
//   };
// };

// //2. Reducers
// const reservationHistory = (oldRReservationList=[], action) => {
//   if(action.type=== "NEW_BOOKING"){
//     return [...oldRReservationList, action.payload];

//   } else if(action.type==="CANCEL_BOOKING"){
//     return oldRReservationList.filter(record => {
//       return record.name !== action.payload.name;
//     });

//   }
//   return oldRReservationList;
// };

// const cancellationHistory = (oldCancellationHistory=[], action) => {
//   if(action.type==="CANCEL_BOOKING"){
//     return [...oldCancellationHistory, action.payload];

//   }
//   return oldCancellationHistory;
// };

// const accounting = (totalMoney=1000, action) => {
//   if(action.type === "NEW_BOOKING"){
//     return totalMoney + action.payload.amount;
//   } else if (action.type==="CANCEL_BOOKING"){
//     return totalMoney - action.payload.refundAmount;

//   }
//   return totalMoney;
// };
// //3. Redux store
// const railwayCentralStore = combineReducers({
//   accounting: accounting,
//   reservationHistory: reservationHistory,
//   cancellationHistory: cancellationHistory,
// });
// const store = configureStore({
//   reducer: railwayCentralStore})
// const action = newBooking("Nhan", 200);
// const action2 = cancelBooking("Nhan", 200);
// store.dispatch(action);
// store.dispatch(action2);

// console.log(store.getState());

export default function Home() {
      
      return(
      <div className='w-screen h-screen  '>
        <h1>HOME</h1>


      </div>
     
      )
}