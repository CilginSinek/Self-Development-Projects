import React, { useEffect, useState } from 'react'
import { getAllClothes } from '../Api';
import SliderScroll from "./SliderScroll"
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box } from '@chakra-ui/react';

function FavScroll({ fav }) {
    const [FavArray, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isErr, setIsErr] = useState(false);
    useEffect(() => {
        setIsLoading(true)
        getAllClothes()
            .then((resoponse) => {
                setData(resoponse.filter((item) => fav.includes(item.id)));
                setIsLoading(false);
            }).catch((err) => {
                setIsErr(true);
                setIsLoading(false);
                console.log(err)
            })
    }, [fav])


    if (isLoading) return <div>Loading...</div>
    if (isErr) return <div>Beklenmeyen bir sorunla karşılaşıldı</div>
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
                        <SliderScroll clothes={FavArray} />
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>

        </div>
    )
}

export default FavScroll