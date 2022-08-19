import { NextPage } from "next";
import Head from "next/head";
import React, {useEffect, useRef} from "react";
import styles from "../styles/Faqs.module.css";
import {useRouter} from "next/router";
import useAuth from "../auth/auth.context";


const Login: NextPage = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();
    const {authenticated, login} = useAuth();

    useEffect(() => {
        if (authenticated){
            router.push("/")
        }
    }, [authenticated])

    const submitUser = async () => {
        const response = await fetch("/api/auth/login",{
            method: "POST"
        });
        const data = await response.json();
        const token = data.token;
        login(token);
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>RandomIn - Iniciar Sesión</title>
                <meta
                    name="description"
                    content="Iniciar Sesión"
                />
            </Head>
            <h2 className={styles.colorText}>Iniciar Sesión</h2>
                <div >
                    <h3>Username</h3>
                    <input type="text" ref={inputRef}/>
                    <br />
                    <br />
                    <button onClick={submitUser}>Ingresar</button>
                </div>
        </div>
    );
}

export default Login;