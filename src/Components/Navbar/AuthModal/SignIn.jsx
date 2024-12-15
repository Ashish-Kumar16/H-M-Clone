import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import styles from "./Signup.module.css";
import { useNavigate } from "react-router-dom"; // Updated import

export const SignInComp = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const [pass, setPass] = useState("");

  const navigate = useNavigate(); // Use navigate instead of history

  const handleSignUp = () => {
    // Save the user data to localStorage after successful signup
    const userData = { email, pass, firstName, lastName, gender };

    // Check if user already exists in localStorage
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    if (existingUsers.some((user) => user.email === email)) {
      alert("User with this email already exists!");
      return;
    }

    existingUsers.push(userData);
    localStorage.setItem("users", JSON.stringify(existingUsers));
    alert("Sign up successful! You can now log in.");
    navigate("/"); // Use navigate for redirection
  };

  const handleSignIn = () => {
    // Check if user data exists in localStorage
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    const user = existingUsers.find(
      (user) => user.email === email && user.pass === pass,
    );

    if (user) {
      alert("Login successful!");
      navigate("/Home"); // Use navigate for redirection
    } else {
      alert("Invalid credentials. Please check your email and password.");
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
              <FormControl>
                <FormLabel fontWeight={"400"} marginTop="14px">
                  FirstName
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
                  LastName
                </FormLabel>
                <InputGroup>
                  <Input
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    type="text"
                    borderRadius={"0"}
                    focusBorderColor="green.400"
                    colorScheme={"green"}
                  />
                </InputGroup>
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
          onClick={handleSignIn}
          marginTop="15px"
        >
          Sign In
        </Button>
      </div>
    </div>
  );
};
