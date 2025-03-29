import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Paper, Typography, Box, Modal } from "@mui/material";
import { checkAuth } from "../../redux/authSlice";
import EditMyDetailsForm from "./EditMyDetailsForm";

// Constants for styling
const pageStyles = {
  backgroundColor: "#F9FAFB",
  minHeight: "100vh",
  fontFamily: "'Roboto', sans-serif",
};

const sectionStyles = {
  p: 3,
  mb: 3,
};

const textStyles = {
  color: "#1F2937",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  textAlign: "left",
};

const linkStyles = {
  color: "black",
  textDecoration: "none",
};

// Reusable component for rendering a section title with an edit link
const SectionTitle = ({ title, onEditClick }) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      mb: 1,
      pl: 0,
    }}
  >
    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
      {title}
    </Typography>
    <a
      href="#"
      style={linkStyles}
      onClick={(e) => {
        e.preventDefault();
        onEditClick();
      }}
    >
      Edit
    </a>
  </Box>
);

// Reusable component for rendering a detail item
const DetailItem = ({ label, value }) => (
  <Typography
    variant="body2"
    sx={{
      mb: 1,
      ...textStyles,
    }}
  >
    <strong>{label}</strong>
    {value}
  </Typography>
);

const Settings = () => {
  const dispatch = useDispatch();
  const { user, status, error } = useSelector((state) => state.auth);
  const [openModal, setOpenModal] = useState(false);

  // Memoize the handleOpenModal and handleCloseModal functions
  const handleOpenModal = useCallback(() => setOpenModal(true), []);
  const handleCloseModal = useCallback(() => setOpenModal(false), []);

  // Fetch user data on mount
  useEffect(() => {
    if (status === "idle") {
      dispatch(checkAuth());
    }
  }, [dispatch, status]);

  // Format date of birth
  const formatDate = (date) => {
    return date ? new Date(date).toLocaleDateString() : "Not provided";
  };

  // Render loading state
  if (status === "loading") {
    return (
      <Container maxWidth="md" sx={{ p: 2 }}>
        <Typography variant="h6">Loading...</Typography>
      </Container>
    );
  }

  // Render error state
  if (status === "failed") {
    return (
      <Container maxWidth="md" sx={{ p: 2 }}>
        <Typography variant="h6" sx={{ color: "red" }}>
          Error: {error || "Failed to load user data"}
        </Typography>
      </Container>
    );
  }

  return (
    <div style={pageStyles}>
      <Container maxWidth="md" sx={{ p: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>
          Settings
        </Typography>
        <Typography variant="body1" sx={{ color: "#4B5563", mb: 4 }}>
          You can manage your account and subscriptions here
        </Typography>

        {/* My Details Section */}
        <Paper sx={sectionStyles}>
          <SectionTitle title="My Details" onEditClick={handleOpenModal} />
          <Box sx={{ ...textStyles, pl: 0, pr: 0, ml: 0, mr: 0 }}>
            <DetailItem label="Email" value={user?.email || "Not provided"} />
            <DetailItem
              label="First name"
              value={user?.firstName || "Not provided"}
            />
            <DetailItem
              label="Last name"
              value={user?.lastName || "Not provided"}
            />
            <DetailItem
              label="Date of birth"
              value={formatDate(user?.dateOfBirth)}
            />
            <DetailItem
              label="Phone number"
              value={user?.phoneNumber || "Not provided"}
            />
            <DetailItem label="Gender" value={user?.gender || "Not provided"} />
            <DetailItem
              label="Postcode"
              value={user?.address?.postalCode || "Not provided"}
            />
            <DetailItem
              label="Market"
              value={user?.address?.country || "Not provided"}
            />
          </Box>
        </Paper>

        {/* Modal for Edit Form */}
        <Modal open={openModal} onClose={handleCloseModal}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "90%",
              maxWidth: 500,
              maxHeight: "90vh",
              overflowY: "auto",
            }}
          >
            <EditMyDetailsForm user={user} onClose={handleCloseModal} />
          </Box>
        </Modal>

        {/* Payment Settings Section */}
        <Paper sx={sectionStyles}>
          <SectionTitle title="Payment Settings" onEditClick={() => {}} />
          <Typography variant="body2" sx={textStyles}>
            There are currently no cards saved. You can add new payment methods
            at checkout.
          </Typography>
        </Paper>

        {/* Address Section */}
        <Paper sx={sectionStyles}>
          <SectionTitle title="Address" onEditClick={() => {}} />
          <Typography
            variant="body2"
            sx={{ ...textStyles, color: "#4B5563", mb: 1 }}
          >
            You can also add and edit delivery addresses here
          </Typography>
          <Box sx={textStyles}>
            <DetailItem
              label="Billing Address"
              value={
                <>
                  {user?.address?.street || "Not provided"}
                  <br />
                  {user?.address?.city || ""} {user?.postalCode || ""}
                  {user?.address?.state || ""}
                  {user?.address?.country || ""}
                </>
              }
            />
          </Box>
        </Paper>

        {/* Newsletter Subscription Section */}
        <Paper sx={sectionStyles}>
          <SectionTitle
            title="Newsletter Subscription"
            onEditClick={() => {}}
          />
          <Box sx={textStyles}>
            <DetailItem label="Newsletter Subscription" value="" />
            <Typography
              variant="body2"
              sx={{ ...textStyles, color: "#4B5563", mb: 1 }}
            >
              Unsubscribe
            </Typography>
            <Typography
              variant="body2"
              sx={{ ...textStyles, color: "#4B5563", mb: 1 }}
            >
              Direct Mail Marketing
            </Typography>
            <Typography
              variant="body2"
              sx={{ ...textStyles, color: "#4B5563", mb: 1 }}
            >
              Stay subscribed
            </Typography>
          </Box>
        </Paper>

        {/* Privacy Section */}
        <Paper sx={sectionStyles}>
          <Typography
            variant="h6"
            sx={{ ...textStyles, fontWeight: "bold", mb: 2 }}
          >
            Privacy
          </Typography>
          <Box sx={textStyles}>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <a href="#" style={linkStyles}>
                Change password
              </a>
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <a href="#" style={linkStyles}>
                Go to My privacy portal
              </a>
            </Typography>
            <Typography
              variant="body2"
              sx={{ ...textStyles, color: "#4B5563", mt: 1 }}
            >
              On H&M Group's privacy portal you can see your subscriptions,
              accounts, memberships and/or guest profiles connected to your
              email address across our brands and countries. Here you can edit
              subscriptions, request a copy of your data or choose to delete
              your account.
            </Typography>
          </Box>
        </Paper>
      </Container>
    </div>
  );
};

export default Settings;
