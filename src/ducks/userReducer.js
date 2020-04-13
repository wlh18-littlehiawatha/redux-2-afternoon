// CREATE AN INITIAL STATE OBJECT THAT WILL EVENTUALLY BE USED TO SET AN INITIAL STATE PROPERTY ON THE REDUX STORE AFTER BEING PASSED THROUGH THE REDUCER

const initialState = {
   email: null,
   firstName: null,
   lastName: null
}

// EXPORT DEFAULT A REDUCER FUNCTION THAT RETURNS A STATE OBJECT TO THE STORE
export default function reducer(state = initialState, action) {
   return state;
}