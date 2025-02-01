import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../../redux/auth/authSlice";
// import styles from "../Navbar.module.css";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
  FormControl,
  FormLabel,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useToast,
} from "@chakra-ui/react";

export const SignIn = ({ isOpen, onClose }) => {
  const navigate = useNavigate(); //
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();
  const toast = useToast();
  const { status, error } = useSelector((state) => state.auth);

  const handleSignIn = () => {
    dispatch(signIn({ email, pass })).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        toast({
          title: "Login successful",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        onClose();
      } else {
        toast({
          title: "Login failed",
          description: error || "Something went wrong",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent borderRadius="0" background="var(--color-bg)">
        <ModalHeader>Sign In</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            Become a member — don’t miss out on deals, offers, discounts, and
            bonus vouchers.
          </Text>
          <FormControl isRequired>
            <FormLabel fontWeight="400" marginTop="14px">
              Email
            </FormLabel>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              borderRadius="0"
              focusBorderColor="green.400"
              colorScheme="green"
            />
            <FormLabel fontWeight="400" marginTop="14px">
              Password
            </FormLabel>
            <InputGroup>
              <Input
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                type={show ? "text" : "password"}
                borderRadius="0"
                focusBorderColor="green.400"
                colorScheme="green"
              />
              <InputRightElement width="4.5rem">
                <Text size="sm" onClick={() => setShow(!show)} cursor="pointer">
                  {show ? "Hide" : "Show"}
                </Text>
              </InputRightElement>
            </InputGroup>
          </FormControl>

          <Text
            color="GrayText"
            _hover={{ textDecoration: "underline" }}
            cursor="pointer"
            marginTop="10px"
            onClick={() => {
              onClose(); // Close the modal when navigating
              navigate("/signup"); // Navigate to the signup page
            }}
          >
            Not a member yet? Join here!
          </Text>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="blackAlpha"
            background="var(--text-color)"
            width="100%"
            borderRadius="0"
            onClick={handleSignIn}
            isLoading={status === "loading"}
            isDisabled={!email || !pass}
          >
            Sign In
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
