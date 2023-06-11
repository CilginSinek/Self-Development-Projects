import React, { useEffect, useState } from 'react'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Text,
  Avatar
} from '@chakra-ui/react'
import { getUsers } from '../Api';
import { useUserData } from '../context/MyUserData';
import regexDate from "../funcs/regexDate"
import BanButton from '../Components/Buttons/BanButton';
import { Link } from 'react-router-dom';
import ModButton from '../Components/Buttons/ModButton';

function Users() {
  const { userObj, isLogin } = useUserData()
  const [allUsers, setAllUsers] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isErr, setIsErr] = useState(false)

  useEffect(()=>{
    getUsers()
    .then((response) => {
      setAllUsers(response.data);
      setIsLoading(false);
    }).catch((err) => {
      console.log(err);
      setIsErr(true);
    })
  },[])
  if (isErr) return <Text>Beklenmeyen bir hata oluştu</Text>
  if (isLoading) return <Text>Loading...</Text>
  if (!userObj.isAdmin || !isLogin) return <Text>Buraya sadece moderatörler girebilir</Text>

  return (
    <>
      <TableContainer>
        <Table variant='striped' colorScheme='teal'>
          <TableCaption>Users Table</TableCaption>
          <Thead>
            <Tr>
              <Th>Profile</Th>
              <Th>E-mail</Th>
              <Th>Location</Th>
              <Th>Register date</Th>
              <Th>Ban/Profile</Th>
            </Tr>
          </Thead>
          <Tbody>
            {
              allUsers.map((item, key) => {
                return (
                  <Tr key={key}>
                    <Td>
                      <Link to={item.id}>
                        <Avatar src={item.avatar} name={item.name} />
                      </Link>
                      <Text>
                        {item.name}
                      </Text>
                    </Td>
                    <Td>
                      <Text>
                        {item.mail}
                      </Text>
                    </Td>
                    <Td>
                      <Text whiteSpace={"normal"}>
                        {item.addressCountry}/{item.addressCity}/{item.addressZipcode}
                      </Text>
                    </Td>
                    <Td>
                      <Text whiteSpace={'normal'}>
                       {regexDate(item.createdAt)}
                      </Text>
                    </Td>
                    <Td whiteSpace={'nowrap'}>
                      <BanButton setArr={setAllUsers} isBan={item.isBan} id={item.id} />
                      <ModButton isMod={item.isAdmin} id={item.id} setArr={setAllUsers} />
                    </Td>
                  </Tr>
                )
              })
            }
          </Tbody>
        </Table>
      </TableContainer>
    </>
  )
}

export default Users