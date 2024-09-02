
import { useState } from 'react';
import './styles.css'

type Props = {
    onSearch: Function;
}



export default function ({ onSearch }: Props) {

    function handleResetClick(){
        setText("");
        onSearch(text);
    }

    function handleChange(event: any) {
        setText(event.target.value);

    }

    const [text, setText] = useState("");

    function handleSubmit(event: any) {
        event.preventDefault();
        onSearch(text);
    }
    return (
        <form className="dsc-search-bar" onSubmit={handleSubmit}>
            <button type="submit">🔎︎</button>
            <input
                type="text"
                value={text}
                placeholder="Nome do produto"
                onChange={handleChange}
            />
            <button  onClick={handleResetClick}>🗙</button>
        </form>

    );
}


