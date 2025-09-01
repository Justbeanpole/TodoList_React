import {ArrowRight} from "lucide-react";
import {useNavigate} from "react-router-dom";

// MainPage에서 todo작성 후, Priority Page로 이동시켜주는 버튼
const NextButton = ({nextPath}) => {
    const navigate = useNavigate();
    return (
        <button className="bg-black hover:bg-gray-700 text-white font-bold rounded-full p-3 self-center absolute right-3"
        onClick={() => {navigate(nextPath)}}>
            <ArrowRight size={30}/>
        </button>
    )
}

export default NextButton;