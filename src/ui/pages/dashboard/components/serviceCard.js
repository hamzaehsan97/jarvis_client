import React from 'react';
import { Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ServiceCard = ({ name, serviceUrl }) => {
    const navigate = useNavigate();

    return (
        <Link
            component="button"
            variant="body2"
            underline="hover"
            onClick={() => {
                navigate(serviceUrl);
            }}
        >
            {name}
        </Link>
    );
};

export default ServiceCard;
