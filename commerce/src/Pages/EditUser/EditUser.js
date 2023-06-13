import {
  Box, Flex, Heading, FormControl, FormLabel,
  Input,
  Divider,
  useToast,
  Button
} from '@chakra-ui/react'
import React from 'react'
import { useFormik } from 'formik';
import { useUserData } from '../../context/MyUserData'
import validationSchema from "./validations"


function EditUser({onClose}) {
  const toast = useToast()
  const { userObj, setUserObj } = useUserData();
  const formik = useFormik({
    initialValues: {
      name: userObj.name,
      avatar: userObj.avatar,
      mail: userObj.mail,
      password: "",
      passwordConfirm: "",
      addressCountry: userObj.addressCountry,
      addressCity: userObj.addressCity,
      addressZipcode: userObj.addressZipcode,
    },
    validationSchema,
    onSubmit: async(values) =>{
      try {
        //yeni verileri userobje yukluyorum
        setUserObj((prevUserObj) => {
          return { ...prevUserObj, ...values };
        });
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
  })

  return (
    <div>
      <Box marginLeft={"15px"}>
        <Flex alignItems={"center"} flexDirection={"column"} flexWrap={"nowrap"}>
          <form onSubmit={formik.handleSubmit}>
            {/* name */}
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
            <Divider />
            {/* avatar */}
            <FormControl>
              <FormLabel htmlFor="avatar">Profile Pic url</FormLabel>
              <Input
                name='avatar'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.avatar}
                isInvalid={formik.touched.avatar && formik.errors.avatar}
              />
            </FormControl>
            <Divider />
            {/* mail */}
            <FormControl>
              <FormLabel htmlFor="mail">E-mail</FormLabel>
              <Input
                name='mail'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.mail}
                isInvalid={formik.touched.mail && formik.errors.mail}
              />
            </FormControl>
            <Divider />
            {/* password */}
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                name='password'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                isInvalid={formik.touched.password && formik.errors.password}
              />
            </FormControl>
            <Divider />
            {/* password confirm */}
            <FormControl>
              <FormLabel htmlFor="passwordConfirm">Password Confirm</FormLabel>
              <Input
                name='passwordConfirm'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.passwordConfirm}
                isInvalid={formik.touched.passwordConfirm && formik.errors.passwordConfirm}
              />
            </FormControl>
            <Divider />
            {/* address */}
            <FormControl>
              <Heading as="h6">Address Information</Heading>
              <FormLabel htmlFor="addressCountry">Country</FormLabel>
              <Input
                name='addressCountry'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.addressCountry}
                isInvalid={formik.touched.addressCountry && formik.errors.addressCountry}
              />
              <FormLabel htmlFor="addressCity">City</FormLabel>
              <Input
                name='addressCity'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                isInvalid={formik.touched.addressCity && formik.errors.addressCity}
              />
              <FormLabel htmlFor="addressZipcode">ZipCode</FormLabel>
              <Input
                name='addressZipcode'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.addressZipcode}
                isInvalid={formik.touched.addressZipcode && formik.errors.addressZipcode}
              />
            </FormControl>
            <Flex marginTop={"30px"} flexDirection={"row-reverse"}>
              <Button colorScheme='blue' onClick={onClose}>Close</Button>
              <Button type='submit'>Submit</Button>
            </Flex>
          </form>
        </Flex>
      </Box>
    </div>
  )
}

export default EditUser