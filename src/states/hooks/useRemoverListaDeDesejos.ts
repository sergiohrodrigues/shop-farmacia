import { Item } from "@/interface/item";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { favoritos } from "../atom";

export const useRemoverListaDeDesejos = () => {

    const listaFavoritos = useRecoilValue(favoritos)
    const setListaFavoritos = useSetRecoilState<Item[]>(favoritos)

    return (item: Item) => {
        const listaAtualizada = listaFavoritos.filter(itemDaLista => itemDaLista.id !== item.id)
        setListaFavoritos(listaAtualizada)
        localStorage.setItem('listaFavoritos', JSON.stringify(listaAtualizada));

        return listaAtualizada
    }
}