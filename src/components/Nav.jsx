import { useEffect, useState } from "react";

export default function Nav(){
    const [show, setShow] = useState(false);

    // Scrollbar Effekt
    useEffect(()=>{
        window.addEventListener('scroll',()=>{
            if(window.scrollY > 100){
                setShow(true);
            }else setShow(false);
        });
        return ()=>{
            window.removeEventListener("scroll");
        }
    },[])

    // Navigation wird dynamisch erzeugt
    return(
        <div className={`nav ${show && "nav_black"}`}>
            <img 
            className="nav_logo"
            alt="Netflix Logo"
            src="./public/nutflex.svg"
            />
            <img 
            className="nav_avatar"
            alt="Netflix Avatar"
            src="./public/netflix_avatar.svg"
            />

        </div>
    )
}