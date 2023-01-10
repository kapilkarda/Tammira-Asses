const initialState = {
    HOME_LIST_RES:'',
    ADD_POST_RES:''
  }
  
  const HomeReducer = (state = initialState, action) => {
    switch (action.type) {
     
        case 'GetPostLists':
          return{...state, HOME_LIST_RES : action.payload , loading:false};

        case 'AddPost':
          return{...state, ADD_POST_RES : action.payload , loading:false};

      default:
        return state;
    }
  };
  
   export default HomeReducer;
  
  