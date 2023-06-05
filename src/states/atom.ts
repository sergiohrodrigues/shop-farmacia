import { Item } from '@/interface/item';
import { atom } from 'recoil'

export const favoritos = atom<Item[]>({
    key: 'favoritos',
    default: [], 
  });

export const carrinho = atom<Item[]>({
  key: 'carrinho',
  default: []
})