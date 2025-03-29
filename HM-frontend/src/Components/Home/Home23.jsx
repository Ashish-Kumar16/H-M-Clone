import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

// Shared Styles
const PageContainer = styled("div")({
  backgroundColor: "#F3F4F6",
  minHeight: "100vh",
});

const NavBar = styled("nav")({
  position: "fixed",
  top: 0,
  width: "100%",
  backgroundColor: "white",
  padding: "1rem",
  display: "flex",
  gap: "1rem",
  justifyContent: "center",
  zIndex: 1000,
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
});

const NavButton = styled(Button)({
  color: "black",
  "&:hover": {
    backgroundColor: "#F3F4F6",
  },
});

const Section = styled("section")({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "4rem 0",
});

// FashionPage Styles
const FashionContainer = styled("div")({
  height: "639.98px",
});

const FashionImageWrapper = styled("div")({
  position: "relative",
  width: "960px",
  height: "639.98px",
});

const GridContainer = styled("div")({
  display: "grid",
  gridTemplateColumns: "1fr",
  height: "100%",
  "@media (min-width: 768px)": {
    gridTemplateColumns: "1fr 1fr",
  },
});

const ImageContainer = styled("div")({
  position: "relative",
});

const Image = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
});

const PriceOverlay = styled("div")({
  position: "absolute",
  inset: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  top: "5px",
});

const PriceBox = styled("div")({
  backgroundColor: "black",
  color: "white",
  padding: "0.5rem 1rem",
});

// SpringUpdate Styles
const SpringContainer = styled("div")({
  position: "relative",
  width: "960px",
  height: "639.98px",
});

const SpringLeftText = styled("div")({
  position: "absolute",
  bottom: "2.5rem",
  left: "2.5rem",
  color: "white",
});

const SpringPriceBox = styled("div")({
  position: "absolute",
  bottom: "2.5rem",
  right: "2.5rem",
  backgroundColor: "black",
  color: "white",
  padding: "0.5rem 1rem",
  borderRadius: "0.25rem",
});

// DenimPage Styles
const DenimContainer = styled("div")({
  position: "relative",
});

const DenimOverlay = styled("div")({
  position: "absolute",
  inset: 0,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  color: "white",
  width: "960px",
  height: "145.97px",
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",
});

const ButtonContainer = styled("div")({
  marginTop: "1rem",
  display: "flex",
  gap: "0.5rem",
});

// BohoRevival Styles
const BohoPriceTag = styled("div")({
  position: "absolute",
  top: "1rem",
  left: "1rem",
  backgroundColor: "black",
  color: "white",
  padding: "0.25rem 0.75rem",
  borderRadius: "0.375rem",
});

// TablewarePage Styles
const TablewarePriceTag = styled("div")({
  position: "absolute",
  top: "25%",
  left: "50%",
  transform: "translateX(-50%) translateY(-50%)",
  backgroundColor: "black",
  color: "white",
  padding: "0.5rem 1rem",
  borderRadius: "0.25rem",
});

// Shared Component Styles
const Title = styled("h1")({
  fontSize: "2.25rem",
  fontWeight: "700",
});

const Description = styled("p")({
  marginTop: "0.5rem",
});

const ShopButton = styled(Button)({
  marginTop: "1rem",
  padding: "0.5rem 1.5rem",
  "&:hover": {
    backgroundColor: "inherit",
  },
});

const FashionPage = () => (
  <FashionContainer>
    <FashionImageWrapper>
      <GridContainer>
        <ImageContainer>
          <Image
            src="https://storage.googleapis.com/a1aa/image/Ee2C1z_s__WQ0Y-f1ZmP6AfmXHpPZJLILiBosj-Gt3s.jpg"
            alt="Fashion models"
            width="480"
            height="639.98"
          />
          <PriceOverlay>
            <PriceBox>
              <p>Rs. 1,999.00</p>
              <p>
                Ruffled tunic <FontAwesomeIcon icon={faChevronRight} />
              </p>
            </PriceBox>
          </PriceOverlay>
        </ImageContainer>
        <ImageContainer>
          <Image
            src="https://storage.googleapis.com/a1aa/image/u4S99QWuYp7vQZ9--KH_svfJ87r4Ogk2e-4LWcp_XX0.jpg"
            alt="Model in white"
            width="480"
            height="639.98"
            style={{ filter: "grayscale(100%)" }}
          />
        </ImageContainer>
      </GridContainer>
      <div
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          textAlign: "center",
        }}
      >
        <Title>S/S 2025</Title>
        <ShopButton
          variant="contained"
          style={{ backgroundColor: "black", color: "white" }}
        >
          SHOP NOW
        </ShopButton>
      </div>
    </FashionImageWrapper>
  </FashionContainer>
);

