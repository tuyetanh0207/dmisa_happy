// // reducers.js
// const initialState = {
//     navigationLeft: [
//       { name: 'Home', href:'/home', current: true },
//       { name: 'About', href:'/aboutus', current: false },
//       { name: 'Plans', href:'/plan', current: false },
//       { name: 'Contact', href:'/contact', current: false },
//     ],
//     navigationRight: [
//       { name: 'Login', href:'/login', current: false },
//       { name: 'Signup', href:'/signup', current: false },
//       { name: 'Profile', href:'/profile', current: false },
//     ],
//     navigationProfile: [
//       { name: 'Information', href:'/profile/information', current: false },
//       { name: 'Claims', href:'/profile/claims', current: false },
//       { name: 'Registration', href:'/profile/registration', current: false },
//     ]
//   };
  
//   const navigationReducer = (state = initialState, action) => {
//     switch (action.type) {
//       case 'SET_CURRENT':
//         return {
//           ...state, //Dùng spread operator - tạo 1 bản sao mới của state
//           navigationLeft: state.navigationLeft.map(item => {
//             // Tạo 1 bản sao của item
//             const newItem = {...item};
//             // Kiểm tra nếu tên của item trùng với action.payload
//             if (item.name === action.payload) {
//                 newItem.current = true; // Nếu trùng, đặt current là true
//             } else {
//                 newItem.current = false; // Nếu không trùng, đặt current là false
//             }

//             return newItem;
//         }),
//         navigationRight: state.navigationRight.map(item => {
//             // Tạo 1 bản sao của item
//             const newItem = {...item};
//             // Kiểm tra nếu tên của item trùng với action.payload
//             if (item.name === action.payload) {
//                 newItem.current = true; // Nếu trùng, đặt current là true
//             } else {
//                 newItem.current = false; // Nếu không trùng, đặt current là false
//             }

//             return newItem;
//         }),
//         navigationProfile: state.navigationProfile.map(item => {
//           // Tạo 1 bản sao của item
//           const newItem = {...item};
//           // Kiểm tra nếu tên của item trùng với action.payload
//           if (item.name === action.payload) {
//               newItem.current = true; // Nếu trùng, đặt current là true
//           } else {
//               newItem.current = false; // Nếu không trùng, đặt current là false
//           }

//           return newItem;
//          }),
//         };
//       default:
//         return state;
//     }
//   };
  
//   export default navigationReducer;
  