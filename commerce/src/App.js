import Container from "./Components/Container"
import { ChakraProvider } from '@chakra-ui/react'
import { UserDataProvider } from "./context/MyUserData";


function App() {
  return (
    <>
      <ChakraProvider>
        <UserDataProvider>
          <Container/>
        </UserDataProvider>
      </ChakraProvider>
    </>
  );
}

export default App;
