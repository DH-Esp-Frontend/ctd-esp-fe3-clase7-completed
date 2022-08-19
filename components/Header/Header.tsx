import React, { FC, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/Header.module.css";
import useAuth from "../../auth/auth.context";

const Header: FC = () => {
  const {authenticated, logout} = useAuth();

  return (
    <header className={styles.header}>
      <Image src="/red.png" layout="fixed" width={50} height={50} alt="logo" />
      <Link href="/">Home</Link>
      <Link href="/faqs">Preguntas Frecuentes</Link>
      { !authenticated && <Link href="/login">Iniciar Sesión</Link> }
      { authenticated && <button onClick={logout}>Salir</button> }
    </header>
  );
};

export default Header;
