import React, { useState } from "react";
import { useDispatch } from "react-redux"; // Import dispatch for Redux
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Add this import

import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Text,
  Select,
} from "@chakra-ui/react";
import { toast, ToastContainer } from "react-toastify"; // Import toast
import "react-toastify/dist/ReactToastify.css"; // Import the styles

import { SignIn } from "./Signin"; // Ensure this import is correct
import styles from "./Signup.module.css"; // Import your custom styles

export const SignInComp = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [show, setShow] = useState(false);
  const [pass, setPass] = useState("");
  const [isOpen, setIsOpen] = useState(false); // State to manage modal visibility
  const dispatch = useDispatch(); // Use dispatch to trigger Redux actions
  const navigate = useNavigate();

  const handleClick = () => setShow(!show);

 const handleSignUp = async () => {
   if (!email || !firstName || !lastName || !gender || !pass) {
     console.log("Fields are not filled correctly!");
     toast.error("All fields are required.");
     return;
   }

   // Email validation regex
   const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
   if (!emailPattern.test(email)) {
     console.log("Invalid email address!");
     toast.error("Please enter a valid email.");
     return;
   }

   const userData = { email, pass, firstName, lastName, gender };

   console.log("Sending the following data:", userData); // Debugging line

   try {
     const response = await axios.post(
       "http://localhost:5000/users/register",
       userData,
     );

     if (response.status === 200) {
       console.log("Sign-up successful!");
       toast.success("Sign up successful! Please Login.");
       navigate("/"); // Redirect to home page or login page
     }
   } catch (error) {
     console.error("Sign Up Error:", error.response?.data || error.message);
     toast.error(
       "Sign up failed: " + (error.response?.data?.msg || "Unknown error"),
     );
   }
 };

  return (
    <div className={styles.signup_box}>
      <Text fontSize={"2xl"} fontWeight="500">
        BECOME A MEMBER
      </Text>
      <Text>
        Become a member — don’t miss out on deals, offers, discounts, and bonus
        vouchers.
      </Text>
      <div className={styles.signup_form_box}>
        <FormControl isRequired>
          <FormLabel fontWeight={"400"} marginTop="14px">
            Email
          </FormLabel>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            borderRadius={"0"}
            focusBorderColor="green.400"
            colorScheme={"green"}
          />
          <FormLabel fontWeight={"400"} marginTop="14px">
            Password
          </FormLabel>
          <InputGroup>
            <Input
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              type={show ? "text" : "password"}
              borderRadius={"0"}
              focusBorderColor="green.400"
              colorScheme={"green"}
            />
            <InputRightElement width="4.5rem">
              <Text size="sm" onClick={handleClick} cursor="pointer">
                {show ? "Hide" : "Show"}
              </Text>
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <Accordion
          allowMultiple
          marginTop={"15px"}
          marginBottom="15px"
          defaultIndex={[0]}
        >
          <AccordionItem border="none">
            <h2>
              <AccordionButton _hover={{ background: "var(--color-bg)" }}>
                <Box as="span" flex="1" textAlign="left">
                  ADD MORE & GET MORE
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel>
              <FormControl isRequired>
                <FormLabel fontWeight={"400"} marginTop="14px">
                  First Name
                </FormLabel>
                <Input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  borderRadius={"0"}
                  focusBorderColor="green.400"
                  colorScheme={"green"}
                />
                <FormLabel fontWeight={"400"} marginTop="14px">
                  Last Name
                </FormLabel>
                <Input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  type="text"
                  borderRadius={"0"}
                  focusBorderColor="green.400"
                  colorScheme={"green"}
                />
                <FormControl isRequired>
                  <FormLabel fontWeight={"400"} marginTop="14px">
                    Gender
                  </FormLabel>
                  <Select
                    focusBorderColor="green.400"
                    borderRadius={"0"}
                    onChange={(e) => setGender(e.target.value)}
                    value={gender}
                    marginTop="15px"
                  >
                    <option disabled value="">
                      Select a Gender
                    </option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </Select>
                </FormControl>
              </FormControl>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>

        <Button
          colorScheme={"blackAlpha"}
          background="var(--text-color)"
          width={"100%"}
          borderRadius="0"
          onClick={handleSignUp}
        >
          Become a Member
        </Button>

        <Button
          colorScheme={"blackAlpha"}
          background="var(--text-color)"
          width={"100%"}
          borderRadius="0"
          onClick={() => setIsOpen(true)} // Open the modal
          marginTop="15px"
        >
          Sign In
        </Button>
      </div>

      {/* SignIn Modal */}
      <SignIn isOpen={isOpen} onClose={() => setIsOpen(false)} />

      {/* Toast Container for displaying toast messages */}
      <ToastContainer />
    </div>
  );
};
