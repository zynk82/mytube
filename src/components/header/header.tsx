import React, {MouseEvent, SyntheticEvent, useRef} from 'react';
import styles from './header.module.css';
import search from '../../assets/search-icon.png';
import youtube from '../../assets/youtube-logo.png';

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
            <img className={styles.logo}
                 onClick={onHomeClick}
                 src={youtube}/>

            <form ref={formRef} className={styles.inputform} onSubmit={onSubmit}>
                <div className={styles.formcontainer}>
                    <input ref={textRef} className={styles.inputtext}
                           type='text' placeholder='Search...'/>
                    <input type='button' className={styles.clear} onClick={onClearClick} value='X'/>
                </div>
                <input type='image' className={styles.search}
                       src={search}/>
            </form>
        </header>
    );
};

export default Header;