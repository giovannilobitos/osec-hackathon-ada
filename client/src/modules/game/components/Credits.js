import React from 'react';
import { credits } from '/lib/assets/images';

export default function Credits() {
    return (
        <main className="wrap passcode-form" style={{ background: `url(${credits['backdrop']}) no-repeat center` , backgroundSize: "cover" , width: "100%", height: "100%" , position: "fixed"}}>
            <h1 className="title endTitle">Thank you for playing!</h1>
            <div className=""></div>
        </main>
    )
}