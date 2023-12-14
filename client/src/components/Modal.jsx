import React, { useEffect, useState } from 'react';
import { Button, Modal } from "react-daisyui";


export default function FormModal(props) {
    const {open,form,title} = props;
    const [modalOpen, setModalOpen] = useState(open);
    const [responseStatus, setResponseStatus] = useState('');
    const [responseMsg, setResponseMsg] = useState('');
    const [toggleAlert, setToggleAlert] = useState(false);


    useEffect(() => {
        setModalOpen(open);
    }, [open]);

    return (
        <Modal open={modalOpen}>
            {/* <h1>{title}</h1> */}
            <center>{form}</center>
        </Modal>
    );
};