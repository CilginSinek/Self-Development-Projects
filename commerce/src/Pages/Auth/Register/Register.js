import React from 'react'
import { Flex, Box, Heading, FormControl, FormLabel, Input, Button, useToast } from "@chakra-ui/react"
import { useFormik } from "formik"
import validationSchema from './validations'
import { pushUser } from '../../../Api'
import { Navigate } from 'react-router-dom'
import { useUserData } from '../../../context/MyUserData'

function Register({ history }) {
  const { isLogin } = useUserData()
  const toast = useToast()

  const formik = useFormik({
    initialValues: {
      name: "",
      Email: "",
      Password: "",
      PasswordConfirm: ""
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        //yeni kisi verisi gonderiliyor verinin durumuna gore toast aciyor
        let isSuccess = await pushUser(values.Email, values.Password, values.name);
        if (isSuccess.status === "error") throw isSuccess.message;
        toast({
          title: 'Success',
          description: isSuccess.message,
          position: "top-right",
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
      } catch (error) {
        toast({
          title: 'Error',
          description: error,
          position: "top-right",
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
      }
    }
  })


  return (
    <>
      {/* giris yapilmissa profile gonderiyor */}
      {isLogin ? <Navigate to="/profile" /> :
        <div>
          <Flex align="center" width="full" justifyContent="center">
            <Box pt={10}>
              <Box textAlign="center">
                <Heading>Register</Heading>
              </Box>
              <Box my={5} textAlign="left">
                <form onSubmit={formik.handleSubmit}>

                  <FormControl mt={4}>
                    <FormLabel>Name</FormLabel>
                    <Input
                      name='name' type='text'
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.name}
                      isInvalid={formik.touched.name && formik.errors.name}
                    />
                  </FormControl>


                  <FormControl>
                    <FormLabel>Email</FormLabel>
                    <Input
                      name='Email'
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.Email}
                      isInvalid={formik.touched.Email && formik.errors.Email}
                    />
                  </FormControl>

                  <FormControl mt={4}>
                    <FormLabel>Password</FormLabel>
                    <Input
                      name='Password' type='password'
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.Password}
                      isInvalid={formik.touched.Password && formik.errors.Password}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Password Confirm</FormLabel>
                    <Input
                      name='PasswordConfirm' type='password'
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.PasswordConfirm}
                      isInvalid={formik.touched.PasswordConfirm && formik.errors.PasswordConfirm}
                    />
                  </FormControl>

                  <Button mt={4} width="full" type='submit'>
                    Submit
                  </Button>
                </form>
              </Box>
            </Box>
          </Flex>
        </div>
      }
    </>

  )
}

export default Register