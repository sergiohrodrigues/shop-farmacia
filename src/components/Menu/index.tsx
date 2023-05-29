import Link from "next/link";
import styled from 'styled-components'

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-evenly;
  padding: 1rem 0;
  background-color: #278a5b;
  ul{
    display: flex;
    gap: 2rem;
    a:hover{
      color: #fff;
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