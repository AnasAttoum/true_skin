import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function BasicPasswordField({ val, handleChange, error, name }: { val: string | number, handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void, error: string, name: string }) {

    return (
        <Box
            component="form"
            sx={{ display: 'flex', justifyContent: 'center', '& > :not(style)': { m: 0, width: '25ch' } }}
            noValidate
            autoComplete="off"
        >
            <TextField id={'Password'} type='password' style={{ width: '80%', marginBlock: '7px', color: 'var(--primary)' }} value={val} name={name} label='Password' className='m-5' variant="outlined" color='primary'
                onChange={handleChange}
                error={error !== ''}
                helperText={error}
            />
        </Box>
    );
}
