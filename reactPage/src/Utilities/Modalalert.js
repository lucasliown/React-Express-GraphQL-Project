import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";
import "../CSS/modal.css";

//this component is for alert the warning page
function Modalalert(props) {
  //handle the close
  const handleClose = () => {
    props.setshowModal(false);
  };

  //handle the action that pass into the compoment
  const handleAction = () => {
    props.setshowModal(false);
    props.dothings();
  };

  return (
    <>
      <Modal show={props.show} backdrop="static" centered>
        <Card className="characterModeal">
          <Card.Header>
            <div className="row mt-2">
              <div className="col-sm-2 moveLetter"></div>
              <div className="material-icons col-sm-1 changeWarningcolour">
                notification_important
              </div>
              <div className="col-sm-8">
                <h5>{props.settile}</h5>
              </div>
            </div>
          </Card.Header>
          <Card.Body className="row mb-2">
            <div className="col-sm-2"></div>
            <div className="col-sm moveLetter">{props.settest}</div>
          </Card.Body>
          <Card.Body className="row mb-3">
            <div className="col-sm-2"></div>
            <Button
              className="col-sm-3"
              variant="outline-success"
              onClick={handleClose}
            >
              Close
            </Button>
            <div className="col-sm-2"></div>
            <Button
              className="col-sm-3"
              variant="danger"
              onClick={handleAction}
            >
              delete
            </Button>
          </Card.Body>
        </Card>
      </Modal>
    </>
  );
}

export default Modalalert;
