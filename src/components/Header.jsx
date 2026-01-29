import { Link} from "react-router-dom";

function Header(){
    return(
        <div className="conatainer">
            <Link to ='/'>Home</Link>
            <Link to ='/login'>Login</Link>

        </div>
    )
}