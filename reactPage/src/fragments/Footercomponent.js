import React from "react";
import "../CSS/footer.css";

//This is the footer component
function Footercomponent() {
  return (
    <footer className="footer bg-light mt-auto py-3">
      <div className="container row mx-auto">
        <div className="col-sm-2"></div>
        <div className="col-sm-7 moveA">
          <div className="row">
            <div className="col-sm colorchange">
              {/* eslint-disable-next-line */}
              <a className="linkcolor colorchange">About</a>
            </div>
            <div className="col-sm">
              {/* eslint-disable-next-line */}
              <a className="linkcolor colorchange">Help Center</a>
            </div>
            <div className="col-sm">
              {/* eslint-disable-next-line */}
              <a className="linkcolor colorchange">Terms of Service</a>
            </div>
          </div>
          <div className="row">
            <div className="col-sm">
              {/* eslint-disable-next-line */}
              <a className="linkcolor colorchange">Privacy Policy</a>
            </div>
            <div className="col-sm">
              {/* eslint-disable-next-line */}
              <a className="linkcolor colorchange">Cookie Policy</a>
            </div>
            <div className="col-sm">
              {/* eslint-disable-next-line */}
              <a className="linkcolor colorchange">Accessibility</a>
            </div>
          </div>
          <div className="row">
            <div className="col-sm">
              {/* eslint-disable-next-line */}
              <a className="linkcolor colorchange">Ads Info</a>
            </div>
            <div className="col-sm">
              {/* eslint-disable-next-line */}
              <a className="linkcolor colorchange">Setting</a>
            </div>
            <div className="col-sm">
              {/* eslint-disable-next-line */}
              <a className="linkcolor colorchange">Careers</a>
            </div>
          </div>
        </div>
        <div className="col-sm-2">
          <img src="baigei.jpg" className="rounded logosize " alt="..." />
        </div>
      </div>

      <div className="d-flex justify-content-center moveCompany mt-3 mx-1">
        <div>
          {" "}
          <p className="text-secondary">®2022Whitegive company™</p>
        </div>
      </div>
    </footer>
  );
}
export default Footercomponent;
