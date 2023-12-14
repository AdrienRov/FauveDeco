import React, { useEffect, useState } from 'react';
import { Button, Modal } from "react-daisyui";


export default function FormModal(props) {
	const { open, form, title } = props;
	const [modalOpen, setModalOpen] = useState(open);
	const [responseStatus, setResponseStatus] = useState('');
	const [responseMsg, setResponseMsg] = useState('');
	const [toggleAlert, setToggleAlert] = useState(false);

	useEffect(() => {
		setModalOpen(open);
	}, [open]);

	const handleModalClick = (e) => {
		// Prevent modal from closing when clicking on the modal content
		e.stopPropagation();
	};

	const handleOverlayClick = () => {
		// Close the modal when clicking outside the modal content
		props.parentCallback(false);
	};

	return (
		<Modal open={modalOpen} onClick={handleOverlayClick}>
			<center onClick={handleModalClick}>{form}</center>
		</Modal>
	);
};