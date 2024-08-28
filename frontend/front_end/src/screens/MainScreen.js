import React, { useState, useEffect } from 'react';
import ProgressCircle from '../components/ProgressCircle'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Avatar from '@mui/material/Avatar';
import { CardContent,Card } from '@mui/material';
import Group from '../images/Group@2x.png';
import Extra from '../images/extra.png';
import Movie from '../images/movie.png';
import Food from '../images/food.png';
import Car from '../images/car.png';
import Hotel from '../images/hotel.png';
import Settle from '../images/settleUp.jpeg';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { MenuItem, Select} from '@mui/material';
import Box from '@mui/material/Box';
import { Combobox, ComboboxButton, ComboboxInput, Transition } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const styles = {
    App:{
        backgroundColor: '#64C9AC',
         width: '60%',
        height: '100%',
      },

     title:{
        marginTop: '2cap',  
        fontFamily: 'Lato',
        color: 'white',
     },

     card: {
       display: 'flex',
       flexDirection: 'row',
       width: '100%',
       maxHeight: '850px',
     },

    cardView:{
       display: 'flex',
       flexDirection: 'row',
        alignItems: 'flex-start',
       justifyContent: 'center',
       marginTop: 15,
       width: '100%',
       
       height: 500,
       borderTopLeftRadius: '5ch', 
      borderTopRightRadius: '5ch' 
     },

    tabCard:{
      backgroundColor: 'white',
     },

     icon:{
        height: '3cm',
        width: '3cm',
        fontSize: '90px',
        
     },

     iconTitle:{
        marginTop: '1cap',  
        fontFamily: 'Lato',
        fontSize: '15px',
        color: 'white',
        
     },

     cardTitle:{
       marginTop: '1cap',  
      fontFamily: 'Lato',
      fontSize: '15px',
       height: 50
     
     },

     topView:{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
     }
  
};


