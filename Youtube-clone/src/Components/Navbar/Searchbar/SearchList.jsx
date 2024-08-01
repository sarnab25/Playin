import { FaSearch } from "react-icons/fa"
import "./SearchList.css"
export default function SearchList({titleArray,setsearchQuery})
{
    return (
        <>
        <div className="container_searchlist">
            {
                titleArray.map(m=>
                    {
                        return(
<p className="titleItem" key={m} onClick={e=>setsearchQuery(m)}>
    
                <FaSearch/>
                {m}
            </p>
                 ) }
                )
            }
            

        </div>
        </>
    )
}