'use client'
import Card from '@/components/Card'
import Menu from '@/components/Menu'
import { Item } from '@/interface/item'
import { favoritos } from '@/states/favoritos'
import React, { useEffect } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import styled from 'styled-components'

const ContainerFavorites = styled.section`
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin: 2rem auto;
`

export default function Favorite() {

  const listaFavoritos = useRecoilValue(favoritos)
  const setListaFavoritos = useSetRecoilState<Item[]>(favoritos)

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

  useEffect(() => {
    const listaLocalStorage = localStorage.getItem('listaFavoritos')
    const listaLocalStorageConvertida = JSON.parse(listaLocalStorage || '[]')
    if(listaLocalStorageConvertida.length){
        setListaFavoritos(listaLocalStorageConvertida)
    } else {
        setListaFavoritos([])
    }
  }, [setListaFavoritos])

  return (
    <>
        <Menu />
        <ContainerFavorites>
          {listaFavoritos.map((item, index) => (
            <Card key={index} item={item} onFavorite={handleFavorite} offFavorite={handleOfFavorite}/>
            ))}
        </ContainerFavorites>
    </>
  )
}
