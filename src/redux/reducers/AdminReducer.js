
const initialState = {AllUsers: [

    {
      name: "Dr. tari9",
      status: "Médecin",
      date: "12/01/2023",
      contact: "tari9@tari9.com",
      role: "Cardiologue",
      imageUrl: "https://robohash.org/mail@ashallendesign.co.uk",
    },
    {
      name: "7amouda belakoul",
      status: "Patient",
      date: "15/02/2022",
      contact: "9irat@tari9.com",
      role: "Patient",
      imageUrl: "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250",
    },
    {
      name: "Dr. lokmane",
      status: "Médecin",
      date: "08/11/2021",
      contact: "lokma@tari9.com",
      role: "Pédiatre",
      imageUrl: "https://i.pravatar.cc/250?u=mail@ashallendesign.co.uk",
    },
  ]};

  const Adminreducer = (state = initialState, action) =>{
    switch(action.payload){
        case "AJOUTER_USER": return {...state, AllUsers:[...state.AllUsers, action.payload]}
        default:
            return state
    }
  }

  export default Adminreducer