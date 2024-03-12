import React, { useContext, useEffect, useState } from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Button from "@mui/material/Button";
import { addServiceContextResponse } from "../../../../ContextAPI/ContextShare";
import { addServiceAPI } from "../../../../Services/allAPIs";

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

function AddService() {
  const [centredModal, setCentredModal] = useState(false);

  const [switchState, setSwitchState] = useState(false);

  const toggleOpen = () => setCentredModal(!centredModal);
  const toggleSwitch = () => {
    setSwitchState(!switchState);
    setServiceDetails({
      ...serviceDetails,
      status: !switchState ? "Enabled" : "Disabled",
    });
  };

  const {addServiceRes,setAddServiceRes} = useContext(
    addServiceContextResponse
  );

  const [serviceDetails, setServiceDetails] = useState({
    serviceName: "",
    price: "",
    status: "Disabled",
    description: "",
  });

  const [token, setToken] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"));
    }
  }, []);

  const serviceAdd = async () => {
    const { serviceName, price, status, description } = serviceDetails;

    if (!serviceName||!price||!description) {
      alert("Please fill the form");
      return;
    }

    const reqBody = {
      serviceName,
      price,
      status,
      description,
    };

    const reqHeader = {
      Authorization: `Bearer ${token}`,
    };


    const result = await addServiceAPI(reqBody,reqHeader);
console.log(result.status);
    if(result.status == 200){
      setAddServiceRes(result.data)
      alert("Service added successfully")
      toggleOpen();
      setServiceDetails({
        serviceName:"",
        price:"",
        stock:"",
        description:""
      });
      setSwitchState(false); // Reset switch state
    }
    else{
      alert(result.response.data);
    }
  }
  return (
    <div>
      <Fab
        color="primary"
        aria-label="add"
        className="floating-button"
        onClick={toggleOpen}
        style={{
          position: "fixed",
          bottom: "50px",
          right: "70px",
          animation: "bounce 2s ease-in-out infinite", // Add the desired animation here
        }}
      >
        <AddIcon />
      </Fab>

      <MDBModal tabIndex="-1" open={centredModal} setOpen={setCentredModal}>
        <MDBModalDialog size="lg" centered>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Add Service</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={toggleOpen}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody style={{ zIndex: 1200 }}>
              <div className="d-flex justify-content-center flex-column">
                <TextField
                  id="outlined-basic"
                  label="Service Name"
                  className="m-3"
                  variant="outlined"
                  value={serviceDetails.serviceName}
                  onChange={(e) =>
                    setServiceDetails({
                      ...serviceDetails,
                      serviceName: e.target.value,
                    })
                  }
                />
                <TextField
                  id="outlined-basic"
                  label="Price"
                  className="m-3"
                  variant="outlined"
                  value={serviceDetails.price}
                  onChange={(e) =>
                    setServiceDetails({
                      ...serviceDetails,
                      price: e.target.value,
                    })
                  }
                />
                <TextField
                  className="m-3"
                  id="outlined-multiline"
                  label="Description"
                  multiline
                  maxRows={4}
                  value={serviceDetails.description}
                  onChange={(e) =>
                    setServiceDetails({
                      ...serviceDetails,
                      description: e.target.value,
                    })
                  }
                />
                <FormControlLabel
                  control={
                    <IOSSwitch
                      sx={{ m: 1 }}
                      checked={switchState}
                      onChange={toggleSwitch}
                    />
                  }
                  label={switchState ? "Enabled" : "Disabled"}
                  sx={{ color: switchState ? "green" : "red" }}
                />
              </div>
            </MDBModalBody>

            <div className="row p-3">
              <div className="col-6">
                <Button
                  variant="outlined"
                  onClick={toggleOpen}
                  color="error"
                  className="w-100"
                >
                  Cancel
                </Button>
              </div>
              <div className="col-6">
                <Button
                  onClick={serviceAdd}
                  variant="outlined"
                  color="success"
                  className="w-100"
                >
                  Save
                </Button>
              </div>
            </div>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </div>
  );
}

export default AddService;
