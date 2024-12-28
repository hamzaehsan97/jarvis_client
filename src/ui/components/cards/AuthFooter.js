// material-ui
import { Typography, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import PrivacyPolicy from '../../pages/pages/PrivacyPolicy';

// ==============================|| FOOTER - AUTHENTICATION 2 & 3 ||============================== //

const AuthFooter = () => (
    <Stack direction="row" spacing={2}>
        <span>
            <Typography component={Link} to="/privacy-policy" variant="subtitle1">
                Privacy Policy
            </Typography>
        </span>
        <span>
            <Typography component={Link} to="/terms-of-service" variant="subtitle1">
                Terms of Service
            </Typography>
        </span>
    </Stack>
);

export default AuthFooter;
