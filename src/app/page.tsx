'use client'
import Menu from "@/components/Menu";
import itens from '../json/item.json'
import styled from "styled-components";
import Card from "@/components/Card";
import Modal from "@/components/Modal";
import { useState } from 'react'

const MainContainer = styled.main`
    position: relative;
    overflow-y: hidden;
`

interface Props {
    pointer: string
}
    
const ProdutosContainer = styled.section`
    width: 90%;
    margin: 2rem auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 2rem;
    `
    /* pointer-events: ${props => props.pointer}; */

export default function Home() {

    return (
        <MainContainer>
            <Menu />
            {/* <ProdutosContainer pointer={modalOpen ? 'none' : 'visible'}> */}
            <ProdutosContainer>
                {itens.itens.map((item, index) => (
                    <Card key={index} item={item}/>
                ))}
            </ProdutosContainer>
        </MainContainer>
    )
}