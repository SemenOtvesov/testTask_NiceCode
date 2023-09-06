import { Tuser } from "@js/types/mainTypes";
import React from "react";

const imgUserLogoPath:string = './img/userLogo/'

export default (user: Tuser, imgIconPath:string )=>{
    return <li id="userButton" data-uid={user.uid} key={Math.random()} className="main__user whiteBox">
            <picture className="main__user-preview">
                <source srcSet={`${imgUserLogoPath}${user.namePreview}.webp`}/>
                <img src={`${imgUserLogoPath}${user.namePreview}.png`} alt='' />
            </picture>
            <div className="main__user-text">{user.name}</div>

            {markContent(user.checkMark, imgIconPath)}
        </li>
}

function markContent(checkMark: '' | 'tme' | 'warn', imgIconPath: string){
    if(checkMark === 'tme'){return <div className="main__user-icon tme icon-tme"/> }
    if(checkMark === 'warn'){return <div className="main__user-icon warn icon-warn"/>}
    return <></>
}