import { useState } from "react";
import PropTypes from 'prop-types';
import Modal from "../Modal";
import { ImageItem, ImageItemCard } from "./ImageGalleryItem.styled";

const ImageGalleryItem = ({ hit }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <ImageItem>
            <ImageItemCard src={hit.webformatURL} alt={hit.tags} onClick={openModal} />
            {isModalOpen &&
                (<Modal onClose={closeModal}><img src={hit.largeImageURL} alt={hit.tags} /></Modal>)}
        </ImageItem>
    );
};

ImageGalleryItem.propTypes = {
    hits: PropTypes.array,
    isModalOpen: PropTypes.bool,
};

export default ImageGalleryItem;