import { Button, FormControl, FormLabel, Input, useToast } from '@chakra-ui/react';
import { useFormik } from 'formik';
import React from 'react'
import validationSchema from './validations';
import { useUserData } from '../../context/MyUserData';

function CargoLocForm({ cargoLocations }) {
    const toast = useToast();
    const { setUserObj } = useUserData()
    const formik = useFormik({
        initialValues: {
            country: "",
            city: "",
            zipcode: ""
        },
        validationSchema,
        onSubmit: (values) => {
            const locationArray = [values.country, values.city, values.zipcode];
            setUserObj((prevUserObj) => {
                return { ...prevUserObj, cargoLocations: [...cargoLocations, locationArray] };
            });
            toast(toast({
                title: 'Success',
                description: "Adresiniz kaydedildi",
                position: "top-right",
                status: 'success',
                duration: 3000,
                isClosable: true,
            }))
        }
    });
    return (
        <form onSubmit={formik.handleSubmit}>
            <FormControl>
                <FormLabel htmlFor="country">Country</FormLabel>
                <Input
                    name='country'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.country}
                    isInvalid={formik.touched.country && formik.errors.country}
                />
            </FormControl>

            <FormControl mt={4}>
                <FormLabel htmlFor="city">City</FormLabel>
                <Input
                    name='city'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.city}
                    isInvalid={formik.touched.city && formik.errors.city}
                />
            </FormControl>

            <FormControl mt={4}>
                <FormLabel htmlFor="zipcode">Zipcode</FormLabel>
                <Input
                    name='zipcode'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.zipcode}
                    isInvalid={formik.touched.zipcode && formik.errors.zipcode}
                />
            </FormControl>

            <Button mt={4} width="full" type='submit'>
                Save
            </Button>
        </form>
    )
}

export default CargoLocForm