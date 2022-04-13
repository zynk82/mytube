import React, {MouseEvent, SyntheticEvent, useRef} from 'react';
import styles from './header.module.css';

export type HeaderProps = {
    onSearch: (word: string) => void;
    onHomeClick: () => void;
};

const Header = ({onSearch, onHomeClick}: HeaderProps) => {
    const textRef = useRef<HTMLInputElement>(null);
    const formRef = useRef<HTMLFormElement>(null);

    const onSubmit = (e: SyntheticEvent) => {
        e.preventDefault();

        if (textRef.current) {
            onSearch(textRef.current.value);
        }
    };

    const onClearClick = (e: MouseEvent) => {
        e.preventDefault();

        if (formRef.current) {
            formRef.current.reset();
        }
    };

    return (
        <header>
            <img className={styles.logo} onClick={onHomeClick} src='/youtube-logo.png'/>

            <form ref={formRef} className={styles.input_form} onSubmit={onSubmit}>
                <div className={styles.form_container}>
                    <input ref={textRef} className={styles.input_text}
                           type='text' placeholder='Search...'/>
                    <input type='button' className={styles.clear} onClick={onClearClick} value='X'/>
                </div>
                <button className={styles.submit_button} type='submit'>
                    <img className={styles.search} src='/search-icon.png'/>
                </button>
            </form>
        </header>
    );
};

export default Header;