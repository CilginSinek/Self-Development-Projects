import { createSlice } from "@reduxjs/toolkit";
import table from "./table.json";

const modTable = (arr) => {
  const newArr = arr.map((item) => ({
    ...item,
    selected: false,
    isDama: false,
    nowCanGo: false,
    deleteStone: [],
  }));
  return newArr;
};

export const checkersSlice = createSlice({
  name: "checkers",
  initialState: {
    table: modTable(table.table),
    turn: "white",
    selectedStone: "",
  },
  reducers: {
    //! Tas secme
    selectStone: (state, action) => {
      //* Eger secilen karede tas varsa
      if (action.payload.stone !== null) {
        //*Eger secilen tas kendi turundaysa
        if (state.turn === action.payload.stone) {
          //* Eger secili tas varsa
          if (state.selectedStone) {
            //*Eger tas secili tas ile ayni ise
            if (
              state.selectedStone ===
              action.payload.x.toString() + action.payload.x.toString()
            ) {
              //* table ve selectedstonedan selected silme
              state.table = state.table.map((item) => {
                if (item.selected) {
                  return { ...item, selected: false };
                } else if (item.nowCanGo) {
                  return { ...item, nowCanGo: false, deleteStone: [] };
                }
                return item;
              });
              state.selectedStone = "";
            }
            //*Eger tas ayni degil ise
            else {
              //* onceki tasi sil yeni tasi ekle.
              state.table = state.table.map((item) => {
                if (item.selected) {
                  return { ...item, selected: false };
                } else if (
                  item.y === action.payload.y &&
                  item.x === action.payload.x
                ) {
                  return { ...item, selected: true };
                }
                return item;
              });
              state.selectedStone =
                action.payload.x.toString() + action.payload.y.toString();
              //* onceki taslarin nowcango ozelligini sil
              state.table = state.table.map((item) => {
                if (item.nowCanGo) {
                  return { ...item, nowCanGo: false, deleteStone: [] };
                }
                return item;
              });
              //* tas tipine gore nowcango ekle
              if (action.payload.isDama) {
                //* ++
                for (
                  let i = action.payload.x, j = action.payload.y;
                  i < 11 && j < 11;
                  i++, j++
                ) {
                  //* item varsa
                  if (
                    state.table.find(
                      (item) => parseInt(item.x) === i && parseInt(item.y) === j
                    ).stone !== null
                  ) {
                    //* itemin ustunde kendi turuna ait olmayan bir tas varsa ve boş degilse
                    if (
                      state.table.find(
                        (item) =>
                          parseInt(item.x) === i && parseInt(item.y) === j
                      ).stone !== state.turn
                    ) {
                      //* onu bossa
                      if (
                        state.table.find(
                          (item) =>
                            parseInt(item.x) === i + 1 &&
                            parseInt(item.y) === j + 1
                        ).stone === null
                      ) {
                        state.table = state.table.map((item) => {
                          if (
                            parseInt(item.x) === i + 1 &&
                            parseInt(item.y) === j + 1
                          ) {
                            return {
                              ...item,
                              nowCanGo: true,
                              deleteStone: [i, j],
                            };
                          }
                          return item;
                        });
                        break;
                      }
                    }
                    //* önünde kendi tasi varsa
                    else {
                      state.table = state.table.map((item) => {
                        if (
                          parseInt(item.x) === i - 1 &&
                          parseInt(item.y) === j - 1
                        ) {
                          return { ...item, nowCanGo: true };
                        }
                        return item;
                      });
                      break;
                    }
                  }
                  //* item yoksa nowCanGo ekle
                  else {
                    state.table = state.table.map((item) => {
                      if ((parseInt(item.x) === i, parseInt(item.y) === j)) {
                        return { ...item, nowCanGo: true };
                      }
                      return item;
                    });
                  }
                }
                //* -+
                for (
                  let i = action.payload.x, j = action.payload.y;
                  i > 0 && j < 11;
                  i--, j++
                ) {
                  //* item varsa
                  if (
                    state.table.find(
                      (item) => parseInt(item.x) === i && parseInt(item.y) === j
                    ).stone !== null
                  ) {
                    //* itemin ustunde kendi turuna ait olmayan bir tas varsa ve boş degilse
                    if (
                      state.table.find(
                        (item) =>
                          parseInt(item.x) === i && parseInt(item.y) === j
                      ).stone !== state.turn
                    ) {
                      //* onu bossa
                      if (
                        state.table.find(
                          (item) =>
                            parseInt(item.x) === i - 1 &&
                            parseInt(item.y) === j + 1
                        ).stone === null
                      ) {
                        state.table = state.table.map((item) => {
                          if (
                            parseInt(item.x) === i - 1 &&
                            parseInt(item.y) === j + 1
                          ) {
                            return {
                              ...item,
                              nowCanGo: true,
                              deleteStone: [i, j],
                            };
                          }
                          return item;
                        });
                        break;
                      }
                    }
                    //* önünde kendi tasi varsa
                    else {
                      state.table = state.table.map((item) => {
                        if (
                          parseInt(item.x) === i + 1 &&
                          parseInt(item.y) === j - 1
                        ) {
                          return { ...item, nowCanGo: true };
                        }
                        return item;
                      });
                      break;
                    }
                  }
                  //* item yoksa nowCanGo ekle
                  else {
                    state.table = state.table.map((item) => {
                      if ((parseInt(item.x) === i, parseInt(item.y) === j)) {
                        return { ...item, nowCanGo: true };
                      }
                      return item;
                    });
                  }
                }
                //* +-
                for (
                  let i = action.payload.x, j = action.payload.y;
                  i < 11 && j > 0;
                  i++, j--
                ) {
                  //* item varsa
                  if (
                    state.table.find(
                      (item) => parseInt(item.x) === i && parseInt(item.y) === j
                    ).stone !== null
                  ) {
                    //* itemin ustunde kendi turuna ait olmayan bir tas varsa ve boş degilse
                    if (
                      state.table.find(
                        (item) =>
                          parseInt(item.x) === i && parseInt(item.y) === j
                      ).stone !== state.turn
                    ) {
                      //* onu bossa
                      if (
                        state.table.find(
                          (item) =>
                            parseInt(item.x) === i + 1 &&
                            parseInt(item.y) === j - 1
                        ).stone === null
                      ) {
                        state.table = state.table.map((item) => {
                          if (
                            parseInt(item.x) === i + 1 &&
                            parseInt(item.y) === j - 1
                          ) {
                            return {
                              ...item,
                              nowCanGo: true,
                              deleteStone: [i, j],
                            };
                          }
                          return item;
                        });
                        break;
                      }
                    }
                    //* önünde kendi tasi varsa
                    else {
                      state.table = state.table.map((item) => {
                        if (
                          parseInt(item.x) === i - 1 &&
                          parseInt(item.y) === j + 1
                        ) {
                          return { ...item, nowCanGo: true };
                        }
                        return item;
                      });
                      break;
                    }
                  }
                  //* item yoksa nowCanGo ekle
                  else {
                    state.table = state.table.map((item) => {
                      if ((parseInt(item.x) === i, parseInt(item.y) === j)) {
                        return { ...item, nowCanGo: true };
                      }
                      return item;
                    });
                  }
                }
                //* --
                for (
                  let i = action.payload.x, j = action.payload.y;
                  i > 0 && j > 0;
                  i--, j--
                ) {
                  //* item varsa
                  if (
                    state.table.find(
                      (item) => parseInt(item.x) === i && parseInt(item.y) === j
                    ).stone !== null
                  ) {
                    //* itemin ustunde kendi turuna ait olmayan bir tas varsa ve boş degilse
                    if (
                      state.table.find(
                        (item) =>
                          parseInt(item.x) === i && parseInt(item.y) === j
                      ).stone !== state.turn
                    ) {
                      //* onu bossa
                      if (
                        state.table.find(
                          (item) =>
                            parseInt(item.x) === i + 1 &&
                            parseInt(item.y) === j + 1
                        ).stone === null
                      ) {
                        state.table = state.table.map((item) => {
                          if (
                            parseInt(item.x) === i - 1 &&
                            parseInt(item.y) === j - 1
                          ) {
                            return {
                              ...item,
                              nowCanGo: true,
                              deleteStone: [i, j],
                            };
                          }
                          return item;
                        });
                        break;
                      }
                    }
                    //* önünde kendi tasi varsa
                    else {
                      state.table = state.table.map((item) => {
                        if (
                          parseInt(item.x) === i + 1 &&
                          parseInt(item.y) === j + 1
                        ) {
                          return { ...item, nowCanGo: true };
                        }
                        return item;
                      });
                      break;
                    }
                  }
                  //* item yoksa nowCanGo ekle
                  else {
                    state.table = state.table.map((item) => {
                      if ((parseInt(item.x) === i, parseInt(item.y) === j)) {
                        return { ...item, nowCanGo: true };
                      }
                      return item;
                    });
                  }
                }
              } else {
                if (action.payload.stone === "white") {
                  state.table = state.table.map((item) => {
                    if (
                      parseInt(item.x) === parseInt(action.payload.x) + 1 &&
                      parseInt(item.y) === parseInt(action.payload.y) + 1
                    ) {
                      if (item.stone !== null) {
                        if (
                          parseInt(item.x) === parseInt(action.payload.x) + 2 &&
                          parseInt(item.y) === parseInt(action.payload.y) + 2
                        ) {
                          if (item.stone === null) {
                            return {
                              ...item,
                              nowCanGo: true,
                              deleteStone: [
                                parseInt(item.x) + 1,
                                parseInt(item.y) + 1,
                              ],
                            };
                          } else {
                            return { ...item };
                          }
                        }
                      } else {
                        return { ...item, nowCanGo: true };
                      }
                    }
                    if (
                      parseInt(item.x) === parseInt(action.payload.x) - 1 &&
                      parseInt(item.y) === parseInt(action.payload.y) + 1
                    ) {
                      if (item.stone !== null) {
                        if (
                          parseInt(item.x) === parseInt(action.payload.x) - 2 &&
                          parseInt(item.y) === parseInt(action.payload.y) + 2
                        ) {
                          if (item.stone === null) {
                            return {
                              ...item,
                              nowCanGo: true,
                              deleteStone: [
                                parseInt(item.x) - 1,
                                parseInt(item.y) + 1,
                              ],
                            };
                          } else {
                            return { ...item };
                          }
                        }
                      } else {
                        return { ...item, nowCanGo: true };
                      }
                    }
                    return item;
                  });
                } else if (action.payload.stone === "black") {
                  state.table = state.table.map((item) => {
                    if (
                      parseInt(item.x) === parseInt(action.payload.x) + 1 &&
                      parseInt(item.y) === parseInt(action.payload.y) - 1
                    ) {
                      if (item.stone !== null) {
                        if (
                          parseInt(item.x) === parseInt(action.payload.x) + 2 &&
                          parseInt(item.y) === parseInt(action.payload.y) - 2
                        ) {
                          if (item.stone === null) {
                            return {
                              ...item,
                              nowCanGo: true,
                              deleteStone: [
                                parseInt(item.x) + 1,
                                parseInt(item.y) - 1,
                              ],
                            };
                          } else {
                            return { ...item };
                          }
                        }
                      } else {
                        return { ...item, nowCanGo: true };
                      }
                    }
                    if (
                      parseInt(item.x) === parseInt(action.payload.x) - 1 &&
                      parseInt(item.y) === parseInt(action.payload.y) - 1
                    ) {
                      if (item.stone !== null) {
                        if (
                          parseInt(item.x) === parseInt(action.payload.x) - 2 &&
                          parseInt(item.y) === parseInt(action.payload.y) - 2
                        ) {
                          if (item.stone === null) {
                            return {
                              ...item,
                              nowCanGo: true,
                              deleteStone: [
                                parseInt(item.x) - 1,
                                parseInt(item.y) - 1,
                              ],
                            };
                          } else {
                            return { ...item };
                          }
                        }
                      } else {
                        return { ...item, nowCanGo: true };
                      }
                    }
                    return item;
                  });
                }
              }
            }
          }
          //* Eger Secilmis tas yoksa
          else {
            state.table = state.table.map((item) => {
              if (item.y === action.payload.y && item.x === action.payload.x) {
                return { ...item, selected: true };
              }
              return item;
            });
            state.selectedStone =
              action.payload.x.toString() + action.payload.y.toString();
            //! Dama ise Ona Gore nowCanGo ekleme:
            if (action.payload.isDama) {
              //* ++
              for (
                let i = action.payload.x, j = action.payload.y;
                i < 11 && j < 11;
                i++, j++
              ) {
                //* item varsa
                if (
                  state.table.find(
                    (item) => parseInt(item.x) === i && parseInt(item.y) === j
                  ).stone !== null
                ) {
                  //* itemin ustunde kendi turuna ait olmayan bir tas varsa ve boş degilse
                  if (
                    state.table.find(
                      (item) => parseInt(item.x) === i && parseInt(item.y) === j
                    ).stone !== state.turn
                  ) {
                    //* onu bossa
                    if (
                      state.table.find(
                        (item) =>
                          parseInt(item.x) === i + 1 &&
                          parseInt(item.y) === j + 1
                      ).stone === null
                    ) {
                      state.table = state.table.map((item) => {
                        if (
                          parseInt(item.x) === i + 1 &&
                          parseInt(item.y) === j + 1
                        ) {
                          return {
                            ...item,
                            nowCanGo: true,
                            deleteStone: [i, j],
                          };
                        }
                        return item;
                      });
                      break;
                    }
                  }
                  //* önünde kendi tasi varsa
                  else {
                    state.table = state.table.map((item) => {
                      if (
                        parseInt(item.x) === i - 1 &&
                        parseInt(item.y) === j - 1
                      ) {
                        return { ...item, nowCanGo: true };
                      }
                      return item;
                    });
                    break;
                  }
                }
                //* item yoksa nowCanGo ekle
                else {
                  state.table = state.table.map((item) => {
                    if ((parseInt(item.x) === i, parseInt(item.y) === j)) {
                      return { ...item, nowCanGo: true };
                    }
                    return item;
                  });
                }
              }
              //* -+
              for (
                let i = action.payload.x, j = action.payload.y;
                i > 0 && j < 11;
                i--, j++
              ) {
                //* item varsa
                if (
                  state.table.find(
                    (item) => parseInt(item.x) === i && parseInt(item.y) === j
                  ).stone !== null
                ) {
                  //* itemin ustunde kendi turuna ait olmayan bir tas varsa ve boş degilse
                  if (
                    state.table.find(
                      (item) => parseInt(item.x) === i && parseInt(item.y) === j
                    ).stone !== state.turn
                  ) {
                    //* onu bossa
                    if (
                      state.table.find(
                        (item) =>
                          parseInt(item.x) === i - 1 &&
                          parseInt(item.y) === j + 1
                      ).stone === null
                    ) {
                      state.table = state.table.map((item) => {
                        if (
                          parseInt(item.x) === i - 1 &&
                          parseInt(item.y) === j + 1
                        ) {
                          return {
                            ...item,
                            nowCanGo: true,
                            deleteStone: [i, j],
                          };
                        }
                        return item;
                      });
                      break;
                    }
                  }
                  //* önünde kendi tasi varsa
                  else {
                    state.table = state.table.map((item) => {
                      if (
                        parseInt(item.x) === i + 1 &&
                        parseInt(item.y) === j - 1
                      ) {
                        return { ...item, nowCanGo: true };
                      }
                      return item;
                    });
                    break;
                  }
                }
                //* item yoksa nowCanGo ekle
                else {
                  state.table = state.table.map((item) => {
                    if ((parseInt(item.x) === i, parseInt(item.y) === j)) {
                      return { ...item, nowCanGo: true };
                    }
                    return item;
                  });
                }
              }
              //* +-
              for (
                let i = action.payload.x, j = action.payload.y;
                i < 11 && j > 0;
                i++, j--
              ) {
                //* item varsa
                if (
                  state.table.find(
                    (item) => parseInt(item.x) === i && parseInt(item.y) === j
                  ).stone !== null
                ) {
                  //* itemin ustunde kendi turuna ait olmayan bir tas varsa ve boş degilse
                  if (
                    state.table.find(
                      (item) => parseInt(item.x) === i && parseInt(item.y) === j
                    ).stone !== state.turn
                  ) {
                    //* onu bossa
                    if (
                      state.table.find(
                        (item) =>
                          parseInt(item.x) === i + 1 &&
                          parseInt(item.y) === j - 1
                      ).stone === null
                    ) {
                      state.table = state.table.map((item) => {
                        if (
                          parseInt(item.x) === i + 1 &&
                          parseInt(item.y) === j - 1
                        ) {
                          return {
                            ...item,
                            nowCanGo: true,
                            deleteStone: [i, j],
                          };
                        }
                        return item;
                      });
                      break;
                    }
                  }
                  //* önünde kendi tasi varsa
                  else {
                    state.table = state.table.map((item) => {
                      if (
                        parseInt(item.x) === i - 1 &&
                        parseInt(item.y) === j + 1
                      ) {
                        return { ...item, nowCanGo: true };
                      }
                      return item;
                    });
                    break;
                  }
                }
                //* item yoksa nowCanGo ekle
                else {
                  state.table = state.table.map((item) => {
                    if ((parseInt(item.x) === i, parseInt(item.y) === j)) {
                      return { ...item, nowCanGo: true };
                    }
                    return item;
                  });
                }
              }
              //* --
              for (
                let i = action.payload.x, j = action.payload.y;
                i > 0 && j > 0;
                i--, j--
              ) {
                //* item varsa
                if (
                  state.table.find(
                    (item) => parseInt(item.x) === i && parseInt(item.y) === j
                  ).stone !== null
                ) {
                  //* itemin ustunde kendi turuna ait olmayan bir tas varsa ve boş degilse
                  if (
                    state.table.find(
                      (item) => parseInt(item.x) === i && parseInt(item.y) === j
                    ).stone !== state.turn
                  ) {
                    //* onu bossa
                    if (
                      state.table.find(
                        (item) =>
                          parseInt(item.x) === i + 1 &&
                          parseInt(item.y) === j + 1
                      ).stone === null
                    ) {
                      state.table = state.table.map((item) => {
                        if (
                          parseInt(item.x) === i - 1 &&
                          parseInt(item.y) === j - 1
                        ) {
                          return {
                            ...item,
                            nowCanGo: true,
                            deleteStone: [i, j],
                          };
                        }
                        return item;
                      });
                      break;
                    }
                  }
                  //* önünde kendi tasi varsa
                  else {
                    state.table = state.table.map((item) => {
                      if (
                        parseInt(item.x) === i + 1 &&
                        parseInt(item.y) === j + 1
                      ) {
                        return { ...item, nowCanGo: true };
                      }
                      return item;
                    });
                    break;
                  }
                }
                //* item yoksa nowCanGo ekle
                else {
                  state.table = state.table.map((item) => {
                    if ((parseInt(item.x) === i, parseInt(item.y) === j)) {
                      return { ...item, nowCanGo: true };
                    }
                    return item;
                  });
                }
              }
            } else {
              if (action.payload.stone === "white") {
                //*left
                //! Sag ust kosesi sorgusu
                if (
                  state.table.find(
                    (item) =>
                      parseInt(item.x) === parseInt(action.payload.x) + 1 &&
                      parseInt(item.y) === parseInt(action.payload.y) + 1
                  ) !== undefined &&
                  state.table.find(
                    (item) =>
                      parseInt(item.x) === parseInt(action.payload.x) + 1 &&
                      parseInt(item.y) === parseInt(action.payload.y) + 1
                  ).stone === null
                ) {
                  //* Sag ust kosesinde item yoksa nowCanGo ekledi
                  state.table = state.table.map((item) => {
                    if (
                      parseInt(item.x) === parseInt(action.payload.x) + 1 &&
                      parseInt(item.y) === parseInt(action.payload.y) + 1
                    ) {
                      return { ...item, nowCanGo: true };
                    }
                    return item;
                  });
                }
                //* Sag ust kosesinde siyah tas varsa
                else if (
                  state.table.find(
                    (item) =>
                      parseInt(item.x) === parseInt(action.payload.x) + 1 &&
                      parseInt(item.y) === parseInt(action.payload.y) + 1
                  ) !== undefined &&
                  state.table.find(
                    (item) =>
                      parseInt(item.x) === parseInt(action.payload.x) + 1 &&
                      parseInt(item.y) === parseInt(action.payload.y) + 1
                  ).stone === "black"
                ) {
                  console.log("tas var onunde");
                  //* siyah tasin arkasi bossa
                  if (
                    state.table.find(
                      (item) =>
                        parseInt(item.x) === parseInt(action.payload.x) + 2 &&
                        parseInt(item.y) === parseInt(action.payload.y) + 2
                    ) !== undefined &&
                    state.table.find(
                      (item) =>
                        parseInt(item.x) === parseInt(action.payload.x) + 2 &&
                        parseInt(item.y) === parseInt(action.payload.y) + 2
                    ).stone === null
                  ) {
                    //* arkasindakine nowcango + onundekine deletestone
                    state.table = state.table.map((item) => {
                      if (
                        parseInt(item.x) === parseInt(action.payload.x) + 2 &&
                        parseInt(item.y) === parseInt(action.payload.y) + 2
                      ) {
                        return {
                          ...item,
                          nowCanGo: true,
                          deleteStone: [
                            parseInt(action.payload.x) + 1,
                            parseInt(action.payload.y) + 1,
                          ],
                        };
                      }
                      return item;
                    });
                  }
                }
                //* rigth
                //! sol ust kosesi bossa
                if (
                  state.table.find(
                    (item) =>
                      parseInt(item.x) === parseInt(action.payload.x) - 1 &&
                      parseInt(item.y) === parseInt(action.payload.y) + 1
                  ) !== undefined &&
                  state.table.find(
                    (item) =>
                      parseInt(item.x) === parseInt(action.payload.x) - 1 &&
                      parseInt(item.y) === parseInt(action.payload.y) + 1
                  ).stone === null
                ) {
                  console.log("onu bos");
                  state.table = state.table.map((item) => {
                    if (
                      parseInt(item.x) === parseInt(action.payload.x) - 1 &&
                      parseInt(item.y) === parseInt(action.payload.y) + 1
                    ) {
                      return { ...item, nowCanGo: true };
                    }
                    return item;
                  });
                } else if (
                  state.table.find(
                    (item) =>
                      parseInt(item.x) === parseInt(action.payload.x) - 1 &&
                      parseInt(item.y) === parseInt(action.payload.y) + 1
                  ) !== undefined &&
                  state.table.find(
                    (item) =>
                      parseInt(item.x) === parseInt(action.payload.x) - 1 &&
                      parseInt(item.y) === parseInt(action.payload.y) + 1
                  ).stone === "black"
                ) {
                  console.log("black var onunde");
                  if (
                    state.table.find(
                      (item) =>
                        parseInt(item.x) === parseInt(action.payload.x) - 2 &&
                        parseInt(item.y) === parseInt(action.payload.y) + 2
                    ) !== undefined &&
                    state.table.find(
                      (item) =>
                        parseInt(item.x) === parseInt(action.payload.x) - 2 &&
                        parseInt(item.y) === parseInt(action.payload.y) + 2
                    ).stone === null
                  ) {
                    state.table = state.table.map((item) => {
                      if (
                        parseInt(item.x) === parseInt(action.payload.x) - 2 &&
                        parseInt(item.y) === parseInt(action.payload.y) + 2
                      ) {
                        return {
                          ...item,
                          nowCanGo: true,
                          deleteStone: [
                            parseInt(action.payload.x) - 1,
                            parseInt(action.payload.y) + 1,
                          ],
                        };
                      }
                      return item;
                    });
                  }
                }
              } else if (action.payload.stone === "black") {
                //*left
                //
                if (
                  state.table.find(
                    (item) =>
                      parseInt(item.x) === parseInt(action.payload.x) + 1 &&
                      parseInt(item.y) === parseInt(action.payload.y) - 1
                  ) !== undefined &&
                  state.table.find(
                    (item) =>
                      parseInt(item.x) === parseInt(action.payload.x) + 1 &&
                      parseInt(item.y) === parseInt(action.payload.y) - 1
                  ).stone === null
                ) {
                  state.table = state.table.map((item) => {
                    if (
                      parseInt(item.x) === parseInt(action.payload.x) + 1 &&
                      parseInt(item.y) === parseInt(action.payload.y) - 1
                    ) {
                      return { ...item, nowCanGo: true };
                    }
                    return item;
                  });
                } else if (
                  state.table.find(
                    (item) =>
                      parseInt(item.x) === parseInt(action.payload.x) + 1 &&
                      parseInt(item.y) === parseInt(action.payload.y) - 1
                  ) !== undefined &&
                  state.table.find(
                    (item) =>
                      parseInt(item.x) === parseInt(action.payload.x) + 1 &&
                      parseInt(item.y) === parseInt(action.payload.y) - 1
                  ).stone === "white"
                ) {
                  if (
                    state.table.find(
                      (item) =>
                        parseInt(item.x) === parseInt(action.payload.x) + 2 &&
                        parseInt(item.y) === parseInt(action.payload.y) - 2
                    ) !== undefined &&
                    state.table.find(
                      (item) =>
                        parseInt(item.x) === parseInt(action.payload.x) + 2 &&
                        parseInt(item.y) === parseInt(action.payload.y) - 2
                    ).stone === null
                  ) {
                    state.table = state.table.map((item) => {
                      if (
                        parseInt(item.x) === parseInt(action.payload.x) + 2 &&
                        parseInt(item.y) === parseInt(action.payload.y) - 2
                      ) {
                        return {
                          ...item,
                          nowCanGo: true,
                          deleteStone: [
                            parseInt(action.payload.x) + 1,
                            parseInt(action.payload.y) - 1,
                          ],
                        };
                      }
                      return item;
                    });
                  }
                }
                //* rigth
                //
                if (
                  state.table.find(
                    (item) =>
                      parseInt(item.x) === parseInt(action.payload.x) - 1 &&
                      parseInt(item.y) === parseInt(action.payload.y) - 1
                  ) !== undefined &&
                  state.table.find(
                    (item) =>
                      parseInt(item.x) === parseInt(action.payload.x) - 1 &&
                      parseInt(item.y) === parseInt(action.payload.y) - 1
                  ).stone === null
                ) {
                  state.table = state.table.map((item) => {
                    if (
                      parseInt(item.x) === parseInt(action.payload.x) - 1 &&
                      parseInt(item.y) === parseInt(action.payload.y) - 1
                    ) {
                      return { ...item, nowCanGo: true };
                    }
                    return item;
                  });
                } else if (
                  state.table.find(
                    (item) =>
                      parseInt(item.x) === parseInt(action.payload.x) - 1 &&
                      parseInt(item.y) === parseInt(action.payload.y) - 1
                  ) !== undefined &&
                  state.table.find(
                    (item) =>
                      parseInt(item.x) === parseInt(action.payload.x) - 1 &&
                      parseInt(item.y) === parseInt(action.payload.y) - 1
                  ).stone === "white"
                ) {
                  if (
                    state.table.find(
                      (item) =>
                        parseInt(item.x) === parseInt(action.payload.x) - 2 &&
                        parseInt(item.y) === parseInt(action.payload.y) - 2
                    ) !== undefined &&
                    state.table.find(
                      (item) =>
                        parseInt(item.x) === parseInt(action.payload.x) - 2 &&
                        parseInt(item.y) === parseInt(action.payload.y) - 2
                    ).stone === null
                  ) {
                    state.table = state.table.map((item) => {
                      if (
                        parseInt(item.x) === parseInt(action.payload.x) - 2 &&
                        parseInt(item.y) === parseInt(action.payload.y) - 2
                      ) {
                        return {
                          ...item,
                          nowCanGo: true,
                          deleteStone: [
                            parseInt(action.payload.x) - 1,
                            parseInt(action.payload.y) - 1,
                          ],
                        };
                      }
                      return item;
                    });
                  }
                }
              }
            }
          }
        }
      }
    },
    //! Go stone
    goStone: (state, action) => {
      //* Secilmis tas varsa
      if (state.selectedStone) {
        //* Gidilebilecek bir tas ise
        if (action.payload.nowCanGo) {
          //*Silinebilecek tas varsa
          if (action.payload.deleteStone.length) {
            state.table = state.table.map((item) => {
              if (
                item.x === action.payload.deleteStone[0] &&
                item.y === action.payload.deleteStone[0]
              ) {
                return { ...item, stone: null };
              }
              return item;
            });
          }
          //* onceki tasi sil yeni tasi ekle.
          if (state.selectedStone.length === 3) {
            if (state.selectedStone.split("")[1] === "0") {
              state.table = state.table.map((item) => {
                if (
                  item.x ==
                    state.selectedStone.split("")[0] +
                      state.selectedStone.split("")[1] &&
                  item.y == state.selectedStone.split("")[2]
                ) {
                  return { ...item, stone: null };
                }
                if (
                  item.x === action.payload.x &&
                  item.y === action.payload.y
                ) {
                  return {
                    ...item,
                    nowCanGo: false,
                    deleteStone: [],
                    stone: state.turn,
                  };
                }
                if (item.nowCanGo) {
                  return { ...item, nowCanGo: false };
                }
                return item;
              });
            } else if (state.selectedStone.split("")[2] === "0") {
              state.table = state.table.map((item) => {
                if (
                  item.x == state.selectedStone.split("")[0] &&
                  item.y ==
                    state.selectedStone.split("")[1] +
                      state.selectedStone.split("")[2]
                ) {
                  return { ...item, stone: null };
                }
                if (
                  item.x === action.payload.x &&
                  item.y === action.payload.y
                ) {
                  return {
                    ...item,
                    nowCanGo: false,
                    deleteStone: [],
                    stone: state.turn,
                  };
                }
                if (item.nowCanGo) {
                  return { ...item, nowCanGo: false };
                }
                return item;
              });
            }
          } else {
            state.table = state.table.map((item) => {
              if (
                item.x == state.selectedStone.split("")[0] &&
                item.y == state.selectedStone.split("")[1]
              ) {
                return { ...item, stone: null };
              }
              if (item.x === action.payload.x && item.y === action.payload.y) {
                return {
                  ...item,
                  nowCanGo: false,
                  deleteStone: [],
                  stone: state.turn,
                };
              }
              if (item.nowCanGo) {
                return { ...item, nowCanGo: false };
              }
              return item;
            });
          }
          //* Dama ozelligi ekleme sorgusu
          if (state.turn === "white") {
            if (action.payload.y === "10") {
              state.table = state.table.map((item) => {
                if (
                  parseInt(item.x) === parseInt(action.payload.x) &&
                  parseInt(item.y) === parseInt(action.payload.y)
                ) {
                  return { ...item, isDama: true };
                }
                return item;
              });
            }
          } else {
            if (action.payload.y === "1") {
              state.table = state.table.map((item) => {
                if (
                  parseInt(item.x) === parseInt(action.payload.x) &&
                  parseInt(item.y) === parseInt(action.payload.y)
                ) {
                  return { ...item, isDama: true };
                }
                return item;
              });
            }
          }

          //* Turu sifirla
          state.selectedStone = "";
          state.turn = state.turn === "white" ? "black" : "white";
        }
      }
    },
  },
});

export const { selectStone, goStone } = checkersSlice.actions;

export default checkersSlice.reducer;
