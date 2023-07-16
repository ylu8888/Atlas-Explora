import React from 'react';
import style from './event.module.css';

const Header = () => {
    return (
        <div className={style.header}>
            
             <div className={style.logo}> ATLAS EXPLORA </div>
             <div className={style.about}>Travel back in time to explore a plethora of historical events and famous figures</div>
        
        </div>
       
    )
};

export default Header;