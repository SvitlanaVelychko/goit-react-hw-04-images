import { useState } from "react";
import PropTypes from 'prop-types';
import { SearchIcon } from '@primer/octicons-react';
import { toast } from 'react-toastify';
import {
    SearchbarContainer,
    SearchForm,
    SearchFormButton,
    SearchFormInput
} from "./Searchbar.styled";

const Searchbar = ({ onSubmit }) => {
    const [query, setQuery] = useState('');

    const handleChange = e => {
        setQuery(e.currentTarget.value.trim().toLowerCase());
    };

    const handleSubmit = e => {
        e.preventDefault();

        if (query.trim() === '') {
            toast.error('Please, write word in search line.');
        } else {
            onSubmit(query);
            setQuery('');
        }
        
        e.currentTarget.reset();
    };

        return (
            <SearchbarContainer>
                <SearchForm onSubmit={handleSubmit}>
                    <SearchFormButton type="submit">
                        <SearchIcon size={24} />
                    </SearchFormButton>
                    <SearchFormInput
                        type="text"
                        name="query"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        onChange={handleChange}
                    />
                </SearchForm>
            </SearchbarContainer>
        );
};

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;