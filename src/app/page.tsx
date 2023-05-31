'use client'
import Menu from "@/components/Menu";
import itens from '../json/item.json'
import styled from "styled-components";
import Card from "@/components/Card";
import { RecoilRoot, useSetRecoilState } from "recoil";
import { Item } from "@/interface/item";
import { useState } from 'react'

const MainContainer = styled.main`
    position: relative;
    overflow-y: hidden;
`
    
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

    const [listaFavorita, setListaFavorita] = useState<Item[]>([])

    function handleFavorite(item: Item){
        setListaFavorita([...listaFavorita, item])
    }

    function handleOfFavorite(item: Item){
        const listaAtualizada = listaFavorita.filter(itemDaLista => itemDaLista.id !== item.id)
        setListaFavorita(listaAtualizada)
    }

    // const setlistaFavoritos = useSetRecoilState(listaDeDesejos)

    console.log(listaFavorita)
    return (
        <RecoilRoot>
            <MainContainer>
                <Menu />
                {/* <ProdutosContainer pointer={modalOpen ? 'none' : 'visible'}> */}
                <ProdutosContainer>
                    {itens.itens.map((item, index) => (
                        <Card key={index} item={item} onFavorite={handleFavorite} offFavorite={handleOfFavorite}/>
                        ))}
                </ProdutosContainer>
            </MainContainer>
        </RecoilRoot>
    )
}