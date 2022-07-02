import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import React, { Component, useEffect } from "react";

export default function Home() {
  useEffect(() => {
    window.location.replace("/order");
  }, []);

  return <p>Hi Mom</p>;
}
