'use client'
import Menu from "@/components/Menu";
import { carrinho } from "@/states/atom";
import Image from "next/image";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useEffect, useState } from 'react'
import { RiDeleteBin6Fill } from 'react-icons/ri'
import styled from "styled-components";
import { Item } from "@/interface/item";
import Rodape from "@/components/Rodape";
import { useRemoverCarrinho } from "@/states/hooks/useRemoverCarrinho";

const ContainerItensCarrinho = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    width: 90%;
    margin: 2rem auto 0 auto;
    .titulo-sem-itens{
        font-size: 2rem;
        text-align: center;
    }
    span{
        margin-top: 2rem;
        font-size: 1.2rem;
        font-weight: 700;
    }
    button{
        padding: 1rem;
    }
    button:hover{
        cursor: pointer;
    }
    h4{
        text-align: center;
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
    span{
        font-size: 1.5rem;
    }
    button{
        padding: 1rem;
    }
    button:hover{
        cursor: pointer;
    }
}
`

const ItemCarrinho = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    img{
        width: 50px;
        height: 50px;
    }
    h3{
        width: 100px;
        font-size: 1rem;
    }
    span{
        margin: 0;
        font-size: 1rem;
    }
    svg{
        font-size: 1.5rem;
    }
    @media screen and (min-width: 768px){
        width: 700px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        img{
            width: 80px;
            height: 80px;      
        }
        h3{
            width: 260px;
            font-size: 1.5rem;
        }
        span{
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
    const listaCarrinho = useRecoilValue<Item[]>(carrinho)
    const setListaCarrinho = useSetRecoilState(carrinho)
    const valoresNaLista = listaCarrinho.map(itemDaLista => itemDaLista.valor)
    const [compraFinalizada, setCompraFinalizada] = useState(false)

    const removerCarrinho = useRemoverCarrinho()
    
    let soma = 0
    const somarValoresDaLista = () => {
        for(var i = 0; i < valoresNaLista.length; i++){
            soma += valoresNaLista[i]
        }
    }
    somarValoresDaLista()

    useEffect(() => {
        const listaDeCarrinhoLocalStorage = localStorage.getItem('listaCarrinho')
        const listaDeCarrinhoLocalStorageConvertida = JSON.parse(listaDeCarrinhoLocalStorage || '[]')
        setListaCarrinho(listaDeCarrinhoLocalStorageConvertida)
    },[setListaCarrinho])
    
    function removerDoCarrinho(item: Item){
        removerCarrinho(item)
    }

    const finalizarCompra = () => {
        setCompraFinalizada(true)
        setListaCarrinho([])
        localStorage.setItem('listaCarrinho', JSON.stringify([]))
    }

    return (
        <>
            <Menu />
            {compraFinalizada 
                ? <h4 style={{textAlign:'center', marginTop:'2rem', fontSize:'2rem'}}>Compra finalizada com sucesso! <br/> verifique seu e-mail para mais detalhes.</h4>
                : <ContainerItensCarrinho>
                    {listaCarrinho.length === 0
                        ? <h2 className="titulo-sem-itens">Nao existem itens no carrinho</h2>
                        : listaCarrinho.map((item, index) => (
                            <ItemCarrinho key={index}>
                                <Image src={`/imagens/imagem${item.id}.png`} width={80} height={80} alt={item.titulo} />
                                <h3>{item.titulo}</h3>
                                <span>R${item.valor},00</span>
                                <RiDeleteBin6Fill onClick={() => removerDoCarrinho(item)}/>
                            </ItemCarrinho>
                        ))
                    }
                    {listaCarrinho.length !== 0 ? <span>Valor total = R${soma},00 reais.</span> : null}
                    {listaCarrinho.length !== 0 ? <button onClick={finalizarCompra}>Finalizar compra</button> : null}
                </ContainerItensCarrinho>
            }
            {/* <Rodape /> */}
        </>
    )
}