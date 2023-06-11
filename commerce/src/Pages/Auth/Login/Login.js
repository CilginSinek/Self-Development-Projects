import { Flex, Box, Heading, FormControl, FormLabel, Input, Button } from "@chakra-ui/react"
import { Navigate } from "react-router-dom"
import { useFormik } from "formik"
import validationSchema from './validations'
import { getUser } from "../../../Api"
import { useUserData } from "../../../context/MyUserData"
import { useToast } from '@chakra-ui/react'


function Login() {
  const toast = useToast()
  const { doLogin, isLogin } = useUserData()

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const userData = await getUser(values.email, values.password)
        if (userData.status === "error") throw userData.message
        doLogin(userData.obj)
        toast({
          title: 'Success',
          description: userData.message,
          position:"top-right",
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
      } catch (error) {
        console.log(error)
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
    <>
      {isLogin ? <Navigate to="/profile" /> :
        <div>
          <Flex align="center" width="full" justifyContent="center">
            <Box pt={10}>
              <Box textAlign="center">
                <Heading>Login</Heading>
              </Box>
              <Box my={5} textAlign="left">
                <form onSubmit={formik.handleSubmit}>
                  <FormControl>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input
                      name='email'
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                      isInvalid={formik.touched.email && formik.errors.email}
                    />
                  </FormControl>

                  <FormControl mt={4}>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Input
                      name='password' type='password'
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                      isInvalid={formik.touched.password && formik.errors.password}
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

export default Login