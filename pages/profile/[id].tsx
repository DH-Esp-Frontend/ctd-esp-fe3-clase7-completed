import { NextPage } from "next";
import Head from "next/head";
import React, {useEffect, useRef, useState} from "react";
import styles from "../../styles/Faqs.module.css";
import {useRouter} from "next/router";
import UserType from "../../types/UserType";
import ProfileCard from "../../components/ProfileCard";


const Profile: NextPage = () => {
    const router = useRouter();
    const {id} = router.query;
    const [user, setUser] = useState<UserType | null>(null);

    useEffect( () => {
        if (id) {
            // Crear una funcion que retorne el token en el contexto.
            const token = localStorage.getItem("AUTH_TOKEN");
            //
            fetch(`/api/profile/` + id, {
                headers: {
                    'Authorization': token || ''
                }
            }).then(async (res) => {
                const data = await res.json();
                setUser(data.data);
            });
        }
    }, [id])


    if (!id ) {
        return <></>
    }

    if (!user) return <>Cargando...</>

    return (
        <div className={styles.container}>
            <Head>
                <title>RandomIn - Perfil - {id}</title>
                <meta
                    name="description"
                    content="Perfil - {id"
                />
            </Head>
            <h2 className={styles.colorText}>Perfil - {id}</h2>
            <div >
                <ProfileCard user={user} id={parseInt(`${id}`,10)}/>
            </div>
        </div>
    );
};

export default Profile;
