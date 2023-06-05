'use client'
import Menu from "@/components/Menu";
import { carrinho } from "@/states/atom";
import Image from "next/image";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useEffect } from 'react'
import { RiDeleteBin6Fill } from 'react-icons/ri'
import styled from "styled-components";
import { Item } from "@/interface/item";

const ContainerItensCarrinho = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    width: 90%;
    margin: 4rem auto 0 auto;
    .titulo-sem-itens{
        font-size: 1.5rem;
        text-align: center;
    }
    button{
        margin-top: 5rem;
        padding: 1rem;
    }
    button:hover{
        cursor: pointer;
    }
@media screen and (min-width: 768px){
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    margin-top: 4rem;
    .titulo-sem-itens{
        font-size: 2rem;
    }
    button{
        margin-top: 5rem;
        padding: 1rem;
    }
    button:hover{
        cursor: pointer;
    }
}
`

const ItemCarrinho = styled.div`
width: 90%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    img{
        width: 50px;
        height: 50px;
    }
    svg{
        font-size: 1.5rem;
    }
    @media screen and (min-width: 768px){
        width: 500px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        img{
            width: 80px;
            height: 80px;      
        }
        h3{
            font-size: 1.5rem;
        }
        svg{
            font-size: 2rem;
        }
        svg:hover{
            cursor: pointer;
        }
}
`

export default function Carrinho() {
    const listaCarrinho = useRecoilValue(carrinho)
    const setListaCarrinho = useSetRecoilState(carrinho)

    useEffect(() => {
        const listaDeCarrinhoLocalStorage = localStorage.getItem('listaCarrinho')
        const listaDeCarrinhoLocalStorageConvertida = JSON.parse(listaDeCarrinhoLocalStorage || '[]')
        setListaCarrinho(listaDeCarrinhoLocalStorageConvertida)
    },[setListaCarrinho])


    function removerDoCarrinho(item: Item){
        const listaAtualizada = listaCarrinho.filter(itemDaLista => itemDaLista.id !== item.id)
        setListaCarrinho(listaAtualizada)
        localStorage.setItem('listaCarrinho', JSON.stringify(listaAtualizada))
    }

    return (
        <>
            <Menu />
            <ContainerItensCarrinho>
            {listaCarrinho.length === 0
                ? <h2 className="titulo-sem-itens">Nao existem itens no carrinho</h2>
                : listaCarrinho.map((item, index) => (
                    <ItemCarrinho key={index}>
                        <Image src={`/imagens/imagem${item.id}.png`} width={80} height={80} alt={item.titulo} />
                        <h3>{item.titulo}</h3>
                        <RiDeleteBin6Fill onClick={() => removerDoCarrinho(item)}/>
                    </ItemCarrinho>
                ))
            }
            {listaCarrinho.length !== 0 ? <button>Finalizar compra</button> : null}
            </ContainerItensCarrinho>
        </>
    )
}