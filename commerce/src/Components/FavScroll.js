import React, { useEffect, useState } from 'react'
import { getAllClothes } from '../Api';
import SliderScroll from "./SliderScroll"
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box } from '@chakra-ui/react';

function FavScroll({ fav }) {
    //basic async component kurulumu.
    const [FavArray, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isErr, setIsErr] = useState(false);
    useEffect(() => {
        setIsLoading(true)
        getAllClothes()
            .then((resoponse) => {
                setData(resoponse.filter((item) => fav.includes(item.id)));
                //butun kiyafetlerden kullanicinin favorilerini alip arraya koymak
                setIsLoading(false);
            }).catch((err) => {
                setIsErr(true);
                setIsLoading(false);
                console.log(err)
            })
    }, [fav])

    //async veri gelene kadar gosterilen component
    if (isLoading) return <div>Loading...</div>
    // err component
    if (isErr) return <div>Beklenmeyen bir sorunla karşılaşıldı</div>
    //downbox component
    return (
        <div>
            <Accordion allowMultiple>
                <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <Box as="span" flex='1' textAlign='left'>
                                Favoriler
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel paddingBottom={"230px"}>
                        {/* scroll component */}
                        <SliderScroll clothes={FavArray} />
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>

        </div>
    )
}

export default FavScroll