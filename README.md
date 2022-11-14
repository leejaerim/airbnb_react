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

### cors-header in django
> https://pypi.org/project/django-cors-headers/

- add it installed apps
```python
INSTALLED_APPS = [
    ...,
    "corsheaders",
    ...,
]
```

- add a middleware class
```python
MIDDLEWARE = [
    ...,
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
    ...,
]
```

- write allowed origin 
```python
CORS_ALLOWED_ORIGINS = [
    "https://example.com",
    "https://sub.example.com",
    "http://localhost:8080",
    "http://127.0.0.1:9000",
]
```