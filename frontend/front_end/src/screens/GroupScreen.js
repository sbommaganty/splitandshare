import React, { useState, useEffect } from 'react';
import CardContent from '@mui/material/CardContent';
import Input from '@mui/material/Input';
import Alert from '@mui/material/Alert';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import trip from '../images/trip.png';
import home from '../images/home.png';
import couple from '../images/couple.png';
import other from '../images/other.png';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const groupTypes = ['Trip', 'Home', 'Couple', 'Other'];

const styles = {
  inputField: {
    border: '1px solid black',
    borderRadius: 2,
    backgroundColor: '#ECECEC',
  },
  avatarContainer: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginRight: '1rem',
  },
  removeIcon: {
    marginRight: '0.5rem',
   },
  editIcon: {
    marginRight: '0.5rem',
  },
  card: {
    // marginTop: '2%',
    border: '1px solid black',
    borderRadius: '0.75rem',
    width: '90%',
    maxWidth: '800px',
    height: '320px',
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '2%',
    alignItems: 'center',
    // padding: '2%',
  },
  typeSelection: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: '1rem',
  },
  typeItem: {
    width: '22%',
    padding: '0.5rem',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: '0.75rem',
    border: '1px solid #ddd',
    textAlign: 'center',
    cursor: 'pointer',
    margin: '0.5rem',
  },
  typeActive: {
    backgroundColor: '#64C9AC',
    borderColor: '#ddd',
  },
  memberForm: {
    width: '100%',
    maxWidth: '400px',
    marginTop: '2%',
  },
  typeBox: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: '2%',
  },
  memberView: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginTop: '2%',
    backgroundColor: 'blue',
    width: '100%',
    maxWidth: '600px',
    overflowY: 'auto',
    maxHeight: '150px',
  },
  buttonView: {
    width: '100%',
    maxWidth: '400px',
    marginTop: '2%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
};

