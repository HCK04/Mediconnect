export const initialState = {
  AllUsers: [
    {
      id: 1,
      first_name: "Tariq",
      last_name: "Dr.",
      role: "Médecin",
      roleCode: 1,
      adress: "123 Main St",
      specialite: { id: 1, specialite: "Cardiologie" },
      tel: "123-456-7890",
      date: "12/01/2023",
      imageUrl: "https://randomuser.me/api/portraits/men/10.jpg",
      etoile: 3,
      availableTimes: [
        "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"
      ],
      bookedTimes: ["10:00", "14:00"]
    },
    {
      id: 2,
      first_name: "Karim",
      last_name: "Mouhoub",
      role: "Médecin",
      roleCode: 1,
      adress: "101 Elm St",
      specialite: { id: 2, specialite: "Dermatologie" },
      tel: "321-654-0987",
      date: "21/06/2020",
      imageUrl: "https://randomuser.me/api/portraits/men/11.jpg",
      etoile: 4,
      availableTimes: [
        "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"
      ],
      bookedTimes: ["11:00", "10:00"]
    },
    {
      id: 3,
      first_name: "Nassim",
      last_name: "Dr.",
      role: "Médecin",
      roleCode: 1,
      adress: "890 Birch St",
      specialite: { id: 3, specialite: "Neurologie" },
      tel: "555-666-7777",
      date: "18/07/2021",
      imageUrl: "https://randomuser.me/api/portraits/men/12.jpg",
      etoile: 5,
      availableTimes: [
        "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"
      ],
      bookedTimes: ["08:00", "14:00", "13"]
    },
    {
      id: 4,
      first_name: "Yassine",
      last_name: "Belhadj",
      role: "Médecin",
      roleCode: 1,
      adress: "234 Maple St",
      specialite: { id: 4, specialite: "Ophtalmologie" },
      tel: "444-555-6666",
      date: "22/03/2022",
      imageUrl: "https://randomuser.me/api/portraits/men/13.jpg",
      etoile: 4,
      availableTimes: [
        "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"
      ],
      bookedTimes: ["12:00", "15:00"]
    },
    {
      id: 5,
      first_name: "Mehdi",
      last_name: "Zakaria",
      role: "Médecin",
      roleCode: 1,
      adress: "999 Redwood St",
      specialite: { id: 5, specialite: "Orthopédie" },
      tel: "123-987-6543",
      date: "14/04/2019",
      imageUrl: "https://randomuser.me/api/portraits/men/14.jpg",
      etoile: 3,
      availableTimes: [
        "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"
      ],
      bookedTimes: ["10:00", "17:00"]
    },
    {
      id: 6,
      first_name: "Sophie",
      last_name: "Lemoine",
      role: "Médecin",
      roleCode: 1,
      adress: "750 Champs-Élysées",
      specialite: { id: 6, specialite: "Pédiatrie" },
      tel: "321-123-4567",
      date: "05/05/2018",
      imageUrl: "https://randomuser.me/api/portraits/women/10.jpg",
      etoile: 5,
      availableTimes: ["08:00", "09:00", "10:00", "11:00", "12:00"],
      bookedTimes: ["09:00", "11:00"]
    },
    {
      id: 7,
      first_name: "Luc",
      last_name: "Martin",
      role: "Médecin",
      roleCode: 1,
      adress: "12 Rue de Paris",
      specialite: { id: 7, specialite: "Gastroentérologie" },
      tel: "456-789-0123",
      date: "08/11/2017",
      imageUrl: "https://randomuser.me/api/portraits/men/15.jpg",
      etoile: 4,
      availableTimes: ["10:00", "11:00", "12:00", "14:00"],
      bookedTimes: ["10:00"]
    }
  ]
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
