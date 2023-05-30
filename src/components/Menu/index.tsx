import Link from "next/link";
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
    return (
        <HeaderContainer>
            <Link href='/'>
                <span>L O G G U</span>
            </Link>
            <ul>
                <Link href="/">
                    Inicio
                </Link>
                <Link href="/">
                    Lista de Desejos
                </Link>
                <Link href="/">
                    Carrinho
                </Link>
            </ul>
        </HeaderContainer>
    )
}