import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, useToast } from '@chakra-ui/react'
import { useFormik } from 'formik'
import React from 'react'
import { Navigate } from 'react-router-dom'
import { useUserData } from '../../context/MyUserData'
import validationSchema from './validations'
import { pushClothes } from '../../Api'

function NewProduct() {
  const toast = useToast();
  const {isLogin, userObj} = useUserData();
  const formik = useFormik({
    initialValues:{
      image:"",
      name:"",
      description:"",
      price:""
    },
    validationSchema,
    onSubmit: async (values)=>{
      try {
        await pushClothes(userObj.id,values)
      } catch (error) {
        toast({
          title: 'Error',
          description: error,
          position:"top-right",
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
      }
    }
  });

  if(!isLogin || userObj.isBan){
    <Navigate to="/Login"/>
  };

  return (
    <>
      <Button onClick={() => <Navigate to="/profile" />}>Go Back</Button>
      <Box>
        <Flex>
          <Heading as="h3">Add new product</Heading>
          <Box>
            <form onSubmit={formik.handleSubmit}>
              <FormControl>
                <FormLabel htmlFor="image">Image</FormLabel>
                <Input
                  name='image'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.image}
                  isInvalid={formik.touched.image && formik.errors.image}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input
                  name='name'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                  isInvalid={formik.touched.name && formik.errors.name}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="description">Description</FormLabel>
                <Input
                  name='description'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  isInvalid={formik.touched.description && formik.errors.description}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="price">Price</FormLabel>
                <Input
                  name='price'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.price}
                  isInvalid={formik.touched.price && formik.errors.price}
                />
              </FormControl>
              <Button type='submit' colorScheme='green'>Add</Button>
            </form>
          </Box>
        </Flex>
      </Box>
    </>
  )
};

export default NewProduct