import { createSlice, nanoid } from "@reduxjs/toolkit";
import Cards from "../../data/Cards.json";
//? Statik data dosyasi icinde kart bilgileri var

const CardFunc = (arr) => {
  const doubleArr = arr.concat(arr);
  //* arrayi 2 ye katliyor

  const patchArr = doubleArr.map((item) => ({
    ...item,
    id: nanoid(),
    matched: false,
    opened: false,
  }));
  //* arrayi modifiye ediyor

  for (let i = patchArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [patchArr[i], patchArr[j]] = [patchArr[j], patchArr[i]];
  }
  //* Arrayi karistiriyor

  return patchArr;
};

export const CardSlice = createSlice({
  name: "card",
  initialState: {
    cards: CardFunc(Cards.cards),
    select: [],
    Score: 0,
  },
  reducers: {
    setSelect: (state, action) => {
      if (state.select.length) {
        //? secilmis kart var mi sorgusu

        if(state.select[0].id === action.payload.id) return
        //? secilmis kartla yeni secilen kart ayni mi sorgusu

        if (state.select[0].name === action.payload.name) {
          //? secilmis kart ile yeni secilen kartin adi ayni mi sorgusu

          state.cards = state.cards.map((item) => {
            if (
              item.name === action.payload.name ||
              item.name === state.select[0]
            ) {
              return { ...item, matched: true };
            }
            return item;
          });
          //* Eslesen kartlara matched true ozelligi verildi

          state.Score += 50;
          state.select=[]
          //* skor arttirildi ve secilen kartlar temizlendi

        } else {
          state.cards.find((card)=>card.id === state.select[0].id).opened = false
          state.cards.find((card) => card.id === action.payload.id).opened = false
          //*secilen kartlar kapatildi

          state.Score -= 10;
          state.select = [];
          //* puan eksiltilip secilenler silindi
        }
      } else {
        state.select.push(action.payload);
        //* secilen kart yoksa sec
      }
    },
    setOpen:(state,action)=>{
      //* secilen karti ac
      state.cards.find((card) => card.id === action.payload.id).opened = true
    },
    setRetry: (state) => {
      state.cards = CardFunc(Cards.cards);
      state.select = [];
      state.Score = 0;
      //* oyun ayarlarini en basa cek
    },
  },
});

export const { setSelect, setRetry,setOpen } = CardSlice.actions;
export default CardSlice.reducer;
