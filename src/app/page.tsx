'use client'
import Menu from "@/components/Menu";
import itens from '../json/item.json'
import styled from "styled-components";
import Card from "@/components/Card";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Item } from "@/interface/item";
import { carrinho, favoritos } from "@/states/atom";
import { useEffect } from 'react'
import Rodape from "@/components/Rodape";
import { useListaDeDesejos } from "@/states/hooks/useListaDeDesejos";
import { useRemoverListaDeDesejos } from "@/states/hooks/useRemoverListaDeDesejos";
import { useCarrinho } from "@/states/hooks/useCarrinho";
import { useRemoverCarrinho } from "@/states/hooks/useRemoverCarrinho";

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

    const setListaFavoritos = useSetRecoilState<Item[]>(favoritos)
    const setListaCarrinho = useSetRecoilState<Item[]>(carrinho)
    
    const adicionarListaDeDesejos = useListaDeDesejos()
    const removerListaDeDesejos = useRemoverListaDeDesejos()
    const adicionarCarrinho = useCarrinho()
    const removerCarrinho = useRemoverCarrinho()
    
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
        adicionarListaDeDesejos(item)
    }

    function handleOfFavorite(item: Item){
        removerListaDeDesejos(item)
    }

    function handleCarrinho(item: Item){
        adicionarCarrinho(item)
    }
    
    function handleOfCarrinho(item: Item){
        removerCarrinho(item)
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