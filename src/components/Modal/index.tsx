import styled from "styled-components"
import { AiOutlineCloseCircle} from 'react-icons/ai'
import Image from "next/image"
import { Item } from "@/interface/item"
import { useState } from 'react'
import { BsCart2 } from 'react-icons/bs'

interface PropsStyledComponents {
    display: string
}

const ModalContainer = styled.section<PropsStyledComponents>`
    width: 90%;
    margin: 0 auto;
    padding: 1rem 1rem;
    display: ${props => props.display};
    flex-direction: column;
    gap: 1rem;
    position: fixed;
    background-color: gray;
    top: 5%;
    left: 4%;
    z-index: 999;
    pointer-events: visible;
    overflow-y: visible;
    svg{
        position: absolute;
        top: 1%;
        right: 1%;
        font-size: 2rem;
    }
@media screen and  (min-width: 768px){
    width: 70%;
    min-width: 853px;
    height: 70vh;
    padding: 3rem 2rem;
    display: ${props => props.display};
    flex-direction: row;
    gap: 4rem;
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
        font-size: 1.7rem;
        font-weight: 700;
    }
    @media screen and (min-width: 768px){
        align-items: flex-start;
        text-align: left;
        gap: 2rem;
        h2{
            font-size: 2rem;
        }
        button{
            width: 80%;
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
    }

    return(
        <ModalContainer display={modalOpen ? 'flex' : 'none'}>

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
    )
}