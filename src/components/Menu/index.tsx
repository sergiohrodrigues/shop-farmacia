import { carrinho, favoritos } from "@/states/atom";
import { Badge } from "@mui/material";
import Link from "next/link";
import { useRecoilValue } from "recoil";
import styled from 'styled-components'

const HeaderContainer = styled.header`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem 0;
    gap: 1rem;
    background-color: #278a5b;
    ul{
      display: flex;
      gap: 1rem;
    }
@media screen and (min-width: 768px){
    flex-direction: row;
    justify-content: space-evenly;
    background-color: #278a5b;
    gap: 0;
    ul{
      gap: 2rem;
      a:hover{
        color: #fff;
      }
    }
}
`

export default function Menu() {
    const listaDeFavoritos = useRecoilValue(favoritos)
    const listaDeCarrinho = useRecoilValue(carrinho)

    return (
        <HeaderContainer>
            <Link href='/'>
                <span>L O G G U</span>
            </Link>
            <ul>
                <Link href="/">
                    Inicio
                </Link>
            <Badge
              badgeContent={listaDeFavoritos.length}
              color="primary"
            >
                <Link href="/favorite">
                    Lista de Desejos
                </Link>
            </Badge>
            <Badge
              badgeContent={listaDeCarrinho.length}
              color="primary"
            >
                <Link href="/carrinho">
                    Carrinho
                </Link>
            </Badge>
            </ul>
        </HeaderContainer>
    )
}