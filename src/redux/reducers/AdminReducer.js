
const initialState = {AllUsers: [

    {
      id:1,
      name: "Dr. tari9",
      status: "Médecin",
      date: "12/01/2023",
      contact: "tari9@tari9.com",
      role: "Cardiologue",
      imageUrl: "https://robohash.org/mail@ashallendesign.co.uk",
    },
    {
      id:2,
      name: "7amouda belakoul",
      status: "Patient",
      date: "15/02/2022",
      contact: "9irat@tari9.com",
      role: "Patient",
      imageUrl: "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250",
    },
    {
      id:3,
      name: "Dr. lokmane",
      status: "Médecin",
      date: "08/11/2021",
      contact: "lokma@tari9.com",
      role: "Pédiatre",
      imageUrl: "https://i.pravatar.cc/250?u=mail@ashallendesign.co.uk",
    },
  ]};

  const Adminreducer = (state = initialState, action) =>{
    switch(action.type){
        case "AJOUTER_USER": 
          return {...state, AllUsers:[...state.AllUsers, action.payload]}




        case "SUPPRIMER_USER" : 
          const newList = state.AllUsers.filter((item)=>{
            return item.id != action.payload
          })
          return {...state,AllUsers:newList}







        case "MODIFIER_USER" :
          const updatedList = state.AllUsers.map((item)=>{
            if (item.id == action.payload.id){
              return item == action.payload
            }
            return item
          })
          return {...state,AllUsers:updatedList}

        default:
            return state
    }
  }

  export default Adminreducer