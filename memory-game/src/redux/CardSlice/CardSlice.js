import { createSlice, nanoid } from "@reduxjs/toolkit";
import Cards from "../../data/Cards.json";

const CardFunc = (arr) => {
  const doubleArr = arr.concat(arr);
  const patchArr = doubleArr.map((item) => ({
    ...item,
    id: nanoid(),
    matched: false,
    opened: false,
  }));
  for (let i = patchArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [patchArr[i], patchArr[j]] = [patchArr[j], patchArr[i]];
  }
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
        
        if(state.select[0].id === action.payload.id) return

        if (state.select[0].name === action.payload.name) {
          state.cards = state.cards.map((item) => {
            if (
              item.name === action.payload.name ||
              item.name === state.select[0]
            ) {
              return { ...item, matched: true };
            }
            return item;
          });
          state.Score += 50;
          state.select=[]
        } else {
          state.cards.find((card)=>card.id === state.select[0].id).opened = false
          state.cards.find((card) => card.id === action.payload.id).opened = false
          state.Score -= 10;
          state.select = [];
        }
      } else {
        state.select.push(action.payload);
      }
    },
    setOpen:(state,action)=>{
      state.cards.find((card) => card.id === action.payload.id).opened = true
    },
    setRetry: (state) => {
      state.cards = CardFunc(Cards.cards);
      state.select = [];
      state.Score = 0;
    },
  },
});

export const { setSelect, setRetry,setOpen } = CardSlice.actions;
export default CardSlice.reducer;
