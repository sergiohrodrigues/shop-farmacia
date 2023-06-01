'use client'
import Menu from "@/components/Menu";
import itens from '../json/item.json'
import styled from "styled-components";
import Card from "@/components/Card";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Item } from "@/interface/item";
import { favoritos } from "@/states/favoritos";
import { useState, useEffect } from 'react'

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

export default function Home() {

    const listaFavoritos = useRecoilValue(favoritos)
    const setListaFavoritos = useSetRecoilState<Item[]>(favoritos)

    function handleFavorite(item: Item){
        const novaLista = [...listaFavoritos, item]
        setListaFavoritos(novaLista)
        localStorage.setItem('listaFavoritos', JSON.stringify(novaLista));
    }
    
    
    useEffect(() => {
        const listaLocalStorage = localStorage.getItem('listaFavoritos')
        const listaLocalStorageConvertida = JSON.parse(listaLocalStorage || '[]')
        if(listaLocalStorageConvertida.length){
            setListaFavoritos(listaLocalStorageConvertida)
        } else {
            setListaFavoritos([])
        }
    }, [setListaFavoritos])
    
    function handleOfFavorite(item: Item){
        const listaAtualizada = listaFavoritos.filter(itemDaLista => itemDaLista.id !== item.id)
        setListaFavoritos(listaAtualizada)
        localStorage.setItem('listaFavoritos', JSON.stringify(listaAtualizada));
    }

    // const iconIsFavorite = '<MdFavoriteBorder onClick={favoritarItem}/>'
    // const iconNoFavorite = '<MdFavorite onClick={desfavoritarItem}/>'

    // console.log(listaFavoritos)
    return (
        <MainContainer>
            <Menu />
            <ProdutosContainer>
                {itens.itens.map((item, index) => (
                    <Card key={index} item={item} onFavorite={handleFavorite} offFavorite={handleOfFavorite}/>
                    ))}
            </ProdutosContainer>
        </MainContainer>
    )
}