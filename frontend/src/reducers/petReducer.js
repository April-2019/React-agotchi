export default function petReducer(
  state = {id:0,name:"",age:0,health:0,happiness:0,type:"",hunger:0,stage:0,epitaph:""},
  action) {
    switch(action.type) {
      case "RESET_PET":
        return {id:0,age:0,health:0,happiness:0,type:"",hunger:0,stage:0,epitaph:""};
      case "SET_PET_NAME":
        return {...state, name: action.name};
      case "SET_PET_ID":
        return {...state, id: action.id};
      case "ADD_HEALTH":
        return {...state,
          health: Math.min(10,state.health+action.change)};
      case "SUBTRACT_HEALTH":
        return {...state,
          health: Math.max(0,state.health-action.change)};
      case "ADD_HAPPINESS":
          return {...state,
            happiness: Math.min(10,state.happiness+action.change)};
      case "SUBTRACT_HAPPINESS":
        return {...state,
          happiness: Math.max(0,state.happiness-action.change)};
      case "ADD_HUNGER":
          return {...state,
            hunger: Math.min(10,state.hunger+action.change)};
      case "SUBTRACT_HUNGER":
        return {...state,
          health: Math.max(0,state.hunger-action.change)};
      case "ADD_AGE":
          return {...state,
            age: state.age+action.change};
      case "ADD_STAGE":
        return {...state,
          stage: state.stage+action.change};
      case "SET_TYPE":
        return {...state,
          type: action.pokemonType};
      case "SET_EPITAPH":
        return {...state,
          epitaph: action.epitaph};
      default:
        return state;
    }
}
