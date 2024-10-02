import ButtonPrimary from "../ButtonPrimary";
import ButtonSecond from "../ButtonSecond";



type Props = {
    message: string;
    onDialogAnswer: Function;
}

export default function DialogConfirmation({ message, onDialogAnswer }: Props) {
    return (
        <div className="dsc-dialog-background" onClick={() => onDialogAnswer(false)} >
            <div className="dsc-dialog-box" onClick={(event)=> event.stopPropagation()}>
                <h2>{message}</h2>
                <div className="dsc-dialog-btn-container" >

                    <div onClick={() => onDialogAnswer(false)}>
                    <ButtonPrimary text="Não" />
                    </div>

                    <div onClick={() => onDialogAnswer(true)}>
                    <ButtonSecond text="Sim" />
                    </div>
                    
                  
                </div>

                

            </div>
        </div>
    )
}