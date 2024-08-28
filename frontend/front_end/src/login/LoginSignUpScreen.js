// import React, { useState } from 'react';
// import logo from '../images/Designer@2x.png';
// import Box from '@mui/material/Box';
// import Input from '@mui/material/Input';
// import InputLabel from '@mui/material/InputLabel';
// import InputAdornment from '@mui/material/InputAdornment';
// import FormControl from '@mui/material/FormControl';
// import { useNavigate } from 'react-router-dom';


// function LoginSignUpScreen() {
//   const [isLogin, setIsLogin] = useState(true);
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [onSubmit, setOnSubmit] = useState(false);
//   const [phoneNo, setPhoneNo] = useState('');
//   const type =  isLogin ? 'sign_in' : 'sign_up';
//   const apiUrl = 'http://127.0.0.1:8000/api/'
//   const navigate = useNavigate();
 

//   const handleLoginClick = () => {
//     setIsLogin(true);
//     setEmail('');
//     setPassword('');
//   };
  

//   const handleSignupClick = () => {
//     setIsLogin(false);
//     setName('');
//     setEmail('');
//     setPassword('');
//   };

//   const handleResetClick = () => {
//     setName('');
//     setEmail('');
//     setPassword('');
//     setPhoneNo('');
    
//   };

//   const handleSubmitClick = () => {
//     console.log(email, password, type);

//     if(email !== '' && password !== ''){
//       const requestData = {
//         data: {
//           type: 'sign_in',
//           attributes: {
//             email: email,
//             password: password,
//           }
//         }
//       };
  
//       fetch(`${apiUrl}userin/`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/vnd.api+json',
//         },
//         body: JSON.stringify(requestData)
//       })
//         .then(response => response.json())
//         .then(data => {
//           console.log('Success:', data);
//           if(data.length !== 0){
//             console.log("mmm")
//              navigate('/groups', { state: { userData: data, email: email, username: name } });
//           }
//         })
//         .catch((error) => {
//           console.error('Error:', error);
//         });
       
//     }
   
//   }

//   const handleSubmit = () =>{

//     console.log("minbv");

//     if(isLogin){
//        handleSubmitClick();  
//     }
//     else{
//       handleSignUp();
//     }
//   }

//   const handleSignUp = () => {
    
//     const requestData = {
//       data: {
//         type: 'sign_up',
//         attributes: {
//           username: name,
//           email: email,
//           password: password,
//         }
//       }
//     };

//     fetch(`${apiUrl}userup/`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/vnd.api+json',
//       },
//       body: JSON.stringify(requestData)
//     })
//       .then(response => response.json())
//       .then(data => {
//         console.log('Success:', data);
//         if(data){
//           navigate('/groups', { state: { userData: data, email: email, username: name } });
//         }
        
//       })
//       .catch((error) => {
//         console.error('Error:', error);
//       });
     
//   }


//   return (
//     <div style={styles.app}

// >
//       <div className='mainView' style={styles.mainView}>
//         <div style={styles.titleView}>
//           <img src={logo} className="App-logo" alt="logo" style={styles.applogo} />
//           <h1 className='title' style={styles.title}>SPLITWISE</h1>
//         </div>
//         <div style={styles.buttonView}>
//           <button
//   type="button"
//   className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-lg px-6 py-3 text-center me-2 mb-2"
//   onClick={handleLoginClick}
// >
//   LOGIN
// </button>
// <button
//   type="button"
//   className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-lg px-6 py-3 text-center me-2 mb-2"
//   onClick={handleSignupClick}
// >
//   SIGNUP
// </button>
//         </div>
//       </div>

//       <Box component="form" onSubmit={(e) => e.preventDefault()} sx={styles.box}>
//         {!isLogin && (
//           <FormControl variant="standard">
//             <InputLabel htmlFor="name">Name</InputLabel>
//             <Input
//               id="name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               sx={styles.inputField}
//               startAdornment={<InputAdornment position="start"></InputAdornment>}
//             />
//           </FormControl>
//         )}
//         <FormControl variant="standard">
//           <InputLabel htmlFor="email">Email Address</InputLabel>
//           <Input
//             id="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             sx={styles.inputField}
//             startAdornment={<InputAdornment position="start"></InputAdornment>}
//           />
//         </FormControl>
//         <FormControl variant="standard">
//           <InputLabel htmlFor="password">Password</InputLabel>
//           <Input
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             sx={styles.inputField}
//             startAdornment={<InputAdornment position="start"></InputAdornment>}
//           />
//         </FormControl>
//         {/* {!isLogin && (
//           <FormControl variant="standard">
//             <InputLabel htmlFor="phoneno">Phone No</InputLabel>
//             <Input
//               id="phoneno"
//               value={phoneNo}
//               onChange={(e) => setPhoneNo(e.target.value)}
//               sx={styles.inputField}
//               startAdornment={<InputAdornment position="start"></InputAdornment>}
//             />
//           </FormControl>
//         )} */}
//       </Box>

