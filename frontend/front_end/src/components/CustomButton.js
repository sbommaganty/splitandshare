import React from 'react';
import { Button } from "@mui/material";
import PropTypes from 'prop-types';

// Define the custom button component
export const CustomButton = ({ label = 'undefined', onClick, size = '', sx, styles,  color, variant = 'contained', ...props }) => {
    return (
        <Button
            variant={variant}
            color={color}
            onClick={onClick} // Event handler
            size={size}
            style={styles}
            sx={sx}
            {...props} // Any additional props
        >
            {label}
        </Button>
    );
};

// Prop types for the component
CustomButton.propTypes = {
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func, // onClick is optional but if provided, should be a function
    color: PropTypes.string,
    variant: PropTypes.string,
    size: PropTypes.string,

};

// Default properties for the component
CustomButton.defaultProps = {
    color: 'primary',
    variant: 'contained',
    onClick: null, // Default no-op click handler
    size: 'large'
};

export default CustomButton;
