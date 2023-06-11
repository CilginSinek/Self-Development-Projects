import { useEffect, useState } from 'react'
import { useUserData } from '../context/MyUserData'
import { Navigate } from 'react-router-dom'
import { Box, Flex, Image, Text, CloseButton, Heading } from '@chakra-ui/react'
import { getAllClothes } from '../Api'
import HandleBasketFav from '../funcs/HandleBasketFav'
import TabPage from '../Components/TabPage'
import FavScroll from '../Components/FavScroll'

function Basket() {
  const { isLogin, userObj, setUserObj } = useUserData()

  const [ClothesArray, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    getAllClothes()
      .then((response) => {
        setData(response);
        setIsLoading(false);

      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, [userObj]);


  if (isLoading) {
    return (
      <>
        {!userObj.basket.length ? <Navigate to="/" /> :
          <>
            Loading...
          </>
        }
      </>
    );
  }


  return (
    <>
      {!isLogin ? <Navigate to="/Login" /> :
        <>
          {!userObj.basket.length ? <Navigate to="" /> :
            <div>
              <Heading as="h1" size="2xl">Basket</Heading>
              <Flex alignItems="center" justifyContent="center" >
                <Box width="1000px">
                  <Box className='basket-row'>
                    {
                      userObj.basket.map((item) =>
                        <Flex key={item} flexWrap="nowrap" flexDirection="row" justifyContent="space-between" alignItems="center" gap={2}>
                          <Box>
                            <Flex gap={10} alignItems="center">
                              <Box>
                                <Image width={55} height={55} src={ClothesArray[item - 1].img} alt={`${ClothesArray[item - 1].name} img`} />
                              </Box>
                              <Box>
                                <Text fontSize={20}>
                                  {ClothesArray[item - 1].name}
                                </Text>
                              </Box>
                            </Flex>
                          </Box>
                          <Box>
                            <Flex gap={10} alignItems="center">
                              <Box>
                                <Text fontSize={20}>
                                  {ClothesArray[item - 1].price} TL
                                </Text>
                              </Box>
                              <CloseButton onClick={() => HandleBasketFav(item, "delete", "basket", userObj, setUserObj)} size='md' />
                            </Flex>
                          </Box>
                        </Flex>)
                    }
                  </Box>
                  <Flex flexDirection="row-reverse" alignItems="center" gap={5}>
                    <TabPage cargoLocations={userObj.cargoLocations} basket={userObj.basket} />
                    <Text fontSize={25}>
                      {
                        userObj.basket.reduce((acc, num) => {
                          const obj = ClothesArray[parseInt(num) - 1];
                          if (obj) {
                            return acc + parseFloat(obj.price);
                          }
                          return acc;
                        }, 0)
                      } TL
                    </Text>
                  </Flex>
                </Box>
              </Flex>
              {!(userObj.fav === 0) &&
                <Box>
                  <FavScroll fav={userObj.fav} />
                </Box>
              }

            </div>
          }
        </>
      }
    </>
  )
}

export default Basket