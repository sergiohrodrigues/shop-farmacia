import styled from "styled-components"
import { AiOutlineCloseCircle} from 'react-icons/ai'
import Image from "next/image"
import { Item } from "@/interface/item"
import { useState } from 'react'
import { BsCart2 } from 'react-icons/bs'
import { useEffect } from 'react'

interface PropsStyledComponents {
    display: string
}

const ModalBackDrop = styled.section<PropsStyledComponents>`
    width: 100vw;
    height: 90vh;
    background-color: transparent;
    display: ${props => props.display};
    position: fixed;
    z-index: 999;
    top: 7%;
    overflow-y: visible;
@media screen and (min-width: 768px){
    height: 100vh;
    top: 0;
}
`

const ModalContainer = styled.div`
    width: 90%;
    margin: -2rem auto 0 auto;
    padding: 1rem 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    gap: 0.5rem;
    background-color: gray;
    z-index: 999;
    pointer-events: visible;
    position: relative;
    svg{
        position: absolute;
        top: 1%;
        right: 1%;
        font-size: 2rem;
    }
@media screen and  (min-width: 768px){
    width: 70%;
    min-width: 853px;
    height: auto;
    padding: 3rem 2rem;
    flex-direction: row;
    justify-content: center;
    gap: 2rem;
    position: fixed;
    background-color: gray;
    top: 15%;
    left: 15%;
    z-index: 999;
    pointer-events: visible;
    svg{
        position: absolute;
        top: 1%;
        right: 1%;
        font-size: 2rem;
        &:hover{
            cursor: pointer;
        }
    }
}
`

const PrimeiraDiv= styled.div`
    display: flex;
    gap: 1rem;
    @media screen and (min-width: 768px){
        display: flex;
        flex-direction: column;
        gap: 1rem;
        img:hover{
            cursor: pointer;
            border: 1px solid #000;
        }
    }
`

const SegundaDiv= styled.div`
width: 100%;
height: 200px;
text-align: center;
img{
    width: 80%;
    max-width: 250px;
    height: 200px;
}
@media screen and (min-width: 768px){
    height: 400px;
    img{
        min-width: 400px;
        width: 100%;
        height: 400px;
    }
}
`

const TerceiraDiv= styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 1rem;
    button{
        width: 100%;
        max-width: 250px;
        justify-content: flex-end;
        padding: 1rem;
        text-transform: uppercase;

        display: flex;
        align-items: center;
        gap: 1rem;
    }
    svg{
        position: static;
        font-size: 1.5rem;
    }
    span{
        font-size: 1.2rem;
        font-weight: 700;
    }
    h2{
        font-size: 1.2rem;
    }
    @media screen and (min-width: 768px){
        align-items: flex-start;
        text-align: left;
        gap: 2rem;
        h2{
            font-size: 2rem;
        }
        button{
            margin-top: 3rem;
            min-width: 250px;
            justify-content: flex-end;
            &:hover{
                cursor: pointer;
            }
        }
    }
`

interface Props {
    modalOpen: boolean,
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
    item: Item
}

export default function Modal ({modalOpen, setModalOpen, item}: Props) {
    const [imagemPadrao, setImagemPadrao] = useState(`/imagens/imagem${item.id}.png`)

    function fecharModal(){
        setModalOpen(false)
        setImagemPadrao(`/imagens/imagem${item.id}.png`)
        disabledScrollBody(false)
    }

    useEffect(() => {
        disabledScrollBody(true)
    }, [])

    function disabledScrollBody(isDisable : boolean){
        if(typeof window !== undefined){
            document.body.style.overflow = isDisable ? 'hidden' : 'auto'
        }
    }


    return(
        <ModalBackDrop display={modalOpen ? 'flex' : 'none'}>
            <ModalContainer>
                <AiOutlineCloseCircle onClick={fecharModal} />

                <PrimeiraDiv>
                    <Image onClick={() => setImagemPadrao(`/imagens/imagem${item.id}.png`)} src={`/imagens/imagem${item.id}.png`} width={50} height={50} alt="Imagem1"/>
                    <Image onClick={() => setImagemPadrao(`/imagens/imagem${item.id}-${item.id}.png`)} src={`/imagens/imagem${item.id}-${item.id}.png`} width={50} height={50} alt="Imagem2"/>
                </PrimeiraDiv>

                <SegundaDiv>
                    <Image src={imagemPadrao} width={400} height={400} alt="Imagem1"/>
                </SegundaDiv>

                <TerceiraDiv>
                    <h2>{item.titulo}</h2>
                    <p>{item.descricao}</p>
                    <span>Valor: R${item.valor},00</span>
                    <button>Adicionar ao Carrinho <BsCart2 className="carrinho"/></button>
                </TerceiraDiv>
            </ModalContainer>
        </ModalBackDrop>
    )
}