'use client'
import Card from '@/components/Card'
import Menu from '@/components/Menu'
import Rodape from '@/components/Rodape'
import { Item } from '@/interface/item'
import { carrinho, favoritos } from '@/states/atom'
import React, { useEffect, useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import styled from 'styled-components'

const ContainerFavorites = styled.section`
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin: 2rem auto;
  .titulo-sem-itens{
    font-size: 2rem;
    text-align: center;
  }
`

export default function Favorite() {
  const listaFavoritos = useRecoilValue(favoritos)
  const setListaFavoritos = useSetRecoilState<Item[]>(favoritos)
  const listaCarrinho = useRecoilValue(carrinho)
  const setListaCarrinho = useSetRecoilState<Item[]>(carrinho)

  useEffect(() => {
    const listaLocalStorage = localStorage.getItem('listaFavoritos')
    const listaLocalStorageConvertida = JSON.parse(listaLocalStorage || '[]')
    if(listaLocalStorageConvertida.length){
        setListaFavoritos(listaLocalStorageConvertida)
    } else {
        setListaFavoritos([])
    }
    
  }, [setListaFavoritos])

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
    <>
        <Menu />
        <ContainerFavorites>
          {listaFavoritos.length === 0 
          ? <h2 className='titulo-sem-itens'>Sem itens na lista</h2>
          : listaFavoritos.map((item, index) => (
              <Card key={index} item={item} onFavorite={handleFavorite} offFavorite={handleOfFavorite} onCarrinho={handleCarrinho} offCarrinho={handleOfCarrinho}/>
            ))}
        </ContainerFavorites>
        {/* <Rodape /> */}
    </>
  )
}
