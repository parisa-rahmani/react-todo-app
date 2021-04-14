import { makeStyles } from '@material-ui/core/styles';

export const classAddBtn = makeStyles({
  root: {
    minWidth: '2rem',
    padding: 0,
  },
});

export const itemBtnClass = makeStyles({
  root: {
    minWidth: '1rem',
    margin: 0,
  },
});

export const inputStyle = makeStyles({
  root: {
    width: '60%',
    '& .MuiInputBase-input': {
      color: 'blue',
      padding: '.9rem',
    },
    '& label': {
      color: 'cadetblue',
      lineHeight: '.65',
    },
    '& label.Mui-focused': {
      color: 'blue',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'blue',
        borderWidth: '1.5px',
      },
      '&:hover fieldset': {
        borderColor: 'blue',
      },
    },
  },
});

export const authInputClass = makeStyles({
  root: {
    width: '70%',
    margin: '.8rem 0',
    '& .MuiInputBase-input': {
      color: 'blue',
    },
    '& label': {
      color: 'cadetblue',
    },
    '& label.Mui-focused': {
      color: 'blue',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'blue',
        borderWidth: '1.5px',
      },
      '&:hover fieldset': {
        borderColor: 'blue',
      },
    },
  },
});
