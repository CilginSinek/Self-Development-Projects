import { Box, Button, Image, Link as TextLink, Text} from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { getClothes } from '../Api';
import { useEffect, useState } from 'react'
import { Link, useParams } from "react-router-dom"
import BasketButton from '../Components/Buttons/BasketButton';
import FavButton from "../Components/Buttons/FavButton";
import { useUserData } from '../context/MyUserData'


function ProductDetails() {
  const { isLogin } = useUserData()
  const { urun_id } = useParams()
  const [thisProduct, setThisProduct] = useState(null)
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getClothes(urun_id)
      .then((response) => {
        setThisProduct(response);
        setIsLoading(false);
        console.log(response)
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
        setIsError(true)
      });

  }, [urun_id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if(isError){
    let message
    if(parseInt(urun_id) <= 0 || isNaN(urun_id)){
      message = "Kullanıcı kimliği yanlış girildi."
    }else{
      message = "Beklenmeyen bir hatayla karşılaşıldı."
    }
    return <div>{message}</div>
  }
  if(thisProduct.isBan){
    return (
      <>
        <Box>
          <Link to="/">
            <Button> Go back </Button>
          </Link>
          <Box>
            <Text>
              This product auther has been banned from commerce. Please come back...
            </Text>
          </Box>
        </Box>
      </>
    )
  }

  return (
    <>
      <Link to="/">
        <Button> Go back </Button>
      </Link>
      <Box>
        <Box>
          <Image src={thisProduct.img} alt={`${thisProduct.name} img`} />
        </Box>
        <Box>
          <Box>
            <Box>{thisProduct.name}</Box>
            <Box> <Text>Ürün Sahibi: <TextLink href={`/users/${thisProduct.userId}`} isExternal>{thisProduct.autherName} <ExternalLinkIcon mx='2px' /></TextLink></Text></Box>
            <Box>{thisProduct.dec}</Box>
            <Box>{thisProduct.CreateAt}</Box>
            <Box>{thisProduct.price}</Box>
          </Box>
          <Box>
            {isLogin &&
              <>
                <BasketButton id={urun_id} />
                <FavButton id={urun_id} />
              </>
            }
            {!isLogin &&
              <>
                <Link to="/Login">
                  <Button variant='solid' colorScheme='blue'>
                    Sepete ekle
                  </Button>
                </Link>
                <Link to="/Login">
                  <Button variant='ghost' colorScheme='blue'>
                    Favorilere ekle
                  </Button>
                </Link>
              </>
            }
          </Box>
        </Box>

      </Box>
    </>
  )
}

export default ProductDetails