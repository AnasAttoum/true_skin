import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { Box, Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';

export default function FloatingButton({ url, tooltip }: { url: string, tooltip: string }) {
    return (
        <Link to={url} className='fixed bottom-5 right-5'>
            <Box sx={{ '& > :not(style)': { m: 1 } }}>
                <Tooltip title={tooltip}>
                    <Fab aria-label="add" sx={{ boxShadow:'none', backgroundColor: 'var(--primary)', transition: 'all .3s', '&:hover': { backgroundColor: 'var(--primary)', transform: 'rotate(90deg)' } }}>
                        <AddIcon sx={{ color: '#fff' }} />
                    </Fab>
                </Tooltip>
            </Box>
        </Link>
    )
}
