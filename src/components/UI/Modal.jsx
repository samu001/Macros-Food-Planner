import React from "react";
import ReactDOM from "react-dom";
import "./Modal.css";

const Modal = ({ isShowing, hide }) =>
    isShowing
        ? ReactDOM.createPortal(
              <React.Fragment>
                  <div className="modal-overlay" />
                  <div
                      className="modal-wrapper"
                      aria-modal
                      aria-hidden
                      tabIndex={-1}
                      role="dialog"
                  >
                      <div className="modal">
                          <div className="modal-header">
                              <button
                                  type="button"
                                  className="modal-close-button"
                                  data-dismiss="modal"
                                  aria-label="Close"
                                  onClick={hide}
                              >
                                  <span aria-hidden="true">&times;</span>
                              </button>
                          </div>
                          <p>Some more foods to try out 😋</p>
                          <ul>
                              <li>Salad</li>
                              <li>Lasagna</li>
                              <li>Tilapia</li>
                              <li>Lamb</li>
                              <li>Turkey</li>
                              <li>Beef</li>
                              <li>Shrimp</li>
                              <li>Popcorn</li>
                              <li>Pizza</li>
                          </ul>
                      </div>
                  </div>
              </React.Fragment>,
              document.body
          )
        : null;

export default Modal;
