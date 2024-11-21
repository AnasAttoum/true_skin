import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function BasicTextField({ val, handleChange, error, name, label }: { val: string | number, handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void, error: string, name: string, label: string }) {

    return (
        <Box
            component="form"
            sx={{ display: 'flex', justifyContent: 'center', '& > :not(style)': { m: 0, width: '25ch' } }}
            noValidate
            autoComplete="off"
        >
            <TextField style={{ width: '80%', marginBlock: '7px', color: 'var(--primary)' }} id="outlined-basic" name={name} label={label} variant="outlined" value={val}
                onChange={handleChange}
                error={error !== ''}
                helperText={error}
            />

        </Box>
    );
}