//       <div style={styles.submitView}>
//         <div>
//         <button type="button"
//         onClick={()=>{
//           handleSubmit();
//         }}
//         class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-6 py-3 text-center me-2 mb-2 ">SUBMIT</button>
//         </div>
//         <div>
//         <button type="button" class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-6 py-3 text-center me-2 mb-2"
//         onClick={handleResetClick}
//         >RESET</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// const styles = {
//   submitView: {
//     width: '20%',
//     justifyContent: 'space-between',
//     marginTop: '2%',
//     display: 'flex',
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   app: {
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   box: {
//     width: '40%',
//     display: 'flex',
//     flexDirection: 'column',
//     gap: 3,
//     border: '1px solid black',
//     borderRadius: 5,
//     padding: '2%',
//     marginTop: '2%',
//   },
//   inputField: {
//     height: '2%',
//     border: '1px solid black',
//     borderRadius: 2,
//     backgroundColor: '#ECECEC',
//   },
//   buttonView: {
//     display: 'flex',
//     marginTop: '2%',
//     width: '20%',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   titleView: {
//     width: '15%',
//     marginTop: '2%',
//     display: 'flex',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   signUpButton: {
//     width: '45%',
//     backgroundColor: 'green',
//     color: 'white',
//   },
//   applogo: {
//     width: '50%',
//     height: '50%',
//     borderRadius: '50%', // This will make the image a circle
//   },
//   mainView: {
//     width: '100%',
//     backgroundColor: 'Aquamarine',
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     paddingBottom: '2%',
//     borderRadius: '0 0 20% 20%',
//   },
//   title: {
//     fontSize: '20px',
//     color: '#63B90C'
//   },
// };

// export default LoginSignUpScreen;



import React, { useState } from 'react';
import logo from '../images/Designer@2x.png';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import FormControl from '@mui/material/FormControl';
import { useNavigate } from 'react-router-dom';

function LoginSignUpScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const apiUrl = 'http://127.0.0.1:8000/api/';
  const navigate = useNavigate();

  const handleSubmitClick = () => {
    if (email !== '' && password !== '') {
      const requestData = {
        data: {
          type: isLogin ? 'sign_in' : 'sign_up',
          attributes: {
            email: email,
            password: password,
            ...(isLogin ? {} : { username: name }),
          },
        },
      };

      fetch(`${apiUrl}${isLogin ? 'userin/' : 'userup/'}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/vnd.api+json',
        },
        body: JSON.stringify(requestData),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            navigate('/groups', { state: { userData: data, email: email, username: name } });
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  };

  return (
    <div style={styles.app}>
      <div style={styles.mainView}>
        <img src={logo} className="App-logo" alt="logo" style={styles.applogo} />
        <h1 style={styles.title}>SPLIT AND SHARE</h1>
      </div>

      <Box component="form" onSubmit={(e) => e.preventDefault()} sx={styles.box}>
        {!isLogin && (
          <FormControl variant="standard" fullWidth>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              sx={styles.inputField}
            />
          </FormControl>
        )}
        <FormControl variant="standard" fullWidth>
          <Input
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            sx={styles.inputField}
          />
        </FormControl>
        <FormControl variant="standard" fullWidth>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            sx={styles.inputField}
          />
        </FormControl>
      </Box>

      <div style={styles.submitView}>
        <button
          type="button"
          onClick={handleSubmitClick}
          className="text-white mt-3 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-6 py-3 text-center mb-2"
        >
          {isLogin ? 'Next' : 'Sign Up'}
        </button>
      </div>

      <div style={styles.toggleView}>
        <p style={styles.toggleText}>
          {isLogin ? "Don't have an account?" : 'Already have an account?'}
          <span
            style={styles.toggleLink}
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? ' Sign up' : ' Sign in'}
          </span>
        </p>
      </div>
    </div>
  );
}

const styles = {
  app: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f1f3f4',
  },
  mainView: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    
    marginBottom: '20px',
  },
  applogo: {
    width: '75px',
    height: '75px',
    marginBottom: '10px',
    justifyContent: 'center',
  },
  title: {
    fontSize: '24px',
    color: '#202124',
  },
  box: {
    width: '360px',
    backgroundColor: '#ffffff',
    padding: '40px',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(60,64,67,.3), 0 4px 8px rgba(60,64,67,.15)',
  },
  inputField: {
    marginBottom: '20px',
    padding: '10px',
    border: '1px solid #dadce0',
    borderRadius: '4px',
    fontSize: '16px',
  },
  submitView: {
    width: '100%',
    textAlign: 'center',
  },
  toggleView: {
    marginTop: '20px',
    textAlign: 'center',
  },
  toggleText: {
    fontSize: '14px',
    color: '#5f6368',
  },
  toggleLink: {
    color: '#1a73e8',
    cursor: 'pointer',
    marginLeft: '5px',
  },
};

export default LoginSignUpScreen;
