 box-shadow: 0 12px 30px rgba(0, 0, 0, 0.6);
}
div.dtr-modal div.dtr-modal-content {
  position: relative;
  padding: 1em;
}
div.dtr-modal div.dtr-modal-close {
  position: absolute;
  top: 6px;
  right: 6px;
  width: 22px;
  height: 22px;
  border: 1px solid #eaeaea;
  background-color: #f9f9f9;
  text-align: center;
  border-radius: 3px;
  cursor: pointer;
  z-index: 12;
}
div.dtr-modal div.dtr-modal-close:hover {
  background-color: #eaeaea;
}
div.dtr-modal div.dtr-modal-background {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 101;
  background: rgba(0, 0, 0, 0.6);
}

@media screen and (max-width: 767px) {
  div.dtr-modal div.dtr-modal-display {
    width: 95%;
  }
}
                                                              