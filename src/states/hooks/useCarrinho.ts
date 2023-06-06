import { Item } from "@/interface/item"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { carrinho } from "../atom"

export const useCarrinho = () => {

    const listaCarrinho = useRecoilValue(carrinho)
    const setListaCarrinho = useSetRecoilState<Item[]>(carrinho)

    return(item: Item) => {
        const novaListaDeCarrinho = [...listaCarrinho, item]
        setListaCarrinho(novaListaDeCarrinho)
        localStorage.setItem('listaCarrinho', JSON.stringify(novaListaDeCarrinho))

        return novaListaDeCarrinho
    }
}