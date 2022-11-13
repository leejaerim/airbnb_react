### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`



### `npm run build`



### Install Chakra UI
`npm i @chakra-ui/react @emotion/react @emotion/styled framer-motion`

### Install react-router-dom
`npm i react-router-dom`


### Modal Content
```python
               <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>
                            Login
                        </ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            Hello
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme={"red"}>Close</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
```