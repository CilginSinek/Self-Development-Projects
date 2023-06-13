import { useEffect, useState } from 'react'
import { Box, SimpleGrid } from '@chakra-ui/react'
import MyCard from '../Components/MyCard.js';
import { getAllClothes } from '../Api.js';

function Catolog() {
  //basic async component kurulumu
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
  }, []);
  //veriler gelene kadar yukleme ekrani
  if (isLoading) {
    return <div>Loading...</div>;
  }
  //gelen verileri grid ile card compenentlerine boldum
  return (
    <div>
      <Box>
        <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(280px, 1fr))'>
          {
            ClothesArray.map((item, key) => <MyCard item={item} key={key} setData={setData} />)
          }
        </SimpleGrid>
      </Box>
    </div>
  )
}

export default Catolog