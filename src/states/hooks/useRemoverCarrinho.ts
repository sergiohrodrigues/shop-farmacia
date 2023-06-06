import { useRecoilValue, useSetRecoilState } from "recoil"
import { carrinho } from "../atom"
import { Item } from "@/interface/item"

export const useRemoverCarrinho = () => {

    const listaCarrinho = useRecoilValue(carrinho)
    const setListaCarrinho = useSetRecoilState<Item[]>(carrinho)

    return(item: Item) => {
        const listaDeCarrinhoAtualizada = listaCarrinho.filter(itemdDaLista => itemdDaLista.id !== item.id)
        setListaCarrinho(listaDeCarrinhoAtualizada)
        localStorage.setItem('listaCarrinho', JSON.stringify(listaDeCarrinhoAtualizada))

        return listaDeCarrinhoAtualizada
    }
}