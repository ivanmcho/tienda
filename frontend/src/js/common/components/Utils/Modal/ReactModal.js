import React, { Component } from "react";
import Modal from "react-modal";

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        // border: "solid 2px blue",
        borderRadius: 25,
    },
};

Modal.setAppElement("#app-container");

class ReactModal extends Component {
    state = {
        modalIsOpen: false,
    };

    subtitle = React.createRef();

    openModal = () => {
        this.setState({ modalIsOpen: true });
    };

    closeModal = () => {
        this.setState({ modalIsOpen: false });
    };

    afterOpenModal = () => {
        this.subtitle.current.style.color = "#f00";
    };
    CerrarModal = () => {
        console.log("CErrando modal");
        // this.subtitle.current.style.color = "#f00";
    };
    render() {
        const { modalIsOpen } = this.state;
        const { showModal, showForm } = this.props;
        return (
            <div>
                {/* <button onClick={this.openModal}>Open Modal</button> */}
                <Modal
                    //isOpen={modalIsOpen}
                    onRequestClose={showForm}
                    isOpen={showModal}
                    onAfterOpen={this.afterOpenModal}
                    // onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
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
                            onClick={()=>showForm(false)}
                            className="txt-16-n color-FF4"
                            style={{
                                cursor: "pointer",
                            }}
                        >
                            x
                        </span>
                    </div>

                    <h2
                        //ref={_subtitle => (subtitle = _subtitle)}
                        ref={this.subtitle}
                    ></h2>
                    {this.props.children}
                    {/* <button onClick={this.closeModal}>close</button> */}
                </Modal>
            </div>
        );
    }
}

export default ReactModal;
