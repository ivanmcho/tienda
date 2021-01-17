import React from "react";
import Modal from "react-modal";
import "./FullModal.css";

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        borderRadius: 25,
    },
};
Modal.setAppElement("#app-container");

export const FullModal = (props) => {
    const closeModal = () => {
        props.showModal(false);
    };

    return (
        <Modal
            isOpen={props.show_modal}
            onRequestClose={closeModal}
            style={customStyles}
            closeTimeoutMS={200}
            // className="modal"
            overlayClassName="modal-fondo"
        >
            <div
                className="d-flex justify-content-end"
                style={{
                    marginTop: "-20px",
                    marginRight: "-5px",
                }}
            >
                <span
                    onClick={closeModal}
                    className="txt-16-n color-FF4"
                    style={{
                        cursor: "pointer",
                    }}
                >
                    x
                </span>
            </div>

            {props.children}
        </Modal>
    );
};
