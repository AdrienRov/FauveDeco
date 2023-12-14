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

        const handleKeyDown = (e) => {
            // Si la touche pressée est "Escape", fermez la modal
            if (e.key === 'Escape') {
                props.parentCallback(false);
            }
        };

        // Ajoutez un gestionnaire d'événements au niveau du document
        document.addEventListener('keydown', handleKeyDown);

        // Nettoyez le gestionnaire d'événements lorsque le composant est démonté
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
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