function GroupScreen() {
  const [groupName, setGroupName] = useState('');
  const [groupType, setGroupType] = useState('');
  const [memberNames, setMemberNames] = useState([]);
  const [groups, setGroups] = useState([]);
  const [memberName, setMemberName] = useState('');
  const [edit, setEdit] = useState(false);
  const [isgroupEdit, setIsGroupEdit] = useState(false);
  const [isGrpNameText, SetIsGrpNameText] = useState(false);
  const [isTypeSelect, SetIsTypeSelect] = useState(false);
  const [isMemberText, SetIsMemberText] = useState(true);
  const [isButtonMember, SetIsButtonMember] = useState(true);
  const [isButtonGrp, SetIsButtonGrp] = useState(true);

  const [isIsGrpCreated, SetIsGrpCreated] = useState(false);
  const [groupID, SetGroupID] = useState();
  const apiUrl = 'http://127.0.0.1:8000/api/'
  const location = useLocation();
  const { userData, email, username } = location.state || {};
  const navigate = useNavigate();

  console.log("userData", userData);
  console.log("groups", groups);
  
  const handleGroupNameChange = (event) => {
    setGroupName(event.target.value);
  };

  const data = [
    { id: 1, img: trip, text: 'Trip' },
    { id: 2, img: home, text: 'Home' },
    { id: 3, img: couple, text: 'Couple' },
    { id: 4, img: other, text: 'Other' },
  ];

  const handleGroupTypeChange = (type) => {
    setGroupType(type);
  };

  const handleMemberNameChange = (event) => {
    console.log("event", event.target.value);
    setMemberName(event.target.value);
  };

  function getImageByGroupType(type) {
    const item = data.find((entry) => entry.text === type);
    return item ? item.img : null;
  }

  const groupEdit = (group) => {
    console.log("GroupId", group.groupID);
    setIsGroupEdit(true);
     SetGroupID(group.groupID);
    setGroupName(group.name);
     SetIsGrpNameText(false);
    SetIsTypeSelect(false);
    SetIsButtonMember(false);
    SetIsMemberText(false);
  }

  const groupDelete = (Id) => {
    console.log("id of del", Id);
    const requestData = {
      data: {
        type: "delete_group",
        id: 1,
        attributes: {
          groupID: Id,
        }
      }
    };

      fetch(`${apiUrl}delete_group/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/vnd.api+json',
        },
        body: JSON.stringify(requestData)
      })
        .then(response => response.json())
        .then(data => {
          <Alert severity="success">Group deleted Success:</Alert>
          console.log('Group deleted Success:', data);
        })
        .catch((error) => {
          <Alert severity="error">Group deleted Success:</Alert>
          console.error('Error:', error);
        });
       const updatedGroups =  groups.filter(group => group.groupID !== Id);
       setGroups(updatedGroups);
  }


  useEffect(() => {
    
    const requestData = {
      data: {
        type: "get_all_user_groups_by_email",
        attributes: {
          email: email,
        }
      }
    };

      fetch(`${apiUrl}get_all_user_groups_by_email/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/vnd.api+json',
        },
        body: JSON.stringify(requestData)
      })
        .then(response => response.json())
        .then(data => {
          if(data.length !== 0){
            console.log("nbv")
            setGroups(data.data);
          }
          
          console.log('All the users with related email ID:', data.data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    
  }, []); 


  const GroupItem = ({ group, id, elementId, onClick }) => {
    const groupImage = getImageByGroupType(group.type);

    return (
    <div
    className="flex flex-row w-full items-center justify-between pb-2 mb-2 sm:pb-3 border border-black rounded-lg p-2 bg-white dark:bg-gray-800 max-w-[600px] w-full mx-auto">
  <div 
  
  className="flex flex-1 items-center space-x-3 rtl:space-x-reverse">
    <div className="flex-shrink-0">
      <img
        className="w-6 h-6 bg-white rounded-full"
        src={groupImage}
        alt={`${group.name} image`}
      
      />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-xs font-medium text-gray-900 truncate dark:text-white">
        {group.name}
      </p>
      {/* <p className="text-xs text-gray-500 truncate dark:text-gray-400">
        Amount Spent: ${group.amountSpent}
      </p>
      <p className="text-xs text-gray-500 truncate dark:text-gray-400">
        Amount Owed: ${group.amountOwed}
      </p> */}


    </div>
  </div>
{
!isIsGrpCreated && (
  <div class="flex space-x-4">
  <button type="button"
  onClick={()=> groupEdit(group)}
  class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
   <svg class="w-5 h-5 inline-block align-middle mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 3a2 2 0 012 2v14a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2h10z" />
   </svg>
   Edit
 </button>

  <button type="button"
  onClick={()=> groupDelete(group.groupID)}
  class="text-white bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
   <svg class="w-5 h-5 inline-block align-middle mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 6L18 18M6 18L18 6" />
   </svg>
   Delete
 </button>
</div>
) 
}
  


  <div className="flex flex-row overflow-x-auto scrollbar-hidden flex-1 mx-3 h-16 overflow-auto"> {/* Fixed height and overflow auto */}
    <div className="inline-flex gap-3 flex-nowrap">
      {group.users.map((member, index) => (
        <div
          key={index}
          className="flex flex-col items-center gap-1 bg-white shadow-md p-2 rounded-lg relative w-24"
        >
       {/* <span className="font-medium text-gray-900 dark:text-white text-xs">{member.split(' ')[0]}</span> */}
          <div className="relative flex-shrink-0 mb-2">
            <div className="flex items-center justify-center w-12 h-12 text-lg font-semibold text-white bg-blue-500 rounded-full">
              {getInitials(member)}
            </div>
            <button
              aria-label="delete"
              onClick={() => handleDeleteMember(id, member)}
              className="absolute top-0 right-0 w-4 h-4 text-red-500 hover:text-red-700"
              style={{ transform: 'translate(50%, -50%)' }}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
           </div>
         </div>
      ))}
    </div>
  </div>

  {/* <div className="flex-shrink-0 flex items-center text-sm font-semibold text-gray-900 dark:text-white ml-3">
    ${group.amountSpent}
  </div> */}
  <div 
  onClick={()=>{
    onClick(group.users, id);
  }}
  class="flex items-center">
  <span class="text-green-500 text-4xl">→</span>
</div>

</div>

    );
  };

  const handleAddMember = () => {
    console.log("handleAddmember", groupID, memberName)
    if (groupID && memberName) {
      const updatedGroups = groups.map(group => {
        if (group.groupID === groupID) {
          return { ...group, users: [...group.users, memberName] };
        }
        return group;
      });
      setGroups(updatedGroups);
      setMemberName('');

    const requestData = {
      data: {
        type: "add_members_to_group",
        attributes: {
        username: memberName,
        GroupID: groupID
        }
      }
    };
      
  
      fetch(`${apiUrl}add_members/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/vnd.api+json',
        },
        body: JSON.stringify(requestData)
      })
        .then(response => response.json())
        .then(data => {
          <Alert severity="success">Added member Success:</Alert>
          console.log('Success:', data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  };

  function getInitials(name) {
    return name.charAt(0).toUpperCase();
  }

  const handleDeleteMember = (groupID, memberToRemove) => {
     const requestData = {
      data: {
      type: "update_member_to_group",
      id: 1,
      attributes: {
      username: memberToRemove,
      action: "remove",
      GroupID: groupID
      }
      }
      };
     

        fetch(`${apiUrl}update_member/`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/vnd.api+json',
          },
          body: JSON.stringify(requestData)
        })
          .then(response => response.json())
          .then(data => {
            <Alert severity="success">updated member</Alert>
            console.log('Success:', data);
          })
          .catch((error) => {
            console.error('Error:', error);
          });
    
    SetGroupID(groupID);
      const updatedGroups = groups.map(group => {
       if (group.groupID === groupID) {
         const updatedMembers = group.users.filter(member => member !== memberToRemove);
        console.log(updatedMembers);
        return { ...group, users: updatedMembers };
      }
      return group;
    });
    console.log("xcvb", updatedGroups);
    setGroups(updatedGroups);
  };

  const validateForm = () => {
    return (
      groupName.trim() !== '' &&
      groupTypes.includes(groupType) &&
      isButtonGrp &&
      !edit
    );
  };

  const handleDone = () => {
    if(isIsGrpCreated){
      setGroupName('');
      setGroupType('');
      SetIsGrpNameText(false);
      SetIsTypeSelect(false);
    
      SetIsMemberText(true);
      SetIsButtonMember(true);
      SetIsGrpCreated(false);
    
    } 

  }

  const logout = () => {
    navigate('/login');

  }

  const handleCreateGroup = () => {

    if (!validateForm()) {
      alert(
        'Please fill out all fields and ensure no members are being edited.'
      );
      return;
    }
    const id = Math.random().toString(36).substring(2, 15) 

    const requestData = {
      data: {
        type: "create_group",
        attributes: {
          groupID: id,
          name: groupName,
          type: groupType,
        }
      }
    };
      
  
      fetch(`${apiUrl}create_group/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/vnd.api+json',
        },
        body: JSON.stringify(requestData)
      })
        .then(response => response.json())
        .then(data => {
          <Alert severity="success">Group deleted Success:</Alert>

          console.log('Success:', data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });



    const newGroup = {
      groupID: id,
      name: groupName,
      type: groupType,
      users: memberNames,
    };

    SetGroupID(id);
    setGroups([...groups, newGroup]);
    SetIsGrpNameText(true);
    SetIsTypeSelect(true);
    SetIsMemberText(false);
    SetIsButtonMember(false);
    SetIsGrpCreated(true);

   
  };

  const handleEditedGroup = () => {


    const requestData = {
      data: {
        type: "update_group_name",
        id: 1,
        attributes: {
          groupID: groupID,
          name: groupName,
          type: groupType
        }
      }
    };
      
  
      fetch(`${apiUrl}update_group_name/`, {
        method: 'PUT',
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


      const updatedGroups = groups.map(group => {
        if (group.groupID === groupID) {
          return { ...group, 
            name: groupName,
            type: groupType,
           };
        }
        return group;
      });

      console.log("updated groups", updatedGroups);
      setGroups(updatedGroups);
      setMemberName('');
      setIsGroupEdit(false);
      setGroupName('');
      setGroupType('');
      SetIsGrpNameText(false);
      SetIsTypeSelect(false);
    
      SetIsMemberText(true);
      SetIsButtonMember(true);
      SetIsGrpCreated(false);
    
  }

  const handleGrpClick = (usernames, groupID) => {
    console.log("we are grp check", usernames);
    const objectsArray = usernames.map((usrname, index) => ({
      id: index + 1, // Assigning an ID starting from 1
      name: usrname
    }));

     
    const requestData = {
      data: {
        type: "get_user_details_by_email",
        attributes: {
          email: email,
        }
      }
    };

    fetch(`${apiUrl}get_user_details_by_email/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/vnd.api+json',
      },
      body: JSON.stringify(requestData)
    })
      .then(response => response.json())
      .then(data => {
        if(data){
          navigate('/expense', { state: { userData: objectsArray, groupId: groupID, username: data.data.username} });
          // console.log("emai iser", );
         }
        
      })
      .catch((error) => {
        console.error('Error:', error);
      });



  }
  

  return (
    <div
    className='h-screen w-screen'
      style={{
        display: 'flex',
        flexDirection: 'column',
        // justifyContent: 'space-around',
        alignItems: 'center',
        padding: '1rem',
       }}
    >


      <div style={styles.card}
      >
        
        <CardContent>
          <h2 style={{marginTop: 1, fontSize: 15, fontFamily: 'Lato'}}>Would you like to create a new group? start entering the details</h2>
          <FormControl variant="standard" sx={styles.memberForm}>
            <h2 style={{marginTop: 1, fontSize: 12, fontFamily: 'Lato'}}>Enter the group name</h2>
            <Input
              id="name"
              sx={styles.inputField}
              value={groupName}
              disabled={isGrpNameText}
              onChange={handleGroupNameChange}
              startAdornment={<InputAdornment position="start"></InputAdornment>}
            />
          </FormControl>

  <h2 style={{marginTop: 10, fontSize: 12, fontFamily: 'Lato'}}>Select the group type</h2>
    <div className="flex flex-row mt-3 gap-2">
      {data.map((item) => (
        <button
          key={item.id}
          type="button"
          disabled={isTypeSelect}
          onClick={() => handleGroupTypeChange(item.text)}
          className={`flex items-center justify-center text-white border ${
            groupType === item.text
              ? 'bg-white border-blue-500 text-blue-500'
              : 'bg-white border-cyan-500 text-cyan-500'
          } hover:bg-blue-500 hover:text-white hover:border-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium 
          rounded-lg text-sm px-5 py-2.5 text-center transition-all duration-300 h-12 w-full`}

        >
          <img src={item.img} style={{ width: 25, height: 25 }} alt={item.text} className="mr-2" />
          {item.text}
        </button>
      ))}
    </div>
    <form className="max-w-sm bg-gray-50 rounded-lg shadow-md">
    
    <select 
        id="members"
        className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block mt-3 w-full p-2.5
        dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 dark:focus:ring-gray-500 dark:focus:border-gray-500"
        onChange={handleMemberNameChange}
        disabled={isMemberText}
        value={memberName || ''}
    >
        <option value="" disabled selected className="bg-gray-200 dark:bg-gray-700">Choose a user</option>
        {userData.data.map((user) => (
            <option key={user.id} value={user.username} className="bg-gray-200 dark:bg-gray-700">
                {user.username}
            </option>
        ))}
    </select>
</form>
          <div style={styles.buttonView}>
          <button type="button"
          onClick={handleAddMember}
          disabled={isButtonMember}
          class="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-6 py-2.5 text-center me-2 mb-2">ADD MEMBER</button>
{
!isIsGrpCreated && (
  <button
  type="button"
  onClick={()=>{
    isgroupEdit ? handleEditedGroup():  handleCreateGroup()
  }}
  disabled={!validateForm()}
  className={`text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-6 py-2.5 text-center me-2 mb-2 ${
    isgroupEdit ? '' :
    !validateForm()
     ? 'opacity-50 cursor-not-allowed' : ''
  }`}
>
{isgroupEdit ? 'EDIT GROUP' : 'CREATE GROUP' }  
</button>
)
} 
 


{
  isIsGrpCreated && !isgroupEdit && (
<button
  type="button"
  onClick={handleDone}
  className='text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-6 py-2.5 text-center me-2 mb-2'
>
 DONE 
</button>
  )
} 


 </div>
 <div class="mt-2 flex items-center justify-center">
        {/* <button 
        onClick={logout}
        class="relative inline-flex items-center 
        justify-center px-10 py-4 overflow-hidden font-mono font-medium tracking-tighter
        text-white bg-gray-800 rounded-lg group">
            <span class="absolute w-0 h-0 transition-all duration-500 ease-out bg-green-500 rounded-full group-hover:w-56 group-hover:h-56"></span>
            <span class="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
            <span class="relative">LOGOUT</span>
        </button> */}
    </div>
        </CardContent>
      </div>
 
{
  groups && (
<div style={{display: 'flex',
      maxHeight: '300px',
      overflowY: 'auto',
      scrollbarWidth: 'none',
      overflowY: 'auto', // Enable vertical scrolling 
         flexDirection: 'column', justifyContent: 'space-around', 
         width: '100%', maxWidth: '1000px' }}>
                    <h2 style={{ fontFamily: 'Lato', fontSize: 15, textAlign: 'center' }}>User Groups</h2>
         {groups.map((group, index) => (
          <GroupItem 
          key={index} group={group} id={group.groupID} elementId={index} onClick={handleGrpClick} />
        ))}
      </div>
  )
  
}
   
    </div>
  );
}

export default GroupScreen;

