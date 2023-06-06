import { Item } from "@/interface/item";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { favoritos } from "../atom";

export const useListaDeDesejos = () => {

    const listaFavoritos = useRecoilValue(favoritos)
    const setListaFavoritos = useSetRecoilState<Item[]>(favoritos)

    return(item: Item) => {

        const novaLista = [...listaFavoritos, item]
        setListaFavoritos(novaLista)
        localStorage.setItem('listaFavoritos', JSON.stringify(novaLista));

        return novaLista
    }
}