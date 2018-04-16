import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '../../routes';

const GoBack = ({ route }) => (
    <Link route={route}>
        <a>Go back</a>
    </Link>
);

GoBack.propTypes = {
    route: PropTypes.string.isRequired,
};

export default GoBack;
