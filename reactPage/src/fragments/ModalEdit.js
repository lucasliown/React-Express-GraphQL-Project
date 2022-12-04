import React, { useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";
import "../CSS/modal.css";
import "../CSS/loginsignup.css";
import "../CSS/post.css";
import { checkPost, editpost } from "../handlerdata/postingdata";
import { toast } from "react-toastify";
import { storage } from "../firebase/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

//this component is a window will pop up and you and edit the detail of Post
function ModalEdit(props) {
  let uploadFile = null;
  const deleteImageRef = useRef();
  const [modifyPostMessage, setmodifyPostMessage] = useState(
    props.postDetail.text
  );
  const [modifyImage, setmodifyImage] = useState(props.postDetail.ImageURL);
  const [imageDetail, setimageDetail] = useState(null);

  //handler close the modal
  const handleClose = () => {
    setmodifyPostMessage(props.postDetail.text);
    setimageDetail(null);
    setmodifyImage(props.postDetail.ImageURL);
    props.setShow(false);
  };

  //handler submit when you submit the form
  const handlerSubmit = async (event) => {
    event.preventDefault();
    //check the vaildation for post
    const check = checkPost(modifyPostMessage);
    if (check === "Cannot have empty post message, Please enter your message") {
      setmodifyPostMessage(props.postDetail.text);
      toast.error("Cannot have empty post message, Please enter your message", {
        position: toast.POSITION.TOP_LEFT,
      });
      return;
    }
    if (
      check ===
      "Cannot enter more than 600 characters, Please modify your message"
    ) {
      setmodifyPostMessage(props.postDetail.text);
      toast.error(
        "Cannot enter more than 600 characters, Please modify your message",
        {
          position: toast.POSITION.TOP_LEFT,
        }
      );
      return;
    }
    props.setShow(false);
    //sometimes someone upload the image
    if (imageDetail !== null) {
      const name = "images/" + imageDetail.name + uuidv4();
      const imageRef = ref(storage, name);

      //firebase upload file function
      const uploadResult = await uploadBytes(imageRef, imageDetail);
      const url = await getDownloadURL(uploadResult.ref);
      const modifyPost = await editpost(
        props.postDetail.post_id,
        modifyPostMessage,
        url
      );
      props.setPostDetail(modifyPost);
      setimageDetail(null);
      event.preventDefault();
      toast.success("You Edit a Post sucessfull!!", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } else {
      if (modifyImage === null) {
        //call the function that can modify the post
        const modifyPost = await editpost(
          props.postDetail.post_id,
          modifyPostMessage,
          ""
        );
        props.setPostDetail(modifyPost);
        setimageDetail(null);
        event.preventDefault();
        toast.success("You Edit a Post sucessfull!", {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      } else {
        //call the function that can modify the post
        const modifyPost = await editpost(
          props.postDetail.post_id,
          modifyPostMessage,
          props.postDetail.ImageURL
        );
        props.setPostDetail(modifyPost);
        setimageDetail(null);
        event.preventDefault();
        toast.success("You Edit a Post sucessfull!", {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    }
  };

  //handler the upload image
  const handerImage = (event) => {
    uploadFile = event.target.files[0];
    console.log(uploadFile);
    if (uploadFile === undefined || uploadFile === null) {
      return;
    }
    //get the perview of the image
    setmodifyImage(URL.createObjectURL(uploadFile));
    setimageDetail(uploadFile);
  };

  const handlerDeleteImage = (event) => {
    event.preventDefault();
    uploadFile = null;
    setmodifyImage(null);
    setimageDetail(null);
    deleteImageRef.current.value = null;
  };

  return (
    <>
      <Modal show={props.show} onHide={handleClose} centered>
        <Card className="characterModeal">
          <Modal.Header closeButton>
            <Card.Title>
              <strong>Post Detail</strong>
            </Card.Title>
          </Modal.Header>
          <div>
            <Card.Body>
              <Form onSubmit={handlerSubmit}>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <div>
                    <Form.Label>Post Message</Form.Label>
                    <ReactQuill
                      onChange={setmodifyPostMessage}
                      value={modifyPostMessage}
                      className="form-control textBoxForPost mx-1"
                      form="subComment"
                    />
                  </div>
                  {modifyImage && (
                    <div>
                      <div className="moveImagelabel mt-2">
                        <Form.Label>Image</Form.Label>
                      </div>
                      <div className="row moveImage mb-5">
                        <div className="col-sm-1"></div>
                        <div className="col-sm-10">
                          <img
                            src={modifyImage}
                            className="rounded picturesize mx-1"
                            alt="..."
                          />
                        </div>
                        <div className="col-sm-1 ">
                          <button
                            onClick={handlerDeleteImage}
                            className="btn-close btn-close-dark rounded "
                          ></button>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="row mt-4">
                    <div className="col-sm-1">
                      <label
                        htmlFor="cameraEdit"
                        className="custom-file-upload"
                      >
                        <input
                          id="cameraEdit"
                          className="form-control uploadfile"
                          type="file"
                          onChange={handerImage}
                          ref={deleteImageRef}
                        />
                        <div
                          htmlFor="cameraEdit"
                          className="material-icons md-36 camera form-label cameracolor"
                        >
                          photo_camera
                        </div>
                      </label>
                    </div>
                    {imageDetail !== null && (
                      <div className="col-sm-4 mt-1 moveUploadLable">
                        <strong className="titleformat">
                          Upload:{imageDetail.name}
                        </strong>
                      </div>
                    )}
                    <div className="col-sm"></div>
                    <div className="col-sm-2">
                      <Button variant="secondary" onClick={handleClose}>
                        Close
                      </Button>
                    </div>
                    <div className="col-sm-4">
                      <Button type="submit" variant="primary">
                        Save Changes
                      </Button>
                    </div>
                  </div>
                </Form.Group>
              </Form>
            </Card.Body>
          </div>
        </Card>
      </Modal>
    </>
  );
}

export default ModalEdit;