function a11yProps(index) {
   return {
     id: `simple-tab-${index}`,
     'aria-controls': `simple-tabpanel-${index}`,
   };
 }


 
 const MyModal = ({ visible, onClose, activeIndex, setActiveIndex, paidBy,
  setPaidBy, isPaid, setIsPaid, onHover, setHover, selectedPerson,
  setSelectedPerson, query2, setQuery2, selectedPeople, setSelectedPeople,
  setExpenseName, expenseAmount, setExpenseAmount, expenseType, 
  setExpenseType, expenses, setExpenses, expenseName, query, people,
  data, setQuery, setShowModal, setSelectedPeoples,
  setGroupID, selectedPeoples, edit, setEdit, groupID, isSettled, SetIsSettled,
  apiUrl, expenseID,  setExpenseID, user_data, SetCardData, getonFriends, getOnFriends2
  }) => {
    
  const filteredPeople = 
  query === ''
    ? people
    : people.filter((person) => person.name.toLowerCase().includes(query.toLowerCase()));

  const filteredPeople2 = people.filter((person) =>
    person.name.toLowerCase().includes(query2.toLowerCase())
  );

  function getImageByGroupType(type) {
    const item = data.find((entry) => entry.text === type);
    return item ? item.img : null;
  }
  
  const onExpense = async () => {
    const expenseID = Math.random().toString(36).substring(2, 15) 
    const len = selectedPeoples.length;

    console.log("expense type check", expenseType);
 //apicall
const requestData = {
  data: {
  type: "create_expense",
  attributes: {
  expenseID: expenseID,
  group_id: groupID,
  payer_name: paidBy.name,
  activeType: activeIndex,
  price: parseFloat(expenseAmount),
  expenseType: expenseType,
  // expenseType: getImageByGroupType(expenseType),
  amount: parseFloat(expenseAmount) / len ,
  description: expenseName,
  is_settled: 'false',
  users: selectedPeoples
   }
  }
}

 

await fetch(`${apiUrl}create_expense/`, {
method: 'POST',
headers: {
  'Content-Type': 'application/vnd.api+json',
},
body: JSON.stringify(requestData)
}, 500)
.then(response => response.json())
.then(data => {
  console.log('Success:', data);
 
})
.catch((error) => {
  console.error('Error:', error);
});

console.log("expesne type after edit", expenseType)
//

     const newExpense = {
      id: expenseID,
      expenseName: expenseName,
      expenseAmount: expenseAmount,
      // expenseType: expenseType,
      expenseType:  expenseType,
      activeType: activeIndex,
      paidBy: paidBy,
      members: selectedPeople,
      peoples: selectedPeoples,
      settleUp: 'false'
    };
    getonFriends()
    getOnFriends2();

  setExpenses([...expenses, newExpense]);
  setPaidBy({});
  setIsPaid(false);
  setSelectedPeople({});
  setSelectedPeoples([]);
  setEdit(false);
  setExpenseName('');
  setExpenseType('');
  setShowModal(false);
  setActiveIndex(-1);
  setHover(false);
  setQuery('');
  setQuery('');
  setQuery2('')
  setExpenseAmount(null);

  }


  
//   const onSettleUp = async () => {
//     const expenseID = Math.random().toString(36).substring(2, 15) 
//     const len = selectedPeoples.length;

//     console.log("expense type check", expenseType);
//  //apicall
// const requestData = {
//   data: {
//   type: "create_expense",
//   attributes: {
//   expenseID: expenseID,
//   group_id: groupID,
//   payer_name: paidBy.name,
//   activeType: activeIndex,
//   price: parseFloat(expenseAmount),
//   expenseType: expenseType,
//   // expenseType: getImageByGroupType(expenseType),
//   amount: parseFloat(expenseAmount) / len ,
//   description: expenseName,
//   is_settled: 'false',
//   users: selectedPeoples
//    }
//   }
// }

 

// await fetch(`${apiUrl}create_expense/`, {
// method: 'POST',
// headers: {
//   'Content-Type': 'application/vnd.api+json',
// },
// body: JSON.stringify(requestData)
// }, 500)
// .then(response => response.json())
// .then(data => {
//   console.log('Success:', data);
// })
// .catch((error) => {
//   console.error('Error:', error);
// });

// console.log("expesne type after edit", expenseType)
// //

//      const newExpense = {
//       id: expenseID,
//       expenseName: expenseName,
//       expenseAmount: expenseAmount,
//       // expenseType: expenseType,
//       expenseType:  expenseType,
//       activeType: activeIndex,
//       paidBy: paidBy,
//       members: selectedPeople,
//       peoples: selectedPeoples,
//       settleUp: 'false'
//     };
//     getonFriends()
//     getOnFriends2();

//   setExpenses([...expenses, newExpense]);
//   setPaidBy({});
//   setIsPaid(false);
//   setSelectedPeople({});
//   setSelectedPeoples([]);
//   setEdit(false);
//   setExpenseName('');
//   setExpenseType('');
//   setShowModal(false);
//   setActiveIndex(-1);
//   setHover(false);
//   setQuery('');
//   setQuery('');
//   setQuery2('')
//   setExpenseAmount(null);

// }


  const handleExpenseName = (event) => {
    setExpenseName(event.target.value);
  };

  const handleExpenseType = (type) => {
    console.log("handleExpenseType", type);
    setExpenseType(type);
  };

  const handleExpenseAmount = (event) => {
    setExpenseAmount(event.target.value);
  };

  const togglePersonSelection = (personId) => {
    setSelectedPeople((prev) => ({
      ...prev,
      [personId]: !prev[personId]
    }));
  };

  const handleMemberToggle = (member) => {
    setSelectedPeoples(prevState => {
      const isMemberSelected = prevState.includes(member);
      if (isMemberSelected) {
        return prevState.filter(person => person !== member);
      } else {
        return [...prevState, member];
      }
    });
  };


  if (!visible) return null;

  const handleOnClose = (e) => {
 
  setQuery('');
  setQuery2('');
    if (e.target.id === 'container') onClose();
  };

  return (
    <div
      id="container"
      onClick={handleOnClose}
              //  className='bg-gradient-to-br from-green-500 to-blue-400'

      className="w-full fixed z-10 inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center bg-gradient-to-br from-green-500 to-blue-400"
    >
      <div className="bg-white p-4 rounded-lg w-96 ">
        <div className="flex flex-col mb-5">
          <input
            type="text"
            value={expenseName}
            onChange={handleExpenseName}
            className="border border-gray-700 p-2 rounded mb-4"
            placeholder="Name of the expense"
          />
          <input
           
            type="text"
            value={expenseAmount}
            onChange={handleExpenseAmount}
            className="border border-gray-700 p-2 rounded"
            placeholder="0.0 $"
          />
        </div>
        <div className="flex flex-wrap gap-4 mb-5">
          {data.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center cursor-pointer"
              onClick={() =>{
                handleExpenseType(item.text);
                setActiveIndex(index)
              }}
            >
              <img
                className={clsx(
                  'w-15 h-12 p-1 rounded-full ring-2',
                  activeIndex === index
                    ? 'ring-green-500'
                    : 'ring-gray-300'
                )}
                src={item.img}
                alt={item.text}
              />
              <h1
                className={clsx(
                  'text-center mt-2',
                  activeIndex === index
                    ? 'text-green-500 text-sm'
                    : 'text-gray-500 text-xs'
                )}
              >
                {item.text}
              </h1>
            </div>
          ))}
        </div>
        {!isPaid ? (
          <div className="mb-10">
            <h1 className="text-lg font-semibold mb-2">Paid by</h1>
            <Combobox value={paidBy} onChange={(value) => {
               if(value){
                setHover(false);
                setPaidBy(value);
                 setIsPaid(true);
              }
           
            }}>
              <div className="relative">
                <Combobox.Input
                  className={clsx(
                    'w-full rounded-lg border border-gray-700 bg-gray-50 py-1.5 pr-8 pl-3 text-sm text-black',
                    'focus:outline-none focus:ring-2 focus:ring-red-400'
                  )}
                  displayValue={(person) => person?.name}
                  onChange={(event) => setQuery(event.target.value)}
                />
              </div>
              <Transition
                 show={true}
                enter="transition ease-in duration-100"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Combobox.Options
                  className="w-full mt-2 z-10 rounded-xl border border-gray-300 bg-white p-1"
                >
                  {filteredPeople.map((person) => (
                    <Combobox.Option
                      key={person.id}
                      value={person}
                      className="flex items-center p-2 cursor-pointer rounded-lg hover:bg-red-100"
                    >
                      <CheckIcon className="w-4 h-4 text-green-500 invisible group-data-[selected]:visible" />
                      <div className="text-sm text-black ml-2">{person.name}</div>
                    </Combobox.Option>
                  ))}
                </Combobox.Options>
              </Transition>
            </Combobox>
          </div>
        ) : null}
        {isPaid ? (
          <div className="mb-10">
            <h1 className="text-lg font-semibold mb-2">Split by</h1>
            <Combobox value={selectedPerson} onChange={setSelectedPerson}>
              <div className="relative">
                <ComboboxInput
                  className={clsx(
                    'w-full rounded-lg border border-gray-700 bg-gray-50 py-1.5 pr-8 pl-3 text-sm text-black',
                    'focus:outline-none focus:ring-2 focus:ring-red-400'
                  )}
                  placeholder='Select single or multiple people'
                  displayValue={(person) => person?.name}
                  onChange={(event) => setQuery2(event.target.value)}
                />
              </div>
              <Transition
                 show={true}
                enter="transition ease-in duration-100"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Combobox.Options
                  className="w-full mt-2 z-10 rounded-xl border border-gray-300 bg-white p-1"
                >
                  {filteredPeople2.map((person) => (
                    <div key={person.id} className="flex items-center mb-2 p-2">
                        <input
                        type="checkbox"
                        checked={!!selectedPeople[person.id]}
                        onChange={() =>{
                           // setSelectedPeoples([...selectedPeoples, person.name ]);
                          togglePersonSelection(person.id);
                          handleMemberToggle(person.name);
                        } 
                      }
                        className="h-4 w-4 rounded-md border-gray-300 text-red-600 focus:ring-red-500"
                      />
                      <label className="ml-2 text-sm text-black">{person.name}</label>
                    </div>
                  ))}
                </Combobox.Options>
              </Transition>
            </Combobox>
          </div>
        ) : null}
        <div className="text-center">
          <button className="px-5 py-2 bg-gray-700 text-white rounded-lg"
          onClick={()=> {
            onExpense();
          // edit ?  editExpense() : onExpense() 
        }}
        >           
         {edit ? 'Edit expense' : 'Add Expense'}
          </button>
        </div>
      </div>
    </div>
  );
};



