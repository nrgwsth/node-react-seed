const INITIAL_STATE = null

export default function(state=INITIAL_STATE, action){
	switch(action.type){
		case "SET_USER":
			return action.payload
		default:
			return state
	}
}