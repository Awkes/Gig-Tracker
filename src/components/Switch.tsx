/** @jsx jsx */
import { jsx } from 'theme-ui'

const Switch = (props: any) => (
  <span
    sx={{
      position: 'relative',
      display: 'inline-block',
      width: '30px',
      height: '13px',
    }}
  >
    <input
      {...props}
      sx={{
        position: 'absolute',
        top: 0,
        display: 'block',
        width: '100%',
        height: '100%',
        margin: '0 auto',
        opacity: 0,
        zIndex: 1,
        cursor: 'pointer',
        '&:checked+span': {
          backgroundColor: 'modes.dark.background',
          '&>span': { 
            transform: 'translate(calc(100% + 6px))' },
        },
      }}
      type="checkbox"
    />
    <span
      sx={{
        position: 'absolute',
        display: 'inline-block',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'background',
        borderRadius: '10px',
        transition: 'background .3s',
      }}
    >
      <span
        sx={{
          position: 'absolute',
          top: '1px',
          left: '1px',
          display: 'inline-block',
          backgroundColor: 'primary',
          width: '11px',
          height: '11px',
          borderRadius: '50%',
          transition: 'transform .2s',
        }}
      />
    </span>
  </span>
)

export default Switch
