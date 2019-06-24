export default function userReducer(
  state = {name:"",money:0,toys:0,medicine:0,food:0},
  action) {
  switch(action.type) {
    case "RESET_USER":
      return {name:"",money:0,toys:0,medicine:0,food:0};
    case "SET_NAME":
      return {...state, name: action.name};
    case "ADD_MONEY":
      return {...state,
        money: state.money+action.change};
    case "SUBTRACT_MONEY":
      return {...state,
        money: Math.max(0,state.money-action.change)};
    case "ADD_TOYS":
      return {...state,
        toys: state.toys+action.change};
    case "SUBTRACT_TOYS":
      return {...state,
        toys: Math.max(0,state.toys-action.change)};
    case "ADD_MEDICINE":
        return {...state,
          medicine: state.medicine+action.change};
    case "SUBTRACT_MEDICINE":
      return {...state,
        medicine: Math.max(0,state.medicine-action.change)};
    case "ADD_FOOD":
        return {...state,
          food: state.food+action.change};
    case "SUBTRACT_FOOD":
      return {...state,
        food: Math.max(0,state.food-action.change)};
    default:
      return state;
  }
}

