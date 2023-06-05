'use client'
import Menu from "@/components/Menu";
import itens from '../json/item.json'
import styled from "styled-components";
import Card from "@/components/Card";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Item } from "@/interface/item";
import { carrinho, favoritos } from "@/states/atom";
import { useState, useEffect } from 'react'
import Rodape from "@/components/Rodape";

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
    const listaCarrinho = useRecoilValue(carrinho)
    const setListaCarrinho = useSetRecoilState<Item[]>(carrinho)
    
    useEffect(() => {
        if(typeof window !== 'undefined'){
            const listaDeFavoritosLocalStorage = localStorage.getItem('listaFavoritos') || ""
            const listaDeFavoritosLocalStorageConvertida = JSON.parse(listaDeFavoritosLocalStorage || '[]')
            setListaFavoritos(listaDeFavoritosLocalStorageConvertida)

            const listaDoCarrinhoLocalStorage = localStorage.getItem('listaCarrinho') || ""
            const listaDoCarrinhoLocalStorageConvertida = JSON.parse(listaDoCarrinhoLocalStorage || '[]')
            setListaCarrinho(listaDoCarrinhoLocalStorageConvertida)
        } else {
            setListaFavoritos([])
            setListaCarrinho([])
        }
    }, [setListaFavoritos, setListaCarrinho])

    function handleFavorite(item: Item){
        const novaLista = [...listaFavoritos, item]
        setListaFavoritos(novaLista)
        localStorage.setItem('listaFavoritos', JSON.stringify(novaLista));
    }
    
    function handleOfFavorite(item: Item){
        const listaAtualizada = listaFavoritos.filter(itemDaLista => itemDaLista.id !== item.id)
        setListaFavoritos(listaAtualizada)
        localStorage.setItem('listaFavoritos', JSON.stringify(listaAtualizada));
    }

    function handleCarrinho(item: Item){
        const novaListaDeCarrinho = [...listaCarrinho, item] 
        setListaCarrinho(novaListaDeCarrinho)
        localStorage.setItem('listaCarrinho', JSON.stringify(novaListaDeCarrinho))
    }
    
    function handleOfCarrinho(item: Item){
        const listaDeCarrinhoAtualizada = listaCarrinho.filter(itemdDaLista => itemdDaLista.id !== item.id)
        setListaCarrinho(listaDeCarrinhoAtualizada)
        localStorage.setItem('listaCarrinho', JSON.stringify(listaDeCarrinhoAtualizada))
    }

    return (
        <MainContainer>
            <Menu />
            <ProdutosContainer>
                {itens.itens.map((item, index) => (
                    <Card key={index} item={item} onFavorite={handleFavorite} offFavorite={handleOfFavorite} onCarrinho={handleCarrinho} offCarrinho={handleOfCarrinho}/>
                    ))}
            </ProdutosContainer>
            {/* <Rodape /> */}
        </MainContainer>
    )
}