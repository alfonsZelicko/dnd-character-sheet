import { SxProps, Theme } from "@mui/material";

export const abilityModifierBox: SxProps<Theme> = {
    height: '65px',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    pr: 2,
    flexGrow: 1,
  }

  export const abilityInputContainer: SxProps<Theme> = { 
    position: 'absolute', 
    zIndex: 2, 
    left: '5px', 
    top: '30px', 
    width: 30 
}

export const labelContainer: SxProps<Theme> = {
    margin: '0 0 10px 4px',
    clipPath: 'polygon(0 0, 100% 0, 100% 100%, calc(0% + 36px) 100%, calc(0% + 36px) 35px, 0 35px)',
    p: 0,
    '&:last-child': {
      marginBottom: 0
    },
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
  }