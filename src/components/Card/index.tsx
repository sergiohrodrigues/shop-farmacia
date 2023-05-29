import { Item } from "@/interface/item"
import Image from "next/image"
import React, { useState } from "react"
import styled from "styled-components"
import { MdFavoriteBorder, MdFavorite} from 'react-icons/md'
import { BsCart2 } from 'react-icons/bs'
import Modal from "../Modal"

const Item = styled.div`
    width: 20%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    text-align: center;
    position: relative;
    padding: 1rem 0;
    &:hover{
        cursor: pointer;
        border: 1px solid #000;
        border-radius: 1rem;
    }
    svg{
        position: absolute;
        top: 5%;
        right: 5%;
        font-size: 2rem;
        z-index: 99;
    }
    .modalopen{
        opacity: 0.5;
    }
`

const Div1 = styled.div`
position: relative;
    button{
        position: absolute;
        bottom: 2%;
        left: 20%;
        padding: 0.3rem;
        &:hover{
            cursor: pointer;
        }
    }
    img{
        width: 150px;
        height: 200px;
    }
`

const Div2 = styled.div`
    margin-top: 0.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    h2{
        padding: 0 1rem;
    }
    .carrinho{
        position: static;
    }
    button{
        width: 190px;
        padding: 0.5rem;
        display: flex;
        align-items: center;
        gap: 0.2rem;
    }
    button:hover{
        cursor: pointer;
    }
`

interface Props {
    item: Item
}


export default function Card({item}: Props) {
    
    // const [mostrarMensagemDeTitulo, setMostrarMensagemDeTitulo] = useState('')
    const [iconFavorite, setIconFavorite] = useState(false)
    const [listaFavorita, setListaFavorita] = useState<Item[]>([])
    const [imagemDois, setImagemDois] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)

    function favoritarItem(){
        setIconFavorite(true)
        setListaFavorita([...listaFavorita, {...item}])
    }

    function desfavoritarItem(){
        setIconFavorite(false)
    }

    function mostrarModal(){
        setModalOpen(true)
    }

    return (
        <>
        <Item onMouseEnter={() => setImagemDois(true)} onMouseLeave={() => setImagemDois(false)}>
            {!iconFavorite ? <MdFavoriteBorder onClick={favoritarItem}/> : <MdFavorite onClick={desfavoritarItem}/>}
            <Div1>
                {!imagemDois ? <Image src={`/imagens/imagem${item.id}.png`} width={100} height={150} alt={item.titulo}/> : <Image src={`/imagens/imagem${item.id}-${item.id}.png`} width={100} height={150} alt={item.titulo}/>}
                {imagemDois ? <button onClick={mostrarModal}>Mais detalhes</button> : ''}
            </Div1>
            <Div2>
                <h2>{item.titulo}</h2>
                <span>Valor: R${item.valor},00</span>
                <button>Adicionbar ao carrinho <BsCart2 className="carrinho"/></button> 
            </Div2>
        </Item>
        <Modal modalOpen={modalOpen} setModalOpen={setModalOpen} item={item}/>
        </>
    )
}