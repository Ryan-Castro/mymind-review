import { useState } from "react";
import Head from "next/head";
import Header from "../public/components/Header";
import NavBar from '../public/components/NavBar';
import Card from "../public/components/card";




export default function home(){

    const [navBar, setnavBar] = useState("flex")

    function show(){
        if(navBar == "flex" ){
            setnavBar("none")
        } else {
            setnavBar("flex")
        }
    } 


    return(
        <div>
            <Head>
                <title>mymind-review</title>
            </Head>
            <Header show={show}></Header>
            <NavBar navBar={navBar}></NavBar>
            <div className="content">
                <Card></Card>
                <Card></Card>
                <Card></Card>
                <Card></Card>

            </div>
        </div>
    )
}