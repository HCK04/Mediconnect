const initialState = {
  AllUsers: [
    {
      id: 1,
      first_name: "Tari9",
      last_name: "Dr.",
      role: "Médecin",
      roleCode: 1,
      adress: "123 Main St",
      maladie: { id: 1, maladie: "tari9" },
      Tel: "123-456-7890",
      date: "12/01/2023",
      imageUrl: "https://robohash.org/mail@ashallendesign.co.uk",
    },
    {
      id: 2,
      first_name: "7amouda",
      last_name: "Belakoul",
      role: "Patient",
      roleCode: 2,
      adress: "456 Oak St",
      maladie: { id: 2, maladie: "rkabi" },
      Tel: "987-654-3210",
      date: "15/02/2022",
      imageUrl: "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250",
    },
    {
      id: 3,
      first_name: "Lokmane",
      last_name: "Dr.",
      role: "patient",
      roleCode: 2,
      adress: "789 Pine St",
      maladie: { id: 3, maladie: "dajaj" },
      Tel: "654-321-9870",
      date: "08/11/2021",
      imageUrl: "https://i.pravatar.cc/250?u=mail@ashallendesign.co.uk",
    },
  ],
};


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