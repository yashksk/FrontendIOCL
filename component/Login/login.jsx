import Image from 'next/image';
import styles from './login.module.css'
import { useRef } from 'react';
import { useCookies } from "react-cookie"

export default function Login({ setLoggedin }) {
    const [cookie, setCookie] = useCookies(["user"])
    const userName = useRef();
    const pass = useRef();
    async function handleClick() {
        try {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                "userName": userName.current.value,
                "password": pass.current.value
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            const response = await fetch("http://localhost:3001/auth/login", requestOptions);
            const jsonResponse = await response.json();

            if (response.status != 200) {
                alert(jsonResponse.msg)
            } else {
                setCookie("user", JSON.stringify(jsonResponse.token), {
                    path: "/",
                    maxAge: 3600000, // Expires after 1hr
                    sameSite: true,
                })

                setLoggedin(true)
            }
        } catch (error) {
            alert(error)
        }
    }
    return (
        <div className={styles.background}>
            <div className={styles.header}>
                <Image src="/images/logo.svg" height={413} width={508} />
            </div>
            <div className={styles.heading}>
                <div className={styles.login}>Login</div>
                <input placeholder='User Name' className={styles.input} ref={userName} />
                <input placeholder='Password' type='password' className={styles.input} ref={pass} />
            </div>
            <button onClick={handleClick} className={styles.loginButton}>Login</button>
        </div>
    );
}