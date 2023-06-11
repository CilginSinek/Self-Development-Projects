import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSelectedUser } from '../Api';
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Avatar, Box, Flex, Link, Text } from '@chakra-ui/react';
import regexDate from '../funcs/regexDate';
import { EmailIcon, TriangleDownIcon } from '@chakra-ui/icons';
import SliderScroll from '../Components/SliderScroll';

function User() {
  const { user_id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false)
  const [thisUser, setThisUser] = useState(null);

  useEffect(() => {
    setIsLoading(true);

    getSelectedUser(user_id)
      .then((response) => {
        setThisUser(response[0]);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
        setIsError(true)
      });

  }, [user_id])

  if (isLoading) {
    return <div>Loading...</div>
  }
  if (isError) {
    <div>Beklenmeyen bir hatayla karşılaşıldı</div>
  }
  return (
    <div>
      <Box>
        {thisUser.isAdmin && <Text color='blue.400'><strong>Admin</strong></Text>}
        {thisUser.isBan && <Text color="red.300">This user has been banned</Text>}
        <Box>
          <Avatar size="2xl" name={thisUser.name} src={thisUser.avatar} />
        </Box>
        <Box>
          <Text>
            {thisUser.name}
          </Text>
          {!thisUser.isPriv && thisUser.addressCity && thisUser.addressCountry &&
            <Flex>
              <TriangleDownIcon />
              <Text fontSize={"xs"} >
                {thisUser.addressCountry},{thisUser.addressCity}
              </Text>
            </Flex>
          }
          <Text>
            this user join us in:{regexDate(thisUser.createdAt)}
          </Text>
          {!thisUser.isPriv &&
            <Box>
              <Link href={`mailto:${thisUser.mail}`}>
                <EmailIcon mx='2px' />
              </Link>
              <Text>
                {thisUser.userDec}
              </Text>
            </Box>
          }
        </Box>
      </Box>
      {thisUser.clothes.length &&
        <Box>
          <Accordion defaultIndex={[0]} allowMultiple>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as="span" flex='1' textAlign='left'>
                    Sattığı eşyalar
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel paddingBottom={"230px"}>
                <SliderScroll clothes={thisUser.clothes} />
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Box>
      }
    </div>
  )

}

export default User