import PropTypes from 'prop-types';
import { forwardRef, useState } from 'react';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import { Card, CardContent, CardHeader, Divider, Typography, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// ==============================|| CUSTOM SUB CARD ||============================== //

const SubCard = forwardRef(
    (
        {
            children,
            content,
            contentClass,
            darkTitle,
            secondary,
            sx = {},
            contentSX = {},
            title,
            titleChildren,
            hideContentIcon,
            ...others
        },
        ref
    ) => {
        const theme = useTheme();
        const [isContentVisible, setIsContentVisible] = useState(!content);

        const handleToggleContent = () => {
            setIsContentVisible((prevState) => !prevState);
        };

        return (
            <Card
                ref={ref}
                sx={{
                    border: '1px solid',
                    borderColor: theme.palette.grey[200],
                    ':hover': {
                        boxShadow: '0 6px 18px 0 rgb(26 35 40 / 8%)'
                    },
                    ...sx
                }}
                {...others}
            >
                {/* card header and action */}
                <Grid container direction={'row'} justifyContent={'space-between'} spacing={1}>
                    <Grid item xs={12} md={7}>
                        {!darkTitle && title && (
                            <CardHeader sx={{ p: 2.5 }} title={<Typography variant="h5">{title}</Typography>} action={secondary} />
                        )}
                        {darkTitle && title && (
                            <CardHeader sx={{ p: 2.5 }} title={<Typography variant="h4">{title}</Typography>} action={secondary} />
                        )}
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        md={4}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        {titleChildren && titleChildren}
                    </Grid>
                    {/* Dropdown icon */}
                    {hideContentIcon && (
                        <Grid
                            item
                            xs={12}
                            md={1}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-end',
                                pr: 2.5
                            }}
                        >
                            <IconButton onClick={handleToggleContent}>
                                <ExpandMoreIcon
                                    sx={{ transform: isContentVisible ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}
                                />
                            </IconButton>
                        </Grid>
                    )}
                </Grid>
                {/* content & header divider */}
                {title && (
                    <Divider
                        sx={{
                            opacity: 1,
                            borderColor: theme.palette.primary.light
                        }}
                    />
                )}

                {/* card content */}
                {((isContentVisible && content) || !hideContentIcon) && (
                    <CardContent sx={{ p: 2.5, ...contentSX }} className={contentClass || ''}>
                        {children}
                    </CardContent>
                )}
                {!content && children}
            </Card>
        );
    }
);

SubCard.propTypes = {
    children: PropTypes.node,
    titleChildren: PropTypes.node,
    content: PropTypes.bool,
    contentClass: PropTypes.string,
    darkTitle: PropTypes.bool,
    secondary: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.object]),
    sx: PropTypes.object,
    contentSX: PropTypes.object,
    title: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.object]),
    hideContentIcon: PropTypes.bool
};

SubCard.defaultProps = {
    content: true
};

export default SubCard;
