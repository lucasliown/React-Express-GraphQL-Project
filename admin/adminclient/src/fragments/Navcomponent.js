import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import "../CSS/character.css";
import Dropdown from "react-bootstrap/Dropdown";

//this is the navgation bar
function Navcomponent() {
  return (
    <Navbar className="navbackground shadow-lg " variant="Success" expand="lg">
      <Container>
        <Navbar.Brand className="brand mb-1 navbarBrand">
          Admin Dashboard
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav d-flex flex-row-reverse" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          <Link
              className="material-icons mx-3 mb-1 homeSize changeicon"
              to="/"
            >
              house
            </Link>
          </Nav>
          <Nav className="ms-auto">
            <Dropdown className="mx-4">
              <Dropdown.Toggle variant="Link" className="dropdown-toggle">
                <div className="material-icons sizeOfDropDownToggle">
                  person_off
                </div>
              </Dropdown.Toggle>

              <Dropdown.Menu className="dropdown-menu shadow border border-1 reduceradiusForNav">
                <div className="d-grid gap-2">
                  <Link
                    className="btn btn-light border-0 bg-light bg-opacity-10 reduceradius mb-0 p-2 changColor listCharacter"
                    to="/blockuser"
                  >
                    <div className="row">
                      <div className="material-icons col-sm-1 followAccountSize changeAccountSize ">
                        block
                      </div>
                      <div className="col-sm-7 mx-1 ">Block/unblock</div>
                    </div>
                  </Link>

                  <Link
                    className="btn btn-light border-0 bg-light bg-opacity-10 mb-0 mt-0 p-2 reduceradius changColor listCharacter"
                    to="/deletePost"
                  >
                    <div className="row">
                      <div className="material-icons col-sm-1 followAccountSize changeAccountSize">
                        delete_forever
                      </div>
                      <div className="col-sm-10">Delete posts</div>
                    </div>
                  </Link>
                </div>
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown>
              <Dropdown.Toggle variant="Link" className="dropdown-toggle">
                <div className="material-icons sizeOfDropDownToggle">poll</div>
              </Dropdown.Toggle>

              <Dropdown.Menu className="dropdown-menu shadow border border-1 reduceradiusForNav">
                <div className="d-grid gap-2">
                  <Link
                    className="btn btn-light border-0 bg-light bg-opacity-10 reduceradius mb-0 p-2 changColor listCharacter"
                    to="/followermetrics"
                  >
                    <div className="row">
                      <div className="material-icons col-sm-1 followAccountSize changeAccountSize moveLab">
                        people_alt
                      </div>
                      <div className="col-sm-11">Follower metrics</div>
                    </div>
                  </Link>

                  <Link
                    className="btn btn-light border-0 bg-light bg-opacity-10 mb-0 mt-0 p-2 reduceradius changColor listCharacter"
                    to="/profilemetrics"
                  >
                    <div className="row">
                      <div className="material-icons col-sm-1 followAccountSize changeAccountSize moveLab">
                        folder_shared
                      </div>
                      <div className="col-sm-11">
                        Profile visits metrics
                      </div>
                    </div>
                  </Link>

                  <Link
                    className="btn btn-light border-0 bg-light bg-opacity-10 mb-0 mt-0 p-2 reduceradius changColor listCharacter"
                    to="/reactionmetrics"
                  >
                    <div className="row">
                      <div className="material-icons col-sm-1 followAccountSize changeAccountSize moveLab">
                        thumbs_up_down
                      </div>
                      <div className="col-sm-11">
                        Post Reaction metrics
                      </div>
                    </div>
                  </Link>
                  <Link
                    className="btn btn-light border-0 bg-light bg-opacity-10 mb-0 mt-0 p-2 reduceradius changColor listCharacter"
                    to="/usagemetrics"
                  >
                    <div className="row">
                      <div className="material-icons col-sm-1 followAccountSize changeAccountSize moveLab">
                        visibility
                      </div>
                      <div className="col-sm-11 ">
                        Website useage metrics
                      </div>
                    </div>
                  </Link>
                </div>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navcomponent;
