const videoReducer=(state={data:null},action)=>
{
    switch(action.type)
    {
        case "POST_VIDEO":
            return {...state}

            case "POST_LIKE":
                return {...state}

                case "POST_VIEWS":
                    return {...state}

                    case "FETCH_ALL_VIDEOS":
                        console.log('Fetched videos in reducer:', action.payload); // Log fetched data
                        return { ...state, data: action.payload };
                        default:
                            return state
    }
}
export default videoReducer