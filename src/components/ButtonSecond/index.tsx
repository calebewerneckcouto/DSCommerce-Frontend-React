
import './styles.css'


type Props = {
    text: string;
}

export default function ButtonSecond({text}:Props) {
    return (
        <div className="dsc-btn dsc-btn-white">
            {text}
        </div>
    );
}