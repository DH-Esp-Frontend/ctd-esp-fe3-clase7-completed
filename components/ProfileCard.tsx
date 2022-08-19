import styles from "../styles/Home.module.css";
import Image from "next/image";
import {FC} from "react";
import {useRouter} from "next/router";
import UserType from "../types/UserType";

type Props = {
    id: number;
    user: UserType;
    viewDetails?: boolean;
}

const ProfileCard:FC<Props> = ({id, user, viewDetails}: Props) => {
    const router = useRouter();
    const {
        email,
        picture: {medium},
        name: {first, last},
        login: {username},
    } = user;
    return  <div className={styles.card} key={username}>
        <picture className={styles.avatar}>
            <Image
                src={medium}
                alt={first}
                layout="fixed"
                width={100}
                height={100}
            />
        </picture>
        <h2>{`${first} ${last}`}</h2>
        <p>{username}</p>
        <p>{email}</p>
        {viewDetails &&
            <div>
                <br />
                <button onClick={() => router.push("/profile/" + id)}>Ver perfil</button>
            </div>
        }
    </div>
}
export default ProfileCard;