function MainScreen() {
   const [value, setValue] = React.useState(0);
   const [showModal, setShowModal] = React.useState(false);

   const [activeIndex, setActiveIndex] = React.useState(-1);
   const [paidBy, setPaidBy] = React.useState({}); 
   const [isPaid, setIsPaid] = React.useState(false);
   const [selectedPeople, setSelectedPeople] = React.useState({}); 
   const [onHover, setHover] = React.useState(false);
   const [selectedPerson, setSelectedPerson] = React.useState();
   const [query2, setQuery2] = React.useState('');
   const [userName, setUserName] = React.useState('');
   const [expenseName, setExpenseName] = React.useState('');
   const [expenseAmount, setExpenseAmount] = React.useState();
   const [expenseType, setExpenseType] = React.useState();
   const [expenses, setExpenses] = React.useState([]);
   const [edit, setEdit] = React.useState(false);
   const [selectedPeoples, setSelectedPeoples] = React.useState([]);
   const [groupID, setGroupID] = React.useState();
   const [expenseID, setExpenseID] = React.useState();
   const [isSettled, SetIsSettled] = React.useState('');
   const [cardData, SetCardData] = React.useState([]);
   const [IsOwed, SetIsOwed] = React.useState();
   const [owe, setIsOwe] = React.useState();
   const [balance, setBalance] = React.useState();


   const location = useLocation();
   const { userData, groupId, username } = location.state || {};
   const navigate = useNavigate();
   const apiUrl = 'http://127.0.0.1:8001/api/'

   console.log("expenses", expenses);
   console.log("transfereed user data", username);
   console.log("expesnetype", expenseType);
 
   const people = userData;
  //  const people = [
  //   { id: 1, name: 'Durward Reynolds' },
  //   { id: 2, name: 'Kenton Towne' },
  //   { id: 3, name: 'Therese Wunsch' },
  //   { id: 4, name: 'Benedict Kessler' },
  //   { id: 5, name: 'Katelyn Rohan' },

  // ]

  const [query, setQuery] = React.useState('')
  const [selectedName, setSelectedName] = React.useState('');
  const [settleAmount, SettleAmount] = React.useState(0.0);

  const transformedExpenses = []

 console.log("selected peoples start", selectedPeoples);
 console.log("set selected people", selectedPeople);
 console.log("cardData", cardData);


useEffect(() => {

list_all();

}, []); 


const list_all = () => {
  fetch(`${apiUrl}list_expenses/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/vnd.api+json',
    },
    // body: JSON.stringify(requestData)
  })
    .then(response => response.json())
    .then(data => {
      if(data){
        console.log("list_exp", data)
        retrieveData(data)
       }
      
    })
    .catch((error) => {
      console.error('Error:', error);
    });
    
    //calling ind 
    getonFriends()
    getOnFriends2()

}



const getonFriends =  ()  => {
  
  const requestData = {
    data: {
    type: "get_ind_data",
    attributes: {
    group_id: groupId,
    user_data: userData,
    username: username
    }
    }
    }
  console.log("geton", requestData)
  
    fetch(`${apiUrl}get_ind_data/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/vnd.api+json',
      },
      body: JSON.stringify(requestData)
    })
      .then(response => response.json())
      .then(data => {
        if(data){
           console.log("data of getfroends", data)
         SetCardData(data.data)
        }
        
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  
  }
  

  const getOnFriends2 = async () => {
    const requestData2 = {
      data: {
      type: "get_ind_data2",
      attributes: {
      group_id: groupId,
      user_data: userData,
      username: username
      }
      }
      }
      console.log("getOnFriends2", requestData2)

    await fetch(`${apiUrl}get_ind_data2/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/vnd.api+json',
      },
      body: JSON.stringify(requestData2)
    })
      .then(response => response.json())
      .then(data => {
        console.log("get_ind_data2", data)
        
        setIsOwe(data.data.total_amount_owed_by_user)
        SetIsOwed(data.data.total_amount_owed_to_user)
        setBalance(data.data.total_group_spent)
        setUserName(username)
        // SetIsOwed()
         
        //  else{
        //   setIsOwe(0)
        //   SetIsOwed(0)
        //   setBalance(0)
        //  }
        
      })
      .catch((error) => {
        console.error('Error:', error);
      });

  } 


const retrieveData = (data) => {

  const transformedExpenses = [];

  data.data.forEach((expenseItem, index) => {
    // Find other expense records that share the same expenseID and group_id
    const relatedExpenses = data.data.filter(item => item.expenseID === expenseItem.expenseID && item.group_id === groupId);

    // Check if relatedExpenses is not empty
    if (relatedExpenses.length > 0) {
      // Extract the common fields from the first related expense
      const firstExpense = relatedExpenses[0];

      // Build the expense object
      const expense = {
        activeType: firstExpense.activeType,
        expenseAmount: String(firstExpense.price),
        expenseName: firstExpense.description,
        expenseType: firstExpense.expenseType,
        group_ID: groupId,
        id: firstExpense.expenseID,
        members: {},
        paidBy: {
          id: index + 1,  // Assign a unique ID or manage as per your logic
          name: firstExpense.payer_name
        },
        peoples: relatedExpenses.map(item => item.payee_name),
        settleUp: firstExpense.is_settled
      };

      userData.forEach(person => {
        if (expense.peoples.includes(person.name)) {
          expense.members[person.id] = true;
        }
      });
      // Populate the members object
      // expense.peoples.forEach((person, idx) => {
      //   expense.members[idx + 1] = true;
      // });

      // Add the transformed expense to the array
      transformedExpenses.push(expense);
    }
  });

  const uniqueExpenses = transformedExpenses.filter((expense, index, self) => {
    // Check if the current expense's id is the first occurrence
    return index === self.findIndex((e) => e.id === expense.id);
  });

  setExpenses(uniqueExpenses);
}

    const data = [
      { id: 1, img: Food, text: 'Food' },
      { id: 2, img: Hotel, text: 'Home' },
      { id: 3, img: Extra, text: 'Grocery' },
      { id: 4, img: Movie, text: 'Movie' },
      { id: 5, img: Car, text: 'Ride' },
      
    ];
  

   const handleChange = (event, newValue) => {
     setValue(newValue);
   };

   const borderDivider = () => {
    return (
      <div style={{
        border: '1px solid #ccc',
        margin: '20px 0'}}></div>

    );
   }

   function getInitials(name) {
    return name.charAt(0).toUpperCase();
  }

const friendsList = () => {
       return (
  <Card style={styles.cardView}
  //  className='bg-gradient-to-br from-green-400 to-blue-600'
>
          <div style={{
           display: 'flex',
           width: '60%',
             maxHeight: '500px',
          overflowY: 'auto',
           scrollbarWidth: 'none', 
           alignItems: 'center',
           flexDirection: 'column',
           justifyContent: 'center'
            }}
>
              
       {     
            cardData.length !== 0 ? (
              cardData.map((card, index) => (
                <CardContent key={index} 

                className='bg-gradient-to-bl'
              sx={{
                  display: 'flex',
                  width: '100%',
                  height: 130,
                  border: '1px solid #ddd',
                 borderRadius: '3ch',
                marginTop: '1%',
                flexDirection: 'row', 
                justifyContent: 'space-between'
                }}>
                <Box sx={{ display: 'flex',
                 flexDirection: 'row', 
                  justifyContent: 'space-between' }}>
                  <Avatar 
 style={{ height: '2cm',
            width: '2cm', color: card.status === 'You owe' ? 'green' : 'red' , 
            backgroundColor: 'white',
            fontSize: '60px',
             border: card.status === 'You owe' ? '3px solid green'  : '3px solid red' }}>{getInitials(card.name)}</Avatar>
                  <Box sx={{display: 'flex', flexDirection: 'column',
                   marginLeft: 5, 
                   }}>
                  <h1 className="text-gray text-lg font-semibold mb-1" style={styles.cardTitle}>{card.name}</h1>
                  <h1 className="text-gray text-lg font-semibold mb-1" style={styles.cardTitle}>{card.amount == 0 ? 'You owe nothing' : card.status}</h1>
                  </Box>
                 </Box>
                 <h1 className="text-gray text-lg font-semibold mb-1" style={{fontFamily: 'Lato', 
                         
                      
            }}>{card.amount}$</h1>
                </CardContent>
                ))
            ) :
            (
              <div className="text-gray text-lg font-semibold mb-1" style={{marginLeft: '25%', marginTop: '30%'}}>
              <h1>The friends list is empty</h1>
              </div>
            )

          }      
          

       </div>
       <img
     style={{
        position: 'relative',
       left: '6%'
       }}
     onClick={() => setShowModal(true)}
    src={Group} alt="Button icon" />
         </Card>
      
    );
  }

   const handleEditExpense = async (exp) => {
//api call
const requestData = {
  data: {
  type: "delete_expenses_by_description",
  id: 1,
  attributes: { 
  expenseID: exp.id,
   }
  }
}
 
await fetch(`${apiUrl}delete_expenses/`, {
method: 'POST',
headers: {
  'Content-Type': 'application/vnd.api+json',
},
body: JSON.stringify(requestData)
})
.then(response => response.json())
.then(data => {
  console.log('Success:', data);
})
.catch((error) => {
  console.error('Error:', error);
});

console.log("expesneType in when edit cliekd", exp.expenseType)
    setEdit(true);
    setShowModal(true);
    setExpenseID(exp.id);
    setExpenseName(exp.expenseName);
    setExpenseAmount(exp.expenseAmount);
    setExpenseType(exp.expenseType);
    setActiveIndex(exp.activeType);
    setSelectedPeople(exp.members);
    setSelectedPeoples(exp.peoples)
    expenseDelete(exp.id);
    getonFriends();
    getOnFriends2();

  };


  const expenseDelete = async (Id) => {

    const requestData = {
      data: {
      type: "delete_expenses_by_description",
      id: 1,
      attributes: { 
      expenseID: Id,
       }
      }
    }
     
    await fetch(`${apiUrl}delete_expenses/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/vnd.api+json',
    },
    body: JSON.stringify(requestData)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
    

    const updatedExpenses =  expenses.filter(exp => exp.id !== Id);
    setExpenses(updatedExpenses);

    getonFriends()
    getOnFriends2()
}


function getImageByGroupType(type) {
  const item = data.find((entry) => entry.text === type);
  return item ? item.img : null;
}

  const activityList = () => {
    return(
<Card 
// className='bg-gradient-to-br from-green-400 to-blue-600 p-4'
style={styles.cardView}
>
  <div 
    style={{
      display: 'flex',
      width: '90%',
      maxHeight: '500px',
      overflowY: 'auto',
      scrollbarWidth: 'none', 
      alignItems: 'center',
      flexDirection: 'column',
    }}
  >
    {expenses.length !== 0 ? (
      expenses.map((exp, index) => (
        <CardContent
          key={index}
          className=" mb-4 p-5 rounded-lg shadow-lg flex flex-row"
          style={{
            width: '100%',
            maxWidth: '700px', // Increased max width for the card content
            border: '1px solid #ddd',
            borderRadius: '1rem',
          }}
        >
          <Box className="flex flex-row w-full items-center space-x-6">
            <img
            style={{backgroundColor: 'white'}}
              className="w-20 h-20 p-2 rounded-full ring-2 ring-green-500"
              src={exp.expenseType === 'settleUp' ? Settle : getImageByGroupType(exp.expenseType)}
              alt="Expense"
            />
            <Box className="flex flex-col flex-grow">
              <h1 className="text-gray text-lg font-semibold mb-1">{exp.expenseName}</h1>
              <h1 className="text-gray text-sm mr-4">{`Paid by: ${exp.paidBy.name}`}</h1>
            </Box>
          </Box>
          <div 
           className="flex flex-col md:flex-row items-start space-y-2 md:space-y-0 md:space-x-3 mt-2">
            <button
              type="button"
              onClick={() => handleEditExpense(exp)}
              className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300
               dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-4 py-2 text-center"
            >
              <svg className="w-5 h-5 inline-block align-middle mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 3a2 2 0 012 2v14a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2h10z" />
              </svg>
              Edit
            </button>
            <button
              type="button"
              onClick={() => expenseDelete(exp.id)}
              className="text-white bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-4 py-2 text-center"
            >
              <svg className="w-5 h-5 inline-block align-middle mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 6L18 18M6 18L18 6" />
              </svg>
              Delete
            </button>
          </div>
          <h1 
           className="text-gray text-xl font-semibold mt-2 ml-40">{exp.expenseAmount}$</h1>
        </CardContent>
      
      ))
    ) : (
      <div className="text-gray text-lg font-semibold mb-1" style={{marginLeft: '2%', marginTop: '20%'}}>
              <h1>The activity list is empty</h1>
              </div>
      // <div className="mt-20 text-center">
      //   <h1 className="text-lg"></h1>
      // </div>
    )}
  </div>
</Card>


// <Card style={styles.cardView}
//    className='bg-gradient-to-br from-green-400 to-blue-600'
// >
//       <div 
//       style={{
//     display: 'flex',
//     width: '90%',
//     maxHeight: '500px',
//     overflowY: 'auto',
//     scrollbarWidth: 'none', 
//     alignItems: 'center',
//     flexDirection: 'column',
//       }}>

// {
// expenses.length !== 0 ? (
//   expenses.map((exp, index) => (
//     <CardContent key={index}
//     className="bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl"
//     sx={{
//       display: 'flex',
//       width: '100%',
//       border: '1px solid #ddd',
//      borderRadius: '3ch',
//       height: '30ch',
//      marginTop: '1%',
//      flexDirection: 'row', 
//      justifyContent: 'space-between'
//     }}>
//     <Box sx={{
//      display: 'flex',
//      flexDirection: 'row', 
//      width: '40%',
//       justifyContent: 'space-between' }}>
//       <img
//       style={{backgroundColor: 'white'}}
//        className={clsx(
//        'w-25 h-14 p-1 rounded-full ring-2',
//         'ring-green-500'
//          )}
//        src={exp.expenseType === 'settleUp' ? Settle : getImageByGroupType(exp.expenseType)}
//        />
//       <Box sx={{display: 'flex', 
//       flexDirection: 'column',
//       width: '100%',
//      //  backgroundColor: 'red',
//       height: '10ch',
//        marginLeft: 5, 
//        }}>
//       <h1 style={styles.cardTitle}>name: {exp.expenseName}</h1>
//       <h1 style={styles.cardTitle}>paidby: {exp.paidBy.name}</h1>
//       </Box>
//      </Box>
//      <div
//       class="flex bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl"
//       >
//      <button type="button"
//      onClick={()=> handleEditExpense(exp)}
//      class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-3 py-1 text-center me-1 mb-1">
//       <svg class="w-5 h-5 inline-block align-middle mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 3a2 2 0 012 2v14a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2h10z" />
//       </svg>
//       Edit
//     </button>
   
//      <button type="button"
//      onClick={()=> expenseDelete(exp.id)}
//      class="text-white bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-3 py-1 text-center me-2 mb-2">
//       <svg class="w-5 h-5 inline-block align-middle mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 6L18 18M6 18L18 6" />
//       </svg>
//       Delete
//     </button>
//    </div>
//      <h1 style={{
       
//        // backgroundColor: 'green',
//        fontFamily: 'Lato', 
//              color: 'white',
//    }}>{exp.expenseAmount}$</h1>
//     </CardContent>
// ))
// ) : (
//   <div style={{marginTop: '20%'}}>
//   <h1>The activity list is empty</h1>
//     </div>
// )
 


  
// }
 
//  </div>
// </Card> 


    )
    
   }

   const handleChangee = (event) => {
    setSelectedName(event.target.value);
  };
   
  
  const settleUpAmount = (event) => {
    SettleAmount(event.target.value)
  };

  const onSettleUp = async () => {
    const expenseID = Math.random().toString(36).substring(2, 15) 

  //apicall
const requestData = {
  data: {
type: "create_expense",
  attributes: {
  expenseID: expenseID,
  group_id: groupId,
  payer_name: username,
  activeType: -1,
  price: parseFloat(settleAmount),
  expenseType: 'settleUp',
  amount: parseFloat(settleAmount) / 1 ,
  description: 'settleUp',
  is_settled: 'false',
  users: [selectedName]
   }
  }
}

 console.log("settle expense", requestData);

await fetch(`${apiUrl}create_expense/`, {
method: 'POST',
headers: {
  'Content-Type': 'application/vnd.api+json',
},
body: JSON.stringify(requestData)
}, 100)
.then(response => response.json())
.then(data => {
  console.log('Success:', data);
  setSelectedName('');
  settleAmount(0.0);
 
})
.catch((error) => {
  console.error('Error:', error);
});

console.log("expesne type after edit", expenseType)
list_all();

//

  }


  return (

 <div style={styles.card}>
   <div style={styles.App}    
   >
        <div style={styles.topView}>
        <h1 style={styles.title}>SPLIT AND EASY</h1>
       <ProgressCircle
        r="59"
        cx="80"
        cy="80"
        strokeWidth="5"
        progress={owe / balance * 100}
        letter={getInitials(username)}
      />
         <h1 style={styles.iconTitle}>{username}</h1>
         <Box>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="FRIENDS" style={styles.iconTitle} {...a11yProps(0)} />
          <Tab label="ACTIVITY" style={styles.iconTitle} {...a11yProps(1)} />
         </Tabs>
      </Box>
      {value === 0 ? (
         friendsList()
         ) : (
            activityList()
         )}

      </div>     
     </div>

<div style={{
display: 'flex',
 flexDirection: 'column',
 flex: '40%',
 backgroundColor: '#64C9AC',
 padding: '2%',
  }}

// className='bg-gradient-to-r from-purple-500 to-pink-500'
  >

<h1 style={{ color: 'white', 
fontSize: '2.5em',
  marginBottom: '3%'
   }}>BALANCE HISTORY</h1>
    {/* <div 
    className='bg-gradient-to-br from-green-400 to-blue-600'
    style={{
       display: 'flex',
        borderRadius: 5,
        width: '65%',
        height: '15%',
        backgroundColor: 'white',
        justifyContent: 'space-around',
        flexDirection: 'row', 
        padding: 2,
        borderRadius: 10
       }}>
       <div style={{display: 'flex', flexDirection: 'column',
         }}>
        <h1 style={styles.cardTitle}>Owed</h1>
        <h1 style={{ ...styles.cardTitle, fontSize: '2em' }}>{IsOwed > 0 ? IsOwed : 0}</h1>
        </div> 
  
        {borderDivider()}
        <div>
        <h1 style={styles.cardTitle}>Owe</h1>
        <h1 style={{ ...styles.cardTitle, fontSize: '2em' }}>{ owe ? owe : 0}</h1>       
       </div>
       {borderDivider()}

       <div>
        <h1 style={styles.cardTitle}>Spent</h1>
        <h1 style={{ ...styles.cardTitle, fontSize: '2em' }}>{balance ? balance : 0}</h1>
        </div>
      </div> */}
<div 
  className="bg-white to-blue-600 p-3 rounded-lg flex flex-row justify-around items-center w-full max-w-md h-32"
>
  <div className="flex flex-col items-center">
    <h1 className="text-gray text-lg font-semibold">Owed</h1>
    <h1 className="text-gray text-lg font-bold">{IsOwed > 0 ? IsOwed : 0}</h1>
  </div>
  
  {/* Border Divider */}
  
  <div className="border-l-2 border-gray h-full mx-2"></div>
  
  <div className="flex flex-col items-center">
    <h1 className="text-gray text-lg font-semibold">Owe</h1>
    <h1 className="text-gray text-lg font-bold">{owe ? owe : 0}</h1>       
  </div>

  {/* Border Divider */}
  <div className="border-l-2 border-gray h-full mx-2"></div>

  <div className="flex flex-col items-center">
    <h1 className="text-gray text-lg font-semibold">Spent</h1>
    <h1 className="text-gray text-lg font-bold">{balance ? balance : 0}</h1>
  </div>
</div>

 <h1 style={{...styles.cardTitle, color: 'white', 
 marginTop: '18%',
 fontSize: '2.5em',
   marginBottom: '5%'
}}>SETTLE UP</h1>

 
<div style={{flex: 'display',
  width: '100%',
 flexDirection: 'row',
marginBottom: '3%',
  
  justifyContent: 'space-around'}}>
<FormControl 
// className='bg-gradient-to-br from-green-400 to-blue-600'
style={{marginTop: '3%', 
    backgroundColor: 'white',
    borderRadius: 10, 
    width: '55%'
    
  }}>
    <InputLabel         
    sx={{fontFamily: 'Lato',
      color: 'gray'
       }}
      id="name-select-label">Select a person</InputLabel>
      <Select
        labelId="name-select-label"

        sx={{
        fontFamily: 'Lato'}}
        id="name-select"
        value={selectedName}
        onChange={handleChangee}
        label="Name"
      >
      {people
  .filter(peo => peo.name !== username)
  .map((peo) => (
    <MenuItem 
    sx={{fontFamily: 'Lato'}  
  }
      key={peo.id} value={peo.name}>
      {peo.name}
    </MenuItem>
  ))}
      </Select>
     
    </FormControl>
    <input
  id="textInput"
  type="text"
  value={settleAmount}
  onChange={settleUpAmount}
  style={{
    fontFamily: 'Lato',
    borderRadius: 8,
    marginLeft: '5%',
    width: '40%',
    height: 55,
    color: 'grey',
    textAlign: 'center',
    marginTop: '3%',
    marginBottom: '3%',
  }}
  placeholder="0.0 $"
  className="px-3 py-2 rounded-md border border-gray-300  focus:outline-none focus:ring-1 focus:ring-indigo-500 placeholder-gray-500"
/>

</div> 

<div style={{
  display: 'flex',
  flexDirection: 'row',
  marginTop: '5%',
  // alignItems: 'center',
  justifyContent: 'center',
   width: '60%',
 justifyContent: 'space-between'
  
}}>

<button type="button" 
onClick={
  onSettleUp
}
className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl 
focus:ring-4 focus:outline-none focus:ring-blue-300
 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-6 py-3 text-center me-2 mb-2">SETTLE UP</button>

<button type="button" 
onClick={()=> {
  navigate('/login');

}}
className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl 
focus:ring-4 focus:outline-none focus:ring-blue-300
 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-6 py-3 text-center me-2 mb-2">LOGOUT</button>
</div>


</div>

<MyModal onClose={() => setShowModal(false)} visible={showModal}
  activeIndex={activeIndex} setActiveIndex={setActiveIndex} 
  paidBy={paidBy} setPaidBy={setPaidBy} isPaid={isPaid}
  setIsPaid={setIsPaid} onHover={onHover} setHover={setHover}
  selectedPerson={selectedPerson} setSelectedPerson={setSelectedPerson}
  query2={query2} setQuery2={setQuery2} selectedPeople={selectedPeople}
  setSelectedPeople={setSelectedPeople} setExpenseName={setExpenseName}
  expenseAmount={expenseAmount} setExpenseAmount={setExpenseAmount}
  expenseType={expenseType} setExpenseType={setExpenseType}
  expenses={expenses} setExpenses={setExpenses} expenseName={expenseName}
  query={query} people={people} data={data} setQuery={setQuery}
  setShowModal={setShowModal} setSelectedPeoples={setSelectedPeoples}
  selectedPeoples={selectedPeoples} edit={edit} setEdit={setEdit}
  groupID={groupId} isSettled={isSettled} SetIsSettled={SetIsSettled}
  setGroupID={setGroupID} apiUrl={apiUrl}  expenseID={expenseID}
  setExpenseID={setExpenseID} user_data={userData} SetCardData={SetCardData}
  getonFriends={getonFriends} getOnFriends2={getOnFriends2}
  />
  </div> 
   
  );
}

export default MainScreen;

 

