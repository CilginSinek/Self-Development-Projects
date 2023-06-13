import React from 'react'
import { Button, Flex } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { useUserData } from '../context/MyUserData'

function Navbar() {
  const { doLogout, isLogin, userObj } = useUserData()
  return (
    <Flex as="nav" justifyContent="space-between">
      <div className='left'>
        <Link to="/">E-Commerce</Link>
      </div>
      <div className='right'>
        <Flex>
          {
            !isLogin &&
            <>
              <Link to="/Login">
                <Button>Login</Button>
              </Link>
              <Link to="/Register">
                <Button>Register</Button>
              </Link>
            </>
          }
          {
            isLogin &&
            <>
              {userObj.isAdmin &&
                <Link to="/users">
                  <Button colorScheme='blue'>Users</Button>
                </Link>
              }
              {userObj.basket.length !== 0 &&
                <Link to="/Basket">
                  <Button colorScheme='orange'>Basket</Button>
                </Link>
              }
              <Link to="/newproduct">
                <Button colorScheme='yellow' >Create New Product</Button>
              </Link>
              <Link to="/profile">
                <Button>Profile</Button>
              </Link>
              <Button colorScheme='red' onClick={() => { doLogout() }}>Exit</Button>
            </>
          }
        </Flex>

      </div>
    </Flex>
  )
}

export default Navbar