const SpringUpdate = () => (
  <SpringContainer>
    <Image
      src="https://storage.googleapis.com/a1aa/image/YuOWswaMxLqfBvc6sfLZTVNIoJPLSYZftpnpqR5m3lE.jpg"
      alt="Man in sweater"
    />
    <SpringLeftText>
      <Title>Spring update</Title>
      <Description>
        Refined essentials in relaxed fits for the new season.
      </Description>
      <ShopButton
        variant="contained"
        style={{ backgroundColor: "white", color: "black", fontWeight: 600 }}
      >
        Shop now
      </ShopButton>
    </SpringLeftText>
    <SpringPriceBox>
      <p>Rs. 2,999.00</p>
      <p>Regular Fit Pointelle...</p>
    </SpringPriceBox>
  </SpringContainer>
);

const DenimPage = () => (
  <DenimContainer>
    <Image
      src="https://storage.googleapis.com/a1aa/image/AocrRPYaBy9kOU0pF3WThtgOi33bBgFVBAORjelOz6w.jpg"
      alt="Denim fabric"
      width="1920"
      height="600"
      style={{ height: "16rem" }}
    />
    <DenimOverlay>
      <Title style={{ fontSize: "1.875rem" }}>
        The ultimate celebration of denim
      </Title>
      <Description>Explore the curation.</Description>
      <ButtonContainer>
        {["Ladies", "Men", "Baby", "Kids"].map((category) => (
          <ShopButton
            key={category}
            variant="contained"
            style={{ backgroundColor: "white", color: "black" }}
          >
            {category}
          </ShopButton>
        ))}
      </ButtonContainer>
    </DenimOverlay>
  </DenimContainer>
);

const BohoRevival = () => (
  <SpringContainer>
    <Image
      src="https://storage.googleapis.com/a1aa/image/30khbQBLH12KP_nM0zbGZpRBn8V9FSz8IUWPf3AxSbg.jpg"
      alt="Woman in dress"
      width="960"
      height="639.98"
    />
    <BohoPriceTag>
      <p style={{ fontSize: "0.875rem" }}>Rs. 2,299.00</p>
      <p style={{ fontSize: "0.75rem" }}>Tiered-skirt strappy d...</p>
    </BohoPriceTag>
    <div
      style={{
        position: "absolute",
        bottom: "2.5rem",
        left: "50%",
        transform: "translateX(-50%)",
        textAlign: "center",
      }}
    >
      <Title style={{ color: "white", fontSize: "1.875rem" }}>
        Boho revival
      </Title>
      <ShopButton
        variant="contained"
        style={{ backgroundColor: "white", color: "black" }}
      >
        Shop now
      </ShopButton>
    </div>
  </SpringContainer>
);

const TablewarePage = () => (
  <SpringContainer>
    <Image
      src="https://storage.googleapis.com/a1aa/image/Olm8sqOvQ2_YDErKJD6dfKvyEIrtZ6-d-dePZsZ28Pc.jpg"
      alt="Tableware"
      width="960"
      height="639.98"
    />
    <TablewarePriceTag>
      Rs. 749.00
      <br />
      Small stoneware bowl{" "}
      <FontAwesomeIcon icon={faChevronRight} className="ml-1" />
    </TablewarePriceTag>
    <div
      style={{
        position: "absolute",
        bottom: "25%",
        left: "50%",
        transform: "translateX(-50%)",
        textAlign: "center",
      }}
    >
      <Title style={{ color: "white", fontSize: "1.875rem" }}>
        New in: Tableware
      </Title>
      <ShopButton
        variant="contained"
        style={{ backgroundColor: "white", color: "black" }}
      >
        Shop now
      </ShopButton>
    </div>
  </SpringContainer>
);

export const HomeComp = () => {
  const sections = [
    { id: "fashion", title: "Fashion", component: FashionPage },
    { id: "spring", title: "Spring", component: SpringUpdate },
    { id: "denim", title: "Denim", component: DenimPage },
    { id: "boho", title: "Boho", component: BohoRevival },
    { id: "tableware", title: "Tableware", component: TablewarePage },
  ];

  return (
    <PageContainer>
      {/* <NavBar>
        {sections.map((section) => (
          <NavButton
            key={section.id}
            onClick={() =>
              document
                .getElementById(section.id)
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            {section.title}
          </NavButton>
        ))}
      </NavBar> */}
      {sections.map((section) => (
        <Section key={section.id} id={section.id}>
          <section.component />
        </Section>
      ))}
    </PageContainer>
  );
};

